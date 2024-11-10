from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
import json

from .serializers import GenericComponentSerializer
from .db_utils import *

# Endpoint that returns complete table of the database
class GetTableContentView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = GenericComponentSerializer

    # Checks if the table exists and fetches its data safely.
    def get_queryset(self):
        tablename = self.request.query_params.get('tablename')
        page = self.request.query_params.get('page', 1)
        textsearch = self.request.query_params.get('textsearch', None)

        if not tablename:
            raise ValueError("Query parameter 'tablename' is required.")

        return Get_TablePage(tablename, page, textsearch)

    # get request
    def get(self, request, *args, **kwargs):

        # Get the data from the specified table
        data = self.get_queryset()

        # parse into generic smodel
        serializer = self.get_serializer(data=data['data'], many=True)
        if serializer.is_valid():
            return Response( {
                 "page": data["page"],
                 "total_pages": data["total_pages"],
                 "data": serializer.validated_data,
                }, status=201)
        
        return Response(serializer.data, status=400)

# ======================================== 
# Endpoint that returns list of tables of the database
class GetTableListView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Get_TableList()
    
    def get(self, request, *args, **kwargs):
        return Response(self.get_queryset(), status=201)

# ========================================      
# Endpoint that returns list of tables of the database
class GetColumnListView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        tablename = self.request.query_params.get('tablename')
        if not tablename:
            raise ValueError("Query parameter 'tablename' is required.")

        return Get_TableColumnList(tablename)
    
    def get(self, request, *args, **kwargs):
        return Response(self.get_queryset(), status=201)

# ========================================      
# Endpoint that returns a unique list of column values of the table and column
class GetColumnContent(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        tablename = self.request.query_params.get('tablename')
        column = self.request.query_params.get('column')
        if not tablename or not column:
            raise ValueError("Query parameters 'tablename' and 'column' are required.")

        return Get_ColumnValues(tablename, column)
    
    def get(self, request, *args, **kwargs):
        return Response(self.get_queryset(), status=201)

# ========================================      
# Endpoint that post a part to a specific table of the database
class PostPartToTable(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = GenericComponentSerializer

    def post(self, request, *args, **kwargs):

        data = json.loads(request.body)
        tablename = request.GET.get('tablename')

        print("Received data:", data)
        print("Table name:", tablename)

        return Response( "Request received successfully.", status=201)