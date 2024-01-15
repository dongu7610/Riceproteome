from celery import shared_task

from proteom.backend import ProgressRecorder
import time

@shared_task(bind=True)
def celery_function(self, seconds):
    progress_recorder = ProgressRecorder(self)
    result = 0
    for i in range(seconds):
        time.sleep(1)
        result += i
        progress_recorder.set_progress(i + 1, seconds)
    return result

@shared_task
def do_work(self, list_of_work, progress_observer):
    total_work_to_do = len(list_of_work)
    for i, work_item in enumerate(list_of_work):
        do_work_item(work_item)
        # tell the progress observer how many out of the total items we have processed
        progress_observer.set_progress(i, total_work_to_do)
        self.update_state(
            state=PROGRESS_STATE,
            meta={
                'current': current,
                'total': total,
            }
)
    return 'work is complete'
"""   
from celery import shared_task
import os, sys
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.utils import timezone
import pandas as pd
import numpy as np
from .models import FileList,proteinGroups2groups,projectsamples,PPI_proteome
from collections import Counter

    
@shared_task
def test(filename, username):
    fileList = FileList(performer=username, filename=filename, submitted_at=timezone.now())
    fileList.save()

    return username

#  V1 -> V2
@shared_task
def parse_protein(filename, username,NOS,S_INFO,projtitle,compareAB):
    

    fileList = FileList(performer=username, filename=filename, submitted_at=timezone.now())

    fileList.save()

    fs = FileSystemStorage()
    
    '''
    groupmodels= proteinGroups2groups(
    #auto_id=auto_id  ,
    proteinids=proteinids ,
    majorityproteinids=majorityproteinids,
    fastaheaders=fastaheaders ,
    numberofproteins=numberofproteins ,
    peptides=peptides,
    uniquepeptides=uniquepeptides ,
    sequencecoveragep=sequencecoveragep ,
    moldotweightkda=moldotweightkda ,
    qhvalue=qhvalue ,
    score=score,
    
    
    ids=ids ,
    evidenceids=evidenceids,
    valuess=valuess ,
    
    proj=proj)
    groupmodels.save()
    '''
    def maskcolumns(xc):
            #sample


            
        columns1 = ['Protein IDs'	,'Majority protein IDs'	,'Fasta headers'	,'Number of proteins',	'Peptides',	'Unique peptides',
            'Sequence coverage [%]',	'Mol. weight [kDa]',	'Q-value'	,'Score']
        columns2 = [x for x in xc if ('intensity corrected' in x)& ('rep' in x) | ('LFQ intensity' in x)  ]
    #    Con_DJ rep_1	Con_eMSP1 rep_1	Con_cMSP1 rep_1	JA_DJ rep_1	JA_eMSP1 rep_1	JA_cMSP1 rep_1	Con_DJ rep_2	Con_eMSP1 rep_2	Con_cMSP1 rep_2	JA_DJ rep_2	JA_eMSP1 rep_2	JA_cMSP1 rep_2	Con_DJ rep_3	Con_eMSP1 rep_3	Con_cMSP1 rep_3	JA_DJ rep_3	JA_eMSP1 rep_3	JA_cMSP1 rep_3	MS/MS count	

        columns3 =    ['id','Evidence IDs']
        return columns1+columns2+columns3
    def maskcolumns13(xc):
        #sample


            
        columns1 = ['Protein IDs'	,'Majority protein IDs'	,'Fasta headers'	,'Number of proteins',	'Peptides',	'Unique peptides',
            'Sequence coverage [%]',	'Mol. weight [kDa]',	'Q-value'	,'Score']
        columns2 =[x for x in xc if ('intensity corrected' in x)& ('rep' in x) | ('LFQ intensity' in x)  ]
    #    Con_DJ rep_1	Con_eMSP1 rep_1	Con_cMSP1 rep_1	JA_DJ rep_1	JA_eMSP1 rep_1	JA_cMSP1 rep_1	Con_DJ rep_2	Con_eMSP1 rep_2	Con_cMSP1 rep_2	JA_DJ rep_2	JA_eMSP1 rep_2	JA_cMSP1 rep_2	Con_DJ rep_3	Con_eMSP1 rep_3	Con_cMSP1 rep_3	JA_DJ rep_3	JA_eMSP1 rep_3	JA_cMSP1 rep_3	MS/MS count	

        columns3 =    ['id','Evidence IDs']
        return columns1+columns3
    def list_sort(getsortinglist,lensample,labels):

        sortinglist=[' '.join([x for x in x.split(' ') if 'p_' not in x]) + ' '+ [x for x in x.split(' ') if 'p_'in x][0].lower() for x in getsortinglist]
        sortingversion = [x.split(' rep')[0] for x in sortinglist]
        sortingversion2= [ '_'+[x for x in i.split(' ') if 'rep'in x][0]   for x,i in enumerate(sortinglist) ]
        a=int(len(sortingversion)/3)
        a_list=[]
        b_list=[]
        c_list=[]
        for x in range(a):
            a_list.append(sortingversion[x])
        versus=len(set(a_list))==a
        if (versus ==True)  & (a==lensample) :
            for i in range(len(sortingversion)):
                c_list.append(labels[i%6] + sortingversion2[i])
            Scaleab= c_list
    
        elif (versus !=True) & (a==lensample):
            for i in range(a):
                b_list.append(labels[i]+sortingversion2[(0)%3])
                b_list.append(labels[i]+sortingversion2[(1)%3])
                b_list.append(labels[i]+sortingversion2[(2)%3])
            Scaleab=b_list
        else:
            Scaleab=False
        return Scaleab
    def changeolumns(xc,NOS,S_INFO,df_pgs_ix,project):

        samples= S_INFO.split(',')
        
        
        if (int(NOS)==len(samples)):
            col2= [x for x in xc if ('intensity corrected' in x)& ('rep' in x) | ('LFQ intensity' in x)  ]
            
            columns1 = ['Protein IDs'	,'Majority protein IDs'	,'Fasta headers'	,'Number of proteins',	'Peptides',	'Unique peptides',
            'Sequence coverage [%]',	'Mol. weight [kDa]',	'Q-value'	,'Score']
        #samples

            df_pgs_ix2=df_pgs_ix[col2]
            
            columns22=list_sort(col2,len(samples),samples)
            #columns22 = [str(int(x.split('Reporter intensity corrected')[1][0:3])-1) +'__'+ x.split(x[x.find(' rep_')-5:-5])[-1] for x in xc if 'Reporter intensity corrected' in x ] 
            df_pgs_ix2.columns  = columns22
        
            columns22.sort()
        
            df_pgs_ix2=df_pgs_ix2[columns22] 
        
            #columns2=[samples[int(x.split('__')[0])]+'_'+x.split('__')[-1] for x in columns22]
    #    Con_DJ rep_1	Con_eMSP1 rep_1	Con_cMSP1 rep_1	JA_DJ rep_1	JA_eMSP1 rep_1	JA_cMSP1 rep_1	Con_DJ rep_2	Con_eMSP1 rep_2	Con_cMSP1 rep_2	JA_DJ rep_2	JA_eMSP1 rep_2	JA_cMSP1 rep_2	Con_DJ rep_3	Con_eMSP1 rep_3	Con_cMSP1 rep_3	JA_DJ rep_3	JA_eMSP1 rep_3	JA_cMSP1 rep_3	MS/MS count	
            #df_pgs_ix2.columns =columns2
            df_pgs_ix2['concat_samples'] = df_pgs_ix2.apply(lambda x:  ','.join(np.stack((x.values).astype(str)))         , axis=1)
        

            concatdf_ix=df_pgs_ix2[['concat_samples']]
            columns3 =    ['id','Evidence IDs']    
        return [columns1+columns3,df_pgs_ix2,concatdf_ix]

    # definitions
    def compc(con,concat_ix_columns):
        c=[]
        for x2 in con.split(';'):
            b=[x for x,i in enumerate(concat_ix_columns) if x2 in i ]
            c.append(b)
        return c
    def compb(compareA,compareB,concat_ix_columns):
        compA_compc=compc(compareA,concat_ix_columns)
        compB_compc=compc(compareB,concat_ix_columns)
        lista=[compA_compc,compB_compc]
        return lista
    def compa(compareAB,concat_ix_columns):
        comp=compareAB.split(',') # compare groups
        listb= []
        listc= []
        for x in [x for x in comp if ':' in x ]:
            ccc=compb(x.split(':')[0],x.split(':')[1],concat_ix_columns) #  ab vs cd
            listb.append([ccc,'comp'])
        for x in [x for x in comp if ':' not in x ]:
            ccc=compc(x)
            listc.append([ccc,'notcomp'])
        return listb,listc
    def getsplicevalues(vas,splice2):
        getValues=[vas[val] for val in splice2]
        return getValues
    def compabb(compareAB):
        comp=compareAB.split(',') 
        listb= []
        listc= []
        for x in [x for x in comp if ':' in x ]:
            listb.append(x)
        for x in [x for x in comp if ':' not in x ]:
            listc.append(x)

        return listb,listc

         
    def log2fcvalues(values,NOS,compareAB,concat_ix_columns):
        compheader=compabb(compareAB)
        comparevalues=compa(compareAB,concat_ix_columns)
        dict_compare={}
        for i,compvalue in enumerate(comparevalues):
            for j,y in enumerate(compvalue):
                if 'comp' in y:
                    startAendA=sum(y[0][0],[])
                    startBendB=sum(y[0][1],[])
                    testdict ={}
                    #integerNOS =int(int(NOS)/2)
                    listvalues = values.tolist()

                    testnan=np.sum(np.array([getsplicevalues(l.split(','),startAendA)  for l in listvalues]).astype(np.float), axis=1)
                    testnan2=np.sum(np.array([getsplicevalues(l.split(','),startBendB) for l in listvalues]).astype(np.float), axis=1)
                    #np.log2(testnan2/testnan)
                    
                    trunc=0.1*np.trunc(10*np.log2(testnan2/testnan))
                    round_1values=np.round_(trunc,1) 
                    counterdist=Counter(round_1values)
                    for x in round_1values:
                        testdict[x]=[counterdist[x],[x for x in np.where(round_1values==x)[0]]]
                    dict_compare[compheader[i][j]]=testdict
                else:
                    startCendC=sum(y[0],[])
                    testdict ={}
                    #integerNOS =int(int(NOS)/2)
                    listvalues = values.tolist()

                    test=np.sum(np.array([getsplicevalues(l.split(','),startCendC)  for l in listvalues]).astype(np.float), axis=1)
                    #testnan2=np.sum(np.array([getsplicevalues(l.split(','),startBendB) for l in listvalues]).astype(np.float), axis=1)
                    logtest=np.log(test)
                    
                    trunc=0.1*np.trunc(10*logtest)
                    round_1values=np.round_(trunc,1) 
                    counterdist=Counter(round_1values)
                    for x in round_1values:
                        testdict[x]=[counterdist[x],[x for x in np.where(round_1values==x)[0]]]
                    dict_compare[compheader[i][j]]=testdict         



        return dict_compare

    def read_proteingroups(file_root):
        
        #read proteingroups

        df_pgs = pd.read_csv(f'{file_root}', sep='\t')
        df_pgs_ix=df_pgs[maskcolumns(df_pgs.columns)]
        df_pgs_ix13=df_pgs[maskcolumns13(df_pgs.columns)]
        #df_pgs_ix13.columns = changeolumns(df_pgs_ix.columns, NOS,S_INFO,df_pgs_ix)[0]
       
        df_pgs_ixadd2= changeolumns(df_pgs_ix.columns, NOS,S_INFO,df_pgs_ix,projtitle)[1]
        concat_ix= changeolumns(df_pgs_ix.columns, NOS,S_INFO,df_pgs_ix,projtitle)[2]
        
        concat_pgs_ix =pd.concat([df_pgs_ix13, df_pgs_ixadd2], axis=1)
        concat_pgs_ix2 =pd.concat([df_pgs_ix13, concat_ix], axis=1)

        #df_pgs_ixadd2
        #concat_ix[concat_samples]
        log2fcvalues_dict=        log2fcvalues(concat_ix['concat_samples'],NOS,compareAB,df_pgs_ixadd2.columns)
        return concat_pgs_ix,concat_pgs_ix2,df_pgs_ixadd2,log2fcvalues_dict
                

   
    f_n = os.path.join(settings.MEDIA_ROOT, filename)
    df_proteingroups = read_proteingroups(f_n)[0]
    df_concat13_concat =read_proteingroups(f_n)[1]
    ixcolumns2 =read_proteingroups(f_n)[2]
    log2fcvalues = read_proteingroups(f_n)[3]
    output_name = 'output' + '/' + ''.join(filename.split('.txt')[:-1]) + '_' +'_'.join(str(timezone.now()).split(' ')) +'.csv'
    output_file = os.path.join(settings.MEDIA_ROOT, output_name)

    df_proteingroups.to_csv(output_file, sep=',', index=False)
    

    uploaded_file_url = fs.url(output_name)
    os.system(f' {output_file}')
    uploaded_file_url = fs.url(output_name)
    fs.delete(filename)

    fileList.fileUrl = uploaded_file_url
    fileList.created_at = timezone.now()
    fileList.save()
    print(2)

    ix_columns=    ','.join(np.stack(([x for x in ixcolumns2.columns if x!='concat_samples'])))

    print(1)
    
    print(2)
    
    ck_title=    list(set([x.proj for x in proteinGroups2groups.objects.all()])).count(projtitle)
    if ck_title ==0:

        for x in range(len(df_concat13_concat)):
            Groups2groups=proteinGroups2groups(proteinids=df_concat13_concat['Protein IDs'][x], majorityproteinids=df_concat13_concat['Majority protein IDs'][x]
            ,fastaheaders=df_concat13_concat['Fasta headers'][x], numberofproteins=df_concat13_concat['Number of proteins'][x],peptides= df_concat13_concat['Peptides'][x],
            uniquepeptides= df_concat13_concat['Unique peptides'][x],sequencecoveragep=df_concat13_concat['Sequence coverage [%]'][x],moldotweightkda= df_concat13_concat['Mol. weight [kDa]'][x],
            qhvalue=  df_concat13_concat['Q-value'][x],score=  df_concat13_concat['Score'][x] ,  idsfrondevi = df_concat13_concat['id'][x],  evidenceids=df_concat13_concat['Evidence IDs'][x]
            ,   valuess= df_concat13_concat['concat_samples'][x] ,proj=projtitle  ) #,performer=username
        
            Groups2groups.save()
    else:
        print('pass_Ck_title')

    print(3) #
#    pcs=projectsamples(    proj=projtitle,    concatsamples=    ix_columns, distributions=log2fcvalues) 
    ck_title=    list(set([x.proj for x in projectsamples.objects.all()])).count(projtitle)
    ck_compare=    list(set([x.compare for x in projectsamples.objects.all()]))#.count(projtitle)
    for x in log2fcvalues.keys():
        ck_compare2= ck_compare.count(x)
        print(ck_compare2)
        print(ck_title)
        print('ck_values')
        if (ck_title==0 and ck_compare2==0): 
            print('choose_else1')
            pcs=projectsamples(    proj=projtitle,    concatsamples=    ix_columns, distributions=log2fcvalues[x], compare=x) 
            pcs.save()        
        elif (ck_title>0 and ck_compare2 ==0):
            print('choose_else2')
            pcs=projectsamples(    proj=projtitle,    concatsamples=    ix_columns, distributions=log2fcvalues[x], compare=x)
            pcs.save()
        else:
            print('choose_else3')
            #pass

            


    len(log2fcvalues.keys())
    
    print('fin')
    return uploaded_file_url




@shared_task
def network_parsing(ppifilename, cropsfilename, loc2strfilename, username ,projtitle,cutoff):
    print(1)
    def try_convert(x):
        try:
            return ','.join(np.stack(( np.array( x  )).astype(str)))
        except TypeError:
            return str(x)

    def try_convert2(x):
        try:
            return ','.join(np.stack(( np.array( x  )).astype(str)))
        except ValueError:
            return 'Nan'

    def try_convert3(x):
        try:
            return ','.join(np.stack(( np.array( x  )).astype(str)))
        except TypeError:
            return str(x)
        except ValueError:
            return 'Nan'

    def get_key4(locap, y):
        locap_ix=locap.set_index('locus')
        
        try:
            return locap_ix.loc[y]['location']
        except KeyError:
            return 'Nan'

    
    def read_pnet2(ppi_root,crop_root,loc2strpath,cutoff):
        
        #read proteingroups


        print(123)
        proteome_4530_full=pd.read_csv(f'{ppi_root}' ,compression='gzip',sep=' ') 
        print(124566)
        loc2str = pd.read_csv(f'{loc2strpath}' )
        setpro=loc2str.set_index('protein_id')
        print(12456677)
        locap= pd.read_csv(f'{crop_root}')
        locap['locus'] = locap.apply(lambda x: x['locus'].upper() ,axis=1)
        print(1243)
        proteome_4530_full['proteinos1'] = proteome_4530_full.apply(lambda x: x['protein1'].split('.')[1] ,axis=1)
        proteome_4530_full['proteinos2'] = proteome_4530_full.apply(lambda x: x['protein2'].split('.')[1] ,axis=1)
        proteome_4530_full=proteome_4530_full[['proteinos1','proteinos2','combined_score']]
        proteome_4530_full=proteome_4530_full[proteome_4530_full['combined_score']>int(cutoff)].reset_index()
        proteome_4530_full.index.name = 'id'
        exp_drop=proteome_4530_full.drop_duplicates(subset=['proteinos1', 'proteinos2'], keep='last')
        print(1245)
        osadropgenes=list(set(exp_drop['proteinos1'].tolist()+exp_drop['proteinos2'].tolist()))
        print(23333333)

        exp_drop['masked_id']=exp_drop.apply(lambda x: osadropgenes.index(x['proteinos1']),axis=1)
        print(2333333355555)
        exp_drop['S2T']=exp_drop.apply(lambda x: osadropgenes.index(x['proteinos2']),axis=1)

        print(23333333444444446664)

        usingnp_source=exp_drop.set_index('masked_id')

        usingnp_source=usingnp_source.rename(columns = {'S2T': 'target'}, inplace = False)
        print(23333333444444444)
        usingnp_source2=usingnp_source[['target']]

        usingnp_source2=usingnp_source[['target']]
        print(23333333444444446664888888)
        usingnp_source2.index.name='source'
        usingnp_source.index.name='masked_id'
        usingnp_source=usingnp_source.reset_index()

        print(2)


        usingnp_source['targets'] =  usingnp_source.apply(lambda x:  try_convert(usingnp_source2.loc[x.masked_id]['target'].tolist() ),axis=1)

        usingnp_source=usingnp_source.rename(columns = {'proteinos1': 'name','masked_id':'id'}, inplace = False)
        drop_usingnp_source=usingnp_source.drop_duplicates(['name']).reset_index()


        drop_usingnp_source['Uniprot_accession_No'] =drop_usingnp_source.apply(lambda x:  try_convert2([x for x in setpro.loc[x['name']]['alias'] if len(x) in [6,10] if '.' not in x if '_' not in x]) ,axis=1)

        drop_usingnp_source['Sub_cellular'] =drop_usingnp_source.apply(lambda x: try_convert(list(get_key4(locap, x['name'])) ),axis=1) # 

        drop_usingnp_source['MSU_id']=drop_usingnp_source.apply(lambda x: try_convert3([x for x in setpro.loc[x['name']]['alias']  if 'LOC_' in x])  ,axis=1     )

        drop_usingnp_source['Sub_cellular']= drop_usingnp_source.apply(lambda x:  'Nan' if x['Sub_cellular'] == 'N,a,n' else x['Sub_cellular'], axis=1)
        print(drop_usingnp_source.columns)
        drop_usingnp_source.columns=['index','mask_id','id','name','proteinos2','combined_score','target','targets','Uniprot_accession_No','Sub_cellular','MSU_id']

        hi1=drop_usingnp_source[['mask_id','name','combined_score','targets','Uniprot_accession_No','Sub_cellular','MSU_id']]



        return hi1

    
    ppipath = os.path.join(settings.MEDIA_ROOT, ppifilename)
    
    cropspath = os.path.join(settings.MEDIA_ROOT, cropsfilename)
    loc2strpath = os.path.join(settings.MEDIA_ROOT, loc2strfilename)

    hi2=read_pnet2(ppipath,cropspath,loc2strpath ,cutoff)
    print(1234444)
    print(len(hi2))
    for x in range(len(hi2)):
        PPI_proteomesave=PPI_proteome(id=x ,mask_id=hi2['mask_id'][x], name=hi2['name'][x]
        ,combined_score=hi2['combined_score'][x], targets=hi2['targets'][x],Uniprot_accession_No= hi2['Uniprot_accession_No'][x],
          Sub_cellular= hi2['Sub_cellular'][x],MSU_id=hi2['MSU_id'][x] ,proj=projtitle )
     
        PPI_proteomesave.save()


    return len(hi2)

    """