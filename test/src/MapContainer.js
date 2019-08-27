import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
// import "./MapContainer.css"

const mapStyles = {
  width: '90%',
  height: '90%',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto'
};

export class MapContainer extends Component {

  

  render() {
    return (
      // <div className='map'>
      <Map
        google={this.props.google}
        zoom={20}
        style={mapStyles}
        initialCenter={{
         lat: 13.652432,
         lng: 100.493598
        }}
      />
      // </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAxoQfcwY0VfsVxP_EmLxJyHxpxHWvNunc'
})(MapContainer);