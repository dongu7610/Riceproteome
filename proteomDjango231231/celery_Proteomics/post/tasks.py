    
from ast import Set
from celery import shared_task
import os, sys
#os.environ['R_HOME'] = '/usr/lib/R'
#os.environ['R_HOME'] = '/home/student/miniconda3/envs/don9bot/lib/R/'
#from goatools.obo_parser import GODag

from ftplib import FTP
from goatools import obo_parser
from goatools.go_enrichment import GOEnrichmentStudy
import Bio.UniProt.GOA as GOA

from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.utils import timezone
import pandas as pd
import numpy as np
from .models import UploadFileModel,FileinfoModel,ProjectinfoModel,ImgfieldModel,Protein_calcultask,FragpipeProtein_calcultask,Protein_calcul,GO_idinfo,AnalysisinfoModel,Analysisidstatus,TaskidandID,Network_nodeinfomation
from collections import Counter
import re
import matplotlib.pyplot as plt
import seaborn as sns
import qnorm
import rpy2
import rpy2.robjects as robjects
from rpy2.robjects.packages import importr 
from django.db.models import Q
import json
from PIL import Image
from io import BytesIO
from django.core.files import File
from scipy.stats import ttest_ind
import math
from celery_progress.backend import ProgressRecorder
import time
from Bio import SeqIO
from Bio.KEGG import REST
import networkx as nx
import itertools
from networkx.readwrite import json_graph;

#from Bio.KEGG.KGML import KGML_parser
#from Bio.Graphics.KGML_vis import KGMLCanvas
import io

