
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import  DataSerializer,UserSerializer, UserSerializerWithToken, ProfileSerializer #,,proteinGroups2groups_seri,proteinGroups2groups_seri2 ,
from .models import  Profile,Data#,proteinGroups2groups
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination
import os, sys
from django.utils import timezone
#from .filter import MultiFilter

#from django_filters import Filter, FilterSet
#from django_filters.fields import Lookup
from django_filters import rest_framework as filters
#from rest_framework import filters
from typing import List
import pandas as pd
from django.conf import settings
from django.db import models
from django.core.files.storage import FileSystemStorage
from django.views.generic import ListView
#from .tasks import  parse_protein, test,network_parsing
#from .filters import SnippetFilterSet ,SnippetFiltername,msuidfilter#,SnippetFiltername2
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
#from .tasks import celery_function,do_work
# from google.oauth2 import id_token
# from google.auth.transport import requests

















class StandardResultsSetPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 1000



'''
class proteinGroups2groups_view(viewsets.ModelViewSet):
    queryset = proteinGroups2groups.objects.all()
    print(len(queryset))
    serializer_class = proteinGroups2groups_seri
    filter_backends = (DjangoFilterBackend,)
    #filter_backends = [filters.SearchFilter]
   # search_fields = ['proj', 'proteinids']
    filter_fields = ['proj','proteinids']

    pagination_class = None#StandardResultsSetPagination

class proteinGroups2groups_view2(viewsets.ModelViewSet):
    queryset = proteinGroups2groups.objects.all()
    print(len(queryset))
    serializer_class = proteinGroups2groups_seri2
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ['majorityproteinids']
    filterset_class = SnippetFiltername2
    pagination_class = None#StandardResultsSetPagination

class proteinGroups2groups_view3(viewsets.ModelViewSet):
    queryset = proteinGroups2groups.objects.all()
    print(len(queryset))
    #print(list(set([x.proj for x in projectsamples.objects.all()])))
    #print(list(set([x.compare for x in projectsamples.objects.all()])))
    #print(list(set([x.proj for x in proteinGroups2groups.objects.all()])))
    
    #proteinGroups2groups.objects.filter(proj='12. proteinGroups_2021년_Rice leaves (MSP1 transgenic)_TMT.txt').delete()
    serializer_class = proteinGroups2groups_seri2
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ['majorityproteinids']
    filterset_class = SnippetFiltername2
    pagination_class = StandardResultsSetPagination'''

'''
from django.db.models import Q
class ProductViewSet(APIView):
    def get(self, request):
        _id   = self.request.GET.get('id', None).split(',')
        ean   = self.request.GET.get('ean', None).split(',')

        qs = Product.objects.filter(Q(id__in=_id) | Q(ean__in=ean))
        data = serializers.ProductSerializer(qs, many=True, context={'request': request}).data

        if data:
                return Response({
                        'message': 'success',
                        "data":data,
                    },status=200)
            else:
                return Response({
                        'message':'no data available',
                        'success':'False'
                    },status=200)
'''

'''
def convert(request):
    
    if request.method == 'POST':
        
        
        selectRef = request.POST.get('qRef')

        username = request.user
        
        if selectRef == 'Select reference version':

            return render(request, 'convertapp/convert.html')


        else:
            try:
                query_file = request.FILES['q']
                fs = FileSystemStorage()    
                filename = fs.save(query_file.name, query_file)
                numberofsamples = request.POST.get('nos').strip()
                sampleinfo      = request.POST.get('samples').strip()
                projtitle       = request.POST.get('projecttitle').strip()
                compare       = request.POST.get('compare').strip()
                #test=  [f.name for f in proteinGroups2groups._meta.get_fields()]
                
                #print(test)
                print(filename)
                #print(proteinGroups2groups)
                #print(proteinGroups2groups())
                if selectRef == '1' and (len(sampleinfo.split(',')) == int(numberofsamples)):
                    

                    parse_protein.delay(filename, str(username),numberofsamples,sampleinfo,projtitle,compare)




                    print("done")
                    
               

                return render(request, 'convertapp/approval.html')
            except:
                return render(request, 'convertapp/convert.html')

    return render(request, 'convertapp/convert.html')



def networkparsing(request):

    if request.method == 'POST':
        selectRef = request.POST.get('qRef')

        username = request.user
        print(username)
        if selectRef == 'Select reference version':
            print(2)
            return render(request, 'convertapp/networkparsing.html')


        else:
            try:
                print(3)
                ppi = request.FILES['q']
                #print(ppi)
                crops= request.FILES['q2']
                #print(crops)
                loc2str = request.FILES['q3']
                #print(loc2str)
                projtitle       = request.POST.get('projecttitle')
                conf            = request.POST.get('conf')
                print(projtitle)
                fs2 = FileSystemStorage()    
                ppifilename = fs2.save(ppi.name, ppi)
                print(ppifilename)
                cropsfilename = fs2.save(crops.name, crops)
                loc2strfilename = fs2.save(loc2str.name, loc2str)
                
             
                if selectRef == '1' :
                    
                    
                    print("123123123123")
                    network_parsing.delay(ppifilename,cropsfilename, loc2strfilename, str(username) ,projtitle,conf)




                    print("done")
                    
               

                return render(request, 'convertapp/approval2.html')
            except:
                return render(request, 'convertapp/networkparsing.html')

    return render(request, 'convertapp/networkparsing.html')'''

    




@api_view(['GET'])
def current_user(request):

    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProfileUpdateAPI(generics.UpdateAPIView):
    lookup_field = "user_pk"
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class ProfileAPI(generics.RetrieveAPIView):
    parser_classes = (MultiPartParser, FormParser)

    authentication_classes = []
    permission_classes = [] 

    lookup_field = "user_pk"
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class ProfileDelteAPI(generics.DestroyAPIView):
    lookup_field = "id"
    queryset = User.objects.all()
    serializer_class = UserSerializer

    

class userView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    authentication_classes = []   #이거 두줄은 권한이 없는 상태에서 데이테 요청을 가능하게
    permission_classes = []       #만듬 settings.py에서도 아마 가능할 것 같음.

    def get(self, request, *args, **kwargs):
        Todos = User.objects.all()
        serializer = UserSerializer(Todos, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        Todos_serializer = UserSerializer(data=request.data)
        if Todos_serializer.is_valid():
            Todos_serializer.save()
            return Response(Todos_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', Todos_serializer.errors)
            return Response(Todos_serializer.errors, status=status.HTTP_400_BAD_REQUEST)