from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _

from .models import userAccount

class UserAccountAdmin(UserAdmin):
    model = userAccount
    list_display = ('name', 'is_student', 'is_active', 'is_staff', 'verified') 
    list_filter = ('is_student', 'is_active', 'is_staff', 'verified') 
    search_fields = ('name',)
    ordering = ('name',)

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal Info'), {'fields': ('name',)}),
        (_('Permissions'), {
            'fields': ('is_active', 'is_staff', 'is_student', 'verified', 'groups', 'user_permissions'),
        }),
        (_('Important dates'), {'fields': ('last_login',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'name', 'is_student', 'is_active', 'is_staff', 'verified'),
        }),
    )

admin.site.register(userAccount, UserAccountAdmin)
