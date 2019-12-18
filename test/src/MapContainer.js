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
      openSave: true,
      openCheck: true
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
    let userData = JSON.parse(localStorage.getItem('tk'));
    let organizationIDTk = userData[0].organizationID
    fetch("https://irweb-api.tech/stickerColor/" + organizationIDTk)
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
    stickerIDForUse = document.getElementById('sticker').value;
    let userData = JSON.parse(localStorage.getItem("tk"));
    let organizationIDTk = userData[0].organizationID;
    
    if (location.length !== 0) {
      const url = "https://irweb-api.tech/addLocationLabel";

      const bodyData = JSON.stringify({
        locationName: locationNameReceive ,
        locationCode: locationCodeReceive,
        stickerID: stickerIDForUse,
        organizationID: organizationIDTk
      });

      const othepram = {
        headers: {
          "content-type": "application/json; charset=UTF-8"
        },
        body: bodyData,
        method: "POST"
      };

      fetch(url, othepram)
      
    }
    
    location = []
    this.onCloseSave()
    window.location.reload(false)
  }

  onCloseSave = () =>{
    this.setState({
      openSave: false
    })
  }

  onCloseCheck = ()=>{
    this.setState({
      openCheck: false
    })
  }

  showModal(){
    if(location.length !== 0 && this.state.stickerID === 0){
      return <div>
      <Modal 
        className="modalLocation"
        open={this.state.openCheck}
        onClose={this.onCloseCheck}
        center
      >
        <p className= "checkSticker" >โปรดเลือกสีของสติ๊กเกอร์!</p>
      </Modal>
      </div>
    }
    else if(location.length !== 0 && this.state.stickerID !==0){
      return <div>
      <Modal 
        className="modalLocation"
        open={this.state.openSave}
        onClose={this.onCloseSave}
        center
      >
        <p className="titleChooseSticker" >ยืนยันการบันทึกสถานที่</p>
        <div className="TitletextModal">
          <p>ชื่อสถานที่ : </p>
          <p>{location[0].locationName}</p>
        </div>
        <div className="TitletextModal">
          <p>สีสติ๊กเกอร์ : </p>
          <p>{this.state.stickerText}</p>
        </div>
        <button className="buttonModal" onClick={this.recordLocation}>บันทึกสถานที่</button>
      </Modal>
      </div>
    }
  }

  render() {

    return (
      <div>
        <h2 className="Table-header">บันทึกสถานที่จอดรถ <img src={map} className="Headicon"/></h2>
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
        {this.showModal()}
        {/* {location.length === 0?
          null
          :<div>
          <Modal 
            className="modalLocation"
            open={this.state.openSave}
            onClose={this.onCloseSave}
            center
          >
            <p className="titleChooseSticker" >ยืนยันการบันทึกสถานที่</p>
            <div className="TitletextModal">
              <p>ชื่อสถานที่ : </p>
              <p>{location[0].locationName}</p>
            </div>
            <div className="TitletextModal">
              <p>สีสติ๊กเกอร์ : </p>
              <p>{this.state.stickerText}</p>
            </div>
            <button className="buttonModal" onClick={this.recordLocation}>บันทึกสถานที่</button>
          </Modal>
          </div>
        } */}
        
      </div>
    );
  }
}

export default MapContainer;

