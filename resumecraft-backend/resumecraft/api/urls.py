from django.urls import path
from . import views


from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('image/', views.testEndPoint, name='test'),
    path('', views.getRoutes),
    path('resume/', views.UserResumeView.as_view(), name='user_resume'),
]