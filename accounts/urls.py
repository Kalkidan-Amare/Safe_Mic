from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('api/', include('accounts.urls')),
    path('counselor/', include('counselor.urls')),
    path('complaint/', include('complaint.urls')),
]
urlpatterns+=[re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]