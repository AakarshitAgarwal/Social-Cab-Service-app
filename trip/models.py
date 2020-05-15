from django.db import models
from status.models import NGO
from django.conf import settings

class Trip(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    NGO_id = models.ForeignKey(NGO, default=1, on_delete=models.CASCADE)
    #trip_id = models.AutoField(primary_key=True, default=1)
    driverName = models.CharField(max_length=50)
    startingLocation = models.TextField()
    destination = models.TextField()
    
    def __int__(self):
        return self.NGO_id