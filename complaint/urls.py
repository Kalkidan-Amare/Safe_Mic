from django.urls import path
from .views import *

urlpatterns = [
    path('complaints/', ComplaintView.as_view(), name='complaints-list-create'),
]
