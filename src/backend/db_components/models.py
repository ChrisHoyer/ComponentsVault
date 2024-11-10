# This model includes Frontend Level Models
from django.db import models

# Router to correct database
class GenericComponentManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().using('componentsdb')

# ========================================
# Model for generic component
class GenericComponentData(models.Model):
    partid = models.IntegerField(db_column='PartId', primary_key=True)
    comment = models.CharField(db_column='Comment', max_length=255)
    description = models.TextField(db_column='Description')

    part_number = models.CharField(db_column='Part Number', max_length=255)
    manufacturer = models.CharField(db_column='Manufacturer', max_length=255)

    lifecycle_status = models.CharField(db_column='Lifecycle Status', max_length=255)
    mounting_style = models.CharField(db_column='Mounting Style', max_length=255)
    case_package = models.CharField(db_column='Case/Package', max_length=255)

    # Classifications
    rohs_status = models.CharField(db_column='RoHs Status', max_length=255)
    reach_status = models.CharField(db_column='Reach Status', max_length=255)
    ratings = models.CharField(db_column='Ratings', max_length=255)

    objects = GenericComponentManager()

    class Meta:
        managed = False

# ========================================
# Model for generic supplier
class GenericSupplierData(models.Model):
    supplier = models.CharField(db_column='Supplier {n}', max_length=255, blank=False)
    supplier_part_number = models.CharField(db_column='Supplier Part Number {n}', max_length=255, blank=False)
    supplier_packaging = models.CharField(db_column='Supplier Packaging {n}', max_length=255, blank=True)

    # Internal constants (not part of the database)
    NUMBERING_ALLOW_BLANK = False
    NUMBERING_START_INDEX = 1

    def to_dict(self):
        return {
            'supplier': self.supplier,
            'supplier_part_number': self.supplier_part_number,
            'supplier_packaging': self.supplier_packaging,
        }
    
# ========================================
# Model for generic footprint
class GenericFootprintData(models.Model):
    footprint_ref = models.CharField(db_column='Footprint Ref {n}', max_length=255, blank=False)
    footprint_path = models.CharField(db_column='Footprint Path {n}', max_length=255, blank=False)
    footprint_revision = models.CharField(db_column='Footprint Revision {n}', max_length=255, blank=True)

    # Internal constants (not part of the database)
    NUMBERING_ALLOW_BLANK = True
    NUMBERING_START_INDEX = 0

    def to_dict(self):
        return {
            'footprint_ref': self.footprint_ref,
            'footprint_path': self.footprint_path,
            'footprint_revision': self.footprint_revision,
        }
    
# ========================================
# Model for generic footprint
class GenericSymbolData(models.Model):
    symbol_ref = models.CharField(db_column='Library Ref {n}', max_length=255, blank=False)
    symbol_path = models.CharField(db_column='Library Path {n}', max_length=255, blank=False)
    sybol_revision = models.CharField(db_column='Library Revision {n}', max_length=255, blank=True)

    # Internal constants (not part of the database)
    NUMBERING_ALLOW_BLANK = True
    NUMBERING_START_INDEX = 0

    def to_dict(self):
        return {
            'symbol_ref': self.symbol_ref,
            'symbol_path': self.symbol_path,
            'sybol_revision': self.sybol_revision,
        }

# ========================================
# Model for generic ComponentLink
class GenericComponentLinkData(models.Model):

    componentlink_description = models.CharField(db_column='ComponentLink{n}Description', max_length=255, blank=False)
    componentlink_url = models.CharField(db_column='ComponentLink{n}URL', max_length=255, blank=False)

    # Internal constants (not part of the database)
    NUMBERING_ALLOW_BLANK = False
    NUMBERING_START_INDEX = 1

    def to_dict(self):
        return {
            'componentlink_description': self.componentlink_description,
            'componentlink_url': self.componentlink_url,
        } 
    
# ========================================
# Model for generic name-value pair
class GenericData(models.Model):

    data_name = models.CharField(max_length=255)
    data_value = models.CharField(max_length=255)

    def to_dict(self):
        return {
            'data_name': self.data_name,
            'data_value': self.data_value,
        }