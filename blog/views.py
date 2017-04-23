from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404
from django.views import generic

from .models import Post

def index(request):
    return render(request, 'blog/index.html')

def post_list(request):
    posts = Post.objects.all()
    print(posts)
    context = { 'posts': posts }
    return render(request, 'blog/post_list.html', context=context)

def post_detail(request, post_url):
    print('-------------------------------'+post_url)
    post = get_object_or_404(Post, url_title=post_url)
    return render(request, 'blog/post.html')


class PostView(generic.DetailView):
    model = Post
#    return render(request, 'blog/post.html', context=context)
