from django.urls import path
from . import views

urlpatterns = [
    path("login/", views.demo_login, name="demo-login"),
    path("logout/", views.demo_logout, name="demo-logout"),
]
