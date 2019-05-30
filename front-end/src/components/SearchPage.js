import React from "react";
import "./CSS/SearchPage.css";
import Sidebar from "./Sidebar.js";
import Map from "./Map.js";
import { connect } from "react-redux";
import { API_KEY } from '../utils/firebaseConfig';


class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: '',
      lng: '',
      markers: [],
    };
  }

  renderMap = () => {
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`)
    window.initMap = this.initMap
  }

  initMap = () => {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 40.1672, lng: -105.1019 },
      zoom: 13,
      mapTypeControl: false
    });

    let infowindow = new window.google.maps.InfoWindow();
    let renderMarkers = [];

    const { toolsSearched } = this.props;

    if (toolsSearched) {
      toolsSearched.forEach(location => {
        let marker = new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.long },
          map: map,
          title: location.uid,
          animation: window.google.maps.Animation.DROP,
        })

        let cardInfo = `<h6>$${location.priceRatePerDay}</h6>`;

        marker.addListener('click', () => {
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
          window.setTimeout(marker.setAnimation(false), 1000);
          // infowindow.setContent(cardInfo);
          // infowindow.open(map, marker);
        })
        renderMarkers[renderMarkers.length] = marker;
        infowindow.setContent(cardInfo);
        infowindow.open(map, marker);
      })
      this.setState({ markers: renderMarkers });
    }


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
        <Sidebar
          renderMap={this.renderMap}
        />
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

const mapDispatchToProps = {};

function mapStateToProps(state) {
  return {
    // tool: state.tool
    toolsSearched: state.tool.toolsSearched
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);
