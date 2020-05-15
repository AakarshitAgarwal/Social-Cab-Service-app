from django.conf import settings
from django.db import models

class NGOQuerySet(models.QuerySet):
    pass

class NGOManager(models.Manager):
    def get_queryset(self):
        return NGOQuerySet(self.model,using=self._db)


# Create your models here.
class NGO(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    NGO_id = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=50)
    Location = models.TextField()
    Type = models.CharField(max_length=50)
    Description = models.TextField()

    objects = NGOManager()

    def __str__(self):
        return '{}{}'.format(self.NGO_id, self.Name)