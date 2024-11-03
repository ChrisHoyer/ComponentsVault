# App: DB_Components

[[_TOC_]]

## Endpoint `GET /parts/table?tablename=<tablename>`
Fetches and returns the complete contents of a specified database table.

- **Permissions**: Open access (`IsAuthenticated`).
- **Serializer**: `GenericComponentSerializer` — Must match the data structure for validation.
- **Query Parameters**:
  - `tablename`: Specifies the table name. This table must exist in the database.
  - `page`: (Optional) Specifies the page number for pagination. Defaults to 1.
  - `textsearch`: (Optional) Provides a text search term to filter results. Defaults to `None`.

### ViewSet: `GetTableContentView`
Handles GET requests for component database table data retrieval.

- **Purpose**: Processes GET requests to retrieve data from a specified table.
- **Steps**:
  1. Extracts the `tablename`, `page`, and `textsearch` parameters from the request.
  2. Calls `get_queryset()` to validate and fetch data if `tablename` exists in the component database.
  3. Uses `GenericComponentSerializer` to serialize the retrieved data.
  4. Validates the serialized data and prepares the response.
- **Response**:
	- **201**: Successful return of validated serialized data with pagination info.
	- **400**: Returns error if serialization fails.

## Endpoint `GET /parts/tablelist`
This endpoint returns a list of all tables in the connected components database.

- **Permissions**: Open access (`IsAuthenticated`).
- **Serializer**: none
- **Query Parameter**: none

### ViewSet: `GetTableListView`
Handles GET requests to retrieve a list of all tables in the component database.

- **Purpose**: Processes GET requests to provide the names of all tables available in the connected database.
- **Steps**:
  1. Calls `get_queryset()` to fetch the list of table names from the database.
  2. Returns the list of tables as a JSON response.
- **Response**:
	- **200**: Returns a JSON array containing the names of the tables.
	- **500**: Returns an error message if there is an issue fetching the table names.

### ViewSet: `GetTableListView`
A view class that handles GET requests to fetch the list of tables in the database.

- **Purpose**: Handles GET requests.
- **Process**:
  1. Calls `get_queryset()` to retrieve the list of tables.
  2. Returns the list of tables as a response.
  
- **Response**:
  - **200 OK**: Returns a JSON array of table names from the database.
  - Other: Returns raw data if validation fails.

---

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

#### `to_internal_value(self, data)`
- **Purpose**: Converts input data into a validated internal representation.
- **Process**:
  - Handles both individual and list data input.
  - Calls `convert_input()` for each data item.
- **Parameters**:
  - `data`: The input data (list or dictionary).
- **Returns**: Converted data suitable for use in the application.
