from django.urls import path,re_path
from . import views


'''path('networkparsing/',views.networkparsing, name='networkparsing'),
    path('convert/', views.convert, name='convert'),
    path('list/', views.FileListView.as_view(), name='list'),
    path('approval/', views.approval, name='approval'),
        path('approval2', views.approval2, name='approval2'),'''
urlpatterns = [
    
        path('', views.UserList.as_view()),
    path('current/', views.current_user),
    path("auth/profile/<int:user_pk>/", views.ProfileAPI.as_view()),
    path("auth/profile/<int:user_pk>/update/", views.ProfileUpdateAPI.as_view()),
    path("auth/profile/<int:id>/delete/", views.ProfileDelteAPI.as_view()),

        path('userlist/', views.userView.as_view()),
    
]
