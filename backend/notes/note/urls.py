from django.urls import path
from . import views

urlpatterns = [
    path("", views.notes, name="note-list"),
    path("<int:pk>", views.note_detail, name="note-detail"),
]
