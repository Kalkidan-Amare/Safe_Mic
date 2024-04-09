from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.contrib import admin

urlpatterns = [
    path('ws/',include('realtime_chat.urls')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('counselor/', include('counselor.urls')),
    path('complaint/', include('complaint.urls')),
    path('chatbot/', include('chatbot.urls')),
]

urlpatterns+=[re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]