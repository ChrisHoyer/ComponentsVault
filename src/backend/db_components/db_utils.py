from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from django.db import connections
from math import ceil
import os, re

# ========================================
# Check if tablename exists
def Check_Tablename(tablename):

    # Validate table name argument with a regex
    if not re.match(r'^[\w% -]+$', tablename) or len(tablename) > 100:
        raise ValueError(f"Invalid table: '{tablename}'")

    # Check if table exists
    existing_tables = connections['componentsdb'].introspection.table_names()
    if tablename not in existing_tables:
        raise NotFound(f"Table '{tablename}' does not exist in the database.")

# ========================================
# Validate if column exists in the table
def Check_Column(tablename, columnname):

    # Validate table name argument with a regex
    if not re.match(r'^[\w% -]+$', columnname) or len(columnname) > 100:
        raise ValueError(f"Invalid column: '{columnname}'")

    with connections['componentsdb'].cursor() as cursor:
        try:
            cursor.execute(f"SHOW COLUMNS FROM `{tablename}`")
            columns = cursor.fetchall()
            column_names = [col[0] for col in columns]

            if columnname not in column_names:
                raise ValueError(f"Column '{columnname}' does not exist in table '{tablename}'.")

        except Exception as e:
            return Response({"error": str(e)}, status=500)


# ========================================
# Fetch data from specified tablename
def Get_TablePage(tablename, page, textsearch=None):
    
    # validate Tablename
    Check_Tablename( tablename )

    # Validate Page argument
    page = int(page)
    if page <= 0:
        raise ValueError("Page must be a positive integer.")
    
    # Validate Pagesize
    page_size = int(os.getenv('COMPONENT_PAGE_SIZE'))
    if page_size <= 0:
        raise ValueError("Page size must be a positive integer.")

    with connections['componentsdb'].cursor() as cursor:
        try:
            offset = (page - 1) * page_size

            # Retrieve column names for the specified table
            cursor.execute(f"SHOW COLUMNS FROM `{tablename}`")
            columns = cursor.fetchall()
            column_names = [col[0] for col in columns]  # Extract column names

            # Create the CONCAT_WS part
            if textsearch:
                # Generate the CONCAT_WS part with all columns
                concat_columns = ', '.join(f'`{col}`' for col in column_names)
                where_clause = f" WHERE CONCAT_WS(' ', {concat_columns}) LIKE %s"
            else:
                where_clause = ""

            # Prepare the final query
            query = f'SELECT * FROM `{tablename}`{where_clause} LIMIT %s OFFSET %s'
            params = [f'%{textsearch}%', page_size, offset] if textsearch else [page_size, offset]

            cursor.execute(query, params)
            columns = [col[0] for col in cursor.description]
            rows = cursor.fetchall()

            # Get total number of rows for calculating total pages
            count_query = f'SELECT COUNT(*) FROM `{tablename}`{where_clause}'
            count_params = [f'%{textsearch}%'] if textsearch else []
            cursor.execute(count_query, count_params)
            total_rows = cursor.fetchone()[0]
            total_pages = ceil(total_rows / page_size)

            return {
                "data": [dict(zip(columns, row)) for row in rows],
                "page": page,
                "total_pages": total_pages,
                "total_rows": total_rows,
            }

        except Exception as e:
            return {"error": str(e)}
   
# ========================================
# Fetch list of tables from database
def Get_TableList():

    with connections['componentsdb'].cursor() as cursor:
        try:
            return connections['componentsdb'].introspection.table_names(cursor)
        
        except Exception as e:
            return Response({"error": str(e)}, status=500)
        
# ========================================
# Fetch list of colimns from specified tablename
def Get_TableColumnList(tablename):

    # validate Tablename
    Check_Tablename( tablename )

    with connections['componentsdb'].cursor() as cursor:
        try:
            cursor.execute(f"SHOW COLUMNS FROM `{tablename}`")
            columns = cursor.fetchall()
            column_names = [col[0] for col in columns]

        except Exception as e:
            return Response({"error": str(e)}, status=500)
        
        return column_names

# ========================================
# Fetch list of values from a specified column in a table
def Get_ColumnValues(tablename, columnname):

    Check_Tablename(tablename)
    Check_Column(tablename, columnname) 

    print("TEST CHECK ERFOLGREICH: Tabelle={} Column={}".format(tablename, columnname))

    with connections['componentsdb'].cursor() as cursor:
        try:
            # Query to get all values of the specified column
            cursor.execute(f"SELECT `{columnname}` FROM `{tablename}`")
            rows = cursor.fetchall()

            # Extract values from the fetched rows
            column_values = list(set(col[0] for col in rows))

        except Exception as e:
            return Response({"error": str(e)}, status=500)
        
        return column_values

# ========================================
# Fetch list of colimns from specified tablename