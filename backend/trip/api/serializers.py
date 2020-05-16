from rest_framework import serializers
from trip.models import Trip

class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = ('id', 'user', 'NGO_id', 'driverName')
        
class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = ('id', 'startingLocation', 'destination')
        