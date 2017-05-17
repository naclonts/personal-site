from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404
from django.views import generic

from .models import Post

def index(request):
    return render(request, 'blog/index.html')

def post_list(request):
    posts = Post.objects.all()
    context = { 'posts': posts }
    return render(request, 'blog/post_list.html', context=context)

class PostView(generic.DetailView):
    model = Post
