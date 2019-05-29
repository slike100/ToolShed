// helper functions go here
function getAddress(lat, lng) {
  var geocoder = new google.maps.Geocoder();
  var latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };
  geocoder.geocode({ location: latlng }, function(results, status) {
    if (status === "OK") {
      console.log(results[0]);
    }
  });
}
