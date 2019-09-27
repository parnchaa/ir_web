import React, { Component } from "react";
import Header from "./Header";
import Navibar from "./Navibar";
import "./SearchSticker.css";
import Modal from "react-responsive-modal";
import search from "./picture/search.png";

class SearchSticker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carOwner: [],
      searchCarOwner: [],
      choosedData: [],
      openEdit: false,
      searchValue: "",
      pageStatus: "",
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
    fetch("http://localhost:5000/carOwner")
      .then(response => {
        return response.json();
      })
      .then(carOwner => {
        this.setState({ carOwner });
        console.log(carOwner, "cc");
      });
  }

  getSearchValue() {
    fetch("http://localhost:5000/getSearchValue/" + this.state.searchValue)
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        this.setState({ searchCarOwner: responseJson });
      })
      .catch(error => {
        this.getData();
      });
  }

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    const validEmailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const phoneno = /^0[0-9]{8,9}$/i;
    switch (name) {
      case "carOwnerFname":
        errors.carOwnerFirstName = value.length < 2 ? "ใส่ชื่อดิไอสัส" : "";
        break;
      case "carOwnerLastName":
        errors.carOwnerLname = value.length < 2 ? "ใส่นามสกุลดิไอสัส" : "";
        break;
      case "carOwnerTel":
        errors.carOwnerTel = phoneno.test(value) ? "" : "ใส่เบอร์ดีๆดิ้สัส";
        break;
      case "carOwnerEmail":
        errors.carOwnerEmail = validEmailRegex.test(value)? "" : "ใส่เมลดีๆดิ้สัส";
        break;
      case "carOwmerAddress":
        errors.carOwnerAddress = value.length < 10 ? "ใส่ที่อยู่ดีๆดิ้สัส" : "";
        break;
    }
    this.setState({ errors, [name]: value }, () => {
      console.log(errors);
    });
    console.log("rr", name);
    console.log("rr", value);
  };

  validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      val => val.length > 0 && (valid = false)
    );
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
          this.onAfterAddStaff()
        console.log("Valid Form");
        this.onCloseEditModal();
      }else{
        console.error("Invalid Form");
      }
    } else {
      console.log("pls fill");
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
        if (this.state.searchValue === "") {
          this.getData();
        } else if (this.state.searchValue !== "") {
          this.getSearchValue();
        }
      })
      .catch(error => {});
  };

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
    this.setState({ openEdit: false });
  };

  componentWillMount() {
    this.getData();
  }



  onKeyPress = event => {
    if (event.key === "Enter") {
      console.log("Adding....");
      this.getSearchValue();
    }
  };

  filterSticker = event => {
    this.setState({
      searchValue: event.target.value
    });
    console.log(this.state.searchValue, "kkk");
  };

  carOwnerTable() {
    let tableData = "";
    if (this.state.searchValue === "") {
      tableData = this.state.carOwner;
    }
    if (this.state.searchValue !== "") {
      tableData = this.state.searchCarOwner;
    }
    return tableData.map(carOwner => {
      const {
        carOwnerID,
        carOwnerFirstName,
        carOwnerLastName,
        carOwnerTel,
        carOwnerEmail,
        carOwnerAddress,
        registerDate,
        expiredDate
      } = carOwner;
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

              <div className="editModal">
                <p>นามสกุล : </p>
                <input
                  type="text"
                  name="carOwnerLastName"
                  onChange={event => this.handleChange(event)}
                  value={this.state.carOwnerLastName}
                />
              </div>

              <div className="editModal">
                <p>อีเมล์ : </p>
                <input
                  type="text"
                  name="carOwnerEmail"
                  onChange={event => this.handleChange(event)}
                  value={this.state.carOwnerEmail}
                />
              </div>

              <div className="editModal">
                <p>เบอร์โทรศัพท์ : </p>
                <input
                  type="text"
                  name="carOwnerTel"
                  onChange={event => this.handleChange(event)}
                  value={this.state.carOwnerTel}
                />
              </div>

              <div className="editModal">
                <p>ที่อยู่ : </p>
                <input
                  type="text"
                  name="carOwnerAddress"
                  onChange={event => this.handleChange(event)}
                  value={this.state.carOwnerAddress}
                />
              </div>
            </form>
            <button
              className="buttonUpdate"
              onClick={event => this.handleEditCarOwner(event)}
            >
              แก้ไข
            </button>
            <button className="buttonCancel" onClick={this.onCloseEditModal}>
              ยกเลิก
            </button>
          </Modal>

          <div className="carOwnerTask">
            <div className="carOwnerName">
              <div>ชื่อ : </div>
              <div className="fieldName">{carOwnerFirstName}</div>
              <div>นามสกุล : </div>
              <div className="fieldName">{carOwnerLastName}</div>
            </div>
            <div className="carOwnerEmailTel">
              <div>อีเมล์ : </div>
              <div className="fieldName">{carOwnerEmail}</div>
              <div>เบอร์โทรศัพท์ : </div>
              <div className="fieldName">{carOwnerTel}</div>
            </div>
            <div className="carOwnerAddress">
              <div>ที่อยู่ : </div>
              <div className="fieldName">{carOwnerAddress}</div>
            </div>
            <div className="carOwnerDate">
              <div>วันที่ต่อสัญญา : </div>
              <div className="fieldName">{registerDate.substr(0, 10)}</div>
              <div>วันหมดอายุ : </div>
              <div className="fieldName">{expiredDate.substr(0, 10)}</div>
            </div>
            <button
              className="EditModalButton"
              onClick={this.onOpenEditModal(carOwnerID)}
            >
              แก้ไขข้อมูล
            </button>
          </div>
        </div>
      );
    });
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

        <h2 className="Table-header">ข้อมูลผู้ขอสติกเกอร์</h2>
        <table className="table">
          <tbody>{this.carOwnerTable()}</tbody>
        </table>
      </div>
    );
  }
}

export default SearchSticker;
