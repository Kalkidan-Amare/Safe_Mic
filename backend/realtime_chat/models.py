from django.db import models

class Room(models.Model):
    name = models.CharField(max_length=100, unique=True)
    user_count = models.PositiveIntegerField(default=0)  # Field to store the count of users in the room

    def __str__(self):
        return f'{self.name} - {self.user_count}'

class ChatMessage(models.Model):
    user = models.CharField(max_length=150)
    room = models.ForeignKey(Room, on_delete=models.CASCADE) 
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user} - {self.room.name} - {self.timestamp}'
