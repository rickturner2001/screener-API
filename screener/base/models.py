from django.db import models
from django.contrib.auth.models import User


class WatchList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.TextField()
    tickers = models.TextField(default="")
