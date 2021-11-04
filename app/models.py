from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator,MinValueValidator

# Create your models here.
class Category(models.Model):
    category=models.CharField(max_length=50)
    def __str__(self):
        return str(self.category)

class Subcategory(models.Model):
    category=models.ForeignKey(Category,on_delete=models.CASCADE)
    subcategory=models.CharField(max_length=50)

    def __str__(self):
        return str(self.subcategory)

class Question(models.Model):
    category=models.ForeignKey(Category,on_delete=models.CASCADE)
    subcategory=models.ForeignKey(Subcategory,on_delete=models.CASCADE)
    question_link=models.URLField( max_length=200)
    answer_link=models.URLField( max_length=200)

    def __str__(self):
        return str(self.id)

