from rest_framework import serializers
from .models import   FileinfoModel,UploadFileModel,ProjectinfoModel,ImgfieldModel,Protein_calcul ,SearchNetwork,AnalysisinfoModel,Networksinfo,Projgetinfo,Change2pModel,getFinNetwork,RemoveErrorEXP





class FileinfoModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = FileinfoModel
        fields = '__all__'


class ProjectinfoModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProjectinfoModel
        fields = '__all__'




class UploadFileModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = UploadFileModel
        fields = '__all__'
class ImgfieldModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = ImgfieldModel
        fields = '__all__'

class Protein_calculSerializer(serializers.ModelSerializer):

    class Meta:
        model = Protein_calcul
        fields = '__all__'




class SNserializers(serializers.ModelSerializer):

    class Meta:
        model = SearchNetwork
        fields = '__all__'


class SN2serializers(serializers.ModelSerializer):

    class Meta:
        model = Networksinfo
        fields = '__all__'

class AIserializers(serializers.ModelSerializer):

    class Meta:
        model = AnalysisinfoModel
        fields = '__all__'


class Adduser(serializers.ModelSerializer):

    class Meta:
        model = Projgetinfo
        fields = '__all__'

        
class Changep2p(serializers.ModelSerializer):

    class Meta:
        model = Change2pModel
        fields = '__all__'


class FinNet(serializers.ModelSerializer):

    class Meta:
        model = getFinNetwork
        fields = '__all__'

class RmEXP(serializers.ModelSerializer):

    class Meta:
        model = RemoveErrorEXP
        fields = '__all__'
