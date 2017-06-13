from django.http import HttpResponse
from django.shortcuts import render

def index(request):
    return render(request, 'homepage/index.html')

def bio(request):
    return render(request, 'homepage/bio.html')
