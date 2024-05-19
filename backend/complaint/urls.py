from django.urls import path

from .serializers import ComplaintListAPI
from .views import *

urlpatterns = [
    path('complaints/', ComplaintView.as_view(), name='complaints-list-create'),
    path('complaints/<int:pk>/', ComplaintView.as_view(), name='complaints-list-update'),
    path('all-complaints/', ComplaintList.as_view(), name='complaint-list'),
    path('complaints/summary/<str:tag>/', get_summary, name="summary"),
]