base = importr('base')
#base._libPaths("/usr/lib/R/site-library" )
tidyverse=importr("tidyverse")
limma=importr("limma")
edgeR=importr("edgeR")
#sva=importr("sva")
psych=importr("psych")
forest=importr('missForest')
missMDA=importr('missMDA')
knn=importr('VIM')
vsn=importr('vsn')
#KNN  =importr('VIM')
@shared_task(bind=True)
def upload(self, des3,seconds):
    #Analysisid,RelatedModels,finishmode |  Taskid ,Analysisid
    #Analysisidstatus,TaskidandID
    uploadtaskid=self.request.id
    Upload_index=des3['dataindex']
    #UploadCounts=Analysisidstatus.objects.filter(Q(RelatedModels='UploadFileModel'))
    #Upload_index='Upload_'+str(len(UploadCounts)+1)
    #creatAnalysisidstatus=Analysisidstatus.objects.create(Analysisid=Upload_index, RelatedModels='UploadFileModel', finishmode='process')
    #creatTaskidandID=TaskidandID.objects.create(Analysisid=Upload_index, Taskid=uploadtaskid)
    #creatAnalysisidstatus.save()
    #creatTaskidandID.save()
    #Analysisidstatus.objects.create(Analysisid=v1, RelatedModels=v1, finishmode=0)
    progress_recorder = ProgressRecorder(self)
    progress_recorder.set_progress( 1,  seconds)
    
    #des,filename,username,projecttitle,destxt
    des=des3['description']
    
    
    instance = UploadFileModel.objects.filter(description=des).first()

    
    
    
    if instance and instance.files:
        file_path = instance.files.name
        filename = os.path.basename(file_path)
              
    else:
        filename = None

    if instance and instance.files2:
        file_path = instance.files2.name
        filedesign = os.path.basename(file_path)
              
    else:
        filedesign = None

    #filename=des3['filename']
    projecttitle=des3['projecttitle']
    destxt=des3['destxt'] 
    username=des3['username']
    Label=des3['LabelMethod']
    FilterDES=des3['FilterMethod']
    FilterIM=des3['ImputeMethod'] #imputation method
    FilterSoftware=des3['Software'] #maxquant, fragpipe
    FilterNM        =  des3['NormMethod'] #  - vsn,quantile, median # Maxquant - tmt IRS / Combat 
    #filedesign=des3['filename2']
    
    fs = FileSystemStorage()






    def contains_pooling(column):
        return re.search(r'pool', column, re.IGNORECASE) is not None
    def extract_number_from_string(s):
       
        strs=str(s)
        matches = re.findall(r'\d+', strs)
        return int(matches[0]) if matches else None    



    def valuesck(kk):

        try:
            value=crosscheck(kk)
        except UnboundLocalError:
            value= False
        return value

    def crosscheck(string):
        p = re.compile("Rep\d" ,re.I)
        q = re.compile("Rep\D\d" ,re.I)
        listv=[]
        listv.append(p.findall(string))
        listv.append(q.findall(string))
        for x in listv:
            if len(x)>0:
                values=True
            else:
                pass
        return values
    def splitfunc(string):
        p = re.compile("Rep\d" ,re.I)
        q = re.compile("Rep\D\d" ,re.I)
        listv=[]
        listv.append(p.findall(string))
        listv.append(q.findall(string))
        for x in listv:
            if len(x)>0:
                values=re.match('\D+', x[0]).group()
            else:
                pass
        return values
    


    def maskcolumns(xc):
            #sample


            
        columns1 = ['Protein IDs'	,'Majority protein IDs'	,'Fasta headers'	,'Number of proteins',	'Peptides',	'Unique peptides',
            'Sequence coverage [%]',	'Mol. weight [kDa]',	'Q-value'	,'Score']
        columns2 = [x for x in xc if (valuesck(x) &  ('intensity corrected' in x) ) |  (valuesck(x) & ('LFQ intensity' in x))] 
    #    Con_DJ rep_1	Con_eMSP1 rep_1	Con_cMSP1 rep_1	JA_DJ rep_1	JA_eMSP1 rep_1	JA_cMSP1 rep_1	Con_DJ rep_2	Con_eMSP1 rep_2	Con_cMSP1 rep_2	JA_DJ rep_2	JA_eMSP1 rep_2	JA_cMSP1 rep_2	Con_DJ rep_3	Con_eMSP1 rep_3	Con_cMSP1 rep_3	JA_DJ rep_3	JA_eMSP1 rep_3	JA_cMSP1 rep_3	MS/MS count	

        columns3 =    ['id','Evidence IDs']
        return columns1+columns2+columns3
    def maskcolumns13(xc):
        #sample


        if FilterSoftware=='MaxQuant':   
            columns1 = ['Protein IDs'	,'Majority protein IDs'	,'Fasta headers'	,'Number of proteins',	'Peptides',	'Unique peptides',
            'Sequence coverage [%]',	'Mol. weight [kDa]',	'Q-value'	,'Score']
        #columns2 =[x for x in xc if (valuesck(x) &  ('intensity corrected' in x) ) |  (valuesck(x) & ('LFQ intensity' in x))] 
    #    Con_DJ rep_1	Con_eMSP1 rep_1	Con_cMSP1 rep_1	JA_DJ rep_1	JA_eMSP1 rep_1	JA_cMSP1 rep_1	Con_DJ rep_2	Con_eMSP1 rep_2	Con_cMSP1 rep_2	JA_DJ rep_2	JA_eMSP1 rep_2	JA_cMSP1 rep_2	Con_DJ rep_3	Con_eMSP1 rep_3	Con_cMSP1 rep_3	JA_DJ rep_3	JA_eMSP1 rep_3	JA_cMSP1 rep_3	MS/MS count	

            columns3 =    ['id','Evidence IDs']
        else:
            columns1=['Protein','Protein ID','Entry Name','Gene','Protein Length','Coverage','Description']
            columns3=[]


        return columns1+columns3
    
    def othersort(columns2,sampleN):
        sampleN=int(sampleN)
        bcdcombine=[]
        for x in range(int(len(columns2)/sampleN)):
            y=x+1
            abc=list(filter(lambda x: int(x[-1])==y , columns2))
            bcdcombine=bcdcombine+abc
        return bcdcombine

    def x3(x,yoursampleN):
        listx=x.split(',')
        list2=[]
        sampleN=yoursampleN
        for i in range(int(len(listx)/sampleN)):
            list2=list2+[str((listx[i*sampleN:(i+1)*sampleN].count('False')/sampleN)>=(2/3))]
        #abc=listx.count('True')<1
        
        return list2.count('True')
    def x4(x):
        listx=x.split(',')
        
        abc=listx.count('True')<1
        
        return abc           
    def extract_intensity_columns(column_names, sample_names):
        
        intensity_columns = []
        for col in column_names:
            if ('LFQ intensity'.casefold() in col.casefold() or 'intensity'.casefold() in col.casefold()) and any(sample_name.casefold() in col.casefold() for sample_name in sample_names):
                intensity_columns.append(col)
        return intensity_columns
    def sortextract_intensity_columns(column_names, sample_names):
        
        intensity_columns = []
        for col in column_names:
            if ('LFQ intensity' in col or 'intensity' in col) and any(sample_name.casefold() in col.casefold() for sample_name in sample_names):
                intensity_columns.append(col)

        intensity_columns.sort(key=lambda col: sample_names.index(next((sample_name for sample_name in sample_names if sample_name.casefold() in col.casefold()), None)))
        return intensity_columns

    def tmtextract_intensity_columns(column_names , sample_names):
        
        intensity_columns = []
        for col in column_names:
            if (('intensity'.casefold() in col.casefold() or any(word.casefold() in col.casefold() for word in ['Reporter intensity'])) and any(sample_name.casefold() in col.casefold() for sample_name in sample_names) ):
                intensity_columns.append(col)
        return intensity_columns
    def fragtmtextract_intensity_columns(column_names , sample_names):
        
        intensity_columns = []
        for col in column_names:
            if ( any(sample_name.casefold() in col.casefold() for sample_name in sample_names) ):
                intensity_columns.append(col)
        return intensity_columns    
    def sortfragtmtextract_intensity_columns(column_names , sample_names):
        
        intensity_columns = []
        for col in column_names:
            if ( any(sample_name.casefold() in col.casefold() for sample_name in sample_names) ):
                intensity_columns.append(col)
        
        intensity_columns.sort(key=lambda col: sample_names.index(next((sample_name for sample_name in sample_names if sample_name.casefold() in col.casefold()), None)))
        return intensity_columns    

    def sorttmtextract_intensity_columns(column_names, sample_names):
    
        intensity_columns = []

        # 조건을 만족하는 열 이름을 추출
        for col in column_names:
            if (('intensity'.casefold() in col.casefold() or any(word.casefold() in col.casefold() for word in ['Reporter intensity'])) and any(sample_name.casefold() in col.casefold()  for sample_name in sample_names) ):
                intensity_columns.append(col)

        # sample_names 리스트의 순서에 따라 정렬
        intensity_columns.sort(key=lambda col: sample_names.index(next((sample_name for sample_name in sample_names if sample_name.casefold() in col.casefold()), None)))

        return intensity_columns
    

    def find_matching_columns(data, input_string):
    
        input_string_lower = input_string.casefold()
        matching_columns = [col for col, match in zip(data.columns, [input_string_lower in col.casefold() for col in data.columns]) if match]
        return matching_columns


    def find_Max_LFQ_intensity_column(data, experiment_name):
        
        
        if 'intensity'.casefold() in experiment_name.casefold():
            return experiment_name, True
            
        #intensity_col = next((col for col in data.columns if 'intensity'.casefold() in experiment_name.casefold()), None)
            
        else:
           
            maxlfq_col = next((col for col in data.columns if 'LFQ intensity'.casefold() in col.casefold() and experiment_name.casefold() in col.casefold()), None)
            regular_intensity_col = next((col for col in data.columns if 'Intensity'.casefold() in col.casefold() and 'LFQ'.casefold() not in col.casefold() and experiment_name.casefold() in col.casefold()), None)
            
            if maxlfq_col:
                return maxlfq_col, False
            elif regular_intensity_col:
                return regular_intensity_col, False
            else:
                raise ValueError(f"No intensity column found for experiment: {experiment_name}")


    def process_experiment_list_Max_LFQ(data, experiment_list,df_design):

        results = []
        a_ix=df_design.set_index('experimentname')
        results_dict={}
        for experiment_name in experiment_list:
            try:
                column_name, has_direct_intensity = find_Max_LFQ_intensity_column(data, experiment_name)
                matchcolums=find_matching_columns(data,column_name)
                results=results+matchcolums
                results_dict[matchcolums[0]]=matchcolums[0]+' '+ str(a_ix.loc[experiment_name]['replicate'])
            except ValueError as e:
                pass
        return results,results_dict
    def find_max_tmt_intensity_column(data, experiment_name):
    
        
        
        if 'intensity'.casefold() in experiment_name.casefold():
            return experiment_name, True
        
            
        else:
        
            TMTcol = next((col for col in data.columns if any(word.casefold() in col.casefold() for word in ['Reporter intensity']) and 'not'.casefold() not in col.casefold() and experiment_name.casefold() in col.casefold()), None)
            regular_intensity_col = next((col for col in data.columns if 'Intensity'.casefold() in col.casefold() and 'Reporter'.casefold() not in col.casefold() and experiment_name.casefold() in col.casefold()), None)
            
            if TMTcol:
                return TMTcol, False
            elif regular_intensity_col:
                return regular_intensity_col, False
            else:
                raise ValueError(f"No intensity column found for experiment: {experiment_name}")
    
    def process_experiment_list_max_tmt(data, experiment_list,df_design):
        
        results = []
        a_ix=df_design.set_index('experimentname')
        results_dict={}
        for experiment_name in experiment_list:
            try:
                column_name, has_direct_intensity = find_max_tmt_intensity_column(data, experiment_name)
                matchcolums=find_matching_columns(data,column_name)
                
                results=results+matchcolums
                results_dict[matchcolums[0]]=matchcolums[0]+' '+ str(a_ix.loc[experiment_name]['replicate'])
            except ValueError as e:
                pass
        return results,results_dict
    
    def find_fraglfqintensity_column(data, experiment_name):
        
        
        
        if 'intensity'.casefold() in experiment_name.casefold():
            return experiment_name, True
        
        #intensity_col = next((col for col in data.columns if 'intensity'.casefold() in experiment_name.casefold()), None)
        
        else:
            
            maxlfq_col = next((col for col in data.columns if 'LFQ'.casefold() in col.casefold() and experiment_name.casefold() in col.casefold()), None)
            regular_intensity_col = next((col for col in data.columns if 'Intensity'.casefold() in col.casefold() and 'LFQ'.casefold() not in col.casefold() and experiment_name.casefold() in col.casefold()), None)
            
            if maxlfq_col:
                return maxlfq_col, False
            elif regular_intensity_col:
                return regular_intensity_col, False
            else:
                raise ValueError(f"No intensity column found for experiment: {experiment_name}")

    
    def process_experiment_list_fraglfq(data, experiment_list,df_design):
        
        results = []
        a_ix=df_design.set_index('experimentname')
        results_dict={}
        for experiment_name in experiment_list:
            try:
                column_name, has_direct_intensity = find_fraglfqintensity_column(data, experiment_name)
                matchcolums=find_matching_columns(data,column_name)
                
                results=results+matchcolums
                
                results_dict[matchcolums[0]]=matchcolums[0]+' '+ str(a_ix.loc[experiment_name]['replicate'])
                
            except ValueError as e:
                pass
        return results,results_dict

    def find_fragtmtintensity_column(data, experiment_name):
        
        
        if 'intensity'.casefold() in experiment_name.casefold():
            return experiment_name, True
        
        #intensity_col = next((col for col in data.columns if 'intensity'.casefold() in experiment_name.casefold()), None)
        
        else:
            fragtmt_col = next((col for col in data.columns if 'Intensity'.casefold() not in col.casefold() and experiment_name.casefold() in col.casefold()), None)
            regular_intensity_col = next((col for col in data.columns if 'Intensity'.casefold() in col.casefold() and experiment_name.casefold() in col.casefold()), None)
            
            if fragtmt_col:
                return fragtmt_col, False
            elif regular_intensity_col:
                return regular_intensity_col, False
            else:
                raise ValueError(f"No intensity column found for experiment: {experiment_name}")


    def process_experiment_list_fragtmt(data, experiment_list,df_design):
        
        results = []
        a_ix=df_design.set_index('experimentname')
        results_dict={}
        for experiment_name in experiment_list:
            try:
                column_name, has_direct_intensity = find_fragtmtintensity_column(data, experiment_name)
                matchcolums=find_matching_columns(data,column_name)
                
                results=results+matchcolums
                results_dict[matchcolums[0]]=matchcolums[0]+' '+ str(a_ix.loc[experiment_name]['replicate'])
            except ValueError as e:
                pass
        return results,results_dict


    

    def changeolumns(df_pgs_ix,df_design):
        xc=df_pgs_ix.columns
        #df_design.columns = df_design.columns.str.lower()
        yoursampleN = max([extract_number_from_string(name) for name in df_design['replicate']])
        condition_name=list(set(df_design['condition']))
        df_design_sample_condition=list(set(df_design['condition']))
        sample_names=df_design['experimentname'].tolist()
        samplename= list(set(df_design['samplename']))
        sort_group_pri=df_design.sort_values(by=['condition','samplename', 'replicate'])
        sort_group=list(sort_group_pri['experimentname'])
        #FilterNM
        
        #process_experiment_list_Max_LFQ,process_experiment_list_max_tmt,process_experiment_list_fraglfq,process_experiment_list_fragtmt

        if FilterSoftware=='MaxQuant':
            if Label=='TMT':
                #selected_columns = tmtextract_intensity_columns(xc, sample_names)
                
                #sort_colums=sorttmtextract_intensity_columns(xc,sort_group)
                sort_colums=process_experiment_list_max_tmt(df_pgs_ix,sample_names,df_design)[0]
                renamecolumns=process_experiment_list_max_tmt(df_pgs_ix,sample_names,df_design)[1]
            elif Label=='LFQ':
                
                #selected_columns = extract_intensity_columns(xc, sample_names)
                #sort_colums=sortextract_intensity_columns(xc,sort_group)
                sort_colums=process_experiment_list_Max_LFQ(df_pgs_ix,sort_group,df_design)[0]
                renamecolumns=process_experiment_list_Max_LFQ(df_pgs_ix,sample_names,df_design)[1]
            else:
                pass
        elif FilterSoftware=='FragPipe':
            if Label=='TMT':
                #selected_columns = fragtmtextract_intensity_columns(xc, sample_names)
                #sort_colums=sortfragtmtextract_intensity_columns(xc,sort_group)
                sort_colums=process_experiment_list_fragtmt(df_pgs_ix,sort_group,df_design)[0]
                renamecolumns=process_experiment_list_fragtmt(df_pgs_ix,sample_names,df_design)[1]
            elif Label=='LFQ':
                #selected_columns = extract_intensity_columns(xc, sample_names)
                #sort_colums=sortextract_intensity_columns(xc,sort_group)
                sort_colums=process_experiment_list_fraglfq(df_pgs_ix,sort_group,df_design)[0]
                renamecolumns=process_experiment_list_fraglfq(df_pgs_ix,sample_names,df_design)[1]
            else:
                pass

        #col2= [x for x in xc if (valuesck(x) &  ('intensity corrected' in x) ) |  (valuesck(x) & ('LFQ intensity' in x))] 
        #col2.sort()
        
        #df_pgs_ix2=df_pgs_ix[col2]
        df_pgs_ix2=df_pgs_ix[sort_colums]
        
        
        
        df_pgs_ix2.rename(columns=renamecolumns, inplace=True) 
        
        new_columns = {x:'pool ' + x  for x in df_pgs_ix2.columns if contains_pooling(x)}
        df_pgs_ix2.rename(columns=new_columns, inplace=True) 

        df_design['new_column'] = df_design.apply(lambda x:  x['condition'] + ' '+ str(x['replicate']) , axis=1)
        getdf_design = df_design[['experimentname', 'new_column']]
        


        column_mapping = {}

        for col in getdf_design['new_column'].unique():
            sample_nums = getdf_design['experimentname'][getdf_design['new_column'] == col].tolist()
            column_mapping[col] = sample_nums
        
        
        
        

        #

        #splitvalue=list(set([splitfunc(x) for x in col2]))[0]
        #spcolname=[str(x) for x in list(set([x.split(splitvalue)[0].strip() for x in col2]))][0]#첫번째 컬럼. 
        #yoursampleN=len([x for x in col2 if spcolname in x])

        df_pgs_ix2['concat_samples'] = df_pgs_ix2.apply(lambda x:  ','.join(np.stack(np.isnan(x.values).astype(str)))         , axis=1)
        df_pgs_ix2['ck'] = df_pgs_ix2.apply(lambda x: x3( x['concat_samples'],yoursampleN)   , axis=1)
        df_pgs_ix2['ck2'] = df_pgs_ix2.apply(lambda x: x4( x['concat_samples'])  , axis=1)

        col_count=int(len(sort_colums)/yoursampleN)
        
        aack3=df_pgs_ix2[df_pgs_ix2['ck']==col_count].reset_index() # 2/3,2/3,2/3 ...
        aack0=df_pgs_ix2[df_pgs_ix2['ck']>0].reset_index()  # 2/3,na,na..
        aack2=df_pgs_ix2[df_pgs_ix2['ck2']==True].reset_index() #3/3,3/3,3/3
        concatdf_ix=df_pgs_ix2[['concat_samples']]
            
        return aack3,aack0,aack2,concatdf_ix,yoursampleN
    def missingvalue_topng(x,proj,y,Label):
        if Label=='TMT' and FilterSoftware=='MaxQuant' : # & 
            qnormdata=x[x.columns[1:-3]]
        elif Label=='LFQ' and FilterNM=='quantile':
            qnormdata=qnorm.quantile_normalize(x[x.columns[1:-3]]) 
        elif Label=='LFQ' :
            qnormdata=x[x.columns[1:-3]]
        else:
            qnormdata=x[x.columns[1:-3]]


        #TMT METHOD는  x[x.columns[1:-3]]만 리턴해야할듯?
        
        #sns.heatmap(qnormdata.isnull(),cbar=False)
        #plt.savefig(settings.MEDIA_ROOT+'/images/files%s/%sMissingValue'%(y ,proj), dpi=300)
        #impath=settings.MEDIA_ROOT+'/images/files%s/%sMissingValue.png'%(y ,proj)
        #pcs2=ImgfieldModel(   description=des, path2=impath, username=username ,projecttitle=projecttitle,attr='MissingValue') 
        
        #im = Image.open(impath)
        #       im = im.convert('RGB')

        #blob = BytesIO()
        #im.save(blob, 'png', quality=100)
        
        #pcs2.imagefiles.save('%s%sMissingValue.png'%(y,proj),File(blob), save=False)
        #pcs2.save()
        return qnormdata

    def finparsingdf(df , column_mapping):
        
        df.columns = df.columns.str.replace('.', ' ')
        df[df<0]=0
        
        final_merged_table = pd.DataFrame()
        for new_col, old_cols in column_mapping.items():
            if contains_pooling(new_col)==True:
                pass
            else:
                final_merged_table[new_col] =df[[col for col in df.columns if any(sample_name.casefold() in col.casefold() for sample_name in old_cols)]].sum(axis=1)
        
        final_merged_table.columns = final_merged_table.columns.str.replace(' ', '.')
        return final_merged_table
 




        
    def rpy2scripts(file_root2,imgpath,des,yourN):
        #FilterNM,FilterSoftware,FilterIM
        ##FilterSoftware가 fragpipe일경우 SL하지마. FilterIM RF,knn,PCA
        filename=file_root2
        imgpath2=imgpath
        yourn=yourN
        
        
        
        #csvread <- read.csv('%s', header = T)
        #col_headers <- colnames(csvread)
        #colnames(csvread) <- col_headers
        #aaa2=missForest(csvread,ntree = 100)
        #imp2=aaa2$ximp
        #aaaimp2=missForest(data_irs_tmm,ntree = 100)
        #data_irs_tmmaddimp=aaaimp2$ximp    
        robjects.r('''
            csvread <- read.csv('%s', header = T)
            col_headers <- colnames(csvread)
            colnames(csvread) <- col_headers
            
            




            if ('%s' == 'RF') {
            aaaimp2=missForest(csvread,ntree = 100)
            imp2=aaaimp2$ximp
                
            } else if ('%s' =='KNN'){
            imp2 <- kNN(csvread, k=5,imp_var=FALSE)

            } else if ( '%s' =='PCA'){
                imputed_data <- imputePCA(csvread, ncp = 3)
                imp2 <- as.data.frame(imputed_data$completeObs)
            } else {

            imp2<-csvread
            }


             if ('%s' == 'MaxQuant'){


            val2=%s
            poolings <- grep('pool|Pool|pooling|Pooling', colnames(imp2))
            polname=colnames(imp2[c(poolings)])
            wholename=colnames(imp2)
            val2=strtoi(val2, base=0L)
            notinpool=imp2[c(setdiff(wholename,polname))]
            lengthvalue=(length(colnames(notinpool))/val2)
       





            expraw<-NULL
            expsl<-NULL
            sum<-NULL
            fac<-NULL
            for(i in 1:val2){   
            
            expraw <- c(expraw,stringr::str_interp("exp${i}_raw")) 
            expsl <- c(expsl,stringr::str_interp("exp${i}_sl")) 
            sum <- c(sum,stringr::str_interp("sum${i}")) 
            fac <- c(fac,stringr::str_interp("fac${i}")) 
            }

            for(i in 1:val2){   
            assign(expraw[i], notinpool[c((lengthvalue*(i-1)+1):(lengthvalue*i))]) 
            
            
            }

             target<-NULL
             for(i in 1:val2){   
                 target <- c(target,colSums(get(expraw[i]))) 
                 
                }
            target<-mean(target)


            for(i in 1:val2){   
            norm_facs  <-target / colSums(get(expraw[i]))
            assign(expsl[i],  sweep(get(expraw[i]), 2, norm_facs, FUN = "*")  ) 
            
            }
            data_sl<-NULL
            data_sl<-as.data.frame(get(expsl[1]))
            for(i in 2:val2){   
            data_sl <- cbind(data_sl,as.data.frame(get(expsl[i]))) 
                
                }
            sl_tmm <- calcNormFactors(data_sl)
            data_sl_tmm <- sweep(data_sl, 2, sl_tmm, FUN = "/") 


            irs<-NULL
            irs<-tibble(rowSums(as.data.frame(get(expsl[1]))))
            for(i in 2:val2){   
            irs <-  add_column(irs, !!('ab') := rowSums(as.data.frame(get(expsl[i])))) 
            colnames(irs)<- sum[c(1:i)]
            
            }
            irs$average <- apply(irs, 1, function(x) exp(mean(log(x))))
            irsfacs<-NULL
            irsfacs<-tibble(irs$average / irs$sum1)
            for(i in 2:val2){   
            frame<-  as.data.frame(irs[colnames(irs)[i]])
            colnames(frame)<-'NULL'
            irsfacs <-  add_column(irsfacs, !!('ab') := irs$average / frame$'NULL') 
            colnames(irsfacs)<- fac[c(1:i)]
            
            
            }

            data_irs <- get(expsl[1]) * irsfacs$fac1
            for (i in 2:val2){
            
            frame<-  as.data.frame(irsfacs[colnames(irsfacs)[i]])
            colnames(frame)<-'NULL'
            data_irs <- cbind(data_irs, get(expsl[i]) *frame$'NULL' )
            
            
            
            }
            irs_tmm <- calcNormFactors(data_irs)
            data_irs_tmm <- sweep(data_irs, 2, irs_tmm, FUN = "/") 

            







            c25 <- c(
            "dodgerblue2", "#E31A1C", # red
            "green4",
            "#6A3D9A", # purple
            "#FF7F00", # orange
            "black", "gold1",
            "skyblue2", "#FB9A99", # lt pink
            "palegreen2",
            "#CAB2D6", # lt purple
            "#FDBF6F", # lt orange
            "gray70", "khaki2",
            "maroon", "orchid1", "deeppink1", "blue1", "steelblue4",
            "darkturquoise", "green1", "yellow4", "yellow3",
            "darkorange4", "brown"
            )












             } else{

               fragpipe<- imp2

             }




        '''%(filename,FilterIM,FilterIM,FilterIM,FilterSoftware,yourn))

        if FilterSoftware=='MaxQuant':
            robjects.r("write.csv(data_irs_tmm,'./media/%sdata_irs_tmm.csv',row.names=FALSE)"%des)
            
            robjects.r( "png('%sClean/%sdata_Clean_box.png',width=1200,height=1000) "%(imgpath2,des))
            robjects.r("p<-boxplot(log2(notinpool), notch = TRUE, col = rep(c25[1:val2], each = lengthvalue),         main = 'Raw data\nExp1 (red), Exp2 (green), Exp3 (blue)',        xlab = 'TMT Sample', ylab = 'log2 of Intensity')")
            robjects.r("print(p)")
            robjects.r( "dev.off()")
            robjects.r( "png('%sClean/%sdata_Clean_Densities.png',width=1200,height=1000) "%(imgpath2,des))
            robjects.r("p<-plotDensities(log2(notinpool), rep(c25[1:val2],lengthvalue), main = 'Raw data')")
            robjects.r("print(p)")
            robjects.r( "dev.off()")
            
            robjects.r( "png('%sSL/%sdata_SL_tmmbox.png',width=1200,height=1000) "%(imgpath2,des))
            robjects.r("p<-boxplot(log2(data_sl_tmm), notch = TRUE, col = rep(c25[1:val2], each = lengthvalue),         main = 'TMM normalization of SL data\nExp1 (red), Exp2 (green), Exp3 (blue)',        xlab = 'TMT Sample', ylab = 'log2 of Intensity')")
            robjects.r("print(p)")
            robjects.r( "dev.off()")
            robjects.r( "png('%sSL/%sdata_SL_tmmDensities.png',width=1200,height=1000) "%(imgpath2,des))
            robjects.r("p<-plotDensities(log2(data_sl_tmm), rep(c25[1:val2],lengthvalue), main = 'SL/TMM normalization')")
            robjects.r("print(p)")
            robjects.r( "dev.off()")
            robjects.r( "png('%sSL/%sdata_SL_tmmMDS.png',width=1200,height=1000) "%(imgpath2,des))
            robjects.r("p<-plotMDS(log2(data_sl_tmm), col = rep(c25[1:val2], each = lengthvalue),         main = 'SL/TMM clusters group by TMT experiment')")
            robjects.r("print(p)")
            robjects.r( "dev.off()")
            robjects.r( "png('%sIRS/%sdata_IRS_tmmbox.png',width=1200,height=1000) "%(imgpath2,des))
            robjects.r("p<-boxplot(log2(data_irs_tmm), notch = TRUE, col = rep(c25[1:val2], each = lengthvalue),         main = 'TMM normalization of IRS data\nExp1 (red), Exp2 (green), Exp3 (blue)',        xlab = 'TMT Sample', ylab = 'log2 of Intensity')")
            robjects.r("print(p)")
            robjects.r( "dev.off()")
            robjects.r( "png('%sIRS/%sdata_IRS_tmmDensities.png',width=1200,height=1000) "%(imgpath2,des))
            robjects.r("p<-plotDensities(log2(data_irs_tmm), col = rep(c25[1:val2],lengthvalue), main = 'IRS/TMM data')")
            robjects.r("print(p)")
            robjects.r( "dev.off()")
            robjects.r( "png('%sIRS/%sdata_IRS_tmmMDS.png',width=1200,height=1000) "%(imgpath2,des))
            robjects.r("p<-plotMDS(log2(data_irs_tmm), col = rep(c25[1:val2], each = lengthvalue), main = 'clusters group by TMT experiment')")
            robjects.r("print(p)")
            robjects.r( "dev.off()")
            
            listimages =['data_Clean_box','data_Clean_Densities','data_SL_tmmbox','data_SL_tmmDensities', 'data_SL_tmmMDS', 'data_IRS_tmmbox', 'data_IRS_tmmDensities', 'data_IRS_tmmMDS']
            for x in listimages:
                SLorIRS=    x.split('_')[1]#.upper()
                path3=imgpath2.split('/images/')[1]
                impath='%s%s/%s%s.png'%(imgpath2,SLorIRS,des,x)
                pcs2=ImgfieldModel(   description=des, path2=impath, username=username ,projecttitle=projecttitle,attr=x) 
                
                im = Image.open(impath)
        #       im = im.convert('RGB')
                blob = BytesIO()
                im.save(blob, 'png', quality=100)
                
                pcs2.imagefiles.save('%s%s%s%s.png'%(path3,SLorIRS,des,x),File(blob), save=False)
                
                pcs2.save() 
        else:
            robjects.r("write.csv(fragpipe,'./media/%sdata_irs_tmm.csv',row.names=FALSE)"%des)


        df_irs_tmm=pd.read_csv('./media/%sdata_irs_tmm.csv'%des)
        fs.delete('./media/%sdata_irs_tmm.csv'%des)
        return df_irs_tmm
        
    def rpy2scriptspool(file_root2,imgpath,des,yourN):
        #FilterNM,FilterSoftware,FilterIM
        ##FilterSoftware가 fragpipe일경우 SL하지마. FilterIM RF,knn,PCA
        filename=file_root2
        imgpath2=imgpath
        yourn=yourN
        #csvread <- read.csv('%s', header = T)
        #col_headers <- colnames(csvread)
        #colnames(csvread) <- col_headers
        #aaa2=missForest(csvread,ntree = 100)
        #imp2=aaa2$ximp


        #aaaimp2=missForest(data_irs_tmm,ntree = 100)
            
        #data_irs_tmmaddimp=aaaimp2$ximp

        
        robjects.r('''
            csvread <- read.csv('%s', header = T)
            col_headers <- colnames(csvread)
            colnames(csvread) <- col_headers
            
            


            if ('%s' == 'RF') {
            aaaimp2=missForest(csvread,ntree = 100)
            imp2=aaaimp2$ximp
                
            } else if ('%s' =='KNN'){
            imp2 <- kNN(csvread, k=5,imp_var=FALSE)

            } else if ( '%s' =='PCA'){
                imputed_data <- imputePCA(csvread, ncp = 3)
                imp2 <- as.data.frame(imputed_data$completeObs)

            } else {
            imp2<-csvread
            }

            val2=%s
            poolings <- grep('pool|Pool|pooling|Pooling', colnames(imp2))
            polname=colnames(imp2[c(poolings)])
            

            wholename=colnames(imp2)
            val2=strtoi(val2, base=0L)
            notinpool=imp2[c(setdiff(wholename,polname))]
            inpool=   imp2[c(polname)]
            lengthvalue=length(colnames(notinpool))/val2


             if ('%s' == 'MaxQuant') {

        
           
            
            
     


            expraw<-NULL
            expsl<-NULL
            sum<-NULL
            fac<-NULL
            for(i in 1:val2){   
            
            expraw <- c(expraw,stringr::str_interp("exp${i}_raw")) 
            expsl <- c(expsl,stringr::str_interp("exp${i}_sl")) 
            sum <- c(sum,stringr::str_interp("sum${i}")) 
            fac <- c(fac,stringr::str_interp("fac${i}")) 
            }

            for(i in 1:val2){   
            assign(expraw[i], notinpool[c((lengthvalue*(i-1)+1):(lengthvalue*i))]) 
            
            
            }

            target <- mean(c(colSums(inpool)))


            for(i in 1:val2){   
            norm_facs  <-target / colSums(get(expraw[i]))
            assign(expsl[i],  sweep(get(expraw[i]), 2, norm_facs, FUN = "*")  ) 
            
            }
            data_sl<-NULL
            data_sl<-as.data.frame(get(expsl[1]))
            for(i in 2:val2){   
            data_sl <- cbind(data_sl,as.data.frame(get(expsl[i]))) 
                
                }
            sl_tmm <- calcNormFactors(data_sl)
            data_sl_tmm <- sweep(data_sl, 2, sl_tmm, FUN = "/") 


            irs<-NULL
            irs<-tibble(rowSums(as.data.frame(get(expsl[1]))))
            for(i in 2:val2){   
            irs <-  add_column(irs, !!('ab') := rowSums(as.data.frame(get(expsl[i])))) 
            colnames(irs)<- sum[c(1:i)]
            
            }
            irs$average <- apply(irs, 1, function(x) exp(mean(log(x))))
            irsfacs<-NULL
            irsfacs<-tibble(irs$average / irs$sum1)
            for(i in 2:val2){   
            frame<-  as.data.frame(irs[colnames(irs)[i]])
            colnames(frame)<-'NULL'
            irsfacs <-  add_column(irsfacs, !!('ab') := irs$average / frame$'NULL') 
            colnames(irsfacs)<- fac[c(1:i)]
            }
            data_irs <- get(expsl[1]) * irsfacs$fac1
            for (i in 2:val2){
            frame<-  as.data.frame(irsfacs[colnames(irsfacs)[i]])
            colnames(frame)<-'NULL'
            data_irs <- cbind(data_irs, get(expsl[i]) *frame$'NULL' )}
            irs_tmm <- calcNormFactors(data_irs)
            data_irs_tmm <- sweep(data_irs, 2, irs_tmm, FUN = "/") 

            


            c25 <- c(
            "dodgerblue2", "#E31A1C", # red
            "green4",
            "#6A3D9A", # purple
            "#FF7F00", # orange
            "black", "gold1",
            "skyblue2", "#FB9A99", # lt pink
            "palegreen2",
            "#CAB2D6", # lt purple
            "#FDBF6F", # lt orange
            "gray70", "khaki2",
            "maroon", "orchid1", "deeppink1", "blue1", "steelblue4",
            "darkturquoise", "green1", "yellow4", "yellow3",
            "darkorange4", "brown"
            )
          
                
            } else {
                    fragpipe<-notinpool


            }








            


        '''%(filename,FilterIM,FilterIM,FilterIM,yourn ,FilterSoftware)) 

        if FilterSoftware=='MaxQuant':
            robjects.r("write.csv(data_irs_tmm,'./media/%sdata_irs_tmm.csv',row.names=FALSE)"%des)

            robjects.r( "png('%sClean/%sdata_Clean_box.png',width=1200,height=1000) "%(imgpath2,des))
            robjects.r("p<-boxplot(log2(notinpool), notch = TRUE, col = rep(c25[1:val2], each = lengthvalue),         main = 'Raw data\nExp1 (red), Exp2 (green), Exp3 (blue)',        xlab = 'TMT Sample', ylab = 'log2 of Intensity')")
            robjects.r("print(p)")
            robjects.r( "dev.off()")
            robjects.r( "png('%sClean/%sdata_Clean_Densities.png',width=1200,height=1000) "%(imgpath2,des))
            robjects.r("p<-plotDensities(log2(notinpool), rep(c25[1:val2],lengthvalue), main = 'Raw data')")
            robjects.r("print(p)")
            robjects.r( "dev.off()")        
            
            robjects.r( "png('%sSL/%sdata_SL_tmmbox.png',width=1200,height=1000) "%(imgpath2,des))
            robjects.r("p<-boxplot(log2(data_sl_tmm), notch = TRUE, col = rep(c25[1:val2], each = lengthvalue),         main = 'TMM normalization of SL data\nExp1 (red), Exp2 (green), Exp3 (blue)',        xlab = 'TMT Sample', ylab = 'log2 of Intensity')")
            robjects.r("print(p)")
            robjects.r( "dev.off()")
            # each = lengthvalue
            robjects.r( "png('%sSL/%sdata_SL_tmmDensities.png',width=1200,height=1000) "%(imgpath2,des))
            robjects.r("p<-plotDensities(log2(data_sl_tmm), col = rep(c25[1:val2],lengthvalue), main = 'SL/TMM normalization')")
            robjects.r("print(p)")
            robjects.r( "dev.off()")
            robjects.r( "png('%sSL/%sdata_SL_tmmMDS.png',width=1000,height=1000) "%(imgpath2,des))
            robjects.r("p<-plotMDS(log2(data_sl_tmm), col = rep(c25[1:val2], each = lengthvalue),         main = 'SL/TMM clusters group by TMT experiment')")
            robjects.r("print(p)")
            robjects.r( "dev.off()")
            robjects.r( "png('%sIRS/%sdata_IRS_tmmbox.png',width=1200,height=1000) "%(imgpath2,des))
            robjects.r("p<-boxplot(log2(data_irs_tmm), notch = TRUE, col = rep(c25[1:val2], each = lengthvalue),         main = 'TMM normalization of IRS data\nExp1 (red), Exp2 (green), Exp3 (blue)',        xlab = 'TMT Sample', ylab = 'log2 of Intensity')")
            robjects.r("print(p)")
            robjects.r( "dev.off()")
            robjects.r( "png('%sIRS/%sdata_IRS_tmmDensities.png',width=1200,height=1000) "%(imgpath2,des))
            robjects.r("p<-plotDensities(log2(data_irs_tmm), col = rep(c25[1:val2],lengthvalue), main = 'IRS/TMM data')")
            robjects.r("print(p)")
            robjects.r( "dev.off()")
            robjects.r( "png('%sIRS/%sdata_IRS_tmmMDS.png',width=1000,height=1000) "%(imgpath2,des))
            robjects.r("p<-plotMDS(log2(data_irs_tmm), col = rep(c25[1:val2], each = lengthvalue), main = 'IRS clusters group by TMT experiment')")
            robjects.r("print(p)")
            robjects.r( "dev.off()")
            
            listimages =['data_Clean_box','data_Clean_Densities','data_SL_tmmbox','data_SL_tmmDensities', 'data_SL_tmmMDS', 'data_IRS_tmmbox', 'data_IRS_tmmDensities', 'data_IRS_tmmMDS']
            for x in listimages:
                SLorIRS=    x.split('_')[1]#.upper()
                path3=imgpath2.split('/images/')[1]
                impath='%s%s/%s%s.png'%(imgpath2,SLorIRS,des,x)
                pcs2=ImgfieldModel(   description=des, path2=impath, username=username ,projecttitle=projecttitle,attr=x) 
                
                im = Image.open(impath)
        #       im = im.convert('RGB')
                blob = BytesIO()
                im.save(blob, 'png', quality=100)
                
                pcs2.imagefiles.save('%s%s%s%s.png'%(path3,SLorIRS,des,x),File(blob), save=False)
                
                pcs2.save()
        else:
            robjects.r("write.csv(fragpipe,'./media/%sdata_irs_tmm.csv',row.names=FALSE)"%des)

        df_irs_tmm=pd.read_csv('./media/%sdata_irs_tmm.csv'%des)
        fs.delete('./media/%sdata_irs_tmm.csv'%des)
        return df_irs_tmm

    def rpy2scriptsLFQ(file_root2,file_root22,imgpath,des,yourN): #impute method, 
        
        
        


        #FilterNM vsn. FilterIM RF,knn,PCA
        filename=file_root2
        filename2=file_root22
        imgpath2=imgpath
        yourn=yourN
        
        
        robjects.r('''


            csvread <- read.csv('%s', header = T)
            col_headers <- colnames(csvread)
            colnames(csvread) <- col_headers
            
            csvread2 <- read.csv('%s', header = T)
            col_headers2 <- colnames(csvread2)
            colnames(csvread2) <- col_headers2

            val2=%s
            val2=strtoi(val2, base=0L)
            
            lengthvalue=length(colnames(csvread))/val2

             vsnNorm <- function(dat) {
            vsnNormed <- suppressMessages(vsn::justvsn(as.matrix(dat)))
            colnames(vsnNormed) <- colnames(dat)
            row.names(vsnNormed) <- rownames(dat)
            return(as.matrix(vsnNormed))
            }


             if ('%s' == 'VSN') {
              vsndata<-  vsnNorm(csvread)
           
             if ('%s' == 'RF') {

            aaaimp2=missForest(vsndata,ntree = 100)
            data_LFQaddimp=aaaimp2$ximp
                
            } else if ('%s' =='KNN'){
                data_LFQaddimp <- kNN(vsndata, k=5,imp_var=FALSE)
            } else if ( '%s' =='PCA'){
                imputed_data <- imputePCA(vsndata, ncp = 3)
                data_LFQaddimp <- as.data.frame(imputed_data$completeObs)
            } else {
data_LFQaddimp<-vsndata
            }
            } else {
             if ('%s' == 'RF') {
            aaaimp2=missForest(csvread,ntree = 100)
            data_LFQaddimp=aaaimp2$ximp
                
            } else if ('%s' =='KNN'){
            data_LFQaddimp <- kNN(csvread, k=5,imp_var=FALSE)

            } else if ( '%s' =='PCA'){
                imputed_data <- imputePCA(csvread, ncp = 3)
                data_LFQaddimp <- as.data.frame(imputed_data$completeObs)
            } else {
data_LFQaddimp<-csvread
            }



           
            } 










            c25 <- c(
            "dodgerblue2", "#E31A1C", # red
            "green4",
            "#6A3D9A", # purple
            "#FF7F00", # orange
            "black", "gold1",
            "skyblue2", "#FB9A99", # lt pink
            "palegreen2",
            "#CAB2D6", # lt purple
            "#FDBF6F", # lt orange
            "gray70", "khaki2",
            "maroon", "orchid1", "deeppink1", "blue1", "steelblue4",
            "darkturquoise", "green1", "yellow4", "yellow3",
            "darkorange4", "brown"
            )










        '''%(filename,filename2,yourn,FilterNM,FilterIM,FilterIM,FilterIM,FilterIM,FilterIM,FilterIM))


        robjects.r("write.csv(data_LFQaddimp,'./media/%sdata_LFQaddimp.csv',row.names=FALSE)"%des)

        robjects.r( "png('%sClean/%sdata_Clean_box.png',width=1200,height=1000) "%(imgpath2,des))
        robjects.r("p<-boxplot(log2(csvread2), notch = TRUE, col = rep(c25[1:val2], each = lengthvalue),         main = 'Raw data\nExp1 (red), Exp2 (green), Exp3 (blue)',        xlab = 'RAW Sample', ylab = 'log2 of Intensity')")
        robjects.r("print(p)")
        robjects.r( "dev.off()")
        
        robjects.r( "png('%sClean/%sdata_Clean_Densities.png',width=1200,height=1000) "%(imgpath2,des))
        robjects.r("p<-plotDensities(log2(csvread2), col = rep(c25[1:val2],lengthvalue), main = 'Raw data')")
        robjects.r("print(p)")
        robjects.r( "dev.off()")

        robjects.r( "png('%sNorm/%sdata_Norm_box.png',width=1200,height=1000) "%(imgpath2,des))
        robjects.r("p<-boxplot(log2(csvread), notch = TRUE, col = rep(c25[1:val2], each = lengthvalue),         main = 'data_Norm box \nExp1 (red), Exp2 (green), Exp3 (blue)',        xlab = 'Norm Sample', ylab = 'log2 of Intensity')")
        robjects.r("print(p)")
        robjects.r( "dev.off()")
        
        robjects.r( "png('%sNorm/%sdata_Norm_Densities.png',width=1200,height=1000) "%(imgpath2,des))
        robjects.r("p<-plotDensities(log2(csvread), col = rep(c25[1:val2],lengthvalue), main = 'data Norm Densities')")
        robjects.r("print(p)")
        robjects.r( "dev.off()")
        
        listimages =['data_Clean_box','data_Clean_Densities', 'data_Norm_box', 'data_Norm_Densities']
        for x in listimages:
            CorN=    x.split('_')[1]#.upper()
            path3=imgpath2.split('/images/')[1]
            impath='%s%s/%s%s.png'%(imgpath2,CorN,des,x)
            pcs2=ImgfieldModel(   description=des, path2=impath, username=username ,projecttitle=projecttitle,attr=x) 
            
            im = Image.open(impath)
    #       im = im.convert('RGB')
            blob = BytesIO()
            im.save(blob, 'png', quality=100)
            
            pcs2.imagefiles.save('%s%s%s%s.png'%(path3,CorN,des,x),File(blob), save=False)
            
            pcs2.save() 

        LFQ=pd.read_csv('./media/%sdata_LFQaddimp.csv'%des)
        #fs.delete('./media/%sdata_LFQaddimp.csv'%des)
        return LFQ

 
    



    def read_proteingroups(file_root,filedesign):
        
        #read proteingroups
        progress_recorder.set_progress( 2,seconds)
        df_pgs = pd.read_csv(f'{file_root}', sep='\t')

        
        df_design = pd.read_csv(f'{filedesign}', sep='\t')
        
        if FilterSoftware =='MaxQuant':
            dfoneparse=df_pgs[~(df_pgs['Reverse'] =="+")]
            df_lescontam=dfoneparse[~(dfoneparse['Potential contaminant']=="+")]
        else:
            df_lescontam=df_pgs

        
        
        df_lescontam = df_lescontam.replace(0, np.NaN)

        


        df_design.columns = df_design.columns.str.lower()
        #df_pgs_ix=df_lescontam[maskcolumns(df_lescontam.columns)] # columns123영역
        df_pgs_ix13=df_lescontam[maskcolumns13(df_lescontam.columns)] #columns1,3영역
        #df_pgs_ix13.columns = changeolumns(df_pgs_ix.columns, NOS,S_INFO,df_pgs_ix)[0]
        results=changeolumns(df_lescontam,df_design)

        concat_ix2323= results[0]
        concat_ix23na= results[1]
        concat_ix3333= results[2] #filterrow data
        alreadyones= results[3]
        yoursampleN2 = int(results[4])
        print(yoursampleN2)
        progress_recorder.set_progress( 3,  10)
        #revalues=pd.concat([df_pgs_ix13, alreadyones], axis=1)
        #revalues=revalues.reset_index()
        #['experimentname','samplename','condition','replicate']

        
        df_design['new_column'] = df_design.apply(lambda x:  x['condition'] + ' '+ str(x['replicate']) , axis=1)
        getdf_design = df_design[['experimentname', 'new_column']]
        
        column_mapping = {}

        for col in getdf_design['new_column'].unique():
            sample_nums = getdf_design['experimentname'][getdf_design['new_column'] == col].tolist()
            column_mapping[col] = sample_nums
        
        
        
        #new_columns = {x:'pool ' + x  for x in gg.columns if contains_pooling(x)}

        #gg.rename(columns=new_columns, inplace=True)   
        #concat_ix2323.to_csv(settings.MEDIA_ROOT+'/'+des+'2323.csv',index=False)
        
        #df_pgs_ix13.to_csv(settings.MEDIA_ROOT+'/'+des+'df_pgs_ix13.csv',index=False)
        #concat_ix3333.to_csv(settings.MEDIA_ROOT+'/'+des+'concat_ix3333.csv',index=False)
        #concat_ix23na.to_csv(settings.MEDIA_ROOT+'/'+des+'concat_ix23na.csv',index=False)
        #concat_ix2323.to_csv(settings.MEDIA_ROOT+'/'+des+'concat_ix2323.csv',index=False)
        if FilterDES=='NA.omit':
            norm3333= missingvalue_topng(concat_ix3333,des,'3333',Label)
            dfpgs3333=df_pgs_ix13.loc[concat_ix3333['index'].tolist()].reset_index()
            progress_recorder.set_progress( 4,  10)
            if Label=='TMT':
                columns2pooling=[x for x in norm3333.columns if contains_pooling(x)]
                norm3333[othersort(norm3333.columns,yoursampleN2)].to_csv(settings.MEDIA_ROOT+'/'+des+'3333.csv',index=False)
                filename3333=settings.MEDIA_ROOT+'/'+des+'3333.csv'
                progress_recorder.set_progress( 5,  10)
                if len(columns2pooling)>0:
                    test3333=   rpy2scriptspool(filename3333,settings.MEDIA_ROOT+'/images/files3333',des,yoursampleN2)
                    
                    progress_recorder.set_progress( 6,  10)
                    out3333=finparsingdf(test3333,column_mapping)
                    concat_pgs_ix3333 =pd.concat([dfpgs3333, out3333], axis=1)
                    concat_pgs_ix3333.to_csv(settings.MEDIA_ROOT+'/filteredTable/files3333/%s3333.csv'%des)
                    progress_recorder.set_progress( 7,  10) 
                    #fs.delete(filename3333)
                    getcolumns=out3333.columns
                else:
                    test3333=   rpy2scripts(filename3333,settings.MEDIA_ROOT+'/images/files3333',des,yoursampleN2)#,yoursampleN2
                    progress_recorder.set_progress( 6,  10)
                    out3333=finparsingdf(test3333,column_mapping)
                    concat_pgs_ix3333 =pd.concat([dfpgs3333, out3333], axis=1)
                    concat_pgs_ix3333.to_csv(settings.MEDIA_ROOT+'/filteredTable/files3333/%s3333.csv'%des)
                    progress_recorder.set_progress( 7,  10) 
                    #fs.delete(filename3333)
                    getcolumns=out3333.columns
            else:
                norm3333[othersort(norm3333.columns,yoursampleN2)].to_csv(settings.MEDIA_ROOT+'/'+des+'3333.csv',index=False)
                concat_ix3333[concat_ix3333.columns[1:-3]][othersort(concat_ix3333.columns[1:-3],yoursampleN2)].to_csv(settings.MEDIA_ROOT+'/'+des+'CL3333.csv',index=False)

                filename3333=settings.MEDIA_ROOT+'/'+des+'3333.csv'
                filenameCL3333=settings.MEDIA_ROOT+'/'+des+'CL3333.csv'
                test3333=rpy2scriptsLFQ(filename3333,filenameCL3333,settings.MEDIA_ROOT+'/images/files3333',des,yoursampleN2)
                
                progress_recorder.set_progress( 5,  10)
                out3333=finparsingdf(test3333,column_mapping)
                concat_pgs_ix3333 =pd.concat([dfpgs3333, out3333], axis=1)
                concat_pgs_ix3333.to_csv(settings.MEDIA_ROOT+'/filteredTable/files3333/%s3333.csv'%des)
                progress_recorder.set_progress( 6,  10)
                progress_recorder.set_progress( 7,  10) 
                fs.delete(filename3333)
                fs.delete(filenameCL3333)
                getcolumns=out3333.columns
        elif FilterDES =='ALL23':
            norm2323= missingvalue_topng(concat_ix2323,des,'2323',Label)
            dfpgs2323=df_pgs_ix13.loc[concat_ix2323['index'].tolist()].reset_index() 
            progress_recorder.set_progress( 4,  10)
            if Label=='TMT':
                columns2pooling=[x for x in norm2323.columns if contains_pooling(x)]
                norm2323[othersort(norm2323.columns,yoursampleN2)].to_csv(settings.MEDIA_ROOT+'/'+des+'2323.csv',index=False)
                filename23=settings.MEDIA_ROOT+'/'+des+'2323.csv'
                progress_recorder.set_progress( 5,  10)
                if len(columns2pooling)>0:
                    
                    test2323=   rpy2scriptspool(filename23,settings.MEDIA_ROOT+'/images/files2323',des,yoursampleN2)#,yoursampleN2
                    progress_recorder.set_progress( 6,  10)
                    out2323=finparsingdf(test2323,column_mapping)
                    concat_pgs_ix2323 =pd.concat([dfpgs2323, out2323], axis=1)
                    concat_pgs_ix2323.to_csv(settings.MEDIA_ROOT+'/filteredTable/files2323/%s2323.csv'%des)
                    progress_recorder.set_progress( 7,  10) 
                    #fs.delete(filename23)
                    getcolumns=out2323.columns
                else:
                    test2323=   rpy2scripts(filename23,settings.MEDIA_ROOT+'/images/files2323',des,yoursampleN2)#,yoursampleN2
                    progress_recorder.set_progress( 6,  10)
                    out2323=finparsingdf(test2323,column_mapping)
                    concat_pgs_ix2323 =pd.concat([dfpgs2323, out2323], axis=1)   
                    concat_pgs_ix2323.to_csv(settings.MEDIA_ROOT+'/filteredTable/files2323/%s2323.csv'%des)
                    progress_recorder.set_progress( 7,  10) 
                    #fs.delete(filename23)
                    getcolumns=out2323.columns
            else:
                norm2323[othersort(norm2323.columns,yoursampleN2)].to_csv(settings.MEDIA_ROOT+'/'+des+'2323.csv',index=False)
                concat_ix2323[concat_ix2323.columns[1:-3]][othersort(concat_ix2323.columns[1:-3],yoursampleN2)].to_csv(settings.MEDIA_ROOT+'/'+des+'CL2323.csv',index=False)

                filename23=settings.MEDIA_ROOT+'/'+des+'2323.csv'
                filenameCL23=settings.MEDIA_ROOT+'/'+des+'CL2323.csv'
                test2323=rpy2scriptsLFQ(filename23,filenameCL23,settings.MEDIA_ROOT+'/images/files2323',des,yoursampleN2)
                progress_recorder.set_progress( 5,  10)
                out2323=finparsingdf(test2323,column_mapping)
                concat_pgs_ix2323 =pd.concat([dfpgs2323, out2323], axis=1)

                concat_pgs_ix2323.to_csv(settings.MEDIA_ROOT+'/filteredTable/files2323/%s2323.csv'%des)
                progress_recorder.set_progress( 6,  10)
                progress_recorder.set_progress( 7,  10) 
                fs.delete(filename23)
                fs.delete(filenameCL23)
                getcolumns=out2323.columns
        else:
            norm23na= missingvalue_topng(concat_ix23na,des,'23na',Label)
            dfpgs23na=df_pgs_ix13.loc[concat_ix23na['index'].tolist()].reset_index()
            progress_recorder.set_progress( 4,  10)
            #concat_ix23na[concat_ix23na.columns[1:-3]][othersort(concat_ix23na.columns[1:-3],yoursampleN2)]
            if Label=='TMT':
                columns2pooling=[x for x in norm23na.columns if contains_pooling(x)]
                norm23na[othersort(norm23na.columns,yoursampleN2)].to_csv(settings.MEDIA_ROOT+'/'+des+'23na.csv',index=False)
                filename23na=settings.MEDIA_ROOT+'/'+des+'23na.csv'
                progress_recorder.set_progress( 5,  10)
                if len(columns2pooling)>0:
                    test23na=   rpy2scriptspool(filename23na,settings.MEDIA_ROOT+'/images/files23na',des,yoursampleN2)#,yoursampleN2
                    progress_recorder.set_progress( 6,  10)
                    out23na=finparsingdf(test23na,column_mapping)
                    concat_pgs_ix23na =pd.concat([dfpgs23na, out23na], axis=1)
                    concat_pgs_ix23na.to_csv(settings.MEDIA_ROOT+'/filteredTable/files23na/%s23na.csv'%des)
                    progress_recorder.set_progress( 7,  10) 
                    #fs.delete(filename23na)
                    getcolumns=out23na.columns
                    
                else:
                    test23na=   rpy2scripts(filename23na,settings.MEDIA_ROOT+'/images/files23na',des,yoursampleN2)#,yoursampleN2
                    progress_recorder.set_progress( 6,  10)
                    out23na=finparsingdf(test23na,column_mapping) 
                    concat_pgs_ix23na =pd.concat([dfpgs23na, out23na], axis=1)
                    concat_pgs_ix23na.to_csv(settings.MEDIA_ROOT+'/filteredTable/files23na/%s23na.csv'%des)
                    progress_recorder.set_progress( 7,  10) 
                    #fs.delete(filename23na)
                    getcolumns=out23na.columns
            else:
                norm23na[othersort(norm23na.columns,yoursampleN2)].to_csv(settings.MEDIA_ROOT+'/'+des+'23na.csv',index=False)                
                concat_ix23na[concat_ix23na.columns[1:-3]][othersort(concat_ix23na.columns[1:-3],yoursampleN2)].to_csv(settings.MEDIA_ROOT+'/'+des+'CL23na.csv',index=False)

                filename23na=settings.MEDIA_ROOT+'/'+des+'23na.csv'
                filenameCL23na=settings.MEDIA_ROOT+'/'+des+'CL23na.csv'
                test23na=rpy2scriptsLFQ(filename23na,filenameCL23na,settings.MEDIA_ROOT+'/images/files23na',des,yoursampleN2)
                
                progress_recorder.set_progress( 5,  10)
                out23na=finparsingdf(test23na,column_mapping) 
                concat_pgs_ix23na =pd.concat([dfpgs23na, out23na], axis=1)
                concat_pgs_ix23na.to_csv(settings.MEDIA_ROOT+'/filteredTable/files23na/%s23na.csv'%des)
                progress_recorder.set_progress( 6,  10)
                progress_recorder.set_progress( 7,  10) 
                
                fs.delete(filename23na)
                fs.delete(filenameCL23na)
                getcolumns=out23na.columns

        #norm2323= missingvalue_topng(concat_ix2323,des,'2323')
        #norm23na= missingvalue_topng(concat_ix23na,des,'23na')
        #norm3333= missingvalue_topng(concat_ix3333,des,'3333') #norm data ,missing value to png
       
        #dfpgs2323=df_pgs_ix13.loc[concat_ix2323['index'].tolist()].reset_index() #2323 index영역 , columns 13 영역
        #dfpgs23na=df_pgs_ix13.loc[concat_ix23na['index'].tolist()].reset_index() #
        #dfpgs3333=df_pgs_ix13.loc[concat_ix3333['index'].tolist()].reset_index() #
        
          

        

        #if len([x for x in norm2323.columns if 'LFQ' not in x])>0:
            #columns2pooling=[x for x in norm2323.columns if 'Pooling' in x]
            #norm2323[othersort(norm2323.columns,yoursampleN2)].to_csv(settings.MEDIA_ROOT+'/'+des+'2323.csv',index=False)
            #norm23na[othersort(norm23na.columns,yoursampleN2)].to_csv(settings.MEDIA_ROOT+'/'+des+'23na.csv',index=False)
            #norm3333[othersort(norm3333.columns,yoursampleN2)].to_csv(settings.MEDIA_ROOT+'/'+des+'3333.csv',index=False)
             
            #filename23=settings.MEDIA_ROOT+'/'+des+'2323.csv'
            #filename23na=settings.MEDIA_ROOT+'/'+des+'23na.csv'
            #filename3333=settings.MEDIA_ROOT+'/'+des+'3333.csv'
            #if len(columns2pooling)>0:
        
        
        
                #test2323=   rpy2scriptspool(filename23,settings.MEDIA_ROOT+'/images/files2323',des,yoursampleN2)#,yoursampleN2
                #concat_pgs_ix2323 =pd.concat([dfpgs2323, test2323], axis=1)
                #concat_pgs_ix2323.to_csv(settings.MEDIA_ROOT+'/filteredTable/files2323/%s2323.csv'%des)
               
                #test23na=   rpy2scriptspool(filename23na,settings.MEDIA_ROOT+'/images/files23na',des,yoursampleN2)#,yoursampleN2
                #concat_pgs_ix23na =pd.concat([dfpgs23na, test23na], axis=1)
                #concat_pgs_ix23na.to_csv(settings.MEDIA_ROOT+'/filteredTable/files23na/%s23na.csv'%des)
                #test3333=   rpy2scriptspool(filename3333,settings.MEDIA_ROOT+'/images/files3333',des,yoursampleN2)#,yoursampleN2
                #concat_pgs_ix3333 =pd.concat([dfpgs3333, test3333], axis=1)
                #concat_pgs_ix3333.to_csv(settings.MEDIA_ROOT+'/filteredTable/files3333/%s3333.csv'%des)
               
                #getcolumns=test3333.columns
            #else:
                #test2323=   rpy2scripts(filename23,settings.MEDIA_ROOT+'/images/files2323',des,yoursampleN2)#,yoursampleN2
                
                #concat_pgs_ix2323 =pd.concat([dfpgs2323, test2323], axis=1)   
                #concat_pgs_ix2323.to_csv(settings.MEDIA_ROOT+'/filteredTable/files2323/%s2323.csv'%des)       
                 
                #test23na=   rpy2scripts(filename23na,settings.MEDIA_ROOT+'/images/files23na',des,yoursampleN2)#,yoursampleN2
                
                #concat_pgs_ix23na =pd.concat([dfpgs23na, test23na], axis=1)
                #concat_pgs_ix23na.to_csv(settings.MEDIA_ROOT+'/filteredTable/files23na/%s23na.csv'%des)
                
                #test3333=   rpy2scripts(filename3333,settings.MEDIA_ROOT+'/images/files3333',des,yoursampleN2)#,yoursampleN2
                #concat_pgs_ix3333 =pd.concat([dfpgs3333, test3333], axis=1)
                #concat_pgs_ix3333.to_csv(settings.MEDIA_ROOT+'/filteredTable/files3333/%s3333.csv'%des)
                    
                #getcolumns=test3333.columns
           

            
        #else:
            

            #concat_pgs_ix2323 =pd.concat([dfpgs2323, norm2323], axis=1)
            #concat_pgs_ix2323.to_csv(settings.MEDIA_ROOT+'/filteredTable/files2323/%s2323.csv'%des)
            #progress_recorder.set_progress( 7,  10)
            #concat_pgs_ix23na =pd.concat([dfpgs23na, norm23na], axis=1)
            #concat_pgs_ix23na.to_csv(settings.MEDIA_ROOT+'/filteredTable/files23na/%s23na.csv'%des)
            
            #concat_pgs_ix3333 =pd.concat([dfpgs3333, norm3333], axis=1)
            #concat_pgs_ix3333.to_csv(settings.MEDIA_ROOT+'/filteredTable/files3333/%s3333.csv'%des)
            #progress_recorder.set_progress( 9,  10)
            #getcolumns=norm3333.columns
        progress_recorder.set_progress( 8,  10)
        return getcolumns,df_design #concat_pgs_ix3333,

        
