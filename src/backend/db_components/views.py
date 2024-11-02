from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

from .serializers import GenericComponentSerializer
from .db_utils import fetch_TableData

# Endpoint that returns complete table of the database
class GetTableContentView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = GenericComponentSerializer

    # Checks if the table exists and fetches its data safely.
    def get_queryset(self):
        return fetch_TableData(self.request.query_params.get('table'))

    # get request
    def get(self, request, *args, **kwargs):

        # Get the data from the specified table
        data = self.get_queryset()

        # parse into generic smodel
        serializer = self.get_serializer(data=data, many=True)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=201)
        
        return Response(serializer.data)
    
        return Response(data)
    
