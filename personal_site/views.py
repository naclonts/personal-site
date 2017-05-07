from django.http import HttpResponse
from django.shortcuts import render

def contact_info(request):
    return render(request, 'contact.html')