#1.Reverse,contam 제거
#0 to nan
#sorting code작성/ 
# Pooling 분리
#os.remove(file_location)이걸로 삭제하자

   
    
    pathfilenames ='documents' +'/'+filename
    
    pathfiledesign ='documents' +'/'+filedesign
    
    f_n = os.path.join(settings.MEDIA_ROOT, pathfilenames)
    f_d = os.path.join(settings.MEDIA_ROOT, pathfiledesign)
    
    fnresults =read_proteingroups(f_n,f_d)

    #df_concat13_concat=fnresults[0]
    get_df=fnresults[0]
    get_uniquecondition=fnresults[1]
    col2= [x for x in get_df ] #if (valuesck(x) &  ('intensity corrected' in x) ) |  (valuesck(x) & ('LFQ intensity' in x))
    
    #col2=[x for x in col2_parse if 'Pooling' not in x]
    #splitvalue=list(set([splitfunc(x) for x in col2]))[0]
    #setcol2= ','.join(        [str(x) for x in list(set([x.split(splitvalue)[0].strip() for x in col2]))])
    
    Condition=[x for x in list(get_uniquecondition['condition'].unique()) if contains_pooling(x)!=True]
    setcol2= ','.join(Condition)
    printcol2 =  ','.join([str(x) for x in col2])
    progress_recorder.set_progress( 9,  10) 

    #FilterIM,FilterNM,FilterSoftware NormMethod Software ImputeMethod
    pcs=FileinfoModel(   proj=des, username=username , whole=printcol2,compare=setcol2,projecttitle=projecttitle,destxt=destxt,LabelMethod=Label ,FilterMethod= FilterDES,Change2p='Private',ImputeMethod=FilterIM,NormMethod=FilterNM,Software=FilterSoftware ) 
    
    pcs.save()                                                                                                                             
    
    
    #whole과 compare에서 pooling이 빠져야함.
    '''
    df_concat13_concat=df_concat13_concat.fillna(0)
    ck_title=    list(set([x.proj for x in proteinGroups2groups.objects.all()])).count(des)
    if ck_title ==0:
        for x in range(len(df_concat13_concat)):
            Groups2groups=proteinGroups2groups(proteinids=df_concat13_concat['Protein IDs'][x], majorityproteinids=df_concat13_concat['Majority protein IDs'][x]
            ,fastaheaders=df_concat13_concat['Fasta headers'][x], numberofproteins=df_concat13_concat['Number of proteins'][x],peptides= df_concat13_concat['Peptides'][x],
            uniquepeptides= df_concat13_concat['Unique peptides'][x],sequencecoveragep=df_concat13_concat['Sequence coverage [%]'][x],moldotweightkda= df_concat13_concat['Mol. weight [kDa]'][x],
            qhvalue=  df_concat13_concat['Q-value'][x],score=  df_concat13_concat['Score'][x] ,  idsfrondevi = df_concat13_concat['id'][x],  evidenceids=df_concat13_concat['Evidence IDs'][x]
            ,   valuess= ''.join([str(x) for x in df_concat13_concat['concat_samples'][x]]) ,proj=des,username=username  ) #,performer=username
        
            Groups2groups.save()
    else:
        print('pass_Ck_title')
    '''
    
    print('fin')
    
