import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import Navibar from "./Navibar";
import deletePic from "./picture/delete.png";
import ImgPic from "./picture/more.png";
import Modal from "react-responsive-modal";
import search from "./picture/search.png";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problem: [],
      openDelete: false,
      openImg: false,
      organizationID:'',
      searchValue:'',
      checkSearch:'',
      searchLicensePlate:[]
    };
  }

  getData() {
    let userData = JSON.parse(localStorage.getItem('tk'));

    let organizationIDTk = userData[0].organizationID
    fetch("https://irweb-api.tech/problem/" + organizationIDTk,
    {
      method: 'GET',
    })
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
    const url = "https://irweb-api.tech/deleteEvent";
    const bodyData = JSON.stringify({
      problemID: this.state.openProblemID
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
  };


  getSearchLicensePlate() {
    let userData = JSON.parse(localStorage.getItem("tk"));

    let organizationIDTk = userData[0].organizationID;
    fetch(
      "https://irweb-api.tech/getSearchLicensePlate/" +
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
        this.setState({ searchLicensePlate: responseJson });
      })
      .then(() => this.getData())
  }

  filterLicensePlate = event => {
    this.setState({
      searchValue: event.target.value
    });
  };

  onKeyPress = event => {
    if (event.key === "Enter") {
      this.getSearchLicensePlate();
      this.setState({ checkSearch: "" });
    }
  };

  problemTable() {
    if (this.state.searchLicensePlate != null && this.state.searchValue !="") {
      return this.state.searchLicensePlate.map(pro => {
        const {
          problemID,
          dateOfProblem,
          timeOfProblem,
          scene,
          licensePlate,
          ruleName,
          firstName,
          problemDetails
        } = pro;
        return (
          <tr key={problemID} className="eachRowTable">
            <td id="dateColumn">{dateOfProblem.substr(0, 10)}</td>
            <td>{timeOfProblem}</td>
            <td>{scene}</td>
            <td>{licensePlate}</td>
            <td>{ruleName}</td>
            <td>{firstName}</td>
            <td>{problemDetails}</td>
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
    } else {
      return this.state.problem.map(pro => {
        const {
          problemID,
          dateOfProblem,
          timeOfProblem,
          scene,
          licensePlate,
          ruleName,
          firstName,
          problemDetails
        } = pro;
        return (
          <tr key={problemID} className="eachRowTable">
            <td id="dateColumn">{dateOfProblem.substr(0, 10)}</td>
            <td>{timeOfProblem}</td>
            <td>{scene}</td>
            <td>{licensePlate}</td>
            <td>{ruleName}</td>
            <td>{firstName}</td>
            <td>{problemDetails}</td>
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
    
  }
  

  render() {
    return (
      <div className="App">
            
        <Header />
        <Navibar />
        <div>
          <input
            className="InputSearch"
            placeholder="ค้นหาป้ายทะเบียน"
            name="searchValue"
            value={this.state.searchValue}
            onChange={event => this.filterLicensePlate(event)}
            onKeyPress={event => this.onKeyPress(event)}
          />
          <img src={search} className="search" />
        </div>
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
          <th>วัน</th>
          <th>เวลา</th>
          <th>สถานที่</th>
          <th>ป้ายทะเบียน</th>
          <th>ข้อหา</th>
          <th>ผู้แจ้ง</th>
          <th>รายละเอียด</th>
          <th>หลักฐาน</th>
          <tbody> {this.state.checkSearch !== "nodata" ? (
              this.problemTable()
            ) : (
              <td className="noValue" colSpan="8"> ไม่พบข้อมูลที่ค้นหา </td>
            )}</tbody>
        </table>
        
      </div>
    );
  }
}
export default App;
