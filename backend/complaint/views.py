# views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Complaint
from .serializers import ComplaintSerializer
from .permissions import IsOwnerOrReadOnly
from rest_framework_simplejwt.authentication import JWTAuthentication
from .summarize import summarize
from rest_framework.decorators import api_view
from .openaisummarize import refine_summary
from rest_framework.permissions import IsAdminUser

class ComplaintView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def get(self, request):
        if not request.user.is_staff:
            return Response({"message": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)
        
        complaints = Complaint.objects.filter(user=request.user)
        serializer = ComplaintSerializer(complaints, many=True)
        return Response(serializer.data)

    def post(self, request):
        # The authenticated user is available via request.user
        serializer = ComplaintSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        # The authenticated user is available via request.user
        complaint = Complaint.objects.get(pk=pk)
        self.check_object_permissions(request, complaint)
        complaint.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def get_summary(request, tag):
    tag = tag.lower()
    # Retrieve complaints with the specified tag
    complaints = Complaint.objects.filter(tag=tag)
    if not complaints:
        return Response({"tag": tag, "summary": "no complaints available for this tag"})

    combined_text = " ".join(complaint.body for complaint in complaints)
    initial_summary = summarize(combined_text)
    refined_summary = refine_summary(initial_summary) 
    return Response({"tag": tag, "summary": refined_summary})

class ComplaintList(APIView):
    # Ensure only staff users can access this view
    permission_classes = [IsAdminUser]

    def get(self, request, format=None):
        # Check if the user is a staff member
        if request.user.is_staff:
            complaints = Complaint.objects.all()
            serializer = ComplaintSerializer(complaints, many=True)
            return Response(serializer.data)
        else:
            # Return an empty response for non-staff users
            return Response([])

