from django.urls import path
from . import views

urlpatterns = [
    path("", views.GetTableContentView.as_view()),

]