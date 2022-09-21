from dataclasses import fields

import graphene
from graphene_django import DjangoObjectType

from authnapp.models import ToDoUser
from todoapp.models import Project, ToDo


class ToDoUserType(DjangoObjectType):
    class Meta:
        model = ToDoUser
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class Query(graphene.ObjectType):
    all_users = graphene.List(ToDoUserType)
    all_projects = graphene.List(ProjectType)
    all_todos = graphene.List(ToDoUserType)

    def resolve_all_users(root, info):
        return ToDoUser.objects.all()
    
    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_todos(root, info):
        return ToDo.objects.all()


schema = graphene.Schema(query=Query)
