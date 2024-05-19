# permissions.py
from rest_framework.permissions import BasePermission

class IsOwnerOrReadOnly(BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD, or OPTIONS requests.
        if request.method in ['GET', 'HEAD', 'OPTIONS', 'PUT']:
            return True

        # Write permissions are only allowed to the owner of the complaint.
        return obj.user == request.user
