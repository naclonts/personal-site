from django.shortcuts import render
from django.http import HttpResponse

from . import models

def index(request):
    return render(request, 'blog/index.html')

def post_list(request):
    posts = models.Post.objects.all()
    print(posts)
    context = { 'posts': posts }
    return render(request, 'blog/post_list.html', context=context)
