from django.db import models
from accounts.models import userAccount


# Create your models here.

class CounselorProfile(models.Model):
    user = models.OneToOneField(userAccount, on_delete=models.CASCADE)
    bio = models.TextField()
    phone_number = models.CharField(max_length=20)
    address = models.CharField(max_length=255)
    years_of_experience = models.IntegerField(default=0)
    verified=models.BooleanField(default=False)

    def __str__(self):
        return f"Profile of {self.user.username} (Counselor)"
    
class Appointment(models.Model):
    user = models.OneToOneField(userAccount, on_delete=models.CASCADE)
    counselor=models.OneToOneField(CounselorProfile, on_delete=models.CASCADE)
    appointment_datetime = models.DateTimeField()
    def __str__(self):
        return f"Appointment at {self.appointment_datetime}"