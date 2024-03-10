from django.urls import re_path

from . import views

urlpatterns = [
    re_path(r'^$', views.index, name='index'),
    re_path(r'^bio', views.bio, name='bio'),
    re_path(r'^send_email', views.send_email, name='send_email'),
]
