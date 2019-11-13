import React, { Component } from "react";
import Header from "./Header";
import Navibar from "./Navibar";
import "./Addsticker.css";
import plusButton from "./picture/plusButton.png";
import adduser from "./picture/adduser.png";

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
    sticker: [],
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
    },
    stickerID: 0,
    province: ""
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
      } 
    } 
  };

  validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
  };

  getSticker() {
    let userData = JSON.parse(localStorage.getItem("tk"));
    let organizationIDTk = userData[0].organizationID;
    fetch("http://localhost:5000/stickerName/" + organizationIDTk, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .then(sticker => {
        this.setState({ sticker });
      });
  }

  onAfterAddCarOwner = event => {
    let userData = JSON.parse(localStorage.getItem("tk"));
    let organizationIDTk = userData[0].organizationID;
    const {
      carOwnerFname,
      carOwnerLname,
      carOwnerTel,
      carOwnerEmail,
      carOwnerAddress,
      licensePlate,
      carColor,
      brandCar,
      modelCar,
      stickerID,
      province
    } = this.state;
    var today = new Date();
    var curDate = today.getDate() + 1;
    var curMonth = today.getMonth() + 1;
    var curYear = today.getFullYear();
    var nextYear = today.getFullYear() + 1;
    var currentDate = curYear + "-" + curMonth + "-" + curDate;
    var expireDate = nextYear + "-" + curMonth + "-" + curDate;
    const bodyData = JSON.stringify({
      carOwnerFname: carOwnerFname,
      carOwnerLname: carOwnerLname,
      carOwnerTel: carOwnerTel,
      carOwnerEmail: carOwnerEmail,
      carOwnerAddress: carOwnerAddress,
      registerDate: currentDate,
      expireDate: expireDate,
      organizationID: organizationIDTk
    });
    const othepram = {
      headers: {
        "content-type": "application/json; charset=UTF-8"
      },
      body: bodyData,
      method: "POST"
    };
    fetch("http://localhost:5000/addCarowner", othepram).then(data => {
      if (data != null) {
        fetch("http://localhost:5000/lastCarOwnerId/" + organizationIDTk)
          .then(response => {
            return response.json();
          })
          .then(ID => {
            const bodyData2 = JSON.stringify({
              licensePlate: licensePlate,
              province: province,
              carColor: carColor,
              brandCar: brandCar,
              modelCar: modelCar,
              carOwnerID: ID[0].lastID,
              stickerID: stickerID,
              organizationID: organizationIDTk
            });
            const othepram2 = {
              headers: {
                "content-type": "application/json; charset=UTF-8"
              },
              body: bodyData2,
              method: "POST"
            };
            fetch("http://localhost:5000/addCar", othepram2).then(response => {
              this.setState({
                carOwnerFname: "",
                carOwnerLname: "",
                carOwnerTel: "",
                carOwnerEmail: "",
                carOwnerAddress: "",
                licensePlate: "",
                carColor: "",
                brandCar: "",
                modelCar: "",
                stickerID: 0,
                province: ""
              });
              this.setDefaultSelect();
            });
          });
      }
    });
  };

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    const validEmailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const phoneno = /^0[0-9]{8,9}$/i;
    const checkLicensePlate = /^([ก-ฮ]{2})+([0-9]{1,4})$/i;
    const checkLicensePlate2 = /^([0-9]{1})+([ก-ฮ]{2})([0-9]{1,4})$/i;
    const FLname = /^[a-zA-Zก-ฮะ-์]{2,}$/i;

    switch (name) {
      case "carOwnerFname":
        errors.carOwnerFname =
        FLname.test(value) ? "" : "กรุณากรอกชื่อ เช่น สมชาย";
        break;
      case "carOwnerLname":
        errors.carOwnerLname =
        FLname.test(value) ? "" : "กรุณากรอกนามสกุล เช่น ใจดี ";
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

    this.setState({ errors, [name]: value });
  };

  componentDidMount() {
    this.getSticker();
  }

  createStickerOptions = () => {
    let stickerOptions = [];
    let { sticker } = this.state;

    for (let i = 0; i < sticker.length; i++) {
      stickerOptions.push(
        <option value={sticker[i].stickerID}>{sticker[i].value}</option>
      );
    }

    return stickerOptions;
  };

  getStickerID = (param) => {
    param.target.style.color = '#29A8AB'
    let sticker = document.getElementById("sticker");
    let stickerID = sticker.value;
    this.setState({
      stickerID: stickerID
    });
  };

  createProvinceOptions = () => {
    let provinces = [
      { value: "กระบี่" },
      { value: "กรุงเทพมหานคร" },
      { value: "กาญจนบุรี" },
      { value: "กาฬสินธุ์" },
      { value: "กำแพงเพชร" },
      { value: "ขอนแก่น" },
      { value: "จันทบุรี" },
      { value: "ฉะเชิงเทรา" },
      { value: "ชลบุรี" },
      { value: "ชัยนาท" },
      { value: "ชัยภูมิ" },
      { value: "ชุมพร" },
      { value: "เชียงราย" },
      { value: "เชียงใหม่" },
      { value: "ตรัง" },
      { value: "ตราด" },
      { value: "ตาก" },
      { value: "นครนายก" },
      { value: "นครปฐม" },
      { value: "นครพนม" },
      { value: "นครราชสีมา" },
      { value: "นครศรีธรรมราช" },
      { value: "นครสวรรค์" },
      { value: "นนทบุรี" },
      { value: "นราธิวาส" },
      { value: "น่าน" },
      { value: "บึงกาฬ" },
      { value: "บุรีรัมย์" },
      { value: "ปทุมธานี" },
      { value: "ประจวบคีรีขันธ์" },
      { value: "ปราจีนบุรี" },
      { value: "ปัตตานี" },
      { value: "พระนครศรีอยุธยา" },
      { value: "พะเยา" },
      { value: "พังงา" },
      { value: "พัทลุง" },
      { value: "พิจิตร" },
      { value: "พิษณุโลก" },
      { value: "เพชรบุรี" },
      { value: "เพชรบูรณ์" },
      { value: "แพร่" },
      { value: "ภูเก็ต" },
      { value: "มหาสารคาม" },
      { value: "มุกดาหาร" },
      { value: "แม่ฮ่องสอน" },
      { value: "ยโสธร" },
      { value: "ยะลา" },
      { value: "ร้อยเอ็ด" },
      { value: "ระนอง" },
      { value: "ระยอง" },
      { value: "ราชบุรี" },
      { value: "ลพบุรี" },
      { value: "ลำปาง" },
      { value: "ลำพูน" },
      { value: "เลย" },
      { value: "ศรีสะเกษ" },
      { value: "สกลนคร" },
      { value: "สงขลา" },
      { value: "สตูล" },
      { value: "สมุทรปราการ" },
      { value: "สมุทรสงคราม" },
      { value: "สมุทรสาคร" },
      { value: "สระแก้ว" },
      { value: "สระบุรี" },
      { value: "สิงห์บุรี" },
      { value: "สุโขทัย" },
      { value: "สุพรรณบุรี" },
      { value: "สุราษฎร์ธานี" },
      { value: "สุรินทร์" },
      { value: "หนองคาย" },
      { value: "หนองบัวลำภู" },
      { value: "อ่างทอง" },
      { value: "อำนาจเจริญ" },
      { value: "อุดรธานี" },
      { value: "อุตรดิตถ์" },
      { value: "อุทัยธานี" },
      { value: "อุบลราชธานี" }
    ];
    let provinceOptions = [];

    for (let i = 0; i < provinces.length; i++) {
      provinceOptions.push(
        <option value={provinces[i].value}>{provinces[i].value}</option>
      );
    }

    return provinceOptions;
  };

  getProvince = (param) => {
    param.target.style.color = '#29A8AB'
    let provinceElement = document.getElementById("province");
    let province = provinceElement.value;
    this.setState({
      province: province
    });
  };

  setDefaultSelect = () => {
    let sticker = document.getElementById("sticker");
    sticker.value = "สีสติ๊กเกอร์";
    let provinceElement = document.getElementById("province");
    provinceElement.value = "จังหวัด...";
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <Header />
        <Navibar />
        <div className="Table-header">
          เพิ่มข้อมูลผู้ขอสติกเกอร์
          <img src={adduser} className="Headicon" />
        </div>
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

              <textarea
                className="addressInput"
                name="carOwnerAddress"
                value={this.state.carOwnerAddress}
                placeholder="ที่อยู่"
                rows="5"
                onChange={event => this.handleChange(event)}
              ></textarea>
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
            <div className="eachField province">
                <label>จังหวัดป้ายทะเบียน:</label>
                <select
                  id="province"
                  className="selectProvince"
                  onChange={(param) => this.getProvince(param)}
                >
                  <option selected disabled>
                    จังหวัด...
                  </option>
                  {this.createProvinceOptions()}
                </select>
              </div>
            <div className="formRow">
              <div className="eachField">
                <label>สีสติ๊กเกอร์:</label>
                <div>
                  <select
                    id="sticker"
                    className="selectSticker"
                    onChange={(param) => this.getStickerID(param)}
                  >
                    <option selected disabled>
                      สีสติ๊กเกอร์
                    </option>
                    {this.createStickerOptions()}
                  </select>
                </div>
              </div>
             
            </div>
            <button
              className="buttonAddsticker"
              onClick={event => this.handleSubmit(event)}
            >
              เพิ่ม
              <img src={plusButton} className="iconButton" />
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Addsticker;
