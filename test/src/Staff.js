import React, { Component } from "react";
import Header from "./Header";
import Navibar from "./Navibar";
import "./Staff.css";
import Modal from "react-responsive-modal";
import deletePic from "./picture/delete.png";
import * as firebase from "firebase";
import ApiKeys from "./ApiKeys";

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
      staffPassword: "",
      openAdd: false,
      openAddSecurityguard: false,
      openDelete: false,
      securityguardImage: "",
      securityguardImages: "",
      securityguardImageName: ""
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
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
    fetch(url, othepram)
      .then(data => console.log(data))
      .then(response => {
        this.getData();
      })
      .catch(error => {});
  };

  uploadImages = async (event, securityguardImageName) => {
    const response = await fetch(event);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("securityguardImages/" + securityguardImageName);
    return ref.put(blob);
    console.log("success");
  };

  confirmUploadImage = () => {
    this.uploadImages(
      this.state.securityguardImages,
      this.state.securityguardImageName
    )
      .then(() => {
        console.log("Upload Success !!");
        //get url ของรูปมาถ้า Upload สำเร็จ (ต้องเอา url ของรูปมาเก็บใน state แล้วนำมา show **ตอนนี้ยังไม่ได้ทำ)
        firebase
          .storage()
          .ref()
          .child("securityguardImages/" + this.state.securityguardImageName)
          .getDownloadURL()
          .then(imageURL => {
            this.setState({
              securityguardImage: imageURL
            });
            if (this.state.securityguardImage != "") {
              console.log("imageURL: " + this.state.securityguardImage);
            } else {
              console.log("upload failed");
            }
          });
      })
      .catch(error => {
        console.log("Fail to upload" + error);
      });
  };

  fileSelectedHandler = event => {
    this.setState({
      securityguardImages: URL.createObjectURL(event.target.files[0]),
      securityguardImageName: event.target.files[0].name
    });
  };

  handleSubmitSecurity = event => {
    this.confirmUploadImage()
    console.log(this.state.securityguardImage, "ออกดิไอควย");
    this.onAfterInsertSecurity()
    // if (this.state.securityguardImage !== "") {
    //   this.onAfterInsertSecurity();
    // }
    this.setState({
      firstName: "",
      lastName: "",
      staffEmail: "",
      staffTel: "",
      staffPassword: "",
      staffImages:"",
      openAddSecurityguard: false
    });
  };

  onAfterInsertSecurity = () => {
    const url = "http://localhost:5000/addsecurityguard";
    const bodyData = JSON.stringify({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      staffEmail: this.state.staffEmail,
      staffTel: this.state.staffTel,
      staffPassword: this.state.staffPassword,
      staffImages: this.state.securityguardImage
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

  staffTable() {
    return this.state.staff.map(staff => {
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
      );
    });
  }

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
        <h2 className="Table-header">แอดมิน</h2>
        <button className="addStaffButton" onClick={this.onOpenAddModal}>
          เพิ่มแอดมิน
        </button>

        <Modal
          // className="Modal"
          open={this.state.openDelete}
          onClose={this.onCloseDeleteModal}
          center
        >
          <div className="ModalDelete">
            <h2>ลบแอดมิน</h2>
            <div>ยืนยันการลบแอดมิน</div>
            <button
              className="ButtonDelete"
              onClick={event => {
                this.submitDeleteTask(this.state.openStaffId);
              }}
            >
              ลบ
            </button>
            <button className="ButtonCancel" onClick={this.onCloseDeleteModal}>
              ยกเลิก
            </button>
          </div>
        </Modal>
        <Modal open={this.state.openAdd} onClose={this.onCloseAddModal} center>
          <p className="modalTitle">เพิ่มแอดมิน</p>
          <form className="formAdd" onSubmit={this.handleSubmitAdmin}>
            <div className="addModal">
              <label htmlFor="firstName">ชื่อ: </label>
              <input
                className="inputModal"
                type="text"
                name="firstName"
                onChange={event => this.handleChange(event)}
                value={this.state.firstName}
              />
            </div>
            <div className="addModal">
              <label htmlFor="lastName">นามสกุล: </label>
              <input
                className="inputModal"
                type="text"
                name="lastName"
                onChange={event => this.handleChange(event)}
                value={this.state.lastName}
              />
            </div>
            <div className="addModal">
              <label htmlFor="staffTel">เบอร์โทรศัพท์: </label>
              <input
                className="inputModal"
                type="text"
                name="staffTel"
                onChange={event => this.handleChange(event)}
                value={this.state.staffTel}
              />
            </div>
            <div className="addModal">
              <label htmlFor="staffEmail">อีเมล์: </label>
              <input
                className="inputModal"
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
          <th>ชื่อ</th>
          <th>นามสกุล</th>
          <th>อีเมล์</th>
          <th>เบอร์โทร</th>
          <tbody>{this.staffTable()}</tbody>
        </table>

        <h2 className="Table-header">พนักงานรักษาความปลอดภัย</h2>
        <button
          className="addSecurityguard"
          onClick={this.onOpenAddSecurityguardModal}
        >
          เพิ่มพนักงานรักษาความปลอดภัย
        </button>
        <Modal
          open={this.state.openAddSecurityguard}
          onClose={this.onCloseAddSecurityguardModal}
          center
        >
          <p className="modalTitle">เพิ่มพนักงานรักษาความปลอดภัย</p>
          <form className="formAddSecure">
            <div className="ModalName">
              <label>ชื่อ: </label>
              <input
                className="inputModal"
                type="text"
                name="firstName"
                onChange={event => this.handleChange(event)}
                value={this.state.firstName}
              />
            </div>

            <div className="ModalSurname">
              <label>นามสกุล: </label>
              <input
                className="inputModal"
                type="text"
                name="lastName"
                onChange={event => this.handleChange(event)}
                value={this.state.lastName}
              />
            </div>

            <div className="ModalEmail">
              <label>อีเมล์: </label>
              <input
                className="inputModal"
                type="text"
                name="staffEmail"
                onChange={event => this.handleChange(event)}
                value={this.state.staffEmail}
              />
            </div>

            <div className="ModalTel">
              <label>เบอร์โทรศัพท์: </label>
              <input
                className="inputModal"
                type="text"
                name="staffTel"
                onChange={event => this.handleChange(event)}
                value={this.state.staffTel}
              />
            </div>

            <div className="staffPassword">
              <label>รหัสผ่าน: </label>
              <input
                className="inputModal"
                type="password"
                name="staffPassword"
                onChange={event => this.handleChange(event)}
                value={this.state.staffPassword}
              />
            </div>

            <label htmlFor="upload-photo" className="upload-picture">
              Browse...
            </label>
            <input
              type="file"
              name="photo"
              id="upload-photo"
              onChange={this.fileSelectedHandler}
            />
            {/* <button
              className="upload-picture"
              onClick={this.confirmUploadImage}
            >
              Upload
            </button> */}
          </form>
          <div className="modalButton">
            <button
              className="modalAdd"
              onClick={event => this.handleSubmitSecurity(event)}
            >
              เพิ่ม
            </button>
            <button
              className="modalcancel"
              onClick={this.onCloseAddSecurityguardModal}
            >
              ยกเลิก
            </button>
          </div>
        </Modal>

        <table className="staffTable">
          <th>ชื่อ</th>
          <th>นามสกุล</th>
          <th>อีเมล์</th>
          <th>เบอร์โทร</th>
          <tbody>{this.securityguardTable()}</tbody>
        </table>
      </div>
    );
  }
}

export default Staff;
