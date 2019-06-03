import React from "react";
import "./CSS/SearchPage.css";
import Sidebar from "./Sidebar.js";
import Map from "./Map.js";
import { connect } from "react-redux";
import { API_KEY } from "../utils/firebaseConfig";
import mapIcon from "../assets/img/map_icon.png";
import { toolSearchLocation } from "../redux/actions/toolActions";

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      lng: "",
      markers: []
    };
  }

  renderMap = () => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`
    );
    window.initMap = this.initMap;
  };

  initMap = () => {
    console.log("initMap fired");
    // console.log(this.props.user.lat);
    // if (!this.props.user) {
    //   var userLat = 40;
    //   var userLng = -105;
    // } else {
    //   var userLat = this.props.user.lat;
    //   var userLng = this.props.user.lng;
    // }
    var displayLat;
    var displayLng;

    if (this.props.toolLocation) {
      displayLat = this.props.toolLocation.lat;
      displayLng = this.props.toolLocation.long;
    } else if (this.props.user && !this.props.toolLocation) {
      displayLat = this.props.user.lat;
      displayLng = this.props.user.long;
    } else {
      displayLat = 40.02123;
      displayLng = -105.217416;
    }

    console.log(displayLat, displayLng);

    let map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 11,
      center: { lat: displayLat, lng: displayLng },
      mapTypeControl: false
    });

    var infowindow = new window.google.maps.InfoWindow();
    var renderMarkers = [];
    const { toolsSearched } = this.props;

    // var bounds = new google.maps.LatLngBounds();

    if (toolsSearched) {
      toolsSearched.forEach(location => {
        let dailyRate = `$${location.priceRatePerDay}`;
        let marker = new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.long },
          map: map,
          label: dailyRate,
          title: location.uid,
          icon: mapIcon,
          animation: window.google.maps.Animation.DROP
        });
        let cardInfo = `<div style="width:200px"><img className="sidebar-card-img" style="display:block;width:100%;height:auto;" src=${
          location.photo
        } alt="" /></div>`;

        marker.addListener("click", () => {
          window.setTimeout(marker.setAnimation(false), 1000);
          infowindow.setContent(cardInfo);
          infowindow.open(map, marker);
        });
        renderMarkers[renderMarkers.length] = marker;
      });
      this.setState({ markers: renderMarkers });
    }
  };

  componentDidMount() {
    this.renderMap();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.user) {
      console.log("prevProps: ", prevProps, "Current props: ", this.props);
      //     // this.props.toolSearchLocation({ lat: 0, long: 0 });
      //     this.renderMap();
    }
  }

  render() {
    return (
      <div id="search-page">
        <Sidebar renderMap={this.renderMap} />
        <Map />
      </div>
    );
  }
}

function loadScript(url) {
  let index = window.document.getElementsByTagName("script")[0];
  let script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

const mapDispatchToProps = {
  toolSearchLocation
};

function mapStateToProps(state) {
  return {
    // tool: state.tool
    toolsSearched: state.tool.toolsSearched,
    toolLocation: state.tool.toolSearchLocation,
    user: state.user.user
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);
