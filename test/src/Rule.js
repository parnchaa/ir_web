import React, { Component } from "react";
import Header from "./Header";
import Navibar from "./Navibar";
import "./Rule.css";
import Modal from "react-responsive-modal";
import deletePic from "./picture/delete.png";
import edit from "./picture/edit.png";
import amonestation from "./picture/amonestation.png";

class Rule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rule: [],
      openDelete: false,
      openEdit: false,
      openAdd: false,
      openAddS: false,
      errors: {
        ruleName: "",
        maxWarning: "",
        price: "",
        typeOfSticker: "",
        colorOfSticker: ""
      },
      role: ''
    };
  }
  getData() {
    let userData = JSON.parse(localStorage.getItem('tk'));
    let organizationIDTk = userData[0].organizationID
    fetch("http://localhost:5000/rule/"+ organizationIDTk)
      .then(response => {
        return response.json();
      })
      .then(rule => {
        this.setState({ rule });
      });
  }

  checkToken = () => {
    
    let userData = JSON.parse(localStorage.getItem("tk"))
    let tkRole = userData[0].staffRole

    this.setState({
      role: tkRole
    })

  };

  onOpenEditModal = ruleID => e => {
    const eachRuleID = this.state.rule.find(Id => {
      return Id.ruleID === ruleID;
    });
    this.setState({
      openEdit: true,
      openRuleID: ruleID,
      ruleName: eachRuleID.ruleName,
      maxWarning: eachRuleID.maxWarning,
      price: eachRuleID.price,
    });
  };

  validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      val => val.length > 0 && (valid = false)
    );
    return valid;
  };

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    const checkNum = /^[0-9]{1,}/i;
    switch (name) {
      case "ruleName":
        errors.ruleName =
          value.length < 2
            ? "กรุณากรอกชื่อกฎ เช่น จอดรถผิดพื้นที่ที่กำหนด"
            : "";
        break;
      case "price":
        errors.price = checkNum.test(value) ? "" : "ค่าปรับต้องเป็นตัวเลข";
        break;
      case "maxWarning":
        errors.maxWarning = checkNum.test(value)
          ? ""
          : "จำนานครั้งที่เตือนต้องเป็นตัวเลข";
        break;
      case "typeOfSticker":
        errors.typeOfSticker = value.length < 2 ? "กรุณากรอกรายละเอียดสติ๊กเกอร์" : "";
        break;
      case "colorOfSticker":
        errors.colorOfSticker = value.length < 2 ? "กรุณากรอกสีสติ๊กเกอร์" : "";
        break;
    }
    this.setState({ errors, [name]: value });
  };

  handleEditRule = event => {
    event.preventDefault();
    const { ruleName, maxWarning, price } = this.state;
    if (
      ruleName !== "" &&
      maxWarning !== "" &&
      price !== ""
    ) {
      if (this.validateForm(this.state.errors)) {
        this.onAfterEditRule();
        this.onCloseEditModal();
      } 
    } 
  };

  onAfterEditRule = () => {
    const { openRuleID, ruleName, maxWarning, price } = this.state;
    const url = "http://localhost:5000/editRule";
    const bodyData = JSON.stringify({
      ruleID: openRuleID,
      ruleName: ruleName,
      maxWarning: maxWarning,
      price: price,
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
        this.getData();
      })
  };

  onCloseEditModal = () => {
    this.setState({
      openEdit: false,
      errors: {
        ruleName: "",
        maxWarning: "",
        price: "",
        typeOfSticker: "",
        colorOfSticker: ""
      }
    });
  };

  onCloseDeleteModal = () => {
    this.setState({ openDelete: false });
  };

  onOpenDeleteModal = ruleID => e => {
    this.setState({
      openDelete: true,
      openRuleID: ruleID
    });
  };

  submitDeleteTask = () => {
    this.deleteFetch();
    this.onCloseDeleteModal();
  };

  deleteFetch = () => {
    const url = "http://localhost:5000/deleteRule";
    const bodyData = JSON.stringify({
      ruleID: this.state.openRuleID
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
        this.getData();
      })
  };

  handleAddRule = event => {
    event.preventDefault();
    const { ruleName, price, maxWarning } = this.state;
    if (
      ruleName !== "" &&
      price !== "" &&
      maxWarning !== ""
    ) {
      if (this.validateForm(this.state.errors)) {
        this.onAfterAddRule();
        this.onCloseAddModal();
      } 
    } 
    else{
      alert("กรุณากรอกข้อมูลให้ครบ")
    }
  };

  onAfterAddRule = () => {
    let userData = JSON.parse(localStorage.getItem('tk'));
    let organizationIDTk = userData[0].organizationID
    const url = "http://localhost:5000/addrule";
    const bodyData = JSON.stringify({
      ruleName: this.state.ruleName,
      price: this.state.price,
      maxWarning: this.state.maxWarning,
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
      .then(() => {
        this.getData();
      })
  };

  onOpenAddModal = () => {
    this.setState({
      openAdd: true,
      ruleName: "",
      maxWarning: "",
      price: ""
    });
  };

  onCloseAddModal = () => {
    this.setState({
      errors: {
        ruleName: "",
        maxWarning: "",
        price: "",
        typeOfSticker: "",
        colorOfSticker: ""
      },
      openAdd: false,
      
    });
  };

  handleAddSticker = event => {
    event.preventDefault();
    const { typeOfSticker, colorOfSticker } = this.state;
    if (typeOfSticker !== undefined && colorOfSticker !== undefined)
     {
      if (this.validateForm(this.state.errors)) {
        this.onAfterAddSticker();
        this.onCloseAddStickerModal()
      } 
    } 
    else{
      alert("กรุณากรอกข้อมูลให้ครบ")
    } 
    console.log(typeOfSticker,'typeOfSticker');
    
  };

  onAfterAddSticker = () => {
    let userData = JSON.parse(localStorage.getItem('tk'));
    let organizationIDTk = userData[0].organizationID
    
    fetch("http://localhost:5000/ruleId/"+organizationIDTk)
    .then(response => {
      return response.json()
    })
    .then(ruleID=>{
      const url = "http://localhost:5000/addSticker";
      const bodyData = JSON.stringify({
        typeOfSticker: this.state.typeOfSticker,
        colorOfSticker: this.state.colorOfSticker,
        organizationID: organizationIDTk,
        ruleID: ruleID[0].ruleID
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
        // this.onCloseAddStickerModal()
        this.getData();
      })
      .catch(error => {});
    })
    
  };

  onOpenAddStickerModal = () => {
    this.setState({
      openAddS: true,
      errors: {
        ruleName: "",
        maxWarning: "",
        price: "",
        typeOfSticker: "",
        colorOfSticker: ""
      }
    });
  };

  onCloseAddStickerModal = () => {
    this.setState({
      openAddS: false,
      typeOfSticker: "",
      colorOfSticker: ""
    });
  };

  componentDidMount() {
    this.getData();
    this.checkToken()

  }

  ruleTable() {
    const { errors } = this.state;
    return (
      <div>
        <Modal
          className="modal"
          open={this.state.openEdit}
          onClose={this.onCloseEditModal}
          center
        >
          <h2 className="titleEdit">แก้ไขกฎ</h2>
          <div>
            <form className="formAddEdit">
              <div className="editModal">
                <p>ชื่อกฎ :</p>
                <input
                  className="inputModal"
                  type="text"
                  name="ruleName"
                  onChange={event => this.handleChange(event)}
                  value={this.state.ruleName}
                />
              </div>
              {errors.ruleName.length > 0 && (
                <p className="error">{errors.ruleName}</p>
              )}
              <div className="editModal">
                <p>จำนวนเตือนสูงสุด:</p>
                <input
                  className="inputModal"
                  type="text"
                  name="maxWarning"
                  onChange={event => this.handleChange(event)}
                  value={this.state.maxWarning}
                />
              </div>
              {errors.maxWarning.length > 0 && (
                <p className="error">{errors.maxWarning}</p>
              )}
              <div className="editModal">
                <p>ค่าปรับ:</p>
                <input
                  className="inputModal"
                  type="text"
                  name="price"
                  onChange={event => this.handleChange(event)}
                  value={this.state.price}
                />
              </div>
              {errors.price.length > 0 && (
                <p className="error">{errors.price}</p>
              )}
            </form>
            <button
              className="buttonUpdate"
              onClick={event => this.handleEditRule(event)}
            >
              แก้ไข
            </button>
            <button className="buttonCancel" onClick={this.onCloseEditModal}>
              ยกเลิก
            </button>
          </div>
        </Modal>

        <Modal
          className="Modal"
          open={this.state.openDelete}
          onClose={this.onCloseDeleteModal}
          center
        >
          <div className="ModalDelete">
            <h2>ลบกฎองค์กร</h2>
            <div>ยืนยันการลบกฎองค์กร</div>
            <div>
              <button
                className="ButtonDelete"
                onClick={event => {
                  this.submitDeleteTask(this.state.openRuleId);
                }}
              >
                ลบ
              </button>
              <button
                className="ButtonCancel"
                onClick={this.onCloseDeleteModal}
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </Modal>

        {this.state.rule.map(rule => {
          return (
            <div className="ruleCard">
              <div className="Title">{rule.ruleName}</div>
              <div className="priceMaxWarning">
                <p className="price">ค่าปรับ {rule.price}</p>
                <p>จำนานครั้งที่เตือน {rule.maxWarning}</p>
              </div>
              <div className="ruleButton">
                <button
                  className="editButton"
                  onClick={this.onOpenEditModal(rule.ruleID)}
                >
                  แก้ไข
                </button>
                <button
                  className="deleteModalButton"
                  onClick={this.onOpenDeleteModal(rule.ruleID)}
                >
                  <img src={deletePic} className="deletePic" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <Header />
        <Navibar />
        <Modal open={this.state.openAdd} onClose={this.onCloseAddModal} center>
          <p className="modalTitle">เพิ่มกฏ</p>
          <form className="formAdd" onSubmit={this.handleAddRule}>
            <div className="addModal">
              <label htmlFor="ruleName">ชื่อกฏ: </label>
              <input
                className="inputModal"
                type="text"
                name="ruleName"
                onChange={event => this.handleChange(event)}
                value={this.state.ruleName}
              />
            </div>
            {errors.ruleName.length > 0 && (
              <p className="error">{errors.ruleName}</p>
            )}
            <div className="addModal">
              <label htmlFor="price">ค่าปรับ: </label>
              <input
                className="inputModal"
                type="text"
                name="price"
                onChange={event => this.handleChange(event)}
                value={this.state.price}
              />
            </div>
            {errors.price.length > 0 && <p className="error">{errors.price}</p>}
            <div className="addModal">
              <label htmlFor="maxWarning">จำนานครั้งที่เตือน: </label>
              <input
                className="inputModal"
                type="text"
                name="maxWarning"
                onChange={event => this.handleChange(event)}
                value={this.state.maxWarning}
              />
            </div>
            {errors.maxWarning.length > 0 && (
              <p className="error">{errors.maxWarning}</p>
            )}
            <button
              className="modalAdd"
              onClick={event => this.handleAddRule(event)}
              type="submit"
            >
              เพิ่ม
            </button>
            <button className="modalcancel" onClick={this.onCloseAddModal}>
              ยกเลิก
            </button>
          </form>
        </Modal>

        <Modal
          open={this.state.openAddS}
          onClose={this.onCloseAddStickerModal}
          center
        >
          <p className="modalTitle">เพิ่มสติกเกอร์</p>
          <form className="formAdd" onSubmit={this.handleAddSticker}>
            <div className="addModal">
              <label htmlFor="colorOfSticker">สีสติกเกอร์: </label>
              <input
                className="inputModalSticker"
                type="text"
                name="colorOfSticker"
                onChange={event => this.handleChange(event)}
                value={this.state.colorOfSticker}
              />
            </div>
            {errors.colorOfSticker.length > 0 && (
              <p className="error">{errors.colorOfSticker}</p>
            )}
            <div className="addModal">
              <label htmlFor="typeOfSticker">รายละเอียดสติกเกอร์: </label>
              <input
                className="inputModalSticker"
                type="text"
                name="typeOfSticker"
                onChange={event => this.handleChange(event)}
                value={this.state.typeOfSticker}
              />
            </div>
            {errors.typeOfSticker.length > 0 && (
              <p className="error">{errors.typeOfSticker}</p>
            )}

            <button
              className="modalAdd"
              onClick={event => this.handleAddSticker(event)}
              type="submit"
            >
              เพิ่ม
            </button>
            <button
              className="modalcancel"
              onClick={this.onCloseAddStickerModal}
            >
              ยกเลิก
            </button>
          </form>
        </Modal>

        <div>
          <p className="Table-header">
            กฎองค์กร <img src={amonestation} className="Headicon" />
            </p>

            <div className="buttonAddStick">
            <button className="addRuleButton" onClick={this.onOpenAddModal}>
              เพิ่มกฏ
            </button>
            {this.state.role === "Administrator" ? null : 
              <button
                className="addRuleButton"
                onClick={this.onOpenAddStickerModal}
              >
                เพิ่มสติ๊กเกอร์
              </button>
            }
            </div>
          <div className="ruleTable">{this.ruleTable()}</div>
        
      </div>
      </div>
    );
  }
}

export default Rule;
