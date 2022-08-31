from rest_framework import mixins, viewsets
from rest_framework.viewsets import ModelViewSet

from .models import ToDoUser
from .serializers import ToDoUserModelSerializer

# Create your views here.


class ToDoUserCustomViewSet(
    mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet
):
    queryset = ToDoUser.objects.all()
    serializer_class = ToDoUserModelSerializer
