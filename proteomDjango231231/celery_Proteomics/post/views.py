from .serializers import   FileinfoModelSerializer,ProjectinfoModelSerializer,UploadFileModelSerializer,ImgfieldModelSerializer,Protein_calculSerializer,SNserializers,AIserializers,SN2serializers,Adduser,Changep2p,FinNet,RmEXP
from .models import   FileinfoModel  ,ProjectinfoModel,UploadFileModel,ImgfieldModel,Protein_calcul,Protein_calcultask,SearchNetwork,GO_idinfo,AnalysisinfoModel,Networksinfo,Projgetinfo,Change2pModel,getFinNetwork,RemoveErrorEXP,Network_nodeinfomation,Analysisidstatus,TaskidandID,FragpipeProtein_calcultask
from rest_framework.views import APIView
from django.core.files.storage import FileSystemStorage



from rest_framework.viewsets import ModelViewSet
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status, generics
import json
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .forms import DocumentForm,Getform
from .tasks import upload,getDEP,getGO,getNETWORK
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
import os
from django.conf import settings
from rest_framework.permissions import IsAuthenticated
#from .filters import SnippetFilterSet,      SnippetFiltername
from celery.result import AsyncResult
from django.http import JsonResponse
import random
import string

def generate_random_hashtag(length=8):
    
    characters = string.ascii_letters + string.digits
    random_string = ''.join(random.choice(characters) for _ in range(length))
    hashtag = random_string
    return hashtag

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 1000


 



class FileinfoAPI(ModelViewSet):
    authentication_classes = []  
    permission_classes = []   
    filter_backends = (DjangoFilterBackend,)
    queryset = FileinfoModel.objects.all()
    serializer_class = FileinfoModelSerializer
    filter_fields=['projecttitle']
    pagination_class = None

class Imgview(ModelViewSet):
    filter_backends = (DjangoFilterBackend,)
    authentication_classes = []   
    permission_classes = []  
    queryset = ImgfieldModel.objects.all()
    serializer_class = ImgfieldModelSerializer
    #filter_backends = (DjangoFilterBackend,)
    filter_fields = ['description']
    pagination_class = None

