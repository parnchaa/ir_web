import React, { Component } from "react";
import Header from "./Header";
import Navibar from "./Navibar";
import "./Rule.css";
import Modal from "react-responsive-modal";
import deletePic from "./picture/delete.png";

class Rule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rule: [],
      openDelete: false,
      openEdit: false,
      openAdd: false
    };
  }
  getData() {
    fetch("http://localhost:5000/rule")
      .then(response => {
        return response.json();
      })
      .then(rule => {
        this.setState({ rule });
        console.log("rule", this.state.rule);
      });
  }

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
      ruleDetails: eachRuleID.ruleDetails
    });
  };

  handleChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value

    })
    console.log("rr", event.target.name);
    console.log("rr", event.target.value);
}

handleEditRule = event => {
  this.onAfterEditRule();
  this.onCloseEditModal();
};

onAfterEditRule=()=>{
  const {openRuleID,ruleName,maxWarning,price,ruleDetails} = this.state
    const url = 'http://localhost:5000/editRule';
    const bodyData = JSON.stringify({
      ruleID: openRuleID,
      ruleName: ruleName,
      maxWarning: maxWarning,
      price: price,
      ruleDetails: ruleDetails
    });
    console.log(bodyData,'bodyData')
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
}

  onCloseEditModal = () => {
    this.setState({ openEdit: false });
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
    console.log(bodyData);
    const othepram = {
      headers: {
        "content-type": "application/json; charset=UTF-8"
      },
      body: bodyData,
      method: "POST"
    };
    console.log("aaa", othepram);
    fetch(url, othepram).then(data => console.log(data))
    .then(response => {
      this.getData();
    })
    .catch(error => {});
  };

  handleSubmitAdmin = event => {
    event.preventDefault();
    this.onAfterAddRule();
    this.setState({
      ruleName: "",
      price: "",
      maxWarning: "",
      ruleDetails: "",
      openAdd: false
    });
  };

  onAfterAddRule= () => {
    const url = "http://localhost:5000/addrule";
    const bodyData = JSON.stringify({
      ruleName: this.state.ruleName,
      price: this.state.price,
      maxWarning: this.state.maxWarning,
      ruleDetails: this.state.ruleDetails
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

  onOpenAddModal = () => {
    this.setState({ openAdd: true });
  };

  onCloseAddModal = () => {
    this.setState({ openAdd: false });
  };

  componentDidMount(){
    this.getData()
  }

  ruleTable() {
    return (
      <div>
        <Modal className='modal' open={this.state.openEdit} onClose={this.onCloseEditModal} center>
          <h2>Edit</h2>
          <div>
            <form className='editForm'>
              <div className='eachEditInput'>
                <p>rulename:</p>
                <input
                  type="text"
                  name="ruleName"
                  onChange={event => this.handleChange(event)}
                  value={this.state.ruleName}
                />
              </div>
              <div className='eachEditInput'>
                <p>maxWarning:</p>
                <input
                  type="text"
                  name="maxWarning"
                  onChange={event => this.handleChange(event)}
                  value={this.state.maxWarning}
                />
              </div>
              <div className='eachEditInput'>
                <p>price:</p>
                <input
                  type="text"
                  name="price"
                  onChange={event => this.handleChange(event)}
                  value={this.state.price}
                />
              </div>
              <div className='eachEditInput'>
                <p>ruleDetails:</p>
                <input
                  type="text"
                  name="ruleDetails"
                  onChange={event => this.handleChange(event)}
                  value={this.state.ruleDetails}
                />
              </div>
            </form>
            <button onClick={event => this.handleEditRule(event)}>
              Update
            </button>
            <button onClick={this.onCloseEditModal}>Cancel</button>
          </div>
        </Modal>

        <Modal
          className="Modal"
          open={this.state.openDelete}
          onClose={this.onCloseDeleteModal}
          center
        >
          <h2 className="deleteTitle">Delete!!!</h2>
          <div>ลบจริงดิ?</div>
          <div>
            <button
              onClick={event => {
                this.submitDeleteTask(this.state.openRuleId);
              }}
            >
              Delete
            </button>
            <button onClick={this.onCloseDeleteModal}>Cancel</button>
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
              <div className="detail">{rule.ruleDetails}</div>
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
    return (
      <div>
        <Header />
        <Navibar />
        <Modal open={this.state.openAdd} onClose={this.onCloseAddModal} center>
          <p className="modalTitle">เพิ่มกฏ</p>
          <form className="formAdd" onSubmit={this.handleSubmitAdmin}>
            <div className="addModal">
              <label htmlFor="ruleName">ชื่อกฏ: </label>
              <input
                type="text"
                name="ruleName"
                onChange={event => this.handleChange(event)}
                value={this.state.ruleName}
              />
            </div>
            <div className="addModal">
              <label htmlFor="price">ค่าปรับ: </label>
              <input
                type="text"
                name="price"
                onChange={event => this.handleChange(event)}
                value={this.state.price}
              />
            </div>
            <div className="addModal">
              <label htmlFor="maxWarning">จำนานครั้งที่เตือน: </label>
              <input
                type="text"
                name="maxWarning"
                onChange={event => this.handleChange(event)}
                value={this.state.maxWarning}
              />
            </div>
            <div className="addModal">
              <label htmlFor="ruleDetails">รายละเอียด: </label>
              <input
                type="text"
                name="ruleDetails"
                onChange={event => this.handleChange(event)}
                value={this.state.ruleDetails}
              />
            </div>
            <button
              className="modalAdd"
              onClick={event => this.handleSubmitAdmin(event)}
              type="submit"
            >
              เพิ่ม
            </button>
            <button className="modalcancel" onClick={this.onCloseAddModal}>
              ยกเลิก
            </button>
          </form>
        </Modal>

      <div> 
        
        <p className="Table-header">กฎองค์กร
        <button className="addRuleButton" onClick={this.onOpenAddModal}>
          เพิ่มกฏ 
        </button></p>
        <div className="ruleTable">{this.ruleTable()}</div>
      </div>
      </div>
      
    );
  }
}

export default Rule;
