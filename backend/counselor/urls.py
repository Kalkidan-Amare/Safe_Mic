from django.urls import path
from .views import *
urlpatterns = [
    path('counselor-profile/', CounselorProfileView.as_view(), name='counselor-profile'),
    path('appointments/', AppointmentCreateAPIView.as_view(), name='appointment-create'),
    path('all-appointments/', AppointmentListAPIView.as_view(), name='appointment-list'),
    path('appointments/<int:appointment_id>/', AppointmentDeleteAPIView.as_view(), name='appointment-delete'),
    path('counselors/', CounselorProfileListAPIView.as_view(), name='counselor-list'),
]
