import React, { Component } from "react";
import "./App.css";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import axios from 'axios'

class App extends Component {
  
  onMapClicked(mapProps, map, clickEvent) {
    const coordinates = {
      lat: clickEvent.latLng.lat(),
      lng: clickEvent.latLng.lng()
    };

    axios.get(`http://localhost:8081/API/query?lat=${coordinates.lat}&lng=${coordinates.lng}`).then(response => {
      console.log(response.data);
    })
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
