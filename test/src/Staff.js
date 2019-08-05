import React, { Component } from "react";
import Header from "./Header";
import Navibar from "./Navibar";
import "./Staff.css";
import Modal from "react-responsive-modal";
import deletePic from "./picture/delete.png";

class Staff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staff: [],
      securityguard: [],
      firstName: "",
      lastName: "",
      staffEmail: "",
      staffTel: "",
      openAdd: false,
      openAddSecurityguard: false,
      openDelete: false
    };
  }

  getData() {
    fetch("http://localhost:5000/staff")
      .then(response => {
        return response.json();
      })
      .then(staff => {
        this.setState({ staff });
        console.log("staff1", this.state.staff);
      });
    fetch("http://localhost:5000/securityguard")
      .then(response => {
        return response.json();
      })
      .then(securityguard => {
        this.setState({ securityguard });
        console.log("securityguard", this.state.securityguard);
      });
  }

  staffTable() {
    return (
      <div>
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
                this.submitDeleteTask(this.state.openStaffId);
              }}
            >
              Delete
            </button>
            <button onClick={this.onCloseDeleteModal}>Cancel</button>
          </div>
        </Modal>
        {this.state.staff.map(staff => {
          const { firstName, lastName, staffEmail, staffTel, staffID } = staff;
          return (
            <tr>
              <td>{firstName}</td>
              <td>{lastName}</td>
              <td>{staffEmail}</td>
              <td>{staffTel}</td>
              <button
                className="deleteModalButton"
                onClick={this.onOpenDeleteModal(staffID)}
              >
                <img src={deletePic} className="deletePic" />
              </button>
            </tr>
          )
        })}
        
      </div>
    );
  }

  onOpenAddModal = () => {
    this.setState({ openAdd: true });
  };

  onCloseAddModal = () => {
    this.setState({ openAdd: false });
  };

  onOpenAddSecurityguardModal = () => {
    this.setState({ openAddSecurityguard: true });
  };

  onCloseAddSecurityguardModal = () => {
    this.setState({ openAddSecurityguard: false });
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log("rr", event.target.name);
    console.log("rr", event.target.value);
  };

  handleSubmitAdmin = event => {
    event.preventDefault();
    this.onAfterInsertAdmin();
    this.setState({
      firstName: "",
      lastName: "",
      staffEmail: "",
      staffTel: "",
      openAdd: false
    });
  };

  onAfterInsertAdmin = () => {
    const url = "http://localhost:5000/addstaff";
    const bodyData = JSON.stringify({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      staffEmail: this.state.staffEmail,
      staffTel: this.state.staffTel
    });
    console.log(bodyData);
    const othepram = {
      headers: {
        "content-type": "application/json; charset=UTF-8"
      },
      body: bodyData,
      method: "POST"
    };
    fetch(url, othepram).then(data => console.log(data));
  };

  handleSubmitSecurity = event => {
    event.preventDefault();
    this.onAfterInsertSecurity();
    this.setState({
      firstName: "",
      lastName: "",
      staffEmail: "",
      staffTel: "",
      openAddSecurityguard: false
    });
  };
  onAfterInsertSecurity = () => {
    const url = "http://localhost:5000/addsecurityguard";
    const bodyData = JSON.stringify({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      staffEmail: this.state.staffEmail,
      staffTel: this.state.staffTel
    });
    console.log(bodyData);
    const othepram = {
      headers: {
        "content-type": "application/json; charset=UTF-8"
      },
      body: bodyData,
      method: "POST"
    };
    fetch(url, othepram).then(data => console.log(data));
  };

  onOpenDeleteModal = staffID => e => {
    this.setState({
      openDelete: true,
      openStaffID: staffID
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
    const url = "http://localhost:5000/deleteStaff";
    const bodyData = JSON.stringify({
      staffID: this.state.openStaffID
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

  securityguardTable() {
    return this.state.securityguard.map(securityguard => {
      const { firstName, lastName, staffEmail, staffTel } = securityguard;
      return (
        <tr>
          <td>{firstName}</td>
          <td>{lastName}</td>
          <td>{staffEmail}</td>
          <td>{staffTel}</td>
        </tr>
      );
    });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div>
        <Header />
        <Navibar />
        <h2 className="title">Admin</h2>
        <button className="addStaffButton" onClick={this.onOpenAddModal}>
          เพิ่ม
        </button>
        <Modal
          className="addStaff"
          open={this.state.openAdd}
          onClose={this.onCloseAddModal}
          center
        >
          <p className="modalTitle">เพิ่มแอดมิน</p>
          <form className="formAdd" onSubmit={this.handleSubmitAdmin}>
            <div className="addModal">
              <label htmlFor="firstName">ชื่อ: </label>
              <input
                type="text"
                name="firstName"
                onChange={event => this.handleChange(event)}
                value={this.state.firstName}
              />
            </div>
            <div className="addModal">
              <label htmlFor="lastName">นามสกุล: </label>
              <input
                type="text"
                name="lastName"
                onChange={event => this.handleChange(event)}
                value={this.state.lastName}
              />
            </div>
            <div className="addModal">
              <label htmlFor="staffTel">เบอร์โทรศัพท์: </label>
              <input
                type="text"
                name="staffTel"
                onChange={event => this.handleChange(event)}
                value={this.state.staffTel}
              />
            </div>
            <div className="addModal">
              <label htmlFor="staffEmail">อีเมล: </label>
              <input
                type="text"
                name="staffEmail"
                onChange={event => this.handleChange(event)}
                value={this.state.staffEmail}
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

        <table className="staffTable">
          <tbody>{this.staffTable()}</tbody>
        </table>

        <h2>Security Guard</h2>
        <button
          className="addSecurityguard"
          onClick={this.onOpenAddSecurityguardModal}
        >
          Add Securityguard{" "}
        </button>
        <Modal
          open={this.state.openAddSecurityguard}
          onClose={this.onCloseAddSecurityguardModal}
          center
        >
          <h2>AddSecurityguard </h2>
          <form>
            <p>FirstName: </p>
            <input
              type="text"
              name="firstName"
              onChange={event => this.handleChange(event)}
              value={this.state.firstName}
            />
            <p>LastName: </p>
            <input
              type="text"
              name="lastName"
              onChange={event => this.handleChange(event)}
              value={this.state.lastName}
            />
            <p>Email: </p>
            <input
              type="text"
              name="staffTel"
              onChange={event => this.handleChange(event)}
              value={this.state.staffTel}
            />
            <p>Phone number: </p>
            <input
              type="text"
              name="staffEmail"
              onChange={event => this.handleChange(event)}
              value={this.state.staffEmail}
            />
            <div />
          </form>
          <button onClick={event => this.handleSubmitSecurity(event)}>
            Add
          </button>
          <button onClick={this.onCloseAddSecurityguardModal}>Cancel</button>
        </Modal>
        <table className="staffTable">
          <tbody>{this.securityguardTable()}</tbody>
        </table>
      </div>
    );
  }
}

export default Staff;
