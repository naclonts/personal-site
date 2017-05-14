from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.splash_page, name='splash'),
    # url(r'^post/(?P<slug>[\w\-]+)$', views.PostView.as_view(), name='post'),
]
