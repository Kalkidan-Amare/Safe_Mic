from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from .serializers import UserCreateSerializer, UserAccountSerializer
from .models import userAccount

class CurrentUserView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserCreateSerializer(request.user)
        return Response(serializer.data)

class UserListView(generics.ListAPIView):
    queryset=userAccount.objects.all()
    serializer_class=UserAccountSerializer

class UserDetailView(generics.RetrieveAPIView):
    queryset=userAccount.objects.all()
    serializer_class=UserAccountSerializer