from django.urls import re_path

from . import views

urlpatterns = [
    re_path(r'^$', views.splash_page, name='splash'),
    # url(r'^post/(?P<slug>[\w\-]+)$', views.PostView.as_view(), name='post'),
]
