import React, { Component } from "react";
import Header from "./Header";
import Navibar from "./Navibar";
import MapContainer from "./MapContainer";
import "./location.css";
import deletePic from "./picture/delete.png";
import Modal from "react-responsive-modal";
import map from "./picture/map.png";

class Location extends Component {
  state = {
    locationName: "",
    locationCode: "",
    location: [],
    sticker:[],
    openDelete: false
  };

  getData() {
    let userData = JSON.parse(localStorage.getItem("tk"));
    let organizationIDTk = userData[0].organizationID;
    fetch("https://irweb-api.tech/location/" + organizationIDTk)
      .then(response => {
        return response.json();
      })
      .then(location => {
        this.setState({ location });
      });
      fetch("https://irweb-api.tech/stickerTable/" + organizationIDTk)
      .then(response => {
        return response.json();
      })
      .then(sticker => {
        this.setState({ sticker });
      });
  }

  handleChange = event => {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value
    });
  };

  componentDidMount() {
    this.getData();
  }

  onOpenDeleteModalLocation = locationID => e => {
    this.setState({
      openDelete: true,
      openLocationID: locationID
    });
  };
  onCloseDeleteModalLocation = () => {
    this.setState({ openDelete: false });
  };

  submitDeleteTaskLocation = () => {
    this.deleteFetch();
    this.onCloseDeleteModalLocation();
  };

  deleteFetch = () => {
    const url = "https://irweb-api.tech/deleteLocation";
    const bodyData = JSON.stringify({
      locationID: this.state.openLocationID
    });
    const othepram = {
      headers: {
        "content-type": "application/json; charset=UTF-8"
      },
      body: bodyData,
      method: "POST"
    };
    fetch(url, othepram)
      .then(() => this.getData())
  }
  
  locationTable() {
    return this.state.location.map(location => {
      const {
        locationName,
        locationID,
        colorOfSticker
      } = location;
      return (
        <tr>
          <td>{locationName}</td>
          <td>{colorOfSticker}</td>
          <Modal
            open={this.state.openDelete}
            onClose={this.onCloseDeleteModalLocation}
            center
          >
            <div className="ModalDelete">
              <h2>ลบสถานที่</h2>
              <div>ยืนยันการลบ</div>
              <button
                className="ButtonDelete"
                onClick={event => {
                  this.submitDeleteTaskLocation(this.state.openLocationID);
                }}
              >
                ลบ
              </button>
              <button
                className="ButtonCancel"
                onClick={this.onCloseDeleteModalLocation}
              >
                ยกเลิก
              </button>
            </div>
          </Modal>
          <button
            className="deleteModalButton"
            onClick={this.onOpenDeleteModalLocation(locationID)}
          >
            <img src={deletePic} className="deletePic" />
          </button>
        </tr>
      );
    });
  }

  stickerTable() {
    return this.state.sticker.map(sticker => {
      const {
        typeOfSticker,
        colorOfSticker
      } = sticker;
      return (
        <tr>
          <td>{colorOfSticker}</td>
          <td>{typeOfSticker}</td>
        </tr>
      );
    });
  }


  componentDidUpdate(nextState) {
    if (nextState !== this.state.location) {
      this.componentDidMount();
    }
  }

  render() {
    const options = {
      afterInsertRow: this.onAfterInsertRow
    };

    return (
      <div>
        <Header />
        <Navibar />
        <MapContainer location={this.state.locationName} />
        <h2 className="Table-header">
          รายละเอียดที่จอดรถ <img src={map} className="Headicon" />
        </h2>
        <div className="tableAll">
        <table class="locationtable">
          <tbody className="location">
            <th>ชื่อสถานที่</th>
            <th>สีสติ๊กเกอร์</th>
            {this.locationTable()}
          </tbody>
        </table>
        <table className="stickerTable">
          <tbody className="sticker">
            <th>สีสติ๊กเกอร์</th>
            <th>รายละเอียด</th>
            {this.stickerTable()}
          </tbody>
        </table>
      </div>
      </div>
    );
  }
}
export default Location;
