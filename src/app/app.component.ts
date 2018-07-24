import { Component, NgModule, ViewChild, ElementRef, NgZone, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule,AgmMap, AgmMarker,MapsAPILoader,LatLngBoundsLiteral } from '@agm/core';
import { GoogleMap } from '@agm/core/services/google-maps-types';
import {} from '@types/googlemaps'; 

// var google: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  // showTrafficLayer: boolean = false;
  // Zoom
  zoom:number = 13;
  // Start Position
  latitude:number = -23.572743;
  longitude:number = -46.647082;
  locationChosen = false;
  
 

  onChoseLocation (event){
    console.log(event)
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.locationChosen= true;
  }
  
  @ViewChild('search') public searchElement: ElementRef;
  @ViewChild('map') public mapElement: ElementRef;
  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone){}

  ngOnInit(){
    this.mapsAPILoader.load().then(
      () => {
        var map = new google.maps.Map(this.mapElement.nativeElement, {
          center: {lat: this.latitude, lng: this.longitude},
          zoom: 13,
        });
        
        //Traffic Layer
        var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);

        //Busca geral e POI
        var autocomplete = new google.maps.places.SearchBox(this.searchElement.nativeElement);
        
          // Bias the SearchBox results towards current map's viewport.
          map.addListener('bounds_changed', function() {
            autocomplete.setBounds(map.getBounds());
          });
          
          var markers = [];



        autocomplete.addListener("places_changed", () => {
          this.ngZone.run(() => {
            
            let places: google.maps.places.PlaceResult[] = autocomplete.getPlaces();
                      
              if(places.length == 0){
                return;
              }
        
              // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
      
            });
        });
      }
    );
  }
  

}




