from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
from rest_framework import serializers
from django.contrib.auth import get_user_model

User=get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    model=User
    fields=('id','is_student', 'email', 'name', 'password')

class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields='__all__'