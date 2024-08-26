from django.urls import path

from backend.users.views import EditProfileView, LogOutView, LoginView, RegisterView, UserView



urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('user', UserView.as_view()),
    path('edit', EditProfileView.as_view()),
    path('logout', LogOutView.as_view()),
]