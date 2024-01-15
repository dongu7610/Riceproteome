from django.db import models
from PIL import Image
from io import BytesIO
from django.core.files import File


# Create your models here.



class UploadFileModel(models.Model):
    description = models.CharField(max_length=255)
    files =models.FileField(upload_to="documents",null=True)
    files2 =models.FileField(upload_to="documents",blank=True)
    upload_at = models.DateTimeField(auto_now=True)
    filename = models.CharField(max_length=255)
    filename2 = models.CharField(max_length=255,blank=True)
    username = models.CharField(max_length=255)
    destxt   = models.CharField(max_length=2550) 
    projecttitle= models.CharField(max_length=255)
    LabelMethod= models.CharField(max_length=255, null=True)
    FilterMethod= models.CharField(max_length=255, null=True)
    userlist = models.CharField(max_length=200, blank=True)

    taskId = models.CharField(max_length=200, blank=True)
    taskfin= models.CharField(max_length=200, blank=True)
    Change2p=models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    NormMethod =models.CharField(max_length=200, blank=True)
    Software =models.CharField(max_length=200, blank=True)
    ImputeMethod =models.CharField(max_length=200, blank=True)

   # compare  = models.CharField(max_length=255)
    def __str__(self):
        return self.username


class ImgfieldModel(models.Model):
    description = models.CharField(max_length=255)
    imagefiles  = models.ImageField(upload_to="images/WholePNG",null=True,blank=True)
    upload_at   = models.DateTimeField(auto_now=True)
    username    = models.CharField(max_length=255)
    projecttitle= models.CharField(max_length=255)
    attr        = models.CharField(max_length=255)
    path2       = models.CharField(max_length=255)
   # compare  = models.CharField(max_length=255)
    def __str__(self):
        return self.username  
    

class FileinfoModel(models.Model):
    proj = models.CharField(max_length=255, blank=True)
    compare = models.CharField(max_length=255, blank=True) 
    username = models.CharField(max_length=255, blank=True)
    whole = models.CharField(max_length=255, blank=True)
    projecttitle=models.CharField(max_length=255, blank=True)
    destxt=models.CharField(max_length=255, blank=True)
    LabelMethod= models.CharField(max_length=255, null=True, blank=True)
    FilterMethod= models.CharField(max_length=255, null=True, blank=True)
    Change2p=models.CharField(max_length=200, blank=True)
    NormMethod =models.CharField(max_length=200, blank=True)
    Software =models.CharField(max_length=200, blank=True)
    ImputeMethod =models.CharField(max_length=200, blank=True) 
    def __str__(self):
        return self.username

class Change2pModel(models.Model):
    Change2p=models.CharField(max_length=200, blank=True)
    username= models.CharField(max_length=255, blank=True)
    proj = models.CharField(max_length=255, blank=True)
    projecttitle=models.CharField(max_length=255, blank=True)

class getFinNetwork(models.Model):
    ainfoid=models.CharField(max_length=200, blank=True)
    mergeb123= models.CharField(max_length=255, blank=True)
    c1source = models.CharField(max_length=255, blank=True)
    c2target=models.CharField(max_length=255, blank=True)
    finGO=models.CharField(max_length=255, blank=True)
    getprojectid=models.CharField(max_length=255, blank=True, null=True)

