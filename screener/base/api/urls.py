from django.urls import path
from . import views
from .views import MyTokenObtainPairView, RegisterView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path("", views.get_routes),
    path("watchlists/", views.get_watchlists),
    path("add_watchlists/", views.add_watchlists),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('market-data/general', views.get_general_market_data),
    path('register/', RegisterView.as_view(), name='register'),
    path('tickers-info/', views.tickers_info),
]