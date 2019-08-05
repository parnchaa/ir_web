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
      openEdit: false
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

  onOpenDeleteModal = ruleID => e => {
    this.setState({
      openDelete: true,
      openRuleID: ruleID
    });
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
                  Edit
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
        <div className="ruleTable">{this.ruleTable()}</div>
      </div>
    );
  }
}

export default Rule;
