from django.shortcuts import render

def home(request):
    return render(request, 'portfolio/home.html')

def experience(request):
    return render(request, 'portfolio/experience.html')
