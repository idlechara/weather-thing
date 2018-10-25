import React, { Component } from "react";
import "./App.css";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import axios from "axios";
import swal from "sweetalert2";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  onMapClicked(mapProps, map, clickEvent) {
    let coordinates = {
      lat: clickEvent.latLng.lat(),
      lng: clickEvent.latLng.lng()
    };

    axios
      .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
      .then(response => {
        let address = "";
        try {
          address = response.data.results.reverse()[1].formatted_address;
          coordinates = response.data.results.reverse()[1].geometry.location;

          axios
            .get(`/API/query?lat=${coordinates.lat}&lng=${coordinates.lng}`)
            .then(response => {
              swal({
                title: address,
                text: `Actualmente hay ${response.data.toFixed(1)} ºC`,
                type: "success",
                confirmButtonText: "Ok"
              });
            });
        } catch (err) {
          swal({
            title: "¡No has hecho click en un país!",
            text: `Esto no va funcionar si es que le haces click a un trozo de tierra o agua que no está bajo el dominio de alguien.`,
            type: "error",
            confirmButtonText: "Ok"
          });
        }
      });
  }

  render() {
    return (
      <Map
        google={this.props.google}
        onClick={this.onMapClicked}
        zoom={2}
        maxZoom={2}
        minZoom={2}
      />
    );
  }
}
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(App);
