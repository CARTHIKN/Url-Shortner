from django.urls import path
from .views import  redirect_url
from . import views

urlpatterns = [
    path('api/shorten/', views.ShortenUrlApi.as_view(), name='shorten_url_api'),
    path('<str:short_url>/', redirect_url, name='redirect_url'),
]