#    
    #fs.delete(f_n)


    print(Label)
    print(FilterDES)
    print(des)
    print(username)
    print(printcol2)
    print(setcol2)
    print(projecttitle)
    print(destxt)


    projitem=UploadFileModel.objects.filter(Q(projecttitle=projecttitle)&Q(description=des))[0]

    projitem.taskfin='fin'
    projitem.save()
    progress_recorder.set_progress( 10,  10)
    projitem2=    UploadFileModel.objects.filter(Q(projecttitle=projecttitle)&Q(description=des))
    if len(projitem2)>1 :
        for x in range(len(projitem2)):
            if x==0:
                print("pass")
                pass
            else:
                projitem2[x].delete()
                print("delete")
#finishmode
    finishcheck= Analysisidstatus.objects.filter(Q(Analysisid=Upload_index) )[0]
    finishcheck.finishmode='fin'
    finishcheck.save()

    upload_index=TaskidandID.objects.filter(Q(Taskid=uploadtaskid))[0]
    upload_index.delete()
    return 10


@shared_task(bind=True)
def getDEP(self,des4,seconds):
    #print(self.request.id)
    #des,filename,username,projecttitle,destxt

    getDEPtaskid=self.request.id
    #DEPCounts=Analysisidstatus.objects.filter(Q(RelatedModels='Protein_calcultask'))
    DEP_index=des4['dataindex']
    #DEP_index='DEP_'+str(len(DEPCounts)+1)
    #creatAnalysisidstatus=Analysisidstatus.objects.create(Analysisid=DEP_index, RelatedModels='Protein_calcultask', finishmode='process')
    #creatTaskidandID=TaskidandID.objects.create(Analysisid=DEP_index, Taskid=getDEPtaskid)
    #creatAnalysisidstatus.save()
    #creatTaskidandID.save()
    #Protein_calcultask

    osagff= pd.read_csv('./media/GO/osagff.csv.gz',compression='gzip')
    test=pd.read_csv('./media/GO/results.csv.gz',compression='gzip')
    test.columns=[0,1]
    test_ix=test.set_index(0)
    diction=test_ix.to_dict()[1]
    gffix_loc=osagff.set_index('11')
    def calcul_loci(xx):
        xlist=xx.split(';')
        getitems=[]
        for xy in xlist:

            try:
                getitem=diction[xy]
            except KeyError:
                getitem=''

            
            getitems.append(getitem)
        tosvalues='^^'.join(getitems)
        return tosvalues

    progress_recorder = ProgressRecorder(self)
    progress_recorder.set_progress( 1,  seconds)
    username= des4['username']
    filteritem=des4['filteritem']
    proj_info2=des4['proj_info'].split('_AnI;')[0]
    proj_info=des4['proj_info']
    indexinfo2=des4['indexinfo']
    projidtitle=des4['projidtitle']
    #projidtitle proj_info
    Software=des4['Software']
    pathfilenames ='filteredTable' +'/files'+filteritem+'/'+proj_info2+filteritem+'.csv'
    f_n = os.path.join(settings.MEDIA_ROOT, pathfilenames)

    df=pd.read_csv(f_n)
    if Software =='MaxQuant':
        df_cols=df[df.columns[[i for i,x in enumerate(df.columns) if x == 'Evidence IDs'][0]+1:]]
    else:
        df_cols=df[df.columns[[i for i,x in enumerate(df.columns) if x == 'Description'][0]+1:]]
    progress_recorder.set_progress( 2,  10)
    
    df_cols['concat_samples']= df_cols.apply(lambda x:  ','.join(np.stack((x.values).astype(str)))       , axis=1)
    
    progress_recorder.set_progress( 3,  10)
    dictwo={}
    def compareanalysis(x,dic):
        returnsplit=x.split('Exp')[1:]
        for x in returnsplit:
            dickey=x.split(';')[0]
            dicvalue=x.split(';')[1].replace(':',',')
            dicvalue2=[int(x) for x in dicvalue.split(',') if x != '']
            
            dic[dickey]=dicvalue2
        return dic
    test2=compareanalysis(indexinfo2,dictwo)
    progress_recorder.set_progress( 4,  10)
    dic22={}
    p_merge=[]
    fc_merge=[]
    chr_append=[]
    for i in range(len(df_cols)):
        p_append=[]
        fc_append=[]
        
        for j in range(int(len(test2.keys())/2)):
            compA=str(j)+'0'
            compB=str(j)+'1'
            statistic, p_value = ttest_ind(
                a=list(df_cols[df_cols.columns[test2[compA]]].loc[i].values), 
                b=list(df_cols[df_cols.columns[test2[compB]]].loc[i].values), 
            equal_var=False # variance equal.
        )
            log2fc= np.log2((np.mean(df_cols[df_cols.columns[test2[compB]]].loc[i].values)+0.000001)/(np.mean(df_cols[df_cols.columns[test2[compA]]].loc[i].values)+0.000001))
            #log2fc=math.log2(fc )
            #+0.000001
            p_append.append(str(p_value))
            fc_append.append(str(log2fc))
            #key='compABpvalue'+str(j)
            #key2='compABfc'+str(j)
        p_merge.append(p_append)
        fc_merge.append(fc_append )
        if Software=='MaxQuant':
            chr_append.append(calcul_loci(df.loc[i]['Majority protein IDs']))
        else:
            chr_append.append(calcul_loci(df.loc[i]['Protein']))

    progress_recorder.set_progress( 5,  10)
    dic22['chrinfo']=chr_append
    dic22['fcs']=fc_merge
    dic22['pval']=p_merge

    
    dfdic22=pd.DataFrame(dic22)        
    progress_recorder.set_progress( 6,  10)
    #dfdic22['pval']=dfdic22.apply(lambda x: ','.join([str(x) for x in  x[[x for x in dfdic22.columns if 'pvalue' in x]].values    ]),axis=1)

    #dfdic22['fcs']=dfdic22.apply(lambda x: ','.join([str(x) for x in  x[[x for x in dfdic22.columns if 'ABfc' in x]].values    ]),axis=1)
    dfconsam=df_cols[['concat_samples']]
    print(len(dfconsam))
    print('concatsample')
    dfcols2=pd.concat([df, dfconsam],axis=1)
    progress_recorder.set_progress( 7,  10)
    print(len(dfcols2))
    print('concat')
    concat_your_table=    pd.concat([dfcols2,dfdic22],axis=1)
    progress_recorder.set_progress( 8,  10)
    print(len(concat_your_table))
    analyinfo2=projidtitle+proj_info+indexinfo2+filteritem
    progress_recorder.set_progress( 9,  10)

   



    #print('fin-1')
    #print(calcul_loci(concat_your_table['Majority protein IDs'][1]))
    if Software=='MaxQuant':
        for x in range(len(concat_your_table)):
            try:
                Groups2groups=Protein_calcultask(proteinids=concat_your_table['Protein IDs'][x], majorityproteinids=concat_your_table['Majority protein IDs'][x]
                ,fastaheaders=concat_your_table['Fasta headers'][x], numberofproteins=concat_your_table['Number of proteins'][x],peptides= concat_your_table['Peptides'][x],
                uniquepeptides= concat_your_table['Unique peptides'][x],sequencecoveragep=concat_your_table['Sequence coverage [%]'][x],moldotweightkda= concat_your_table['Mol. weight [kDa]'][x],
                qhvalue=  concat_your_table['Q-value'][x],score=  concat_your_table['Score'][x] ,  idsfrondevi = concat_your_table['id'][x],  evidenceids=concat_your_table['Evidence IDs'][x]
                ,   valuess= ''.join([str(x) for x in concat_your_table['concat_samples'][x]]) ,chrinfo=concat_your_table['chrinfo'][x],proj=projidtitle,experiment=proj_info,username=username ,foldchange= ','.join([str(x) for x in concat_your_table['fcs'][x]]) ,pvalue= ','.join([str(x) for x in concat_your_table['pval'][x]])   ,analyinfo=analyinfo2 ,Analysisid=DEP_index ) #,performer=username
            except TypeError:
                pass
            #            print(concat_your_table.loc[x])
            Groups2groups.save()
        concat_your_table=concat_your_table.loc[:, 'Protein IDs':]#.to_json(orient='records')
        
        parse_table=concat_your_table[list(concat_your_table.columns[:[i for i,x in enumerate(concat_your_table.columns) if x == 'Evidence IDs'][0]+1])+list(concat_your_table.columns[[i for i,x in enumerate(concat_your_table.columns) if x == 'concat_samples'][0]:])]
    
        parse_table.columns= ['proteinids',    'majorityproteinids' ,'fastaheaders' , 'numberofproteins', 'peptides' ,  'uniquepeptides' ,   'sequencecoveragep' ,'moldotweightkda' ,  'qhvalue' ,    'score' , 'idsfrontevi' ,   'evidenceids' ,    'valuess' ,'chrinfo' , 'foldchange','pvalue' ]
        
        recordsjson=parse_table.to_json(orient='records')
        loader= json.loads(recordsjson)
        
        dic2df={'proj':projidtitle,'experiment':proj_info,'username':username,'analyinfo':analyinfo2}
        infomationloader=json.loads(json.dumps(dic2df))
    else:
        for x in range(len(concat_your_table)):
            try:
                Groups2groups=FragpipeProtein_calcultask(proteinids=concat_your_table['Protein ID'][x], majorityproteinids=concat_your_table['Protein'][x]
                ,entryname=concat_your_table['Entry Name'][x], gene=concat_your_table['Gene'][x],proteinlength= concat_your_table['Protein Length'][x],
                coverage= concat_your_table['Coverage'][x],description=concat_your_table['Description'][x]  ,  
                 valuess= ''.join([str(x) for x in concat_your_table['concat_samples'][x]]) ,chrinfo=concat_your_table['chrinfo'][x],proj=projidtitle,experiment=proj_info,username=username ,foldchange= ','.join([str(x) for x in concat_your_table['fcs'][x]]) ,pvalue= ','.join([str(x) for x in concat_your_table['pval'][x]])   ,analyinfo=analyinfo2 ,Analysisid=DEP_index ) #,performer=username
            except TypeError:
                pass
            #            print(concat_your_table.loc[x])
            Groups2groups.save()
            
        concat_your_table=concat_your_table.loc[:, 'Protein':]#.to_json(orient='records')
        parse_table=concat_your_table[list(concat_your_table.columns[:[i for i,x in enumerate(concat_your_table.columns) if x == 'Description'][0]+1])+list(concat_your_table.columns[[i for i,x in enumerate(concat_your_table.columns) if x == 'concat_samples'][0]:])]
    
        parse_table.columns= ['majorityproteinids',    'proteinids' ,'entryname' , 'gene', 'proteinlength' ,  'coverage' ,   'description' ,    'valuess' ,'chrinfo' , 'foldchange','pvalue' ]
        
        recordsjson=parse_table.to_json(orient='records')
        loader= json.loads(recordsjson)
        
        dic2df={'proj':projidtitle,'experiment':proj_info,'username':username,'analyinfo':analyinfo2}
        infomationloader=json.loads(json.dumps(dic2df))
        


    #majorityproteinids,proteinids,entryname,gene,proteinlength,coverage,description,valuess,chrinfo,proj,experiment,username,foldchange,pvalue,analyinfo,Analysisid    
                                                                                                                                                                                         

    #json_string = json.dumps(loader ,indent=None)
    
    #projidtitle proj_info
    gettest=AnalysisinfoModel.objects.filter(Q(Analysisinfo=proj_info)&Q(projecttitle=projidtitle))[0]
    gettest.taskIdfin='fin'
    gettest.save()
    progress_recorder.set_progress( 10,  10)

    finishcheck= Analysisidstatus.objects.filter(Q(Analysisid=DEP_index) )[0]
    finishcheck.finishmode='fin'
    finishcheck.save()
    DEP_index=TaskidandID.objects.filter(Q(Taskid=getDEPtaskid))[0]
    DEP_index.delete()
    return [[loader,infomationloader],'calc'] #loader ,analyinfo2




