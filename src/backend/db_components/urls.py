from django.urls import path
from . import views

urlpatterns = [
    path("/table", views.GetTableContentView.as_view()),
    path("/tablelist", views.GetTableListView.as_view()),
    path("/columnlist", views.GetColumnListView.as_view()),

]