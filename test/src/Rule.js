import React, { Component } from "react";
import Header from "./Header";
import Navibar from "./Navibar";
import "./Rule.css";
import Modal from "react-responsive-modal";
import deletePic from './picture/delete.png';

class Rule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rule: [],
      openDelete: false
    };
  }
  componentDidMount() {
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
    fetch(url, othepram).then(data => console.log(data));
  };

  ruleTable() {
    return (
      <div>
        <Modal
          className="Modal"
          open={this.state.openDelete}
          onClose={this.onCloseDeleteModal}
          center
        >
          <h2 className="deleteTitle">Delete!!!</h2>
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
              <div>
                <button
                  className="deleteModalButton"
                  onClick={this.onOpenDeleteModal(rule.ruleID)}
                >
                  <img src={deletePic} className='deletePic'></img>
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
