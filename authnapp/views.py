from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from .models import ToDoUser
from .serializers import ToDoUserModelSerializer

# Create your views here.


class ToDoUserModelViewSet(ModelViewSet):
    queryset = ToDoUser.objects.all()
    serializer_class = ToDoUserModelSerializer
