from django.contrib import admin

from .models import CounselorProfile

class CounselorProfileAdmin(admin.ModelAdmin):
    list_display = ("user_name","verified")

    def user_name(self,obj):
        return obj.user.name


admin.site.register(CounselorProfile, CounselorProfileAdmin)