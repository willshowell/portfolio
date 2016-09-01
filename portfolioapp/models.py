from django.db import models


class Project(models.Model):
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
        blank=True,
        null=True
        )

    def __str__(self):
        return self.title


class Experience(models.Model):
    location = models.CharField(max_length=100)
    start_date = models.DateField(
        blank=True,
        null=True
        )
    end_date = models.DateField(
        blank=True,
        null=True
        )

    def __str__(self):
        return self.location
