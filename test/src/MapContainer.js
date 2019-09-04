/* global google */
import React, { Component } from "react";
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";
import { compose, withProps } from "recompose";
// import DrawingManager from "react-google-maps/lib/components/drawing/DrawingManager";

const {
  DrawingManager
} = require("react-google-maps/lib/components/drawing/DrawingManager");

const MapWithADrawingManager = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAxoQfcwY0VfsVxP_EmLxJyHxpxHWvNunc&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: (
      <div
        style={{
          height: `500px`,
          width: "80%",
          marginTop:'30px',
          marginBottom: "50px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto"
        }}
      />
    ),
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={20}
    defaultCenter={new google.maps.LatLng(13.652507, 100.493619)}
  >
    <DrawingManager
      defaultDrawingMode={false}
      defaultOptions={{
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [google.maps.drawing.OverlayType.POLYGON]
        },
        polygonOptions: {
            strokeWeight: 1,
            strokeColor: '#ff0-000',
        }
      }
    }
    onPolygonComplete={(value) => console.log(getPaths(value))}  
/>
  </GoogleMap>
));

function getPaths (polygon){
  var allPaths = (polygon.getPath().getArray());
  var realPath = JSON.stringify({
    allPaths
  })
  console.log(realPath,'allPaths');
}

export class MapContainer extends Component {
  state = {
    isMarkerShown: false
  };

  componentDidMount() {
    this.delayedShowMarker();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 3000);
  };

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false });
    this.delayedShowMarker();
  };
  render() {
    return (
      <div>
        <MapWithADrawingManager
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick}
        />
      </div>
    );
  }
}

export default MapContainer;
