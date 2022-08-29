from django.db import models

from authnapp.models import ToDoUser

# Create your models here.


class Project(models.Model):
    name = models.CharField(verbose_name="Название проекта", max_length=32)
    repository = models.URLField(verbose_name="Репозиторий", blank=True)
    users = models.ManyToManyField(ToDoUser)

    def __str__(self):
        return f"{self.name}"


class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField(verbose_name="Текст заметки", blank=True)
    created_at = models.DateTimeField(verbose_name="Дата создания", auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name="Дата обновления", auto_now=True)
    author = models.ForeignKey(ToDoUser, on_delete=models.CASCADE)
    is_active = models.BooleanField(verbose_name="Флаг активности", default=True)

    def __str__(self):
        return f"{self.author} | {self.text}"
