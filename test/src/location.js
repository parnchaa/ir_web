import React, { Component } from "react";
import Header from "./Header";
import Navibar from "./Navibar";
import MapContainer from "./MapContainer";
import "./location.css";
import deletePic from "./picture/delete.png";
import Modal from "react-responsive-modal";

class Location extends Component {
  state = {
    locationName: "",
    locationCode: "",
    location: [],
    openDelete: false
  };

  getData() {
    fetch("http://localhost:5000/location")
      .then(response => {
        return response.json();
      })
      .then(location => {
        // console.log(myJson)
        this.setState({ location });
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
        locationCode,
        locationID,
        openLocationID
      } = location;
      return (
        <tr>
          <td>{locationName}</td>
          <td>{locationCode}</td>
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

        <h2 className="Table-header">สถานที่จอดรถ</h2>
        <table class="locationtable">
          

          <tbody className="location">
            <th>ชื่อสถานที่</th>
            <th>รหัสสถานที่</th>
            {this.locationTable()}
          </tbody>
        </table>
        <MapContainer location={this.state.locationName} />
      </div>
    );
  }
}
export default Location;
