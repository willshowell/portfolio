from django.shortcuts import get_object_or_404, render
from django.utils import timezone
from .models import Project, Experience, About, BlogPost, Image

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
    # Get all the blog posts that have been published
    posts = BlogPost.objects.filter(
                pub_date__lte=timezone.now() 
                ).order_by('-pub_date') 
    return render(request, 'portfolio/blog.html', {'posts': posts})

def blog_post(request, post_slug):
    post = get_object_or_404(BlogPost, slug=post_slug)    
    context = {}

    # Add to the view_count if the user isn't logged in (aka me)
    # If they are logged in (me), show the view count in the post
    if not request.user.is_authenticated():
        post.view_count += 1
        post.save()
    else:
        context['view_count'] = post.view_count

    context['post'] = post

    print(post.view_count)
    try:
        context['next_post'] = post.get_next_by_pub_date()
    except:
        pass
    try:
        context['prev_post'] = post.get_previous_by_pub_date()
    except:
        pass

    return render(request, 'portfolio/blog_post.html', context)

def project_detail(request, project_id):
    # Get this project data
    project = get_object_or_404(Project, pk=project_id)
    next_p = 0
    prev_p = 0
    images = Image.objects.filter(project=project)

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
    context = {'project': project, 'images': images}
    if next_p:
        context['next'] = next_p
    if prev_p:
        context['prev'] = prev_p

    return render(request, 'portfolio/project.html', context)
