import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import Navibar from "./Navibar";
import deletePic from "./picture/delete.png";
import Modal from "react-responsive-modal";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problem: [],
      openDelete: false
    };
  }

  getData() {
    fetch("http://localhost:5000/problem ")
      .then(response => {
        return response.json();
      })
      .then(problem => {
        this.setState({ problem });
      });
  }

  submitDeleteTask = () => {
    this.deleteFetch();
    this.onCloseDeleteModal();
  };

  deleteFetch = () => {
    const url = "http://localhost:5000/deleteEvent";
    const bodyData = JSON.stringify({
      problemID: this.state.openProblemID
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

  onOpenDeleteModal = problemID => e => {
    this.setState({
      openDelete: true,
      openProblemID: problemID
    });
  };

  onCloseDeleteModal = () => {
    this.setState({ openDelete: false });
  };

  componentDidMount() {
    this.getData();
  }

  onOpenDeleteModal = problemID => e => {
    this.setState({
      openDelete: true,
      openProblemID: problemID
    });
  };

  problemTable() {
    return this.state.problem.map(pro => {
      const {
        problemID,
        dateOfProblem,
        timeOfProblem,
        scene,
        licensePlate,
        allegation,
        firstName,
        problemDetails,
        // evidenceImage
      } = pro;
      return (  
        <tr key={problemID}>
          <td>{problemID}</td>
          <td>{dateOfProblem.substr(0, 10)}</td>
          <td>{timeOfProblem}</td>
          <td>{scene}</td>
          <td>{licensePlate}</td>
          <td>{allegation}</td>
          <td>{firstName}</td>
          <td>{problemDetails}</td>
          {/* <td>{evidenceImage}</td> */}
          <button
            className="deleteModalButton"
            onClick={this.onOpenDeleteModal(pro.problemID)}
          >
            <img src={deletePic} className="deletePic" />
          </button>
          
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Navibar />
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
        <p className="Table-header">เหตุการณ์</p>
       
          <table className="eventTable">
            <th />
            <th>วัน</th>
            <th>เวลา</th>
            <th>สถานที่</th>
            <th>ป้ายทะเบียน</th>
            <th>ข้อหา</th>
            <th>ผู้แจ้ง</th>
            <th>รายละเอียด</th>
           <tbody> {this.problemTable()}</tbody>
          </table>
        
      </div>
    );
  }
}
export default App;
