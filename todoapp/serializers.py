from rest_framework import serializers

from authnapp.serializers import ToDoUserModelSerializer

from .models import Project, ToDo


class ProjectModelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"


class ToDoModelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ToDo
        fields = "__all__"
