from django.http import HttpResponse

def index(request):
    return HttpResponse("You're at Will Howell's portfolio index.")
