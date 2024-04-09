# views.py
from rest_framework import generics
from .models import Room, ChatMessage
from .serializers import RoomSerializer, ChatMessageSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import LimitOffsetPagination


class RoomListCreateAPIView(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class ChatMessageListCreateAPIView(generics.ListCreateAPIView):
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer

class MessageList(APIView):
    pagination_class = LimitOffsetPagination 

    def get(self, request, room_name):
        try:
            room = Room.objects.get(name=room_name)
        except Room.DoesNotExist:
            return Response({"error": f"Room with name '{room_name}' does not exist."}, status=status.HTTP_404_NOT_FOUND)

        # Apply pagination only if limit or offset is provided
        if 'limit' in request.GET or 'offset' in request.GET:
            paginator = LimitOffsetPagination()
            room_messages = paginator.paginate_queryset(ChatMessage.objects.filter(room=room), request)
            serializer = ChatMessageSerializer(room_messages, many=True)
            return paginator.get_paginated_response(serializer.data)
        else:
            # Return all messages if no pagination parameters are provided
            room_messages = ChatMessage.objects.filter(room=room)
            serializer = ChatMessageSerializer(room_messages, many=True)
            return Response(serializer.data)