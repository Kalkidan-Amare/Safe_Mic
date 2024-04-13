from django.contrib import admin
from .models import Complaint

class ComplaintAdmin(admin.ModelAdmin):
    list_display = ('user_name', 'tag', 'body')
    list_filter = ('tag',)
    search_fields = ('body', 'user__name','tag')
    ordering = ('-id',)

    def user_name(self,obj):
        return obj.user.name
    

admin.site.register(Complaint, ComplaintAdmin)