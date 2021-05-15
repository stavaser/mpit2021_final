from django.db import models
from django.conf import settings

class Organization(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        db_constraint=False,
    )
    email = models.TextField()
    title = models.TextField()
    address = models.TextField()