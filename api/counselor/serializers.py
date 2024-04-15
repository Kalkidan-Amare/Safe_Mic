from rest_framework import serializers
from .models import CounselorProfile
from .models import Appointment



class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['id', 'user', 'counselor', 'appointment_datetime']  # Include the 'user' field here

    def create(self, validated_data):
        # Create the Appointment instance
        appointment = Appointment.objects.create(**validated_data)
        return appointment


class CounselorProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.name', read_only=True)
    otherId = serializers.CharField(source='user.id', read_only=True)
    class Meta:
        model = CounselorProfile
        fields = ['id','otherId', 'username', 'bio','languages','specialities', 'years_of_experience', 'verified']