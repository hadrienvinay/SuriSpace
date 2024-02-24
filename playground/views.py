from django.shortcuts import render
from django.views.generic.base import TemplateView
from django.http import HttpResponse
from django.template import loader
from django.views import View
# Create your views here.

def index(request):
    return render(request,'body.html')

def base(request):
    template = loader.get_template('body.html')
    return HttpResponse(template.render())



