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
import axios from "axios";

export function addressToLatLng(location, context) {
  axios
    .get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        address: location,
        key: "AIzaSyCc4WdJOT7P6zSJ8o1Td871UXM-3Ay3Fsw"
      }
    })
    .then(function(response) {
      const addressLat = response.data.results[0].geometry.location.lat;
      const addressLng = response.data.results[0].geometry.location.lng;

      context.setState({
        searchLat: addressLat,
        searchLng: addressLng
      });
    })
    .catch(function(error) {
      console.log(error);
    });
}
