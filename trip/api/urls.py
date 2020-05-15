from django.urls import path
from .views import(
    TripListView,
    TripDetailView,
    TripCreateView,
    LocationCreateView,
    LocationRetreiveView
)

urlpatterns = [
    path('', TripListView.as_view()),
    path('create/', TripCreateView.as_view()),
    path('<pk>/', TripDetailView.as_view()),
    
    path('create', LocationCreateView.as_view()),
    path('<pk>', LocationRetreiveView.as_view())
]