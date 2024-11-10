from django.urls import path
from . import views

urlpatterns = [
    path("tables", views.GetTableContentView.as_view()), # this endpoints returns the content of the table including search page by page
    path("tables/list", views.GetTableListView.as_view()),  # This Endpoint gets a list of all table names
    path("tables/columns", views.GetColumnListView.as_view()), # This get endpoints gets a list of all columnnames of the table
    path("tables/column", views.GetColumnContent.as_view()), # This get enpoint gets a list of unique entries in the column of the table
    path("tables/parts", views.PostPartToTable.as_view()), # This post endpoint adds new entries to the table
]