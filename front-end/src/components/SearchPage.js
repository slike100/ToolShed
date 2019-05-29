import React from "react";
import "./CSS/SearchPage.css";
import Sidebar from "./Sidebar.js";
import Map from "./Map.js";


class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: '',
      lng: '',
    };
  }

  renderMap = () => {
    const API_KEY = '';
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`)
    window.initMap = this.initMap
  }

  initMap = () => {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 40.1672, lng: -105.1019 },
      zoom: 13,
      mapTypeControl: false
    });
  }

  // centerMarker = (latlng) => {
  //   map.setCenter(latlng);
  // }

  componentDidMount() {
    this.renderMap();
  }

  render() {
    return (
      <div id="search-page">
        <Sidebar />
        <Map />
      </div>
    );
  }
}

function loadScript(url) {
  let index = window.document.getElementsByTagName("script")[0]
  let script = window.document.createElement('script')
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default SearchPage;
