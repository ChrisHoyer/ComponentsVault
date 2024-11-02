# App: DB_Components

[[__TOC__]]

## Endpoint `GET /parts/?table=<tablename>`

### Overview
Fetches and returns the complete contents of a specified database table.

### Details
- **Permissions**: Open access (`AllowAny`).
- **Serializer**: `GenericComponentSerializer` — must match the data structure for validation.
- **Query Parameter**: `table` — Specifies the table name.

### Class: `GetTableContentView`
Handles GET requests for database table data retrieval.

### Key Methods

#### `get_queryset()`
- **Function**: Verifies the existence of the table and retrieves its data.
- **Output**: Queryset of the table content.

#### `get()`
- **Purpose**: Processes GET requests.
- **Steps**:
  1. Extracts the `table` parameter from the request.
  2. Calls `get_queryset()` to fetch data.
  3. Uses `GenericComponentSerializer` to serialize data.
  4. Checks if serialization is valid.
- **Response**:
	- 201: Successful return of validated serialized data.
	- Other: Returns raw data if validation fails.


## Serializer: `GenericComponentSerializer`
Handles the mapping of input data into structured model instances and outputs a serializable format. `GenericComponentSerializer` is a custom serializer designed to handle the complex parsing and mapping of component data structures. It extends `serializers.BaseSerializer` from Django REST Framework, supporting both serialization and deserialization of nested data models.

### Attributes
- **`unmapped_data`**: A dictionary holding input data not initially matched to model fields, aiding in extracting unrecognized fields.
    
### Methods

#### `__init__(self, instance=None, data=None, **kwargs)`
Constructor that initializes the serializer with optional `instance` and `data` parameters.

#### `convert_listinput(self, model_class)`
- **Purpose**: Converts a structured list input into a list of model class instances based on unmapped data.
- **Process**:
  1. Maps model fields and their corresponding database columns.
  2. Determines the maximum index in the `unmapped_data` keys that match model field patterns.
  3. Iterates through indices to create instances of `model_class`.
  4. Populates attributes based on matching keys in `unmapped_data`.
  5. Returns a serialized list of instances with populated data.
- **Parameters**:
  - `model_class`: The model class to create instances for.
- **Returns**: A list of serialized dictionaries.

#### `convert_input(self, item)`
- **Purpose**: Maps input dictionary `item` to known model fields, converting and extracting data as needed.
- **Process**:
  1. Normalizes `unmapped_data` by converting keys to lowercase.
  2. Maps fields of `GenericComponentData` using `db_column` or field names.
  3. Calls `convert_listinput()` for additional model mappings (e.g., `GenericSupplierData`).
  4. Collects and stores unknown fields in the `features` list.
- **Parameters**:
  - `item`: The input data dictionary.
- **Returns**: A dictionary of mapped and structured data.

#### `to_representation(self, instance)`
- **Purpose**: Converts a model instance into a serializable dictionary.
- **Returns**: `None` (not implemented in detail).
