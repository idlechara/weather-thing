import React, { Component } from 'react';
import './App.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 

class App extends Component {
  onMapClicked(mapProps, map, clickEvent) {
    console.log(mapProps);
    console.log(map);
    console.log(clickEvent);
    // Send to microservice
    // retrieve from microservice
    // display
  }
  render() {
    return (
      <Map google={this.props.google} zoom={2} onClick={this.onMapClicked} />
    );
  }
}
export default GoogleApiWrapper({
  apiKey: ('AIzaSyAF_BYy0S9FfOStIU-JZayxNteppkV7YZU')
})(App)