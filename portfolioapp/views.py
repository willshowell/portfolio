from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to Will Howell's portfolio.")

def experience(request):
    return HttpResponse("Here's a list of all my experience.")
