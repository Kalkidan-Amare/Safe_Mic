from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import CounselorProfile
from .serializers import CounselorProfileSerializer
from .permissions import IsOwner
from .models import Appointment
from .serializers import AppointmentSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication


from rest_framework_simplejwt.authentication import JWTAuthentication

class CounselorProfileView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsOwner]

    def get(self, request):
        user = self.request.user  # This will give you the user from the JWT token
        # Retrieve counselor profile of logged-in user
        counselor_profile = CounselorProfile.objects.get(user=user)
        serializer = CounselorProfileSerializer(counselor_profile)
        return Response(serializer.data)

    def post(self, request):
        user = self.request.user  # This will give you the user from the JWT token
        # Check if user already has a counselor profile
        if CounselorProfile.objects.filter(user=user).exists():
            return Response({"error": "Counselor profile already exists for this user"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = CounselorProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        user = self.request.user  # This will give you the user from the JWT token
        # Delete counselor profile of logged-in user
        counselor_profile = CounselorProfile.objects.get(user=user)
        counselor_profile.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# In your view
class AppointmentCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Get the user from the token
        user = request.user
        request.data['user'] = user.id  # Make sure to include the user ID in the request data

        serializer = AppointmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AppointmentDeleteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, appointment_id, format=None):
        try:
            appointment = Appointment.objects.get(id=appointment_id, user=request.user)
        except Appointment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        appointment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class AppointmentListAPIView(generics.ListAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]  # Ensure JWT authentication is used

    def get_queryset(self):
        user = self.request.user
        counselor_profile = CounselorProfile.objects.get(user=user)  # Get counselor profile associated with the user
        return Appointment.objects.filter(counselor=counselor_profile)
    
    
class CounselorProfileListAPIView(generics.ListAPIView):
    serializer_class = CounselorProfileSerializer

    def get_queryset(self):
        # Filter counselors to include only those who are verified
        return CounselorProfile.objects.filter(verified=True)