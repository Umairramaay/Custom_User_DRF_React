from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    is_customer=models.BooleanField(default=False)
    is_employee=models.BooleanField(default=False)
    first_name=models.CharField(max_length=100)
    last_name=models.CharField(max_length=100)

class Customer(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE,primary_key=True)
    phone_number=models.CharField(max_length=15, null = True, blank =True)
    location = models.CharField(max_length=20, null = True, blank =True)

class Employee(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE,primary_key=True)
    phone_number=models.CharField(max_length=15,null = True, blank =True)
    designation = models.CharField(max_length=20,null = True, blank =True)


