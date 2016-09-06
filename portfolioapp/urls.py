from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.home, name='home'),
    url(r'^experience/$', views.experience, name='experience'),
    url(r'^about/$', views.about, name='about'),
    url(r'^blog/$', views.blog, name='blog'),
    url(r'^projects/(?P<project_id>[0-9]+)/$', views.project_detail, name='project_detail'),
]
