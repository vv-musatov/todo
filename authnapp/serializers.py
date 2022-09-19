from rest_framework.serializers import ModelSerializer

from .models import ToDoUser


class ToDoUserModelSerializer(ModelSerializer):
    class Meta:
        model = ToDoUser
        fields = ["id", "username", "first_name", "last_name", "email"]

class ToDoUserModelSerializerBase(ModelSerializer):
    class Meta:
        model = ToDoUser
        fields = ["id", "username", "first_name", "last_name", "email", "is_superuser", "is_staff"]