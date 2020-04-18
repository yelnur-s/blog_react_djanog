from django.db import models
from django.contrib.auth.models import User
import time

def upload_article(instance, filename):
    lastDot = filename.rfind('.')
    extension= filename[lastDot:len(filename):1]
    return 'images/articles/%s-%s%s' % (instance.title, time.time(), extension)


class Category(models.Model):
    name = models.CharField(max_length=200, unique=True)
    def __str__(self):
        return self.name
       

class Tag(models.Model):
    name = models.CharField(max_length=200, unique=True)
    def __str__(self):
        return self.name
        
class Article(models.Model):
    title = models.CharField(max_length=200, unique=True)
    description = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag)
    author = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    image = models.ImageField(upload_to=upload_article, blank=True, null=True)
    def __str__(self):
        return "%s (%s)" % (
            self.title,
            ", ".join(tag.name for tag in self.tags.all()),
        )

    
# Create your models here.
