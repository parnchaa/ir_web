import React, { Component } from "react";
import Header from "./Header";
import Navibar from "./Navibar";
import "./SearchSticker.css";
import Modal from "react-responsive-modal";
import search from "./picture/search.png";
import moment from "moment";
import folder from "./picture/folder.png";

class SearchSticker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carOwner: [],
      searchCarOwner: [],
      choosedData: [],
      openEdit: false,
      openExtend: false,
      searchValue: "",
      pageStatus: "",
      selectExtendValue: "1",
      checkSearch: "",
      errors: {
        carOwnerFirstName: "",
        carOwnerLastName: "",
        carOwnerTel: "",
        carOwnerEmail: "",
        carOwnerAddress: ""
      }
    };
  }

  getData() {
    let userData = JSON.parse(localStorage.getItem("tk"));

    let organizationIDTk = userData[0].organizationID;
    fetch("http://localhost:5000/carOwner/" + organizationIDTk)
      .then(response => {
        return response.json();
      })
      .then(carOwner => {
        this.setState({ carOwner });
      });
  }

  getSearchValue() {
    let userData = JSON.parse(localStorage.getItem("tk"));

    let organizationIDTk = userData[0].organizationID;
    fetch(
      "http://localhost:5000/getSearchValue/" +
        this.state.searchValue +
        "/" +
        organizationIDTk
    )
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        if (responseJson.length === 0) {
          this.setState({ checkSearch: "nodata" });
        }

        this.setState({ searchCarOwner: responseJson });
      })
      .then(() => {
        this.getData();
      });
  }

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    const validEmailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const phoneno = /^0[0-9]{8,9}$/i;
    const FLname = /^[a-zA-Zก-ฮะ-์]{2,}$/i;
    switch (name) {
      case "carOwnerFirstName":
        errors.carOwnerFirstName =
        FLname.test(value) ? "" : "กรุณากรอกชื่อ เช่น สมชาย";
        break;
      case "carOwnerLastName":
        errors.carOwnerLastName =
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
    }
    this.setState({ errors, [name]: value });
  };

  validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
  };

  handleEditCarOwner = event => {
    event.preventDefault();
    const {
      carOwnerFirstName,
      carOwnerLastName,
      carOwnerTel,
      carOwnerEmail,
      carOwnerAddress
    } = this.state;

    if (
      carOwnerFirstName !== "" &&
      carOwnerLastName !== "" &&
      carOwnerTel !== "" &&
      carOwnerEmail !== "" &&
      carOwnerAddress !== ""
    ) {
      if (this.validateForm(this.state.errors)) {
        this.onAfterEditCarOwner();
        this.onCloseEditModal();
      } 
    } 
  };

  onAfterEditCarOwner = () => {
    const {
      openCarOwnerID,
      carOwnerFirstName,
      carOwnerLastName,
      carOwnerEmail,
      carOwnerTel,
      carOwnerAddress
    } = this.state;
    const url = "http://localhost:5000/editCarOwner";
    const bodyData = JSON.stringify({
      carOwnerID: openCarOwnerID,
      carOwnerFirstName: carOwnerFirstName,
      carOwnerLastName: carOwnerLastName,
      carOwnerEmail: carOwnerEmail,
      carOwnerTel: carOwnerTel,
      carOwnerAddress: carOwnerAddress
    });
    const othepram = {
      headers: {
        "content-type": "application/json; charset=UTF-8"
      },
      body: bodyData,
      method: "POST"
    };
    fetch(url, othepram)
      .then(() => {
        if (this.state.searchValue === "") {
          this.getData();
        } else if (this.state.searchValue !== "") {
          this.getSearchValue();
        }
      })
  };

  handleSubmitExtend = event => {
    const { expiredDate, selectExtendValue } = this.state;
    var ex = new Date(expiredDate);
    var yyyy = ex.getFullYear(ex);
    var mm = ex.getMonth(ex) + 1;
    var dd = ex.getDate(ex);
    var extended;
    if (selectExtendValue === "1") {
      var extendedM = ex.setMonth(ex.getMonth() + 6);
      var extendedMonth = moment(extendedM).format();
      extended = extendedMonth;
      this.onAfterExtendLicense(extended);
      alert("คุณได้ต่อสัญญาสำเร็จ");
      this.onCloseExtendModel();
    } else if (selectExtendValue === "2") {
      var extendedY = yyyy + 1;
      var extendedYear = extendedY + "-" + mm + "-" + dd;
      extended = extendedYear;
      this.onAfterExtendLicense(extended);
      alert("คุณได้ต่อสัญญาสำเร็จ");
      this.onCloseExtendModel();
    }
  };

  onAfterExtendLicense = extended => {
    const { openExtendId } = this.state;
    const url = "http://localhost:5000/extendLicense";
    const bodyData = JSON.stringify({
      carOwnerID: openExtendId,
      expiredDate: extended
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

  selectExtendValue(e) {
    this.setState({
      selectExtendValue: e.target.value
    });
  }

  onOpenEditModal = carOwnerID => e => {
    const eachCarOwnerID = this.state.carOwner.find(Id => {
      return Id.carOwnerID === carOwnerID;
    });
    this.setState({
      openEdit: true,
      openCarOwnerID: carOwnerID,
      carOwnerFirstName: eachCarOwnerID.carOwnerFirstName,
      carOwnerLastName: eachCarOwnerID.carOwnerLastName,
      carOwnerEmail: eachCarOwnerID.carOwnerEmail,
      carOwnerTel: eachCarOwnerID.carOwnerTel,
      carOwnerAddress: eachCarOwnerID.carOwnerAddress
    });
  };

  onCloseEditModal = () => {
    this.setState({
      openEdit: false,
      errors: {
        carOwnerFirstName: "",
        carOwnerLastName: "",
        carOwnerTel: "",
        carOwnerEmail: "",
        carOwnerAddress: ""
      }
    });
  };

  onOpenExtendModel = carOwnerID => e => {
    const eachCarOwnerID = this.state.carOwner.find(Id => {
      return Id.carOwnerID === carOwnerID;
    });
    this.setState({
      openExtend: true,
      openExtendId: carOwnerID,
      expiredDate: eachCarOwnerID.expiredDate
    });
  };

  onCloseExtendModel = () => {
    this.setState({
      openExtend: false
    });
  };

  componentDidMount() {
    this.getData();
  }

  onKeyPress = event => {
    if (event.key === "Enter") {
      this.getSearchValue();
      this.setState({ checkSearch: "" });
    }
  };

  filterSticker = event => {
    this.setState({
      searchValue: event.target.value
    });
  };

  carOwnerTable() {
    const { errors } = this.state;
    let tableData = [];
    if (this.state.searchValue === "") {
      tableData = this.state.carOwner;
    }
    if (this.state.searchValue !== "") {
      tableData = this.state.searchCarOwner;
    }
    return (
      <div>
        <Modal
          classNames="ModalEditSicker"
          open={this.state.openEdit}
          onClose={this.onCloseEditModal}
          center
        >
          <h2 className="titleEdit">แก้ไขข้อมูลเจ้าของรถ</h2>
          <form className="formAddEdit">
            <div className="editModal">
              <p>ชื่อ : </p>
              <input
                type="text"
                name="carOwnerFirstName"
                onChange={event => this.handleChange(event)}
                value={this.state.carOwnerFirstName}
              />
            </div>
            {errors.carOwnerFirstName.length > 0 && (
              <p className="error">{errors.carOwnerFirstName}</p>
            )}

            <div className="editModal">
              <p>นามสกุล : </p>
              <input
                type="text"
                name="carOwnerLastName"
                onChange={event => this.handleChange(event)}
                value={this.state.carOwnerLastName}
              />
            </div>
            {errors.carOwnerLastName.length > 0 && (
              <p className="error">{errors.carOwnerLastName}</p>
            )}

            <div className="editModal">
              <p>อีเมล์ : </p>
              <input
                type="text"
                name="carOwnerEmail"
                onChange={event => this.handleChange(event)}
                value={this.state.carOwnerEmail}
              />
            </div>
            {errors.carOwnerEmail.length > 0 && (
              <p className="error">{errors.carOwnerEmail}</p>
            )}

            <div className="editModal">
              <p>เบอร์โทรศัพท์ : </p>
              <input
                type="text"
                name="carOwnerTel"
                onChange={event => this.handleChange(event)}
                value={this.state.carOwnerTel}
              />
            </div>
            {errors.carOwnerTel.length > 0 && (
              <p className="error">{errors.carOwnerTel}</p>
            )}

            <div className="editModal">
              <p>ที่อยู่ : </p>
              <textarea
                type="text"
                name="carOwnerAddress"
                onChange={event => this.handleChange(event)}
                value={this.state.carOwnerAddress}
              />
            </div>
            {errors.carOwnerAddress.length > 0 && (
              <p className="error">{errors.carOwnerAddress}</p>
            )}

            <button
              className="buttonUpdate"
              onClick={event => this.handleEditCarOwner(event)}
            >
              แก้ไข
            </button>
            <button className="buttonCancel" onClick={this.onCloseEditModal}>
              ยกเลิก
            </button>
          </form>
        </Modal>

        <Modal
          classNames="ModalEditSicker"
          open={this.state.openExtend}
          onClose={this.onCloseExtendModel}
          center
        >
          <h2 className="titleEdit">ต่อสัญญาสติกเกอร์</h2>
          <div>
            <select
              className="SelectTime"
              onChange={e => this.selectExtendValue(e)}
            >
              <option value="1">6 เดือน</option>
              <option value="2">1 ปี</option>
            </select>
          </div>
          <button
            className="ButtonSubmit"
            onClick={event => this.handleSubmitExtend(event)}
          >
            ยืนยัน
          </button>
        </Modal>

        {tableData.map(tableData => {
          if (tableData.carOwnerID === 1) {
            return null;
          } else {
            return (
              <div className="carOwnerTask">
                <div className="carOwnerName">
                  <div>ชื่อ : </div>
                  <div className="fieldName">{tableData.carOwnerFirstName}</div>
                  <div>นามสกุล : </div>
                  <div className="fieldName">{tableData.carOwnerLastName}</div>
                </div>
                <div className="carOwnerEmailTel">
                  <div>อีเมล์ : </div>
                  <div className="fieldName">{tableData.carOwnerEmail}</div>
                  <div>เบอร์โทรศัพท์ : </div>
                  <div className="fieldName">{tableData.carOwnerTel}</div>
                </div>
                <div className="carOwnerAddress">
                  <div>ที่อยู่ : </div>
                  <div className="fieldName">{tableData.carOwnerAddress}</div>
                </div>
                <div className="carOwnerDate">
                  <div>วันที่ต่อสัญญา : </div>
                  <div className="fieldName">
                    {tableData.registerDate.substr(0, 10)}
                  </div>
                  <div>วันหมดอายุ : </div>
                  <div className="fieldName">
                    {tableData.expiredDate.substr(0, 10)}
                  </div>
                </div>
                <div className="LineButton">
                  <button
                    className="RenewContractButton"
                    onClick={this.onOpenExtendModel(tableData.carOwnerID)}
                  >
                    ต่อสัญญา
                  </button>
                  <button
                    className="EditModalButton"
                    onClick={this.onOpenEditModal(tableData.carOwnerID)}
                  >
                    แก้ไขข้อมูล
                  </button>
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header />
        <Navibar />
        <div>
          <input
            className="InputSearch"
            placeholder="ค้นหาชื่อ,นามสกุล"
            name="searchValue"
            value={this.state.searchValue}
            onChange={event => this.filterSticker(event)}
            onKeyPress={event => this.onKeyPress(event)}
          />
          <img src={search} className="search" />
        </div>

        <div className="Table-header">
          ข้อมูลผู้ขอสติกเกอร์
          <img src={folder} className="Headicon" />
        </div>
        <table className="table">
          <tbody>
            {this.state.checkSearch !== "nodata" ? (
              this.carOwnerTable()
            ) : (
              <div className="noValue">ไม่พบข้อมูลที่ค้นหา</div>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default SearchSticker;
