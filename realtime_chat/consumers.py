import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from .models import ChatMessage, Room

# Dictionary to store connected consumers for each room
active_consumers = {}

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room = await self.get_or_create_room(self.room_name)
        await self.channel_layer.group_add(
            self.room_name, 
            self.channel_name
        )
        active_consumers.setdefault(self.room_name, set()).add(self.channel_name)  # Add the current consumer to the set of active consumers
        await self.increment_user_count()
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_name, 
            self.channel_name
        )
        active_consumers.get(self.room_name, set()).discard(self.channel_name)  # Remove the current consumer from the set of active consumers
        await self.decrement_user_count()
        await self.close()

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        username = text_data_json["username"]
        
        await sync_to_async(ChatMessage.objects.create)(user=username, room=self.room, message=message)

        await self.channel_layer.group_send(
            self.room_name, {
                "type": "send_message",
                "message": message,
                "username": username,
            })

    async def send_message(self, event):
        message = event["message"]
        username = event["username"]
        await self.send(text_data=json.dumps({
            "message": message,
            "username": username
        }))

    @sync_to_async
    def get_or_create_room(self, room_name):
        room, _ = Room.objects.get_or_create(name=room_name)
        return room

    @sync_to_async
    def increment_user_count(self):
        self.room.user_count = len(active_consumers.get(self.room_name, set()))
        self.room.save()

    @sync_to_async
    def decrement_user_count(self):
        self.room.user_count = len(active_consumers.get(self.room_name, set()))
        self.room.save()