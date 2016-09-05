from django.db import models
from ordered_model.models import OrderedModel
from django.core.exceptions import ValidationError

def validate_only_one_instance(obj):
    model = obj.__class__
    if (model.objects.count() > 0 and
            obj.id != model.objects.get().id):
        raise ValidationError("Can only create 1 {} instance".format(model.__name__))


class Project(OrderedModel):
    title = models.CharField(
        max_length=100
        )
    tagline = models.CharField(
        max_length=200,
        blank=True,
        null=True
        )
    description = models.TextField(
        blank=True,
        null=True
        )
    source_url = models.URLField(
        max_length=100,
        blank=True,
        null=True
        )
    project_url = models.URLField(
        max_length=100,
        blank=True,
        null=True
        )
    background_image = models.CharField(
        max_length=200,
        blank=True,
        null=True
        )
    background_color = models.CharField(
        max_length=100,
        null=True
        )

    def __str__(self):
        return self.title


class Experience(models.Model):
    location = models.CharField(max_length=100)
    start_date = models.DateField(
        null=True
        )
    end_date = models.DateField(
        blank=True,
        null=True
        )

    def __str__(self):
        return self.location


class About(models.Model):
    description = models.TextField(
        blank=True,
        null=True
        )
    image_size = models.IntegerField(
        blank=True,
        null=True
        )
    image = models.CharField(
        max_length=200,
        blank=True,
        null=True
        )
    
    def clean(self):
        validate_only_one_instance(self)
        
    def __str__(self):
        return "About"
        
    class Meta:
        verbose_name = "about description"
        verbose_name_plural = "about"
