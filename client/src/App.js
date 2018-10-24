import React, { Component } from "react";
import "./App.css";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

class App extends Component {
  onMapClicked(mapProps, map, clickEvent) {
    const coordinates = {
      lat: clickEvent.latLng.lat(),
      lng: clickEvent.latLng.lng()
    };
  }
  render() {
    return (
      <Map google={this.props.google} zoom={2} onClick={this.onMapClicked} />
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyAF_BYy0S9FfOStIU-JZayxNteppkV7YZU"
})(App);
