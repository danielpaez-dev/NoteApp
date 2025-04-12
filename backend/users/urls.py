from django.urls import path
from . import views

urlpatterns = [
    path("login/", views.login, name="login"),
    path("callback/", views.callback, name="callback"),
    path("logout/", views.logout, name="logout"),
    path("api/profile/", views.UserProfileView.as_view(), name="api-profile"),
]
