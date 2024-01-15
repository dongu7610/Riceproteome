"""celery_prote URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path,re_path
from django.contrib import admin

from rest_framework import routers
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import url, include
from post.views import FileinfoAPI,Imgview  
from schema_graph.views import Schema
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token
from .views import validate_jwt_token

router = routers.DefaultRouter()
#router.register('proteinGroups2groups', proteinGroups2groups_view)
#router.register('proteinGroups2groups2',proteinGroups2groups_view2)
#router.register('proteinGroups2groups3',proteinGroups2groups_view3)
#projectsamples_view,PPI_proteome_view,PPI_proteome_view2,PPI_proteome_view3
router.register('Imgview', Imgview)
router.register('FileinfoAPI',FileinfoAPI)
#router.register('progress', Protein_calculapiview)





urlpatterns = [
     path("admin/", admin.site.urls),
   path('', include(router.urls)),
    path('validate/', validate_jwt_token),
    path('login/', obtain_jwt_token),
    
    path('verify/', verify_jwt_token),
    path('refresh/', refresh_jwt_token),
    
    path('user/', include('proteom.urls')),
    path('api/', include('post.urls')),
#    re_path(r'^celery-progress/', include('celery_progress.urls')),
]
urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL,
                      document_root=settings.MEDIA_ROOT)