@shared_task(bind=True)
def getNETWORK(self,des5,seconds):

    getNETWORKtaskid=self.request.id
    #NETworkCounts=Analysisidstatus.objects.filter(Q(RelatedModels='Network_nodeinfomation'))
    #NETWORK_index='NETWORK_'+str(len(NETworkCounts)+1)
    NETWORK_index=des5['dataindex']
    #creatAnalysisidstatus=Analysisidstatus.objects.create(Analysisid=NETWORK_index, RelatedModels='Network_nodeinfomation', finishmode='process')
    #creatTaskidandID=TaskidandID.objects.create(Analysisid=NETWORK_index, Taskid=getNETWORKtaskid)
    #creatAnalysisidstatus.save()
    #creatTaskidandID.save()

    casepath='./media/GO/data/2610640.O_sativa_subsp_japonica_Rice.goa'
    with open(casepath, 'rt') as fp33:

        Rice_funcs = {}  # Initialise the dictionary of functions

        # Iterate on each function using Bio.UniProt.GOA library.
        for entry in GOA.gafiterator(fp33):
            uniprot_id = entry.pop('DB_Object_ID')
            Rice_funcs[uniprot_id] = entry
    #[Rice_funcs[x]['Aspect']            for x in Rice_funcs             if asb[41438] in Rice_funcs[x]['Synonym']]
    
    progress_recorder = ProgressRecorder(self)
    progress_recorder.set_progress( 1,  seconds)

    progress_recorder.set_progress( 2,  10)
    dic123targets=pd.read_csv('./media/netsource/hubgenes.csv.gz',compression='gzip').to_dict()['0']
    dic321=pd.read_csv('./media/netsource/convert.csv.gz',compression='gzip').to_dict()['0']
    df3=pd.read_csv('./media/netsource/osadropgenes.csv.gz',compression='gzip')

    dic123 =  dict([(i,a) for i,a in zip(df3['Unnamed: 0'], df3['0'])])
    
    dfchr=pd.read_csv('./media/GO/results.csv.gz',compression='gzip')
    dfchr.columns=[0,1]
    dfchr_ix=dfchr.set_index(0)
    diction2=dfchr_ix.to_dict()[1]


    df=pd.read_csv('./media/netsource/convertScore.csv.gz',compression='gzip')
    df_maskid=df[['source','target']]
    progress_recorder.set_progress( 3,  10)
    G = nx.from_edgelist(df_maskid.to_numpy())
    progress_recorder.set_progress( 4,  10)
    def sliding(x):
        listgetb=[]
        for i in range(len(x)):
            if i+1 !=len(x): 
                geta=(int(x[i]),int(x[i+1]))
                listgetb.append(geta)
        return listgetb

    def nx_all_shortest_paths(nCr):
        listup=[]
        for a,b in nCr:
            c=[p for p in nx.all_simple_paths(G,source=a,target=b, cutoff=2) ]
            #all_simple_paths->all_simple_paths 
            #cc=[x for x in c if len(x)>1 and len(x ) <4 ]
            listup.append(c)
        return listup
    #def nx_shortest_path(nCr):
    #   listup=[]
    #   for a,b in nCr:
    #       c=[[p for p in nx.shortest_path(G,source=a,target=b) ]]

    #       cc=[x for x in c if len(x)>1 and len(x ) <4 ]
    #       listup.append(cc)
    #   return listup
    def nx_paths(abcdef):

        lista=[]
        for x in abcdef:

            lista+=sliding(x)
        return lista

        
        

    def sourcecrosstarget(sourcelist,targetarray):
        listup3=[]
        for i in sourcelist:
            for j in targetarray:
                listup3+=[(int(i),int(j))]
        return listup3


    def testdesign(array,targetarray):
        nCr = itertools.combinations(array, 2)
        listup=nx_all_shortest_paths(nCr)
        testuplist=[x for x in listup if len(x)>0]
        abcdef=(itertools.chain(*testuplist))
        
        edgeDesign=nx_paths(abcdef)
        
        #nx_shortest_path->nx_all_shortest_paths
        testG=nx.from_edgelist(edgeDesign)
        sourcelist=[x for x in testG.nodes]
        nodelist=    sourcecrosstarget(array,targetarray)
        listup2=nx_all_shortest_paths(nodelist)
        testuplist2=[x for x in listup2 if len(x)>0]
        abcdef2=(itertools.chain(*testuplist2))
        edgeDesign2=nx_paths(abcdef2)
        

        return edgeDesign,edgeDesign2
    progress_recorder.set_progress( 5,  10)
    source_ss=des5['source']
    source_s= [x.split(':')[0] for x in source_ss.split(';')]
    
    source_sarray=    [int(dic123[x.split('.')[0]]) for x in source_s if x.split('.')[0] in dic123.keys()] 
    notlistsource= [x.split('.')[0] for x in source_s if x.split('.')[0] not in dic123.keys()]  
    source_tt=des5['target']
    source_t= [x.split(':')[0] for x in source_tt.split(';')]

    source_tarray=[int(dic123[x.split('.')[0]]) for x in source_t if x.split('.')[0] in dic123.keys()] 
    notlistouttarget= [x.split('.')[0] for x in source_t if x.split('.')[0] not in dic123.keys()] 
    getidtest=testdesign(source_sarray,source_tarray)
   
