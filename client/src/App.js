import React, { Component } from "react";
import "./App.css";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import axios from 'axios'

class App extends Component {
  
  onMapClicked(mapProps, map, clickEvent) {
    let coordinates = {
      lat: clickEvent.latLng.lat(),
      lng: clickEvent.latLng.lng()
    };

    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&key=AIzaSyAF_BYy0S9FfOStIU-JZayxNteppkV7YZU`).then(response => {
      let address = "";
      try {
        address = response.data.results.reverse()[1].formatted_address;
        coordinates = response.data.results.reverse()[1].geometry.location;
      }
      catch (err) {
        // you have not clicked in a country
      }

      axios.get(`http://localhost:8081/API/query?lat=${coordinates.lat}&lng=${coordinates.lng}`).then(response => {
        console.log(response.data);
      });
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
