from django.shortcuts import get_object_or_404, render
from .models import Project, Experience

def home(request):
    projects = Project.objects.all()
    return render(request, 'portfolio/home.html', {'projects': projects}) 

def experience(request):
    experiences = Experience.objects.all()
    return render(request, 'portfolio/experience.html', {'experiences': experiences})

def about(request):
    return render(request, 'portfolio/about.html')

def project_detail(request, project_id):
    project = get_object_or_404(Project, pk=project_id)
    return render(request, 'portfolio/project.html', {'project': project})
