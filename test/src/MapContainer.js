/* global google */
import React, { Component } from "react";
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Polygon
} from "react-google-maps";
import { compose, withProps } from "recompose";
// import DrawingManager from "react-google-maps/lib/components/drawing/DrawingManager";

const {
  DrawingManager
} = require("react-google-maps/lib/components/drawing/DrawingManager");

// var triangleCoords = [
//   { lat: 25.774, lng: -80.19 },
//   { lat: 18.466, lng: -66.118 },
//   { lat: 32.321, lng: -64.757 },
//   { lat: 25.774, lng: -80.19 }
// ];

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
          marginTop: "30px",
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
    // defaultCenter={new google.maps.LatLng(25.774, -80.19)}
  >
    {showPolygon()}
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
          strokeColor: "#ff0-000"
        }
      }}
      onPolygonComplete={value => console.log(getPaths(value))}
    />
  </GoogleMap>
));

function showPolygon() {
  fetch("http://localhost:5000/locationCode")
    .then(response => {
      return response.json();
    })
    .then(response => {
      var oldPolygon = response;
      console.log(oldPolygon, "oldPolygon");
      return oldPolygon.map(oldPolygon => {
        return (
          <Polygon
            paths={oldPolygon}
            strokeColor="#F5B041"
            strokeOpacity={1}
            strokeWeight={1}
            fillColor="#F9E79F"
            fillOpacity={0.5}
          ></Polygon>
        );
      });
      
    });
}

function getPaths(polygon) {
  var allPaths = polygon.getPath().getArray();
  var polygonPath = JSON.stringify({
    allPaths
  });
  var aaa = polygonPath.substr(12,polygonPath.length)
  console.log(aaa, "aaa");
  var labelName = prompt("Input", "");
  // console.log(labelName, "labelName");
  const url = "http://localhost:5000/addLocationLabel";
  const bodyData = JSON.stringify({
    locationName: labelName,
    locationCode: aaa
  });
  // console.log(bodyData, "bodyData");
  const othepram = {
    headers: {
      "content-type": "application/json; charset=UTF-8"
    },
    body: bodyData,
    method: "POST"
  };
  fetch(url, othepram)
    .then(data => console.log(data))
    .catch(error => {});
}

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMarkerShown: false
    };
  }

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
