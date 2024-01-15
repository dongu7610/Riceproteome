from django.contrib import admin
from .models import UploadFileModel,FileinfoModel,ProjectinfoModel,ImgfieldModel,Protein_calcul,AnalysisinfoModel,TaskidandID,Analysisidstatus,Protein_calcultask,FragpipeProtein_calcultask
from django.db import models
from markdownx.admin import MarkdownxModelAdmin



class UploadFileModelAdmin(MarkdownxModelAdmin):
    list_display = (
        'description',
        'filename',
        'files',
        'upload_at',
      'username',
      'projecttitle','destxt','NormMethod','Software','ImputeMethod'
        
       # 'compare',
    )

class FileinfoModelAdmin(MarkdownxModelAdmin):
    list_display = (
        'proj',
        'compare',
      'username',
      'whole',
      'projecttitle','destxt','NormMethod','Software','ImputeMethod'
        
    )
    
class ProjectinfoModelAdmin(MarkdownxModelAdmin):
  list_display=(
    'projectname','startdate','enddate','description','username'
  )

class ImgfieldModelAdmin(MarkdownxModelAdmin):

  list_display=(
    'description','imagefiles','username','projecttitle','attr'
  )



class Protein_calculAdmin(MarkdownxModelAdmin):

  list_display=(
    'projidtitle','indexinfo'
  )



class AnalysisinfoModelAdmin(MarkdownxModelAdmin):

  list_display=(
   'Analysisinfo',   'proj' ,  'compare' ,  'username' ,   'whole' , 'projecttitle',   'LabelMethod',    'FilterMethod',
'AnalysisinfoTXT', 'indexinfo' , 'taskId' , 'taskIdfin' , 'taskId2', 'taskId3',  'pvfc' , 'proteincount' ,'NormMethod','Software','ImputeMethod'
  )



class TaskidandIDModelAdmin(MarkdownxModelAdmin):

  list_display=(
   'Taskid' ,'Analysisid'
  )

class AnalysisidstatusModelAdmin(MarkdownxModelAdmin):

  list_display=(
   'Analysisid','RelatedModels','finishmode'
  )
  def delete_model(self, request, obj):
    Protein_calcultask.objects.filter(Analysisid=obj.Analysisid).delete()
    FragpipeProtein_calcultask.objects.filter(Analysisid=obj.Analysisid).delete()
    super().delete_model(request, obj)

#Analysisidstatus
#TaskidandID
admin.site.register(FileinfoModel, FileinfoModelAdmin)    

admin.site.register(UploadFileModel, UploadFileModelAdmin)

admin.site.register(ProjectinfoModel, ProjectinfoModelAdmin)

admin.site.register(ImgfieldModel, ImgfieldModelAdmin)  

admin.site.register(AnalysisinfoModel, AnalysisinfoModelAdmin) 
admin.site.register(Analysisidstatus, AnalysisidstatusModelAdmin) 
admin.site.register(TaskidandID, TaskidandIDModelAdmin)  