'''import django_filters
from .models import  Networks_idinfo


      
      

def filter_by_majorityproteinids(queryset, name, value):
    
    values = value.split(',')
    a=[]
    for x in values:
        if len([x.majorityproteinids for x in queryset.filter(majorityproteinids__icontains=x)])> 0 :
            a.append([x.majorityproteinids for x in queryset.filter(majorityproteinids__icontains=x)][0])    
        else:
            a.append('nan')
 #       a.append([x.proteinids for x in queryset.filter(proteinids__icontains=x)][0])    

    
    return queryset.filter(majorityproteinids__in = a)    

class SnippetFiltername2(django_filters.FilterSet):
   majorityproteinids = django_filters.CharFilter(method=filter_by_majorityproteinids)

   class Meta:
      model = proteinGroups2groups
      fields = ['majorityproteinids']




def filter_by_ids(queryset, name, value):
    
    values = value.split(',')
    return queryset.filter(mask_id__in=values)


class SnippetFilterSet(django_filters.FilterSet):
   mask_id = django_filters.CharFilter(method=filter_by_ids)

   class Meta:
      model = Networks_idinfo
      fields = ['mask_id']

def filter_by_names(queryset, name, value):
    
    values = value.split(',')
    return queryset.filter(name__in=values)


class SnippetFiltername(django_filters.FilterSet):
   names = django_filters.CharFilter(method=filter_by_names)

   class Meta:
      model = Networks_idinfo
      fields = ['names']'''
      ''