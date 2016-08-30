from django.shortcuts import render
from .models import Project, Experience

def home(request):
    projects = Project.objects.all()
    return render(request, 'portfolio/home.html', {'projects': projects}) 

def experience(request):
    experiences = Experience.objects.all()
    return render(request, 'portfolio/experience.html', {'experiences': experiences})

def about(request):
    return render(request, 'portfolio/about.html')
