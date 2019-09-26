import React, { Component } from "react";
import Header from "./Header";
import Navibar from "./Navibar";
import "./Addsticker.css";

class Addsticker extends Component {
  state = {
    carOwnerFname: "",
    carOwnerLname: "",
    carOwnerTel: "",
    carOwnerEmail: "",
    carOwmerAddress: "",
    licensePlate: "",
    carColor: "",
    brandCar: "",
    modelCar: "",
    errors: {
      carOwnerFname: "",
      carOwnerLname: "",
      carOwnerTel: "",
      carOwnerEmail: "",
      carOwmerAddress: "",
      licensePlate: "",
      carColor: "",
      brandCar: "",
      modelCar: ""
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const {
      carOwnerFname,
      carOwnerLname,
      carOwnerTel,
      carOwnerEmail,
      carOwmerAddress,
      licensePlate,
      carColor,
      brandCar,
      modelCar
    } = this.state;

    if (
      carOwnerFname !== "" &&
      carOwnerLname !== "" &&
      carOwnerTel !== "" &&
      carOwnerEmail !== "" &&
      carOwmerAddress !== "" &&
      licensePlate !== "" &&
      carColor !== "" &&
      brandCar !== "" &&
      modelCar !== ""
    ) {
      if (this.validateForm(this.state.errors)) {
        //   this.onAfterAddStaff()
        console.log("Valid Form");
      }else{
        console.error("Invalid Form");
      }
    } else {
      console.log("pls fill");
    }
  };

  validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      val => val.length > 0 && (valid = false)
    );
    return valid;
  };

  onAfterAddStaff = event => {
    console.log("ddd");
    const {
      carOwnerFname,
      carOwnerLname,
      carOwnerTel,
      carOwnerEmail,
      carOwmerAddress,
      licensePlate,
      carColor,
      brandCar,
      modelCar
    } = this.state;
    const url = "http://localhost:5000/addSticker";
    const bodyData = JSON.stringify({
      carOwnerFname: carOwnerFname,
      carOwnerLname: carOwnerLname,
      carOwnerTel: carOwnerTel,
      carOwnerEmail: carOwnerEmail,
      carOwmerAddress: carOwmerAddress,
      licensePlate: licensePlate,
      carColor: carColor,
      brandCar: brandCar,
      modelCar: modelCar
    });
    console.log(bodyData, "bodyData");
    const othepram = {
      headers: {
        "content-type": "application/json; charset=UTF-8"
      },
      body: bodyData,
      method: "POST"
    };
    fetch(url, othepram)
      .then(data => console.log(data))
      //   .then(response => {
      //     this.getData();
      //   })
      .catch(error => {});
  };

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    const validEmailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const phoneno = /^0[0-9]{8,9}$/i;
    switch (name) {
      case "carOwnerFname":
        errors.carOwnerFname = value.length < 2 ? "ใส่ชื่อดิไอสัส" : "";
        break;
      case "carOwnerLname":
        errors.carOwnerLname = value.length < 2 ? "ใส่นามสกุลดิไอสัส" : "";
        break;
      case "carOwnerTel":
        errors.carOwnerTel = phoneno.test(value) ? "" : "ใส่เบอร์ดีๆดิ้สัส";
        break;
      case "carOwnerEmail":
        errors.carOwnerEmail = validEmailRegex.test(value)
          ? ""
          : "ใส่เมลดีๆดิ้สัส";
        break;
      case "carOwmerAddress":
        errors.carOwmerAddress = value.length < 10 ? "ใส่ที่อยู่ดีๆดิ้สัส" : "";
        break;
      case "licensePlate":
        errors.licensePlate = value.length < 3 ? "ใส่ดีๆดิ้สัส" : "";
        break;
      case "carColor":
        errors.carColor = value.length < 2 ? "ใส่ดีๆดิ้สัส" : "";
        break;
      case "brandCar":
        errors.brandCar = value.length < 2 ? "ใส่ดีๆดิ้สัส" : "";
        break;
      case "modelCar":
        errors.modelCar = value.length < 2 ? "ใส่ดีๆดิ้สัส" : "";
        break;
    }

    this.setState({ errors, [name]: value }, () => {
      console.log(errors);
    });
    console.log(value);
  };

  render() {
    console.log("name:" + this.state.carOwnerFname);
    return (
      <div>
        <Header />
        <Navibar />
        <div className="Table-header">เพิ่มข้อมูลผู้ขอสติกเกอร์</div>
        <div className="addSticker">
          <form className="addStickerForm">
            <div className="formRow">
              <div className="eachField">
                <label>ชื่อ:</label>
                <input
                  type="text"
                  placeholder="ชื่อ"
                  name="carOwnerFname"
                  value={this.state.carOwnerFname}
                  onChange={event => this.handleChange(event)}
                ></input>
              </div>
              <div className="eachField">
                {/* <label>นามสกุล:</label> */}
                <input
                  type="text"
                  placeholder="นามสกุล"
                  name="carOwnerLname"
                  value={this.state.carOwnerLname}
                  onChange={event => this.handleChange(event)}
                ></input>
              </div>
            </div>

            <div className="eachField">
              <label>เบอร์โทรศัพท์:</label>
              <input
                type="text"
                placeholder="เบอร์โทรศัพท์"
                name="carOwnerTel"
                value={this.state.carOwnerTel}
                onChange={event => this.handleChange(event)}
              ></input>
            </div>
            <div className="eachField">
              <label>อีเมล:</label>
              <input
                type="text"
                placeholder="อีเมล"
                name="carOwnerEmail"
                value={this.state.carOwnerEmail}
                onChange={event => this.handleChange(event)}
              ></input>
            </div>

            <div className="eachField">
              <label>ที่อยู่:</label>
              <input
                type="text"
                className="addressInput"
                name="carOwmerAddress"
                value={this.state.carOwmerAddress}
                placeholder="ที่อยู่"
                onChange={event => this.handleChange(event)}
              ></input>
            </div>
            <div className="formRow">
              <div className="eachField">
                <label>ทะเบียนรถ:</label>
                <input
                  type="text"
                  placeholder="ทะเบียนรถ"
                  name="licensePlate"
                  value={this.state.licensePlate}
                  onChange={event => this.handleChange(event)}
                ></input>
              </div>
              <div className="eachField">
                <label>สีรถ:</label>
                <input
                  type="text"
                  placeholder="สีรถ"
                  name="carColor"
                  value={this.state.carColor}
                  onChange={event => this.handleChange(event)}
                ></input>
              </div>
            </div>
            <div className="formRow">
              <div className="eachField">
                <label>ยี่ห้อรถ:</label>
                <input
                  type="text"
                  placeholder="ยี่ห้อรถ"
                  name="brandCar"
                  value={this.state.brandCar}
                  onChange={event => this.handleChange(event)}
                ></input>
              </div>
              <div className="eachField">
                <label>รุ่นรถ:</label>
                <input
                  type="text"
                  placeholder="รุ่นรถ"
                  name="modelCar"
                  value={this.state.modelCar}
                  onChange={event => this.handleChange(event)}
                ></input>
              </div>
            </div>
            <button
              className="buttonAddsticker"
              onClick={event => this.handleSubmit(event)}
            >
              เพิ่ม
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Addsticker;
