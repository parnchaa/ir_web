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
    carOwnerAddress: "",
    licensePlate: "",
    carColor: "",
    brandCar: "",
    modelCar: "",
    errors: {
      carOwnerFname: "",
      carOwnerLname: "",
      carOwnerTel: "",
      carOwnerEmail: "",
      carOwnerAddress: "",
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
      carOwnerAddress,
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
      carOwnerAddress !== "" &&
      licensePlate !== "" &&
      carColor !== "" &&
      brandCar !== "" &&
      modelCar !== ""
    ) {
      if (this.validateForm(this.state.errors)) {
        this.onAfterAddCarOwner();
        console.log("Valid Form");
      } else {
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

  onAfterAddCarOwner = event => {
    console.log("ddd");
    const {
      carOwnerFname,
      carOwnerLname,
      carOwnerTel,
      carOwnerEmail,
      carOwnerAddress,
      licensePlate,
      carColor,
      brandCar,
      modelCar
    } = this.state;
    const url = "http://localhost:5000/addSticker";
    var today = new Date();
    var curDate = today.getUTCDate();
    var curMonth = today.getUTCMonth() + 1;
    var curYear = today.getFullYear()
    var nextYear = today.getFullYear()+1
    var currentDate = curYear+'-'+curMonth+'-'+curDate
    var expireDate = nextYear+'-'+curMonth+'-'+curDate
    console.log(currentDate,'curdate')
    const bodyData = JSON.stringify({
      carOwnerFname: carOwnerFname,
      carOwnerLname: carOwnerLname,
      carOwnerTel: carOwnerTel,
      carOwnerEmail: carOwnerEmail,
      carOwnerAddress: carOwnerAddress,
      licensePlate: licensePlate,
      carColor: carColor,
      brandCar: brandCar,
      modelCar: modelCar,
      registerDate: currentDate,
      expireDate: expireDate
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
      .then(response => {
        alert("เพิ่มข้อมูลผู้ขอสติกเกอร์สำเร็จ");
        this.setState({
          carOwnerFname: "",
          carOwnerLname: "",
          carOwnerTel: "",
          carOwnerEmail: "",
          carOwnerAddress: "",
          licensePlate: "",
          carColor: "",
          brandCar: "",
          modelCar: ""
        });
      })
      .catch(error => {});
  };

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    const validEmailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const phoneno = /^0[0-9]{8,9}$/i;
    const checkLicensePlate = /^([ก-ฮ]{2})+([0-9]{1,4})$/i;
    const checkLicensePlate2 = /^([0-9]{1})+([ก-ฮ]{2})([0-9]{1,4})$/i;

    switch (name) {
      case "carOwnerFname":
        errors.carOwnerFname =
          value.length < 2 ? "กรุณากรอกชื่อ เช่น สมชาย" : "";
        break;
      case "carOwnerLname":
        errors.carOwnerLname =
          value.length < 2 ? "กรุณากรอกนามสกุล เช่น ใจดี " : "";
        break;
      case "carOwnerTel":
        errors.carOwnerTel = phoneno.test(value)
          ? ""
          : "กรุณากรอกเบอร์โทรให้ถูกต้อง เช่น 0812345678";
        break;
      case "carOwnerEmail":
        errors.carOwnerEmail = validEmailRegex.test(value)
          ? ""
          : "กรุณากรอกอีเมล์ให้ถูกต้อง เช่น somchai@gmail.com";
        break;
      case "carOwnerAddress":
        errors.carOwnerAddress =
          value.length < 10 ? "กรุณาใส่ที่อยู่ให้ถูกต้อง" : "";
        break;
      case "licensePlate":
        errors.licensePlate =
          checkLicensePlate.test(value) || checkLicensePlate2.test(value)
            ? ""
            : "กรุณากรอกทะเบียนรถให้ถูกต้อง";
        break;
      case "carColor":
        errors.carColor = value.length < 2 ? "กรุณากรอกสีรถยนต์ให้ถูกต้อง" : "";
        break;
      case "brandCar":
        errors.brandCar =
          value.length < 2 ? "กรุณากรอกชื่อยี่ห้อรถให้ถูกต้อง" : "";
        break;
      case "modelCar":
        errors.modelCar =
          value.length < 2 ? "กรุณากรอกรุ่นรถยนต์ให้ถูกต้อง" : "";
        break;
    }

    this.setState({ errors, [name]: value }, () => {
      console.log(errors);
    });
    console.log(value);
  };

  render() {
    console.log("name:" + this.state.carOwnerFname);
    const { errors } = this.state;
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
                <div>
                  <input
                    type="text"
                    placeholder="ชื่อ"
                    name="carOwnerFname"
                    value={this.state.carOwnerFname}
                    onChange={event => this.handleChange(event)}
                  ></input>
                  {errors.carOwnerFname.length > 0 && (
                    <p className="error">{errors.carOwnerFname}</p>
                  )}
                </div>
              </div>
              <div className="eachField">
                <div>
                  <input
                    type="text"
                    placeholder="นามสกุล"
                    name="carOwnerLname"
                    value={this.state.carOwnerLname}
                    onChange={event => this.handleChange(event)}
                  ></input>
                  {errors.carOwnerLname.length > 0 && (
                    <p className="error">{errors.carOwnerLname}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="eachField">
              <label>เบอร์โทรศัพท์:</label>
              <div>
                <input
                  type="text"
                  placeholder="เบอร์โทรศัพท์"
                  name="carOwnerTel"
                  value={this.state.carOwnerTel}
                  onChange={event => this.handleChange(event)}
                ></input>
                {errors.carOwnerTel.length > 0 && (
                  <p className="error">{errors.carOwnerTel}</p>
                )}
              </div>
            </div>
            <div className="eachField">
              <label>อีเมล:</label>
              <div>
                <input
                  type="text"
                  placeholder="อีเมล"
                  name="carOwnerEmail"
                  value={this.state.carOwnerEmail}
                  onChange={event => this.handleChange(event)}
                ></input>
                {errors.carOwnerEmail.length > 0 && (
                  <p className="error">{errors.carOwnerEmail}</p>
                )}
              </div>
            </div>

            <div className="eachField">
              <label>ที่อยู่:</label>

              <input
                type="text"
                className="addressInput"
                name="carOwnerAddress"
                value={this.state.carOwnerAddress}
                placeholder="ที่อยู่"
                onChange={event => this.handleChange(event)}
              ></input>
              {errors.carOwnerAddress.length > 0 && (
                <p className="error">{errors.carOwnerAddress}</p>
              )}
            </div>

            <div className="formRow">
              <div className="eachField">
                <label>ทะเบียนรถ:</label>
                <div>
                  <input
                    type="text"
                    placeholder="ทะเบียนรถ"
                    name="licensePlate"
                    value={this.state.licensePlate}
                    onChange={event => this.handleChange(event)}
                  ></input>
                  {errors.licensePlate.length > 0 && (
                    <p className="error">{errors.licensePlate}</p>
                  )}
                </div>
              </div>
              <div className="eachField">
                <label>สีรถ:</label>
                <div>
                  <input
                    type="text"
                    placeholder="สีรถ"
                    name="carColor"
                    value={this.state.carColor}
                    onChange={event => this.handleChange(event)}
                  ></input>
                  {errors.carColor.length > 0 && (
                    <p className="error">{errors.carColor}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="formRow">
              <div className="eachField">
                <label>ยี่ห้อรถ:</label>
                <div>
                  <input
                    type="text"
                    placeholder="ยี่ห้อรถ"
                    name="brandCar"
                    value={this.state.brandCar}
                    onChange={event => this.handleChange(event)}
                  ></input>
                  {errors.brandCar.length > 0 && (
                    <p className="error">{errors.brandCar}</p>
                  )}
                </div>
              </div>
              <div className="eachField">
                <label>รุ่นรถ:</label>
                <div>
                  <input
                    type="text"
                    placeholder="รุ่นรถ"
                    name="modelCar"
                    value={this.state.modelCar}
                    onChange={event => this.handleChange(event)}
                  ></input>
                  {errors.modelCar.length > 0 && (
                    <p className="error">{errors.modelCar}</p>
                  )}
                </div>
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
