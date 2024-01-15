from rest_framework import serializers
from django.contrib.auth.models import User
from .models import  Profile,Data#proteinGroups2groups,
from rest_framework_jwt.settings import api_settings



#class User_seri(serializers.ModelSerializer):
 #   class Meta:
  #      model = User
   #     fields = ('email', 'username', 'researcherID')


#class proteinGroups_seri(serializers.ModelSerializer):
 #   class Meta:
  #      model = proteinGroups
   #     fields= ('auto_id','title','filedata','sampleLabels','NumberofSamples','method','columns2')    
     

'''
class proteinGroups2groups_seri(serializers.ModelSerializer):
    #auto_id         = models.AutoField(primary_key=True)
    class Meta:    
        model= proteinGroups2groups
        fields=(    'id',    
            'proteinids','majorityproteinids' , 'fastaheaders' ,  'numberofproteins' ,'peptides' ,'uniquepeptides','sequencecoveragep' , 'moldotweightkda' ,'qhvalue' ,'score' ,'idsfrondevi'
            
            , 'evidenceids','valuess','proj')

class proteinGroups2groups_seri2(serializers.ModelSerializer):
    #auto_id         = models.AutoField(primary_key=True)
    class Meta:    
        model= proteinGroups2groups
        fields=(    'id',    
            'proteinids','majorityproteinids' , 'fastaheaders' ,  'numberofproteins' ,'peptides' ,'uniquepeptides','sequencecoveragep' , 'moldotweightkda' ,'qhvalue' ,'score' ,'idsfrondevi'
            
            , 'evidenceids','valuess','proj')
'''



class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'email', 'id')


class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'first_name', 'last_name', 'email', 'password')

#profile 
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'user_pk', 'email', 'nickname', 'user', 'photo', 'mygit', 'myInfo')


class DataSerializer(serializers.ModelSerializer):

    class Meta:
        model = Data
        fields = '__all__'
