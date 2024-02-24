from django.shortcuts import render
from django.views.generic.base import TemplateView
from django.http import HttpResponse
from django.template import loader
from django.views import View
# Create your views here.

def audio(request):
    return render(request,'audio.html')
