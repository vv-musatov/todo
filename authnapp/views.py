from rest_framework import mixins, viewsets
from rest_framework.viewsets import ModelViewSet

from .models import ToDoUser
from .serializers import ToDoUserModelSerializer, ToDoUserModelSerializerBase

# Create your views here.


class ToDoUserCustomViewSet(
    mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet
):
    queryset = ToDoUser.objects.all()
    serializer_class = ToDoUserModelSerializer

    def get_serializer_class(self):
        if self.request.version == "2.0":
            return ToDoUserModelSerializerBase
        return ToDoUserModelSerializer
