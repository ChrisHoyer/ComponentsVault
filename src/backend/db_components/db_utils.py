from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from django.db import connections
import re

# ========================================
# Fetch data from specified tablename
def fetch_TableData(tablename):

        if not tablename:
            return Response("parameter 'table' is required.", status=404)

        # Validate table name with a regex
        # allow only alphanumeric characters, spaces, and underscores
        if not re.match(r'^[\w% -]+$', tablename):
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