class AnalysisinfoModel(models.Model):
    Analysisinfo= models.CharField(max_length=255)
    proj = models.CharField(max_length=255)
    compare = models.CharField(max_length=25500) 
    username = models.CharField(max_length=255)
    whole = models.CharField(max_length=25500)
    projecttitle=models.CharField(max_length=255)
    LabelMethod= models.CharField(max_length=255, null=True)
    FilterMethod= models.CharField(max_length=255, null=True)
    AnalysisinfoTXT= models.CharField(max_length=255, null=True)
    indexinfo = models.CharField(max_length=200, blank=True)
    taskId = models.CharField(max_length=200, blank=True)
    taskIdfin = models.CharField(max_length=200, blank=True)

    taskId2=models.CharField(max_length=20000, blank=True)
    taskId3=models.CharField(max_length=20000, blank=True)
    pvfc  =models.CharField(max_length=2000, blank=True)
    proteincount =models.CharField(max_length=2000, blank=True)
    taskId3fin=models.CharField(max_length=20000, blank=True)
    mergeb123=models.CharField(max_length=20000, blank=True)
    c1source=models.CharField(max_length=2000, blank=True)
    c2target=models.CharField(max_length=2000, blank=True)
    finGO=models.CharField(max_length=2000, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    NormMethod =models.CharField(max_length=200, blank=True)
    Software =models.CharField(max_length=200, blank=True)
    ImputeMethod =models.CharField(max_length=200, blank=True)
    #pvfc,proteincount
    def __str__(self):
        return self.username


class Linkget(models.Model):
    proj = models.CharField(max_length=255) #요청받은proj이름
    
    condition = models.CharField(max_length=255)#요청받은 condition이름
    username = models.CharField(max_length=255)#요청받은 username 
    def __str__(self):
        return self.username

class ProjectinfoModel(models.Model):
    projectname = models.CharField(max_length=255)
    startdate = models.CharField(max_length=255) 
    enddate = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    username = models.CharField(max_length=255)#요청받은 username 
    userlist = models.CharField(max_length=2550, blank=True)
    
    def __str__(self):
        return self.projectname


class Projgetinfo(models.Model):
    projectname = models.CharField(max_length=255)
    userlist = models.CharField(max_length=2550)
    username = models.CharField(max_length=255)
    description=  models.CharField(max_length=2550,null=True ,blank=True)
#projectname,username,userlist,description
class Protein_calcul(models.Model):
    #auto_id         = models.AutoField(primary_key=True)
    filteritem= models.CharField(max_length=255,null=True ,blank=True)
    username =models.CharField(max_length=255,null=True ,blank=True)
    proj_info=models.CharField(max_length=2550,null=True ,blank=True)
    indexinfo=models.CharField(max_length=255,null=True ,blank=True)
    projidtitle    =models.CharField(max_length=255,null=True ,blank=True)
    taskId = models.CharField(max_length=200, blank=True)
    Software=models.CharField(max_length=200, blank=True)
    
class Protein_calcultask(models.Model):

   
    id         = models.AutoField(primary_key=True)   
    proteinids = models.CharField( max_length=128 , null=True, blank=True  )#db_column='Protein IDs',
    majorityproteinids = models.CharField( max_length=128, null=True, blank=True)#db_column='Majority protein IDs',
    fastaheaders = models.CharField( max_length=128, null=True, blank=True)#db_column='Fasta headers',
    numberofproteins = models.CharField( max_length=128, null=True, blank=True)#db_column='Number of proteins',
    peptides = models.CharField(max_length=128, null=True, blank=True)#db_column='Peptides', 
    uniquepeptides = models.CharField( max_length=128, null=True, blank=True)#db_column='Unique peptides',
    sequencecoveragep = models.CharField( max_length=128, null=True, blank=True)#db_column='Sequence coverage [%]',
    moldotweightkda = models.CharField( max_length=128, null=True, blank=True)#db_column='Mol. weight [kDa]',
    qhvalue = models.CharField( max_length=128, null=True, blank=True)#db_column='Q-value',
    score = models.CharField( max_length=128, null=True, blank=True)#db_column='Score',
    
    
    idsfrondevi = models.CharField( max_length=128, null=True, blank=True)#db_column='idsfrondevi',
    evidenceids = models.CharField( max_length=128, null=True, blank=True)#db_column='Evidence IDs',
    valuess = models.CharField(max_length=5000, null=True, blank=True)
    chrinfo = models.CharField(max_length=5000, null=True, blank=True)

    proj = models.CharField( max_length=128, null=True, blank=True)#db_column='project', #des
    experiment= models.CharField( max_length=128, null=True, blank=True)
    username= models.CharField( max_length=128, null=True, blank=True)

    foldchange= models.CharField( max_length=128, null=True, blank=True)
    pvalue    = models.CharField( max_length=128, null=True, blank=True)
    analyinfo = models.CharField( max_length=128, null=True, blank=True)
    Analysisid =models.CharField(max_length=255,null=True ,blank=True)

    #'proteinids',    'majorityproteinids' ,'fastaheaders' , 'numberofproteins', 'peptides' ,  'uniquepeptides' ,   'sequencecoveragep' ,'moldotweightkda' ,  'qhvalue' ,    'score' , 'idsfrondevi' ,   'evidenceids' ,    'valuess' , 'proj' ,    'experiment',   'username',   'foldchange','pvalue'   ,    'analyinfo'
class FragpipeProtein_calcultask(models.Model):

    
    id = models.AutoField(primary_key=True)   
    majorityproteinids = models.CharField( max_length=128, null=True, blank=True)
    proteinids = models.CharField( max_length=128 , null=True, blank=True  )
    entryname = models.CharField( max_length=128, null=True, blank=True)#db_column='Number of proteins',
    gene = models.CharField(max_length=128, null=True, blank=True)#db_column='Peptides', 
    proteinlength = models.CharField( max_length=128, null=True, blank=True)#db_column='Unique peptides',
    coverage = models.CharField( max_length=128, null=True, blank=True)#db_column='Sequence coverage [%]',
    description = models.CharField( max_length=128, null=True, blank=True)#db_column='Mol. weight [kDa]',
    valuess = models.CharField(max_length=5000, null=True, blank=True)
    chrinfo = models.CharField(max_length=5000, null=True, blank=True)
    proj = models.CharField( max_length=128, null=True, blank=True)#db_column='project', #des
    experiment= models.CharField( max_length=128, null=True, blank=True)
    username= models.CharField( max_length=128, null=True, blank=True)
    foldchange= models.CharField( max_length=128, null=True, blank=True)
    pvalue    = models.CharField( max_length=128, null=True, blank=True)
    analyinfo = models.CharField( max_length=128, null=True, blank=True)
    Analysisid =models.CharField(max_length=255,null=True ,blank=True)

class SearchNetwork(models.Model):
    #auto_id         = models.AutoField(primary_key=True)
    
    username =models.CharField(max_length=255,null=True ,blank=True)
    Analysisinfo=models.CharField(max_length=255,null=True ,blank=True)
    #case= models.CharField(max_length=255,null=True ,blank=True)
    tos_MSUids    =models.CharField(max_length=1000000,null=True ,blank=True)
    pvfc  =models.CharField(max_length=2000, blank=True)
    proteincount =models.CharField(max_length=2000, blank=True)
    taskId = models.CharField(max_length=200, blank=True)
    project = models.CharField(max_length=200, blank=True)
    #Analysisid =models.CharField(max_length=255,null=True ,blank=True)
class Networksinfo(models.Model):
    #auto_id         = models.AutoField(primary_key=True)
    project=models.CharField(max_length=255,null=True ,blank=True)
    username =models.CharField(max_length=2550,null=True ,blank=True)
    source=models.CharField(max_length=2550,null=True ,blank=True)
    target=models.CharField(max_length=25500,null=True ,blank=True)
    Analysisinfo=models.CharField(max_length=255,null=True ,blank=True)
    #Analysisid =models.CharField(max_length=255,null=True ,blank=True)
class RemoveErrorEXP(models.Model):
    #auto_id         = models.AutoField(primary_key=True)
    Expname=models.CharField(max_length=255,null=True ,blank=True)
    taskid =models.CharField(max_length=2550,null=True ,blank=True)
    projecttitle=models.CharField(max_length=2550,null=True ,blank=True)
class GO_idinfo(models.Model):
    #auto_id         = models.AutoField(primary_key=True)
    
    Golist =models.CharField(max_length=255,null=True ,blank=True)#go
    items=models.CharField(max_length=255,null=True ,blank=True)#item
    go_cluster=models.CharField(max_length=1000,null=True ,blank=True)#attr
    go_description    =models.CharField(max_length=255,null=True ,blank=True)#des
    counts    =models.CharField(max_length=255,null=True ,blank=True) #count
    idconvert =models.CharField(max_length=1000000,null=True ,blank=True)   #idconv
    
    fdr= models.CharField(max_length=255,null=True ,blank=True)#fdr
    pv= models.CharField(max_length=255,null=True ,blank=True)#pv
    Analysisinfo=models.CharField(max_length=25500,null=True ,blank=True)  #analysis
    pvfc=models.CharField(max_length=255,null=True ,blank=True)
    project=models.CharField(max_length=255,null=True ,blank=True)
    Analysisid =models.CharField(max_length=255,null=True ,blank=True)

class TaskidandID(models.Model):
    #auto_id         = models.AutoField(primary_key=True)
    
    Taskid =models.CharField(max_length=255,null=True ,blank=True)
    Analysisid =models.CharField(max_length=255,null=True ,blank=True)
    

class Analysisidstatus(models.Model):
    #auto_id         = models.AutoField(primary_key=True)
    
    
    Analysisid =models.CharField(max_length=255,null=True ,blank=True)
    RelatedModels=models.CharField(max_length=255,null=True ,blank=True)
    finishmode=models.CharField(max_length=255,null=True ,blank=True)

class Network_nodeinfomation(models.Model):
    #auto_id         = models.AutoField(primary_key=True)
    
    
    nodelist =models.CharField(max_length=1000000,null=True ,blank=True)
    edgelist=models.CharField(max_length=1000000,null=True ,blank=True)
    nodeinfo=models.CharField(max_length=10000000,null=True ,blank=True)
    #notinmergest=models.CharField(max_length=1000000,null=True ,blank=True)
    Analysisid =models.CharField(max_length=1000000,null=True ,blank=True)
#models.TextField()
#   Golist,items,go_cluster,go_description,NOD,locINFO,Analysisinfo

#Golist,items,go_cluster,go_description,counts,idconvert,fdr,Analysisinfo
