from rest_framework import serializers
from .models import CounselorProfile
from .models import Appointment



class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['id', 'counselor', 'appointment_datetime']

class CounselorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CounselorProfile
        fields = ['id', 'bio','languages','specialities', 'years_of_experience']