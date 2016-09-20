from django.contrib import admin
from ordered_model.admin import OrderedModelAdmin
from .models import Project, Experience, About, BlogPost

class ProjectAdmin(OrderedModelAdmin):
	list_display = ('title', 'move_up_down_links')


class BlogPostAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('title',)}

admin.site.register(Project, ProjectAdmin)
admin.site.register(Experience)
admin.site.register(About)
admin.site.register(BlogPost, BlogPostAdmin)
