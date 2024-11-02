from rest_framework import serializers
from django.apps import apps
import re

from .models import *

#================================================================
#           Generic Component Serializer
#================================================================

class GenericComponentSerializer(serializers.BaseSerializer):

    # Unmapped Datalist
    unmapped_data = {}

    def __init__(self, instance=None, data=None, **kwargs):
        super().__init__(instance, data, **kwargs)

# ========================================

    # In your convert_listinput function:
    def convert_listinput(self, model_class):

        extracted_list = []

        # Get the model field names and their corresponding attributes
        model_field_map = {
            field.name: field.db_column 
            for field in model_class._meta.get_fields() 
            if field.db_column is not None
        }

        # Calculate max_index by identifying the highest {n} index in unmapped_data
        indices = [
            int(re.search(r'\d+$', key).group()) 
            for key in self.unmapped_data.keys()
            if re.search(r'\d+$', key) and any(field.replace("{n}", "").strip().lower() in key.lower() for field in model_field_map.values())
        ]
        max_index = max(indices, default=0)
     
        # Populate extracted_list with model_class objects
        for index in range(model_class.NUMBERING_START_INDEX, max_index + 1 + model_class.NUMBERING_START_INDEX):
            model_instance = model_class()

            for field_name, db_column in model_field_map.items():

                # Set attribute if the expected key exists in unmapped_data
                expected_key = db_column.replace("{n}", str(index)).lower()
                if expected_key in self.unmapped_data.keys():
                    setattr(model_instance, field_name, self.unmapped_data[expected_key])
                    self.unmapped_data.pop(expected_key)

                # Check for the key without index (no placeholder)
                elif (model_class.NUMBERING_ALLOW_BLANK):
                    simple_key = db_column.replace("{n}", "").strip().lower()
                    if simple_key in self.unmapped_data.keys():
                        setattr(model_instance, field_name, self.unmapped_data[simple_key])
                        self.unmapped_data.pop(simple_key)

            # Append the instance to the extracted list only if it has populated fields
            if any(getattr(model_instance, field.name) not in [None, ''] for field in model_class._meta.get_fields() if not field.blank):
                extracted_list.append(model_instance)

        # Convert to a serializable format
        serialized_data = [item.to_dict() for item in extracted_list]

        return serialized_data

# ========================================

    # Do the conversion of the input data (single data)
    def convert_input(self, item):
        self.unmapped_data = {k.lower(): v for k, v in item.items()}

        # Extract fields for GenericComponent Model
        mapped_data = {}

        for field in GenericComponentData._meta.fields:
            field_map = field.db_column or field.name

            # Map only if existent
            if field_map.lower() in self.unmapped_data.keys():
                mapped_data[field.name] = self.unmapped_data.get(field_map.lower())
                self.unmapped_data.pop(field_map.lower())
            else:
                mapped_data[field.name] = ""

        # List all known attributes
        mapped_data["supplier"] = self.convert_listinput(GenericSupplierData)
        mapped_data["lib_footprint"] = self.convert_listinput(GenericFootprintData)
        mapped_data["lib_symbol"] = self.convert_listinput(GenericSymbolData)
        mapped_data["componentlink"] = self.convert_listinput(GenericComponentLinkData)

        # List all other parameters
        mapped_data["features"] = []
        for key, value in self.unmapped_data.items():
            mapped_data["features"].append( GenericData(data_name=key, data_value=value).to_dict() )


        return mapped_data

# ========================================

    # Convert the instance to a dictionary representation  
    def to_representation(self, instance):
        return None

# ========================================

    # Convert input data into a valid internal representation
    def to_internal_value(self, data):
        if isinstance(data, list):
            return [self.convert_input(item) for item in data]
        else:
            return self.convert_input(data)

# ========================================

    # Create a new instance based on validated data
    def create(self, validated_data):
        return validated_data 
    
    # Update an existing instance with validated data
    def update(self, instance, validated_data):
        return instance

