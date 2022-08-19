# from dataclasses import fields
# from importlib.metadata import MetadataPathFinder
from rest_framework.serializers import ModelSerializer

from .models import ToDoUser


class ToDoUserModelSerializer(ModelSerializer):
    class Meta:
        model = ToDoUser
        fields = ["username", "first_name", "last_name", "email"]
