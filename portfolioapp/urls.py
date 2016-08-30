from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.home, name='home'),
    url(r'^experience/$', views.experience, name='experience'),
    url(r'^about/$', views.about, name='about'),
]
