<h1>Angular Google Maps - Auto Complete for Ng2</h1>

Code with Working Angular Google Maps with Auto Complete for Ng2


  <h2>
    Look For All inside  ngOnInit()
  </h2>  
  
<h4> <strong>General Search and POI</strong> </h4>
<div style="brackground:gray;padding:20px;">
  
        var autocomplete = new google.maps.places.SearchBox(this.searchElement.nativeElement);
        
<strong>Bias the SearchBox results towards current map's viewport.</strong>

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
</div><br/>

        
             
<h4> <strong>Clear out the old markers</strong> </h4>

<div style="brackground:gray;padding:20px;">
  
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];
</div><br/>
  
<h4> <strong>For each place, get the icon, name and location.</strong> </h4>

<div style="brackground:gray;padding:20px;">
  
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
</div><br/>
  
<h4> <strong>Create a marker for each place</strong> </h4>

<div style="brackground:gray;padding:20px;">
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
</div><br/>
  
