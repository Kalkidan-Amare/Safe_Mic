from django.db import models
from accounts.models import userAccount

class CounselorProfile(models.Model):
    user = models.OneToOneField(userAccount, on_delete=models.CASCADE)
    gender=models.CharField(max_length=6 ,blank=False)
    bio = models.TextField(blank=False)
    languages=models.TextField(blank=False)
    specialities=models.TextField(blank=False)
    years_of_experience = models.IntegerField(default=0)
    verified=models.BooleanField(default=False)

    def __str__(self):
        return f"Profile of {self.verified}"
    
class Appointment(models.Model):
    user = models.ForeignKey(userAccount, on_delete=models.CASCADE)
    counselor = models.ForeignKey(CounselorProfile, on_delete=models.CASCADE)
    appointment_datetime = models.DateTimeField()
    def __str__(self):
        return f"Appointment at {self.appointment_datetime}"