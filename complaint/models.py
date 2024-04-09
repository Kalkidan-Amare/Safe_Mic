from django.db import models

from accounts.models import userAccount

class Complaint(models.Model):
    GRADE_ISSUE = 'grade_issue'
    HARASSMENT_TEACHER = 'harassment_teacher'
    HARASSMENT_STUDENT = 'harassment_student'
    BULLIED = 'bullied'
    LOUNGE = 'lounge'
    OTHER = 'other'

    TAG_CHOICES = [
        (GRADE_ISSUE, 'Grade Issue'),
        (HARASSMENT_TEACHER, 'Harassment - Teacher'),
        (HARASSMENT_STUDENT, 'Harassment - Student'),
        (BULLIED, 'Bullied'),
        (LOUNGE, 'Lounge'),
        (OTHER, 'Other'),
    ]
    user = models.ForeignKey(userAccount, on_delete=models.CASCADE)
    tag = models.CharField(max_length=50, choices=TAG_CHOICES, verbose_name='Tags', blank=False)
    body = models.TextField(verbose_name='Body', blank=False)

    class Meta:
        unique_together = ['tag', 'body']