class Projectapiview(APIView):
    parser_classes = (MultiPartParser, FormParser)

    authentication_classes = []   #이거 두줄은 권한이 없는 상태에서 데이테 요청을 가능하게
    permission_classes = []       #만듬 settings.py에서도 아마 가능할 것 같음.

    def get(self, request, *args, **kwargs):
        Project = ProjectinfoModel.objects.all()
        serializer = ProjectinfoModelSerializer(Project, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        Project_infoModelSerializer = ProjectinfoModelSerializer(data=request.data)
        if Project_infoModelSerializer.is_valid():
            Project_infoModelSerializer.save()
            data = Project_infoModelSerializer.data
            projectid=data['projectname']
            name = data['username']

            projitem=ProjectinfoModel.objects.filter(Q(projectname=projectid)&Q(username=name))
            if len(projitem)==0:

                
                passdata='pass'
            else:
                passdata='alreay'



            return Response(passdata, status=status.HTTP_201_CREATED)
        else:
            print('error', Project_infoModelSerializer.errors)
            return Response(Project_infoModelSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UploadFileapiview(APIView):
    parser_classes = (MultiPartParser, FormParser)

    authentication_classes = []   #이거 두줄은 권한이 없는 상태에서 데이테 요청을 가능하게
    permission_classes = []       #만듬 settings.py에서도 아마 가능할 것 같음.

    def get(self, request, *args, **kwargs):
        Project2 = UploadFileModel.objects.all()
        serializer = UploadFileModelSerializer(Project2, many=True)
        
        return Response(serializer.data)
 
    def post(self, request, *args, **kwargs):
        Upload_infoModelSerializer = UploadFileModelSerializer(data=request.data)
        if Upload_infoModelSerializer.is_valid():
            Upload_infoModelSerializer.save()
            data = Upload_infoModelSerializer.data
            
            filterproj=data['projecttitle']
            filterdes=data['description']    
            projitem=UploadFileModel.objects.filter(Q(projecttitle=filterproj)&Q(description=filterdes))
            
            id = data['id']
            UploadCounts=Analysisidstatus.objects.filter(Q(RelatedModels='UploadFileModel'))
            random_hashtag = generate_random_hashtag()

            Upload_index=data['username']+random_hashtag+'Upload_'+str(len(UploadCounts)+1)
            creatAnalysisidstatus=Analysisidstatus.objects.create(Analysisid=Upload_index, RelatedModels='UploadFileModel', finishmode='process')
            
            data['dataindex']=Upload_index
            task= upload.delay(data,10)
            passid = task.id
            creatTaskidandID=TaskidandID.objects.create(Analysisid=Upload_index, Taskid=passid)    
            self.patch0(id, {"taskId": Upload_index})
            
            
            #tossupindex=upload_index.Analysisid
            


            return Response({ Upload_index}, status=status.HTTP_201_CREATED)
        else:
            print('error', Upload_infoModelSerializer.errors)
            return Response(Upload_infoModelSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def get_object0(self, pk):
        return UploadFileModel.objects.get(pk=pk)
    def patch0(self, pk, taskid):
        instance = self.get_object0(pk)
        serializer = UploadFileModelSerializer(
            instance, data=taskid, partial=True)

        if serializer.is_valid():
            serializer.save()

class Protein_calculapiview(APIView):
    parser_classes = (MultiPartParser, FormParser)
    authentication_classes = []
    permission_classes = []

    #queryset = Protein_calcul.objects.all()
    #serializer_class = Protein_calculSerializer   
    #Protein_calculSerializer,Protein_calcul
    def get(self, request, *args, **kwargs):
        Project2 = Protein_calcul.objects.all()
        serializer = Protein_calculSerializer(Project2, many=True)
        
        return Response(serializer.data)    
    def post(self, request, *args, **kwargs):
        serializer =Protein_calculSerializer(data=request.data)
        
#        
        if serializer.is_valid():
            serializer.save()
            data = serializer.data
            id = data['id']
            
            username= data['username']
            filteritem=data['filteritem']
            proj_info=data['proj_info']
            indexinfo2=data['indexinfo']
            projidtitle=data['projidtitle']
            Software=data['Software']
            DEPCounts=Analysisidstatus.objects.filter(Q(RelatedModels='Protein_calcultask')|Q(RelatedModels='FragpipeProtein_calcultask'))
            random_hashtag = generate_random_hashtag()

            DEP_index=data['username']+random_hashtag+'DEP_'+str(len(DEPCounts)+1)
            
            if Software=='MaxQuant':
                creatAnalysisidstatus=Analysisidstatus.objects.create(Analysisid=DEP_index, RelatedModels='Protein_calcultask', finishmode='process')
            else:
                creatAnalysisidstatus=Analysisidstatus.objects.create(Analysisid=DEP_index, RelatedModels='FragpipeProtein_calcultask', finishmode='process')
            data['dataindex']=DEP_index
            task=getDEP.delay(data,10)
            
            self.patch(id, {"taskId": task.id})
            passid = task.id


            #DEP_index=TaskidandID.objects.filter(Q(Taskid=passid))[0]
            #tossdepindex=DEP_index.Analysisid
            creatTaskidandID=TaskidandID.objects.create(Analysisid=DEP_index, Taskid=passid)

            gettest=AnalysisinfoModel.objects.filter(Q(Analysisinfo=proj_info)&Q(projecttitle=projidtitle))[0]
            gettest.taskId=DEP_index
            gettest.indexinfo=indexinfo2

            gettest.save()
            
            


            

            return Response({DEP_index}, status=status.HTTP_201_CREATED)
        else:
            print('error', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def get_object(self, pk):
        return Protein_calcul.objects.get(pk=pk)
    def patch(self, pk, taskid):
        instance = self.get_object(pk)
        serializer = Protein_calculSerializer(
            instance, data=taskid, partial=True)

        if serializer.is_valid():
            serializer.save()


        
'''
       instance = self.get_object(pk)
        serializer = Protein_calculSerializer(
            instance, data=taskid, partial=True)

        if serializer.is_valid():
            serializer.save()'''

'''def get(self, request, *args, **kwargs):
        Project22 = Protein_calcul.objects.all()
        serializer2 = Protein_calculSerializer(Project22, many=True)
        
        return Response(serializer2.data)
    def post(self, request, *args, **kwargs):
        ProteincalculSerializer = Protein_calculSerializer(data=request.data)
        ProteincalculSerializer.is_valid(raise_exception=True)
        if ProteincalculSerializer.is_valid(raise_exception=True):
            data=            ProteincalculSerializer.data
            id=data['id']+data['proj_info']+data['proj_info']+data['indexinfo']



#            ProteincalculSerializer.save()12
            task=get_values.delay(ProteincalculSerializer.data,10)#이거 활용하면 대박 입력정보 save안하면? 그냥 정보만 활용하겠다 라는뜻.
            self.patch(id, {"taskId": task.id})
            return Response({'task_id': task.id}, status=status.HTTP_201_CREATED)
        else:
            print('error', ProteincalculSerializer.errors)
            return Response(ProteincalculSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
'''





#   os.remove("/tmp/<file_name>.txt")
# 
'''
SNserializers

SearchNetwork,Networks_idinfo,searchNetworks_idinfo

 formData.append("Analysisinfo",Analinfo);
       formData.append("tos_MSUids",tos_analysis);
       formData.append("Search_option",placeholder);
       formData.append("Search",select_option2);
       formData.append("username",props.user)
'''
class SearchNetworkapiview(APIView):
    parser_classes = (MultiPartParser, FormParser)

    authentication_classes = []   #이거 두줄은 권한이 없는 상태에서 데이테 요청을 가능하게
    permission_classes = []       #만듬 settings.py에서도 아마 가능할 것 같음.

    def get(self, request, *args, **kwargs):
        Project2 = SearchNetwork.objects.all()
        serializer = SNserializers(Project2, many=True)
        
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = SNserializers(data=request.data)

                   
        if serializer.is_valid():
            serializer.save()
            
            data = serializer.data
            id = data['id']
            Analysisinfo= data['Analysisinfo']
            projectid=data['project']
            #case,Analysisinfo,tos_MSUids
            pvfc=data['pvfc']
            proteincount=data['proteincount']

            GOCounts=Analysisidstatus.objects.filter(Q(RelatedModels='GO_idinfo'))
            random_hashtag = generate_random_hashtag()
            GO_index=data['username']+random_hashtag+'GO_'+str(len(GOCounts)+1)
            creatAnalysisidstatus=Analysisidstatus.objects.create(Analysisid=GO_index, RelatedModels='GO_idinfo', finishmode='process')
            data['dataindex']=GO_index
            task=getGO.delay(data,10)
        
            self.patch1(id, {"taskId": task.id})
            passid = task.id
            #GO_index=TaskidandID.objects.filter(Q(Taskid=passid))[0]
            #tossGOindex=GO_index.Analysisid
            gettest=AnalysisinfoModel.objects.filter(Q(Analysisinfo=Analysisinfo)&Q(projecttitle=projectid))[0]
            #gettest.taskId2=passid

            creatTaskidandID=TaskidandID.objects.create(Analysisid=GO_index, Taskid=passid)
            

            if gettest.taskId2=='':
                passid3=GO_index
                passpvfc=data['pvfc']
                passcounts=data['proteincount']
            else:
                passid3=gettest.taskId2+';'+GO_index
                passpvfc=gettest.pvfc+';'+data['pvfc']
                passcounts=gettest.proteincount+';'+data['proteincount']

            gettest.taskId2 =passid3
            gettest.pvfc= passpvfc
            gettest.proteincount= passcounts
            gettest.save()
             
            return Response({ GO_index}, status=status.HTTP_201_CREATED)
        else:  
            print('error', serializer.errors)
            return Response({data}, status=status.HTTP_400_BAD_REQUEST)
    def get_object1(self, pk): 
        return SearchNetwork.objects.get(pk=pk)
    def patch1(self, pk, taskid):
        instance = self.get_object1(pk)
        serializer = SNserializers(
            instance, data=taskid, partial=True)

        if serializer.is_valid():
            serializer.save()

#SNserializers
#SearchNetwork
#GO_idinfo
def check_task_failure(task_id):
    # 결과 객체 생성
    result = AsyncResult(task_id)

    # 작업의 상태 확인
    if result.failed():
        return True  
    else:
        return False

def truefalse(string):
    if string=='True':
        return True
    else:
        return False
def get_progress(request, task_id):

#    task_id = request.GET.get(task_id, None)
    #if task_id is not None:
    getprogressoption=task_id.split('_')[0] #progress or getvalues
    getvaluesoption='_'.join(task_id.split('_')[1:])
    taskid_check= Analysisidstatus.objects.filter(Q(Analysisid=getvaluesoption) )[0]
    finmode=taskid_check.finishmode
    if getprogressoption =='getvalues':
#Network_nodeinfomation

#[nodelist,edgelist,nodeinfo,notinmergest]
 
#FragpipeProtein_calcultask
        if finmode=='fin':
            relmodels_0224=taskid_check.RelatedModels
            if relmodels_0224 == 'Protein_calcultask':
                result=list(Protein_calcultask.objects.filter(Q(Analysisid=getvaluesoption)).values('proteinids',    'majorityproteinids' ,'fastaheaders' , 'numberofproteins', 'peptides' ,  'uniquepeptides' ,   'sequencecoveragep' ,'moldotweightkda' ,  'qhvalue' ,    'score' , 'idsfrondevi' ,   'evidenceids' ,    'valuess' ,'chrinfo', 'proj' ,    'experiment',   'username',   'foldchange','pvalue'   ,    'analyinfo'))
            elif relmodels_0224 == 'FragpipeProtein_calcultask':                                             
                result=list(FragpipeProtein_calcultask.objects.filter(Q(Analysisid=getvaluesoption)).values( 'majorityproteinids',    'proteinids' ,'entryname' , 'gene', 'proteinlength' ,  'coverage' ,   'description' , 'valuess' ,'chrinfo', 'proj' ,    'experiment',   'username',   'foldchange','pvalue'   ,    'analyinfo'     ))
            elif relmodels_0224 == 'GO_idinfo':
                result=list(GO_idinfo.objects.filter(Q(Analysisid=getvaluesoption)).values('Golist',    'items' ,'go_cluster' , 'go_description', 'counts' ,  'idconvert' ,   'fdr' ,'pv','Analysisinfo'))
            elif relmodels_0224 == 'Network_nodeinfomation':
                result3=list(Network_nodeinfomation.objects.filter(Q(Analysisid=getvaluesoption)).values('nodelist',    'edgelist' ,'nodeinfo' ))
                nodelist=[int(x) for x in result3[0]['nodelist'].split(',')]
                edgelist=[tuple([int(x) for x in x.replace('(','').replace(')','').split(',')]) for x in result3[0]['edgelist'].split('),')]
                nodeinfo=[[int(x.split('^')[0]),x.split('^')[1],truefalse(x.split('^')[2]),truefalse(x.split('^')[3]),int(x.split('^')[4]),x.split('^')[5],x.split('^')[6],x.split('^')[7],int(x.split('^')[8])] for x in result3[0]['nodeinfo'].split(';')]
                result=[nodelist,edgelist,nodeinfo]
            
            else:
                result='pass'
    else:

        
        failck=check_task_failure(task_id)
        if finmode=='fin':
            result='fin'
        elif failck==True:
            
            result='fail'
        else:

            result='process'

    '''task = AsyncResult(task_id)
    if ((task.result==10) & (task.state=='SUCCESS')):
        
        result=10
        #        task.forget()
        
    elif ((task.result!=10) & (task.state=='SUCCESS')):
        if task.result[1]=='calc':
        
            result=list(Protein_calcultask.objects.filter(Q(analyinfo=task.result[0])).values('proteinids',    'majorityproteinids' ,'fastaheaders' , 'numberofproteins', 'peptides' ,  'uniquepeptides' ,   'sequencecoveragep' ,'moldotweightkda' ,  'qhvalue' ,    'score' , 'idsfrondevi' ,   'evidenceids' ,    'valuess' ,'chrinfo', 'proj' ,    'experiment',   'username',   'foldchange','pvalue'   ,    'analyinfo'))
        elif task.result[1]=='GO':

            result=list(GO_idinfo.objects.filter(Q(Analysisinfo=task.result[0])&Q(pvfc=task.result[2])&Q(project=task.result[3])).values('Golist',    'items' ,'go_cluster' , 'go_description', 'counts' ,  'idconvert' ,   'fdr' ,'pv','Analysisinfo'))
        elif task.result[1]=='NET':
            result=task.result[0]
    elif ((task.state!='FAILURE') & (task.state!='SUCCESS')):                              
        result=task.result
    else:
        result='FAILURE'

        
    data = {
        'state': task.state,
        'result': result,
        'details': task.info
    }'''
    return JsonResponse(result, safe=False)
    #HttpResponse(json.dumps(data), content_type='application/json')
#else:
   # return HttpResponse('No job id given.')
    '''result = AsyncResult(task_id)
    response_data = {
        'state': result.state,
        'details': result.info,
    }
    return HttpResponse(json.dumps(response_data), content_type='application/json')'''

class Ainfoapiview(APIView):
    parser_classes = (MultiPartParser, FormParser)

    authentication_classes = []   #이거 두줄은 권한이 없는 상태에서 데이테 요청을 가능하게
    permission_classes = []       #만듬 settings.py에서도 아마 가능할 것 같음.

    def get(self, request, *args, **kwargs):
        Project = AnalysisinfoModel.objects.all()
        serializer = AIserializers(Project, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        AI_serializers = AIserializers(data=request.data)
        if AI_serializers.is_valid():
            AI_serializers.save()
            

                
            data = AI_serializers.data
            ainfo=data['Analysisinfo']
            expitemproj = data['proj']
            getproj            =data['projecttitle']
            projitem=AnalysisinfoModel.objects.filter(Q(Analysisinfo=ainfo)&Q(proj=expitemproj)&Q(projecttitle=getproj))
            if len(projitem)==0:

                
                passdata='pass'
            else:
                passdata='alreay'
            return Response(passdata, status=status.HTTP_201_CREATED)
        else:
            print('error', AI_serializers.errors)
            return Response(AI_serializers.errors, status=status.HTTP_400_BAD_REQUEST)

class SearchNetworkapiview2(APIView):
    parser_classes = (MultiPartParser, FormParser)

    authentication_classes = []   #이거 두줄은 권한이 없는 상태에서 데이테 요청을 가능하게
    permission_classes = []       #만듬 settings.py에서도 아마 가능할 것 같음.

    def get(self, request, *args, **kwargs):
        Project2 = Networksinfo.objects.all()
        serializer = SN2serializers(Project2, many=True)
        
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = SN2serializers(data=request.data)

                   
        if serializer.is_valid():
            serializer.save()
            
            data = serializer.data
            id = data['id']
            Analysisinfo= data['Analysisinfo']
            projectid=data['project']
            NETworkCounts=Analysisidstatus.objects.filter(Q(RelatedModels='Network_nodeinfomation'))
            random_hashtag = generate_random_hashtag()
            NETWORK_index=data['username']+random_hashtag+'NETWORK_'+str(len(NETworkCounts)+1)
            creatAnalysisidstatus=Analysisidstatus.objects.create(Analysisid=NETWORK_index, RelatedModels='Network_nodeinfomation', finishmode='process')
            data['dataindex']=NETWORK_index
            task=getNETWORK.delay(data,10)

            self.patch2(id, {"taskId": task.id})
            passid = task.id

            
            creatTaskidandID=TaskidandID.objects.create(Analysisid=NETWORK_index, Taskid=passid)
          

            #Net_index=TaskidandID.objects.filter(Q(Taskid=passid))[0]
            #tossnetindex=Net_index.Analysisid
            gettest=AnalysisinfoModel.objects.filter(Q(Analysisinfo=Analysisinfo)&Q(projecttitle=projectid))[0]
            #gettest.taskId2=passid
            if gettest.taskId3=='':
                passid3=NETWORK_index
                
            else:
                
                passid3=NETWORK_index
                
            gettest.taskId3 =passid3
            gettest.save()

            return Response({ NETWORK_index}, status=status.HTTP_201_CREATED)
        else:  
            print('error', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def get_object2(self, pk):
        return Networksinfo.objects.get(pk=pk)
    def patch2(self, pk, taskid):
        instance = self.get_object2(pk)
        serializer = SN2serializers(
            instance, data=taskid, partial=True)

        if serializer.is_valid():
            serializer.save()






class Adduserapiview(APIView):
    parser_classes = (MultiPartParser, FormParser)

    authentication_classes = []   #이거 두줄은 권한이 없는 상태에서 데이테 요청을 가능하게
    permission_classes = []       #만듬 settings.py에서도 아마 가능할 것 같음.

    def get(self, request, *args, **kwargs):
        Project = Projgetinfo.objects.all()
        serializer = Adduser(Project, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        Adduser_serializers = Adduser(data=request.data)
        if Adduser_serializers.is_valid():
            Adduser_serializers.save()
            data = Adduser_serializers.data
            projectname=data['projectname']
            username=data['username']
            
            gettest=ProjectinfoModel.objects.filter(Q(projectname=projectname)&Q(username=username))[0]
            
            passid3=data['userlist']
            if data['description']=='':
                getdescription=gettest.description
            else:
                getdescription=data['description']


             

            
            gettest.description=getdescription
            gettest.userlist =passid3
            gettest.save()

            
            return Response(passid3, status=status.HTTP_201_CREATED)
        else:
            print('error', Adduser_serializers.errors)
            return Response(Adduser_serializers.errors, status=status.HTTP_400_BAD_REQUEST)


class Private2publish(APIView):
    parser_classes = (MultiPartParser, FormParser)

    authentication_classes = []   #이거 두줄은 권한이 없는 상태에서 데이테 요청을 가능하게
    permission_classes = []       #만듬 settings.py에서도 아마 가능할 것 같음.

        
    def get(self, request, *args, **kwargs):
        Project = Change2pModel.objects.all()
        serializer = Changep2p(Project, many=True)
        return Response(serializer.data)
#UploadFileModel
#username
#description 실험이름
#projecttitle 프로젝트이름
#Change2p
#
#projecttitle,proj,username,Change2p
#FileinfoAPI
#username
#proj
#projecttitle
#Change2p
    def post(self, request, *args, **kwargs):
        Changep2p_serializers = Changep2p(data=request.data)
        if Changep2p_serializers.is_valid():
            Changep2p_serializers.save()
            data = Changep2p_serializers.data

            
            projectname=data['projecttitle']
            username=data['username']
            experimentname= data['proj']
            getChange2p=data['Change2p']
            getUploadFileChange2p= UploadFileModel.objects.filter(Q(projecttitle=projectname)&Q(username=username)&Q(description=experimentname))[0]
            getFileinfoAPIChange2p= FileinfoModel.objects.filter(Q(projecttitle=projectname)&Q(username=username)&Q(proj=experimentname))[0]
            

            getUploadFileChange2p.Change2p=getChange2p
            getUploadFileChange2p.save()
            getFileinfoAPIChange2p.Change2p=getChange2p
            
            getFileinfoAPIChange2p.save()

            
            return Response(getChange2p, status=status.HTTP_201_CREATED)
        else:
            print('error', Changep2p_serializers.errors)
            return Response(Changep2p_serializers.errors, status=status.HTTP_400_BAD_REQUEST)
class Network2Fin(APIView):
    parser_classes = (MultiPartParser, FormParser)

    authentication_classes = []   #이거 두줄은 권한이 없는 상태에서 데이테 요청을 가능하게
    permission_classes = []       #만듬 settings.py에서도 아마 가능할 것 같음.

        
    def get(self, request, *args, **kwargs):
        Project = getFinNetwork.objects.all()
        serializer = FinNet(Project, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        FinNet_serializers = FinNet(data=request.data)
        if FinNet_serializers.is_valid():
            FinNet_serializers.save()
            data = FinNet_serializers.data

 
            
            ainfoidname=data['ainfoid']
            items=data['mergeb123']
            c1typesource= data['c1source']
            c2typetarget=data['c2target']
            getfinGO    =data['finGO']
            getprojectid    =data['getprojectid']

            getAnalysisinfo= AnalysisinfoModel.objects.filter(Q(Analysisinfo=ainfoidname) & Q(projecttitle=getprojectid))[0]
          
            getAnalysisinfo.taskId3fin='FinAnalysis'
            getAnalysisinfo.mergeb123=items
            getAnalysisinfo.c1source=c1typesource
            getAnalysisinfo.c2target=c2typetarget
            getAnalysisinfo.finGO=getfinGO
            getAnalysisinfo.save()
      

            return Response(ainfoidname, status=status.HTTP_201_CREATED)
        else:
            print('error', FinNet_serializers.errors)
            return Response(FinNet_serializers.errors, status=status.HTTP_400_BAD_REQUEST)


class RmexpAPI(APIView):
    parser_classes = (MultiPartParser, FormParser)

    authentication_classes = []   #이거 두줄은 권한이 없는 상태에서 데이테 요청을 가능하게
    permission_classes = []       #만듬 settings.py에서도 아마 가능할 것 같음.

    def get(self, request, *args, **kwargs):
        Project2 = RemoveErrorEXP.objects.all()
        serializer = RmEXP(Project2, many=True)
        

        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = RmEXP(data=request.data)

                   
        if serializer.is_valid():
            serializer.save()
     
           
            data = serializer.data
            name = data['Expname']
            task= data['taskid']
              
            AsyncResult(task).forget()

            
            gettest=UploadFileModel.objects.filter(Q(description=name )& Q(projecttitle=project))[0]
            gettest.delete()
            
            imgdel=ImgfieldModel.objects.filter(Q(description=name)& Q(projecttitle=project))
            fs = FileSystemStorage()
            [fs.delete(x.path2) for x in imgdel]

            imgdel.delete()
            upload_index=TaskidandID.objects.filter(Q(Taskid=task))[0]

            Analysisidstatus_index=Analysisidstatus.objects.filter(Q(Analysisid=upload_index.Analysisid) )[0]
          
            upload_index.delete()
            Analysisidstatus_index.delete()
            return Response({ 'success'}, status=status.HTTP_201_CREATED)
        else:  
            print('error', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
