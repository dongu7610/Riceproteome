from django.urls import path, re_path
from . import views
urlpatterns = [
    
   # path('upload/',views.model_form_upload, name='up'),
    
    path('projectlist/', views.Projectapiview.as_view(), name= 'project'),
    path('Ainfolist/', views.Ainfoapiview.as_view(), name= 'project'),
    path('uplist/', views.UploadFileapiview.as_view(), name= 'up1'),
    path('getcompareinfo/',views.Protein_calculapiview.as_view(),name='comp'),
    path('sn/',views.SearchNetworkapiview.as_view(),name='SN'),
    path('snSn2/',views.SearchNetworkapiview2.as_view(),name='SN2'),
    path('adduser/', views.Adduserapiview.as_view(), name= 'project'),
    path('private2publish/', views.Private2publish.as_view(), name= 'project'),
    path('FinNet/', views.Network2Fin.as_view(), name= 'project'),
    path('rmexp/', views.RmexpAPI.as_view(), name= 'project'),
    

    
    
    re_path(r'^(?P<task_id>[\w-]+)/$', views.get_progress, name='task_status')

    
]
