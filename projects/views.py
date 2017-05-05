from django.shortcuts import render

def splash_page(request):
    return render(request, 'projects/splash.html')