#    notinmergest=str(notlistsource)+str(notlistouttarget)
    
    
    progress_recorder.set_progress( 6,  10)
    setlist=set(getidtest[0]+getidtest[1])
    setcaledge=[x for x in setlist]
    nxedges=nx.from_edgelist(setcaledge)

    groupA=getidtest[0]
    groupB=getidtest[1]
    groupAnx=nx.from_edgelist(groupA)
    groupBnx=nx.from_edgelist(groupB)
    groupAlist=list(groupAnx.nodes)
    groupBlist=list(groupBnx.nodes)
    progress_recorder.set_progress( 7,  10)
    '''for x in nxedges.nodes:
        nxedges.nodes[x]['name']=dic321[x]
        searchlist= x in source_sarray
        targetlist= x in source_tarray
        size=dic123targets[x]
        nxedges.nodes[x]['attr']=[size,searchlist,targetlist]'''

    progress_recorder.set_progress( 8,  10)
    progress_recorder.set_progress( 9,  10)
    
    #json_network=nx.json_graph.node_link_data(nxedges)
    progress_recorder.set_progress( 10,  10)
    
    nodelist=list(nxedges.nodes)
    edgelist=list(nxedges.edges)

    nodeinfo=[]
    for x in nxedges.nodes:
        name=dic321[x]
        if x in groupAlist:
            yy=10
        else:
            yy=4
        if x in groupBlist:
            zz=10
        else:
            zz=3
        WhereAB=yy*zz
        searchlist= x in source_sarray
        targetlist= x in source_tarray
        size=dic123targets[x]
        chrinfo=[diction2[y].split(':')[1] for y in diction2.keys() if y.split('.')[0] == name]
        if len(chrinfo)>0:
            numchr= ''.join(chrinfo[0])
        else:
            numchr= ''.join(chrinfo)


        GOtype=','.join(set([Rice_funcs[x]['Aspect']            for x in Rice_funcs             if name in Rice_funcs[x]['Synonym']]))
        GO_IDs=','.join([Rice_funcs[x]['GO_ID']            for x in Rice_funcs             if name in Rice_funcs[x]['Synonym']]) 
        nodeinfo.append('^'.join([str(x),str(name),str(searchlist),str(targetlist),str(size),str(numchr),str(GOtype),str(GO_IDs),str(WhereAB)]))

    

    labelST={'False,False': ''
    ,'True,False':'S'
    ,'False,True':'T'
    }
    border={'': 'gray'
    ,'P':'blue'
    ,'F':'#E31A1C'
    ,'C':'#6A3D9A'
    ,'C,F,P':'black',
    'P,F,C':'black',
'C,F':'green',
'F,C':'green',
'F,P':'#CAB2D6',
'P,F':'#CAB2D6',

'C,P':'#FDBF6F',
'P,C':'#FDBF6F'


    }
    colorscale={'': 'white'
    ,'Chr1':'blue'
    ,'Chr2':'#E31A1C'
    ,'Chr3':'#6A3D9A'
    ,'Chr4':'black',
    'Chr5':'green',
    'Chr6':'#CAB2D6',
    'Chr7':'#FDBF6F',
    'Chr8':'#FFF0F5'   ,
    'Chr9':   '#8B0000',
    'Chr10':    '#FF33CC',
    'Chr11': 'darkturquoise',
    'Chr12': '#FFA500',

    }
    #mapping={}
    #for x in nodeinfo:
    #    mapping[x[0]]=x[1]+labelST[','.join([str(x[2]) , str(x[3])])]
    #nxedgesG3 = nx.relabel_nodes(nxedges, mapping)
    
    #nodecolor=[colorscale[x[5]] for x in nodeinfo]
    #bordercolor=[border[x[6]] for x in nodeinfo]
    #fig, ax = plt.subplots(figsize=(15,15))

    #nx.draw_spring(nxedgesG3, with_labels=True, edgecolors=bordercolor,node_color=nodecolor ,node_size=1000,linewidths=6,font_size=20)



    ##svg 만들기
    #image_format = 'svg' # e.g .png, .svg, etc.
    #image_name = settings.MEDIA_ROOT+'/images/myimage.svg'

    #fig.savefig(image_name, format=image_format, dpi=1200)
    #f1=open(image_name, 'r')
    #f1read=f1.read()
    #f1read

    #os.remove(image_name)
    
    Netinfo=Network_nodeinfomation(nodelist=','.join([str(x) for x in nodelist]),edgelist=','.join([str(x) for x in edgelist]),nodeinfo=';'.join(nodeinfo)   ,Analysisid=NETWORK_index) 
    Netinfo.save()

    finishcheck= Analysisidstatus.objects.filter(Q(Analysisid=NETWORK_index) )[0]
    finishcheck.finishmode='fin'
    finishcheck.save()
    Net_index=TaskidandID.objects.filter(Q(Taskid=getNETWORKtaskid))[0]
    Net_index.delete()
    return [[nodelist,edgelist,nodeinfo],'NET']
    #

    #username
    #source
    #target
    #Analysisinfo



