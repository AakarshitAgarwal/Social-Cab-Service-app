from rest_framework import serializers
from status.models import NGO


class NgoSerializer(serializers.ModelSerializer):
    class Meta:
        model = NGO
        fields = [  
            'user', 
            'NGO_id', 
            'Name',
            'Location',
            'Type',
            'Description'
        ]

class NgoNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = NGO
        fields = [  
            'Name',
        ]


