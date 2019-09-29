import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import Navibar from "./Navibar";
import deletePic from "./picture/delete.png";
import ImgPic from "./picture/more.png";
import Modal from "react-responsive-modal";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problem: [],
      openDelete: false,
      openImg: false
    };
  }

  getData() {
    fetch("http://18.136.208.201:5000/problem ")
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
    const url = "http://18.136.208.201:5000/deleteEvent";
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
    fetch(url, othepram)
      .then(data => console.log(data))
      .then(response => {
        this.getData();
      })
      .catch(error => {});
  };

  onCloseDeleteModal = () => {
    this.setState({ openDelete: false });
  };

  onCloseImgModal = () => {
    this.setState({ openImg: false });
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

  onOpenImgModal = problemID => e => {
    const eachproblemID = this.state.problem.find(Id => {
      return Id.problemID === problemID;
    });
    this.setState({
      openImg: true,
      openProblemID: problemID,
      evidenceImage: eachproblemID.evidenceImage
    });
    console.log(this.state.evidenceImage,'evidenceImage')
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
        problemDetails
      } = pro;
      return (
        <tr key={problemID} className="eachRowTable">
          {/* <td>{problemID}</td> */}
          <td id="dateColumn">{dateOfProblem.substr(0, 10)}</td>
          <td>{timeOfProblem}</td>
          <td>{scene}</td>
          <td>{licensePlate}</td>
          <td>{allegation}</td>
          <td>{firstName}</td>
          <td>{problemDetails}</td>
          {/* <td><img src={evidenceImage} className='evidenceImg'></img></td> */}
          <td>
            <button
              className="evidenceImageButton"
              onClick={this.onOpenImgModal(problemID)}
            >
              <img src={ImgPic} className="Imgbutton"></img>
            </button>
          </td>

          <Modal
            className="Modal"
            open={this.state.openImg}
            onClose={this.onCloseImgModal}
            center
          >
            <h2 className="ModalEvidence">รูปหลักฐาน</h2>
            <img src={this.state.evidenceImage} className="evidenceImg"></img>
          </Modal>

          <button
            className="deleteModalButton"
            onClick={this.onOpenDeleteModal(problemID)}
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
          <div className="ModalDelete">
            <h2>ลบเหตการณ์</h2>
            <div>ยืนยันการลบเหตการณ์</div>
            <div>
              <button
                className="ButtonDelete"
                onClick={event => {
                  this.submitDeleteTask(this.state.openProblemID);
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

        <p className="Table-header">เหตุการณ์</p>
        <table className="eventTable">
          {/* <th>ลำดับ</th> */}
          <th>วัน</th>
          <th>เวลา</th>
          <th>สถานที่</th>
          <th>ป้ายทะเบียน</th>
          <th>ข้อหา</th>
          <th>ผู้แจ้ง</th>
          <th>รายละเอียด</th>
          <th>หลักฐาน</th>
          <tbody> {this.problemTable()}</tbody>
        </table>
      </div>
    );
  }
}
export default App;