@shared_task(bind=True)
def getGO(self,des5,seconds):
    getGOtaskid=self.request.id
    #GOCounts=Analysisidstatus.objects.filter(Q(RelatedModels='GO_idinfo'))
    #GO_index='GO_'+str(len(GOCounts)+1)
    GO_index=des5['dataindex']
    #creatAnalysisidstatus=Analysisidstatus.objects.create(Analysisid=GO_index, RelatedModels='GO_idinfo', finishmode='process')
    #creatTaskidandID=TaskidandID.objects.create(Analysisid=GO_index, Taskid=getGOtaskid)
    #creatAnalysisidstatus.save()
    #creatTaskidandID.save()
    progress_recorder = ProgressRecorder(self)
    progress_recorder.set_progress( 1,  seconds)
    
    #RICECASE=des5['case']
    items=des5['tos_MSUids']
    ainfo=des5['Analysisinfo']
    project1=des5['project']
    pvfc1=des5['pvfc']

    go_obo = './media/GO/data/go-basic.obo'
    go = obo_parser.GODag(go_obo)
    
    progress_recorder.set_progress( 2,  10)
    #if RICECASE =='Japonica':
    #    casepath='./media/GO/data/2610640.O_sativa_subsp_japonica_Rice.goa'
    #elif RICECASE =='Indica':
    #    casepath='./media/GO/data/23240.O_sativa_indica.goa'
    #else:
    #    pass
    #
    #
    casepath='./media/GO/data/2610640.O_sativa_subsp_japonica_Rice.goa'

    

    if(not os.path.isfile(casepath)):
    # Login to FTP server
        ebi_ftp = FTP('ftp.ebi.ac.uk')
        ebi_ftp.login() # Logs in anonymously
        
        # Download
        with open(casepath,'wb') as fp33:
            ebi_ftp.retrbinary('RETR {}'.format(''), fp33.write)
            
        # Logout from FTP server
        ebi_ftp.quit()
    
    with open(casepath, 'rt') as fp33:
        
        Rice_funcs = {}  # Initialise the dictionary of functions
        
        # Iterate on each function using Bio.UniProt.GOA library.
        for entry in GOA.gafiterator(fp33):
            uniprot_id = entry.pop('DB_Object_ID')
            Rice_funcs[uniprot_id] = entry  

    print(fp33)    
    progress_recorder.set_progress( 3,  10)
    assoc_Rice = {}
    for x in Rice_funcs:
        if x not in assoc_Rice:
            assoc_Rice[x] = set()
        assoc_Rice[x].add(str(Rice_funcs[x]['GO_ID']))
    pop_japonica = assoc_Rice.keys()
    g_fdr2 = GOEnrichmentStudy(pop_japonica, assoc_Rice, go,
                         propagate_counts=False,
                         alpha=0.05,
                          methods=['fdr'])
    sortitem=[x.split('.')[0] for x in items.split(',') if x not in '']
    progress_recorder.set_progress( 4,  10)


    dict1={}


    for onegene in sortitem: 
        
        test_japo_genes = {x: Rice_funcs[x]
                for x in Rice_funcs 
                if onegene in Rice_funcs[x]['Synonym']}
        dict1.update(test_japo_genes)
    enrichments_study=g_fdr2.run_study(dict1.keys())

    progress_recorder.set_progress( 5,  10)
    s_bonferroni_japo = []
    for x in enrichments_study:
        go=x.GO
        ns=x.NS
        enrich=x.enrichment
        name=x.name
        ratiostudy=x.ratio_in_study
        ratiopop=x.ratio_in_pop
        
        pfdr=x.p_fdr
        
        p_unco=x.p_uncorrected
        dep=x.depth
        studycount=x.study_count
        studyitem=x.study_items

        s_bonferroni_japo.append([go,ns,enrich,name,ratiostudy,ratiopop,pfdr,p_unco,dep,studycount,studyitem])
 
        
    japo=pd.DataFrame(s_bonferroni_japo)

    progress_recorder.set_progress( 6,  10)
    def passdata(group):
    
        listjoin=[]
        
        if len(group)>0:
            
            for y in group:

                gjoin=','.join([x for x in dict1[y]['Synonym'] if 'LOC' in x])
                listjoin.append(gjoin)

            passdata=';'.join(listjoin)
        else: 
            passdata='pass'
        return passdata
    progress_recorder.set_progress( 7,  10)
    japo[11]= japo.apply(lambda x:passdata(x[10]),axis=1)
    progress_recorder.set_progress( 8,  10)
    #print(len(japo))
    for x in range(len(japo)):
        pcs2=GO_idinfo(   Golist=japo[0][x], go_cluster=japo[1][x], go_description=japo[3][x],items=japo[10][x],counts=japo[9][x],idconvert=japo[11][x],fdr=japo[6][x],pv=japo[7][x],Analysisinfo= ainfo ,pvfc=pvfc1,project=project1,Analysisid=GO_index) 
        pcs2.save()  
    progress_recorder.set_progress( 9,  10)
    progress_recorder.set_progress( 10,  10)
    print(des5)
    
    
    japo.columns=['Golist','go_cluster',2,'go_description',4,5,'fdr','pv',8,'counts','items','idconvert']
    japo=japo[['Golist','go_cluster','go_description','items','counts','idconvert','fdr','pv']]
    recordsjson=japo.to_json(orient='records')
    loader= json.loads(recordsjson)
    #json_string = json.dumps(loader ,indent=None)

    dic2df={'Analysisinfo':ainfo,'pvfc':pvfc1,'project':project1}
    infomationloader=json.loads(json.dumps(dic2df))

    finishcheck= Analysisidstatus.objects.filter(Q(Analysisid=GO_index) )[0]
    finishcheck.finishmode='fin'
    finishcheck.save()

    GO_index=TaskidandID.objects.filter(Q(Taskid=getGOtaskid))[0]
    GO_index.delete()
    return [[loader,infomationloader], "GO" ,pvfc1,project1] 


#1 




@shared_task
def printing():
    print("just printing")  