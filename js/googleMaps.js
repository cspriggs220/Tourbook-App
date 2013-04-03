//********** Google Maps API *******************
  geocoder = new google.maps.Geocoder();
  
// function initialize() {
// };//end initialize

// Geocoding function to convert Address to Lat/Lng Coordinates
function getGeoCode(callback) {
  var address = $('#inputAddress').val();
  geocoder.geocode( {'address': address}, function(results,status){
    if (status == google.maps.GeocoderStatus.OK) {
      callback(results[0].geometry.location.lat(), results[0].geometry.location.lng() );
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });//end geocoder
}//end getGeoCode

// google.maps.event.addDomListener(window, 'load', initialize);

