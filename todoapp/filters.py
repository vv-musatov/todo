from dataclasses import fields

from django_filters import rest_framework as filters

from .models import ToDo


class ToDoFilter(filters.FilterSet):
    project = filters.CharFilter(lookup_expr="contains")

    class Meta:
        model = ToDo
        fields = ["project"]
