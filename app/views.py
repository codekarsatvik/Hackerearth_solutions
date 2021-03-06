from django.contrib.auth import login
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User
from django.db.models.query_utils import Q
from django.http.response import JsonResponse
from django.shortcuts import redirect, render
from django.views import View
from .forms import  CustomerRegistrationForm,MeetingForm
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.contrib.auth.models import User
from .models import Meet
# Create your views here.

def home(request):
    return render(request,'home.html')

class CustomerRegistrationView(View):
    def get(self,request):
        form=CustomerRegistrationForm()
        return render(request,'customerregistration.html',{'form':form})
    def post(self,request):
        form=CustomerRegistrationForm(request.POST)
        if form.is_valid():
            messages.success(request,'Congratulations!! You are registered successfully')
            # form.save()
            user = form.save( commit= False)
            user.save()
        return render(request,'customerregistration.html',{'form':form})

class AddMeetingView(View):
    def get(self,request):
        form=MeetingForm()
        return render(request,'addmeet.html',{'form':form})
    def post(self,request):

        form=MeetingForm(request.POST)
        if form.is_valid():
            starting_time = request.POST.get('starting_time')
            ending_time = request.POST.get('ending_time')
            meeting_link = request.POST.get('meeting_link')
            description = request.POST.get('description')
            messages.success(request,'Congratulations!! Meeting add successfully')
            # form.save()
            # user = form.save( commit= False)
            meet = Meet(starting_time=starting_time, ending_time = ending_time,meeting_link=meeting_link, description = description)
            meet.save()
        return render(request,'addmeet.html',{'form':form})


def listmeet(request):

    data = Meet.objects.all()
   
    stu = {
    "s": data
    }
   
    return render(request,"listmeet.html",stu)