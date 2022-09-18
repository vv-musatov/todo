from django.test import TestCase
from mixer.backend.django import mixer
from rest_framework import status
from rest_framework.test import (APIClient, APIRequestFactory, APITestCase,
                                 force_authenticate)

from authnapp.models import ToDoUser

from .models import Project
from .views import ProjectModelViewSet

# Create your tests here.

class TestProjectViewSet(TestCase):
    def setUp(self) -> None:
        self.url = '/api/projects/'
        self.admin = ToDoUser.objects.create_superuser('admin', 'admin@mail.ru', 'admin!123')
    
    def test_get_project_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        force_authenticate(request, self.admin)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_get_project_detail(self):
        project = mixer.blend(Project)
        client = APIClient()
        client.login(username='admin', password='admin!123')
        response = client.get(f'{self.url}{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        client.logout


class TestProjectAPITestCase(APITestCase):

    def setUp(self) -> None:
        self.url = '/api/projects/'
        self.admin = ToDoUser.objects.create_superuser('admin', 'admin@mail.ru', 'admin!123')

    def test_get_project_list(self):
        self.client.login(username='admin', password='admin!123')
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
