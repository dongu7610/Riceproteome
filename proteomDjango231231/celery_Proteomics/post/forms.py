from django import forms
from .models import UploadFileModel,Linkget,ProjectinfoModel

class DocumentForm(forms.ModelForm):
	class Meta:
		model = UploadFileModel
		fields = ("description","files",'filename','username','projecttitle','destxt')

class Getform(forms.ModelForm):
	class Meta:
		model = Linkget
		fields = ("proj",'condition','username')
