import axios from "axios";

export function addressToLatLng(location, context) {
  axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: {
      address: location,
      key: ''
    }
  })
    .then(function (response) {
      const addressLat = response.data.results[0].geometry.location.lat;
      const addressLng = response.data.results[0].geometry.location.lng;

      context.setState({
        searchLat: addressLat,
        searchLng: addressLng
      })
    })
    .catch(function (error) {
      console.log(error);
    })
}