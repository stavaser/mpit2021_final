from django.db import models
from django.conf import settings

# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        db_constraint=False,
    )
    name = models.TextField()
    last_name = models.TextField(null=True, blank=True)
    points = models.IntegerField(default=0)
