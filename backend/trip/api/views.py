from rest_framework import viewsets
from trip.models import Trip
from .serializers import TripSerializer, LocationSerializer

from rest_framework.generics import(
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView
)

class TripListView(ListAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    
class TripDetailView(RetrieveAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    
class TripCreateView(CreateAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    
class LocationCreateView(CreateAPIView):
    queryset = Trip.objects.all()
    serializer_class = LocationSerializer
    
class LocationRetreiveView(RetrieveAPIView):
    queryset = Trip.objects.all()
    serializer_class = LocationSerializer
