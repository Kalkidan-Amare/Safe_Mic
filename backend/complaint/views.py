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

class ComplaintView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def get(self, request):
        # The authenticated user is available via request.user
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
    print(tag)
    print("Number of complaints retrieved:", len(complaints))
    # Combine complaint bodies into a single text
    combined_text = " ".join(complaint.body for complaint in complaints)
    # Summarize the combined text
    print("Combined text:", combined_text)
    initial_summary = summarize(combined_text)
    
    # Refine initial summary using OpenAI's GPT
    refined_summary = refine_summary(initial_summary) 
    print("Accepted Renderer:", request.accepted_renderer)
    return Response({"tag": tag, "summary": refined_summary})
