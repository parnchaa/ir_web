/* global google */
import React, { Component } from "react";
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs
} from "react-google-maps";
import { compose, withProps } from "recompose";
import Modal from "react-responsive-modal";
import "./MapContainer.css";
import map from "./picture/map.png";

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
    {/* {showPolygon()} */}
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

// function showPolygon() {
//   fetch("http://localhost:5000/locationCode")
//     .then(response => {
//       return response.json();
//     })
//     .then(response => {
//       var oldPolygon = response;
//       console.log(oldPolygon, "oldPolygon");
//       return oldPolygon.map(oldPolygon => {
//         return (
//           <Polygon
//             paths={oldPolygon}
//             strokeColor="#F5B041"
//             strokeOpacity={1}
//             strokeWeight={1}
//             fillColor="#F9E79F"
//             fillOpacity={0.5}
//           ></Polygon>
//         );
//       });
      
//     });
// }


let location = []

function getPaths(polygon) {
  var allPaths = JSON.stringify(polygon.getPath().getArray()) ;

  var labelName = prompt("โปรดกรอกชื่อสถานที่")

  if(labelName !== null){
    let setLocation = {
      locationName: labelName,
      locationCode: allPaths
    }
    let jsonLocationStringify = JSON.stringify(setLocation)
    let jsonLocation = JSON.parse(jsonLocationStringify)
    
    location.push(jsonLocation)
  }

}

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMarkerShown: false,
      stickerColor: [],
      stickerID: 0,
      stickerText:'',
      openSave: true
    };
  }

  componentDidMount() {
    this.delayedShowMarker();
    this.getColorOfSticker();
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

  getColorOfSticker = () =>{
    fetch("http://localhost:5000/stickerColor")
      .then(response => {
        return response.json();
      })
      .then(stickerColor => {
        this.setState({
          stickerColor: stickerColor
        })
      });
  }

  createStickerOptions = () => {
    let stickerOptions = []
    let {stickerColor} = this.state

    for (let i = 0; i < stickerColor.length; i++) {
      stickerOptions.push(<option value = {stickerColor[i].stickerID}>{stickerColor[i].value}</option>)
    }

    return stickerOptions
  }

  getStickerID = () =>{
    let sticker = document.getElementById('sticker')
    let stickerID = sticker.value
    let stickerText = sticker.options[sticker.selectedIndex].text
    
    this.setState({
      stickerID: stickerID,
      stickerText: stickerText
    })
  }

  recordLocation = () => {
    
    let locationNameReceive = location[0].locationName,
    locationCodeReceive = location[0].locationCode,
    stickerIDForUse = this.state.stickerID;
    
    
    if (location.length !== 0 ) {
      const url = "http://localhost:5000/addLocationLabel";

      const bodyData = JSON.stringify({
        locationName: locationNameReceive ,
        locationCode: locationCodeReceive,
        stickerID: stickerIDForUse
      });

      const othepram = {
        headers: {
          "content-type": "application/json; charset=UTF-8"
        },
        body: bodyData,
        method: "POST"
      };

      fetch(url, othepram)
        .then(data => console.log(data))
    }
    
    location = []
    this.onCloseSave()
    
  }

  onCloseSave = () =>{
    this.setState({
      openSave: false
    })
  }

  render() {

    return (
      <div>
        <h2 className="Table-header">บันทึกสถานที่ <img src={map} className="Headicon"/></h2>
        <div className="chooseStickerColor">
          <h4 className="titleChooseSticker">เลือกสีสติ๊กเกอร์</h4>
          <p className="Subtext">โปรดเลือกสีของสติ๊กเกอร์ให้ตรงสถานที่ และกฎขององค์กรที่กำหนดไว้</p>
          <select className="SelectSticker" onChange={this.getStickerID} id="sticker">
            <option selected  disabled>สีสติ๊กเกอร์</option>
            {this.createStickerOptions()}
          </select>
        </div>
        <MapWithADrawingManager
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick}
        />
        {location.length == 0 ?
          null
          :
          <Modal
            // className="modal"
            open={this.state.openSave}
            onClose={this.onCloseSave}
            center
          >
            <div>
              <h5>ชื่อสถานที่: </h5>
              <p>{location[0].locationName}</p>
            </div>
            <div>
              <h5>สีสติ๊กเกอร์: </h5>
              <p>{this.state.stickerText}</p>
            </div>
            <button onClick={this.recordLocation}>บันทึกสถานที่</button>
          </Modal>
        }
      </div>
    );
  }
}

export default MapContainer;
