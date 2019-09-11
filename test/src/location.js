import React, { Component } from "react";
import Header from "./Header";
import Navibar from "./Navibar";
import MapContainer from "./MapContainer";
import "./location.css";

class Location extends Component {
  state = {
    locationName: "",
    locationCode: "",
    location: []
  };

  getData() {
    fetch("http://localhost:5000/location")
      .then(response => {
        return response.json();
      })
      .then(location => {
        // console.log(myJson)
        this.setState({ location });
        console.log("location", this.state.location);
      });
  }

  locationTable() {
    return this.state.location.map(location => {
      const { locationName, locationCode } = location;
      return (
        <tr>
          <td>{locationName}</td>
          <td>{locationCode}</td>
        </tr>
      );
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

  handleSubmit = event => {
    event.preventDefault();
    this.onAfterInsertRow();
    this.setState({
      locationName: "",
      locationCode: ""
    });
  };

  onAfterInsertRow = () => {
    const url = "http://localhost:5000/addlocation";
    const bodyData = JSON.stringify({
      locationName: this.state.locationName,
      locationCode: this.state.locationCode
    });
    console.log(bodyData);
    const othepram = {
      headers: {
        "content-type": "application/json; charset=UTF-8"
      },
      body: bodyData,
      method: "POST"
    };
    fetch(url, othepram)
      .then(data => console.log(data))
      .then(response => {
        this.getData();
      })
      .catch(error => {});
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const options = {
      afterInsertRow: this.onAfterInsertRow
    };

    return (
      <div>
        <Header />
        <Navibar />
        <div className="wrapper">
          <div className="form-wrapper">
            <form
              className="locationForm"
              onSubmit={this.handlesubmit}
              options={options}
            >
              <h1>เพิ่มพื้นที่</h1>
              <div className="locationName">
                <label htmlFor="locationName">พื้นที่: </label>
              </div>
              <input
                className="inputModal"
                type="text"
                placeholder="พื้นที่"
                name="locationName"
                onChange={event => this.handleChange(event)}
                value={this.state.locationName}
              />
              <div className="locationCode">
                <label htmlFor="locationCode">โค้ด: </label>
              </div>
              <input
                className="inputModal"
                type="text"
                placeholder="โค้ด"
                name="locationCode"
                onChange={event => this.handleChange(event)}
                value={this.state.locationCode}
              />
              <div className="addarea">
                <button
                  onClick={event => this.handleSubmit(event)}
                  type="submit"
                >
                  เพิ่มพื้นที่
                </button>
              </div>
            </form>
          </div>
        </div>
        <h2 className="titleLocation">Location</h2>
        <table class="locationtable">
          <tbody className="location">{this.locationTable()}</tbody>
        </table>
        <MapContainer location={this.state.locationName}/>
      </div>
    );
  }
}
export default Location;
