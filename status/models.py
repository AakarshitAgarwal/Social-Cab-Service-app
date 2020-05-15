from django.conf import settings
from django.db import models

class NGOQuerySet(models.QuerySet):
    pass

class NGOManager(models.Manager):
    def get_queryset(self):
        return NGOQuerySet(self.model,using=self._db)


# Create your models here.
class NGO(models.Model):
    
    NGO_TYPES = (
		("None", "Choose an option"),
		("Profit", "Profit"),
		("Non Profit", "Non Profit"),
		("Charitable Oriented", "Charitable Oriented"),
		("Empowerment Oriented", "Empowerment Oriented")
    )
    
    NGO_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    location = models.TextField()
    type = models.CharField( choices=NGO_TYPES, default= "None", max_length=20)
    description = models.TextField()

    objects = NGOManager()

    def __str__(self):
        return '{}{}'.format(self.NGO_id, self.Name)