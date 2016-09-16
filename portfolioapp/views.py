from django.shortcuts import get_object_or_404, render
from .models import Project, Experience, About

def home(request):
    projects = Project.objects.all()
    return render(request, 'portfolio/home.html', {'projects': projects}) 

def experience(request):
    experiences = Experience.objects.all().order_by('-start_date')
    return render(request, 'portfolio/experience.html', {'experiences': experiences})

def about(request):
    about = About.objects.get()
    return render(request, 'portfolio/about.html', {'about': about })

def blog(request):
    return render(request, 'portfolio/blog.html')

def project_detail(request, project_id):
    # Get this project data
    project = get_object_or_404(Project, pk=project_id)
    next_p = 0
    prev_p = 0

    # Try to retrieve data about the previous and next projects
    try:
        next_p = Project.objects.get(order = project.order + 1)
    except Project.DoesNotExist:
        pass
    try:
        prev_p = Project.objects.get(order = project.order - 1)
    except Project.DoesNotExist:
        pass

    # Generate the context
    context = {'project': project}
    if next_p:
        context['next'] = next_p
    if prev_p:
        context['prev'] = prev_p

    return render(request, 'portfolio/project.html', context)
