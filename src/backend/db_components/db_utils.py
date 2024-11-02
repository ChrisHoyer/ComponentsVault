from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from django.db import connections
from math import ceil
import os, re

# ========================================
# Fetch data from specified tablename
def Get_TableData(tablename):

        if not tablename:
            return Response("parameter 'table' is required.", status=404)

        # Validate table name with a regex
        # allow only alphanumeric characters, spaces, and underscores
        if not re.match(r'^[\w% -]+$', tablename) or len(tablename) > 100:
            raise ValueError(f"Invalid table: '{tablename}'")
        
        # Check if table exists
        existing_tables = connections['componentsdb'].introspection.table_names()
        if tablename not in existing_tables:
            raise NotFound(f"Table '{tablename}' does not exist in the database.")
        
        with connections['componentsdb'].cursor() as cursor:
            try:
                query = f'SELECT * FROM `{tablename}`'
                cursor.execute(query)
                columns = [col[0] for col in cursor.description]
                rows = cursor.fetchall()

                return [dict(zip(columns, row)) for row in rows]
            
            except Exception as e:
                return Response({"error": str(e)}, status=500)

# ========================================
# Fetch data from specified tablename
def Get_TablePage(tablename, page):

        # Validate table name argument with a regex
        # allow only alphanumeric characters, spaces, and underscores
        if not re.match(r'^[\w% -]+$', tablename) or len(tablename) > 100:
            raise ValueError(f"Invalid table: '{tablename}'")

         # Validate Page argument
        page = int( page )
        if page <= 0:
            return ValueError("Page must be a positive integer.")
       
        # Validate Pagesize
        page_size = int( os.getenv('COMPONENT_PAGE_SIZE') )
        if page_size <= 0:
            return ValueError("Page size must be a positive integer.")

        # Check if table exists
        existing_tables = connections['componentsdb'].introspection.table_names()
        if tablename not in existing_tables:
            raise NotFound(f"Table '{tablename}' does not exist in the database.")
        
        with connections['componentsdb'].cursor() as cursor:
            try:
                offset = (page - 1) * page_size
                query = f'SELECT * FROM `{tablename}` LIMIT {page_size} OFFSET {offset}'
                cursor.execute(query)
                columns = [col[0] for col in cursor.description]
                rows = cursor.fetchall()

                # Get total number of rows for calculating total pages
                cursor.execute(f'SELECT COUNT(*) FROM `{tablename}`')
                total_rows = cursor.fetchone()[0]
                total_pages = ceil(total_rows / page_size)
                
                return {
                    "data": [dict(zip(columns, row)) for row in rows],
                    "page": page,
                    "total_pages": total_pages,
                    "total_rows": total_rows,
                }
            
            except Exception as e:
                return Response({"error": str(e)}, status=500)
         
# ========================================
# Fetch data from specified tablename
def Get_TableList():

    with connections['componentsdb'].cursor() as cursor:
        try:
            return connections['componentsdb'].introspection.table_names(cursor)
        
        except Exception as e:
            return Response({"error": str(e)}, status=500)
