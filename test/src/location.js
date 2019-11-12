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
    fetch("http://localhost:5000/location/" + organizationIDTk)
      .then(response => {
        return response.json();
      })
      .then(location => {
        // console.log(myJson)
        this.setState({ location });
        // console.log("location", this.state.location);
      });
      fetch("http://localhost:5000/stickerTable/" + organizationIDTk)
      .then(response => {
        return response.json();
      })
      .then(sticker => {
        // console.log(myJson)
        this.setState({ sticker });
        // console.log("location", this.state.location);
      });
  }

  handleChange = event => {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value
    });
    console.log("rr", event.target.name);
    console.log("rr", event.target.value);
  };

  // handleSubmit = event => {
  //   event.preventDefault();
  //   this.onAfterInsertRow();
  //   this.setState({
  //     locationName: "",
  //     locationCode: ""
  //   });
  // };

  // onAfterInsertRow = () => {
  //   const url = "http://localhost:5000/addlocation";
  //   const bodyData = JSON.stringify({
  //     locationName: this.state.locationName,
  //     locationCode: this.state.locationCode
  //   });
  //   console.log(bodyData);
  //   const othepram = {
  //     headers: {
  //       "content-type": "application/json; charset=UTF-8"
  //     },
  //     body: bodyData,
  //     method: "POST"
  //   };
  //   fetch(url, othepram)
  //     .then(data => console.log(data))
  //     .then(response => {
  //       this.getData();
  //     })
  //     .catch(error => {});
  // };

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
    const url = "http://localhost:5000/deleteLocation";
    const bodyData = JSON.stringify({
      locationID: this.state.openLocationID
    });
    console.log(bodyData);
    const othepram = {
      headers: {
        "content-type": "application/json; charset=UTF-8"
      },
      body: bodyData,
      method: "POST"
    };
    console.log("aaa", othepram);
    fetch(url, othepram)
      .then(data => console.log(data))
      .then(response => {
        this.getData();
      })
      .catch(error => {});
  };
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
          <td>{typeOfSticker}</td>
          <td>{colorOfSticker}</td>
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
          สถานที่จอดรถ <img src={map} className="Headicon" />
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
