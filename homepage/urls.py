from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^bio', views.bio, name='bio'),
    url(r'^send_email', views.send_email, name='send_email'),
]
