from django.contrib import admin
from ordered_model.admin import OrderedModelAdmin
from .models import Project, Experience, About

class ProjectAdmin(OrderedModelAdmin):
	list_display = ('title', 'move_up_down_links')


admin.site.register(Project, ProjectAdmin)
admin.site.register(Experience)
admin.site.register(About)
