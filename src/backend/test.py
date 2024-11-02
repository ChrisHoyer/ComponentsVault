# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AmplifierAudio(models.Model):
    partid = models.IntegerField(db_column='PartId', blank=True, null=True)  # Field name made lowercase.
    value = models.CharField(db_column='Value', max_length=250, blank=True, null=True)  # Field name made lowercase.
    comment = models.CharField(db_column='Comment', max_length=250, blank=True, null=True)  # Field name made lowercase.
    part_number = models.CharField(db_column='Part Number', max_length=250, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    manufacturer = models.CharField(db_column='Manufacturer', max_length=250, blank=True, null=True)  # Field name made lowercase.
    description = models.CharField(db_column='Description', max_length=250, blank=True, null=True)  # Field name made lowercase.
    footprint_ref = models.CharField(db_column='Footprint Ref', max_length=250, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    footprint_path = models.CharField(db_column='Footprint Path', max_length=250, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    library_ref = models.CharField(db_column='Library Ref', max_length=250, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    library_path = models.CharField(db_column='Library Path', max_length=250, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    componentlink1description = models.CharField(db_column='ComponentLink1Description', max_length=250, blank=True, null=True)  # Field name made lowercase.
    componentlink1url = models.CharField(db_column='ComponentLink1URL', max_length=250, blank=True, null=True)  # Field name made lowercase.
    supplier_1 = models.CharField(db_column='Supplier 1', max_length=250, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    supplier_part_number_1 = models.CharField(db_column='Supplier Part Number 1', max_length=250, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    supplier_2 = models.CharField(db_column='Supplier 2', max_length=250, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    supplier_part_number_2 = models.CharField(db_column='Supplier Part Number 2', max_length=250, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    lead_free_status = models.CharField(db_column='Lead-Free Status', max_length=250, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    rohs = models.CharField(db_column='RoHS', max_length=250, blank=True, null=True)  # Field name made lowercase.
    mounting_style = models.CharField(db_column='Mounting Style', max_length=250, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    quiescent_current = models.CharField(db_column='Quiescent Current', max_length=250, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    packaging = models.CharField(db_column='Packaging', max_length=250, blank=True, null=True)  # Field name made lowercase.
    lifecycle_status = models.CharField(db_column='Lifecycle Status', max_length=250, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    supplier_3 = models.CharField(db_column='Supplier 3', max_length=250, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    supplier_part_number_3 = models.CharField(db_column='Supplier Part Number 3', max_length=250, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    output_power = models.CharField(db_column='Output Power', max_length=250, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    number_of_pins = models.CharField(db_column='Number of Pins', max_length=250, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    case_package = models.CharField(db_column='Case/Package', max_length=250, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    custom_part = models.CharField(db_column='Custom Part', max_length=250, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    operating_temperature = models.CharField(db_column='Operating Temperature', max_length=250, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    categories = models.CharField(db_column='Categories', max_length=250, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Amplifier - Audio'


class ConnectorRf(models.Model):
    partid = models.IntegerField(db_column='PartId', blank=True, null=True)  # Field name made lowercase.
    value = models.CharField(db_column='Value', max_length=250, blank=True, null=True)  # Field name made lowercase.
    comment = models.CharField(db_column='Comment', max_length=250, blank=True, null=True)  # Field name made lowercase.
    part_number = models.CharField(db_column='Part Number', max_length=250, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    manufacturer = models.CharField(db_column='Manufacturer', max_length=250, blank=True, null=True)  # Field name made lowercase.
    description = models.CharField(db_column='Description', max_length=250, blank=True, null=True)  # Field name made lowercase.
    footprint_ref = models.CharField(db_column='Footprint Ref', max_length=250, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    footprint_path = models.CharField(db_column='Footprint Path', max_length=250, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    library_ref = models.CharField(db_column='Library Ref', max_length=250, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    library_path = models.CharField(db_column='Library Path', max_length=250, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    componentlink1description = models.CharField(db_column='ComponentLink1Description', max_length=250, blank=True, null=True)  # Field name made lowercase.
    componentlink1url = models.CharField(db_column='ComponentLink1URL', max_length=250, blank=True, null=True)  # Field name made lowercase.
    supplier_1 = models.CharField(db_column='Supplier 1', max_length=250, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    supplier_part_number_1 = models.CharField(db_column='Supplier Part Number 1', max_length=250, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    lead_free_status = models.CharField(db_column='Lead-Free Status', max_length=250, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    rohs = models.CharField(db_column='RoHS', max_length=250, blank=True, null=True)  # Field name made lowercase.
    mounting_style = models.CharField(db_column='Mounting Style', max_length=250, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    packaging = models.CharField(db_column='Packaging', max_length=250, blank=True, null=True)  # Field name made lowercase.
    size_length = models.CharField(db_column='Size-Length', max_length=250, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    contact_plating = models.CharField(db_column='Contact Plating', max_length=250, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    gender = models.CharField(db_column='Gender', max_length=250, blank=True, null=True)  # Field name made lowercase.
    contact_material = models.CharField(db_column='Contact Material', max_length=250, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    custom_part = models.CharField(db_column='Custom Part', max_length=250, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    categories = models.CharField(db_column='Categories', max_length=250, blank=True, null=True)  # Field name made lowercase.
    max_frequency = models.CharField(db_column='Max Frequency', max_length=250, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    supplier_2 = models.CharField(db_column='Supplier 2', max_length=250, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    supplier_part_number_2 = models.CharField(db_column='Supplier Part Number 2', max_length=250, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    supplier_3 = models.CharField(db_column='Supplier 3', max_length=250, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    supplier_part_number_3 = models.CharField(db_column='Supplier Part Number 3', max_length=250, blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.

    class Meta:
        managed = False
        db_table = 'Connector - RF'
