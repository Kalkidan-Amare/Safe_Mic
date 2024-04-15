from rest_framework import serializers
from .models import Complaint
from rest_framework import generics

class ComplaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaint
        fields = ['id', 'tag', 'body']

class ComplaintListAPI(generics.ListAPIView):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer