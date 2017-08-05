from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.post_list, name='post_list'),
    url(r'^post/(?P<slug>[\w\-]+)$', views.PostView.as_view(), name='post'),
]
