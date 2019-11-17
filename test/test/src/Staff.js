import React, { Component } from "react";
import Header from "./Header";
import Navibar from "./Navibar";
import "./Staff.css";
import Modal from "react-responsive-modal";
import deletePic from "./picture/delete.png";
import * as firebase from "firebase";
import ApiKeys from "./ApiKeys";
import admin from "./picture/admin.png";
import securityguard from "./picture/securityguard.png";
import Loader from "react-loader-spinner";
import "./node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css";


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
      securityguardImageName: "",
      errors: {
        firstName: "",
        lastName: "",
        staffEmail: "",
        staffTel: "",
        staffPassword: ""
      },
      spinner: false,
      role: ""
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
  }

  getData() {
    let userData = JSON.parse(localStorage.getItem("tk"));
    let organizationIDTk = userData[0].organizationID;
    fetch("https://irweb-api.tech/staff/" + organizationIDTk)
      .then(response => {
        return response.json();
      })
      .then(staff => {
        this.setState({ staff });
      });
    fetch("https://irweb-api.tech/securityguard/" + organizationIDTk)
      .then(response => {
        return response.json();
      })
      .then(securityguard => {
        this.setState({ securityguard });
      });
  }

  checkToken = () => {
    let userData = JSON.parse(localStorage.getItem("tk"));
    let tkRole = userData[0].staffRole;

    this.setState({
      role: tkRole
    });
  };

  onOpenAddModal = () => {
    this.setState({
      openAdd: true,
      errors: {
        firstName: "",
        lastName: "",
        staffEmail: "",
        staffTel: "",
        staffPassword: ""
      }
    });
  };

  onCloseAddModal = () => {
    this.setState({
      openAdd: false,
      firstName: "",
      lastName: "",
      staffEmail: "",
      staffTel: "",
      staffPassword: ""
    });
  };

  onOpenAddSecurityguardModal = () => {
    this.setState({
      openAddSecurityguard: true,
      errors: {
        firstName: "",
        lastName: "",
        staffEmail: "",
        staffTel: "",
        staffPassword: ""
      }
    });
  };

  onCloseAddSecurityguardModal = () => {
    this.setState({
      openAddSecurityguard: false,
      firstName: "",
      lastName: "",
      staffEmail: "",
      staffTel: "",
      staffPassword: ""
    });
  };

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    const validEmailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const phoneno = /^0[0-9]{8,9}$/i;
    const strongRegex = /^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/i;
    const FLname = /^[a-zA-Zก-ฮะ-์]{2,}$/i;
    switch (name) {
      case "firstName":
        errors.firstName = FLname.test(value) ? "" : "กรุณากรอกชื่อ เช่น สมชาย";
        break;
      case "lastName":
        errors.lastName = FLname.test(value)? "" : "กรุณากรอกนามสกุล เช่น ใจดี ";
        break;
      case "staffEmail":
        errors.staffEmail = validEmailRegex.test(value)
          ? ""
          : "กรุณากรอกอีเมล์ให้ถูกต้อง เช่น somchai@gmail.com";
        break;
      case "staffTel":
        errors.staffTel = phoneno.test(value)
          ? ""
          : "กรุณากรอกเบอร์โทรให้ถูกต้อง เช่น 0812345678";
        break;
      case "staffPassword":
        errors.staffPassword = strongRegex.test(value)
          ? ""
          : "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวและต้องมีตัวเลขอย่างน้อย 1 ตัว";
        break;
    }
    this.setState({ errors, [name]: value })
  };

  validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      val => val.length > 0 && (valid = false)
    );
    return valid;
  };

  handleSubmitAdmin = event => {
    event.preventDefault();
    const {
      firstName,
      lastName,
      staffEmail,
      staffTel,
      staffPassword,
      securityguardImage
    } = this.state;
    if (
      firstName !== "" &&
      lastName !== "" &&
      staffEmail !== "" &&
      staffTel !== "" &&
      staffPassword !== "" &&
      securityguardImage !== ""
    ) {
      if (this.validateForm(this.state.errors)) {
        this.onAfterInsertAdmin();
        this.onCloseAddModal();
      }
    } 
    else{
      alert("กรุณากรอกข้อมูลให้ครบ")
    }
  };

  onAfterInsertAdmin = () => {
    let userData = JSON.parse(localStorage.getItem("tk"));
    let organizationIDTk = userData[0].organizationID;
    const url = "https://irweb-api.tech/addstaff";
    const bodyData = JSON.stringify({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      staffEmail: this.state.staffEmail,
      staffTel: this.state.staffTel,
      staffPassword: this.state.staffPassword,
      staffImages: this.state.securityguardImage,
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
      .then(() => this.getData())
  };

  uploadImages = async (imageURL, imageName) => {
    const response = await fetch(imageURL);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("securityguardImages/" + imageName);
    return ref.put(blob);
  };

  confirmUploadImage = (imageURL, imageName) => {
    this.setState({ spinner: true });
    this.uploadImages(imageURL, imageName)
      .then(() => {
        firebase
          .storage()
          .ref()
          .child("securityguardImages/" + imageName)
          .getDownloadURL()
          .then(imageURL => {
            this.setState({
              securityguardImage: imageURL
            });
            if (this.state.securityguardImage != "") {
              this.setState({ spinner: false });
            }
          });
      })
  };

  fileSelectedHandler = event => {
    let imageURL = URL.createObjectURL(event.target.files[0]);
    let imageName = event.target.files[0].name;
    this.confirmUploadImage(imageURL, imageName);
  };

  handleSubmitSecurity = event => {
    event.preventDefault();
    const {
      firstName,
      lastName,
      staffEmail,
      staffTel,
      staffPassword,
      securityguardImage
    } = this.state;
    if (
      firstName !== "" &&
      lastName !== "" &&
      staffEmail !== "" &&
      staffTel !== "" &&
      staffPassword !== "" &&
      securityguardImage !==""
    ) {
      if (this.validateForm(this.state.errors)) {
        this.onAfterInsertSecurity();
        this.onCloseAddSecurityguardModal();
      } 
    } 
    else{
      alert("กรุณากรอกข้อมูลให้ครบ")
    }
  };

  onAfterInsertSecurity = () => {
    let userData = JSON.parse(localStorage.getItem("tk"));
    let organizationIDTk = userData[0].organizationID;
    const url = "https://irweb-api.tech/addsecurityguard";
    const bodyData = JSON.stringify({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      staffEmail: this.state.staffEmail,
      staffTel: this.state.staffTel,
      staffPassword: this.state.staffPassword,
      staffImages: this.state.securityguardImage,
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
      .then(() => this.getData())
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
    const url = "https://irweb-api.tech/deleteStaff";
    const bodyData = JSON.stringify({
      staffID: this.state.openStaffID
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

  staffTable() {
    return this.state.staff.map(staff => {
      const { firstName, lastName, staffEmail, staffTel, staffID } = staff;
      return (
        <tr>
          <td>{firstName}</td>
          <td>{lastName}</td>
          <td>{staffEmail}</td>
          <td>{staffTel}</td>

          {this.state.role === "Administrator" ? null : (
            <button
              className="deleteModalButton"
              onClick={this.onOpenDeleteModal(staffID)}
            >
              <img src={deletePic} className="deletePic" />
            </button>
          )}
        </tr>
      );
    });
  }

  securityguardTable() {
    return this.state.securityguard.map(securityguard => {
      const {
        firstName,
        lastName,
        staffEmail,
        staffTel,
        staffID
      } = securityguard;
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

  changeStyle = () =>{
     let button_add = document.getElementById('button-add').style
     button_add.paddingBottom = 0
     button_add.paddingTop = 0

  }

  componentDidMount() {
    this.getData();
    this.checkToken();
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <Header />
        <Navibar />
        <div className="Table-header title_haeder">
          แอดมิน
          <img src={admin} className="Headicon" />
        </div>
        <div id="button-add">
          {this.state.role === "Administrator" ? 
            this.changeStyle()
          : (
            <button className="addStaffButton" onClick={this.onOpenAddModal}>
              เพิ่มแอดมิน
            </button>
          )}
        </div>
        <Modal
          open={this.state.openDelete}
          onClose={this.onCloseDeleteModal}
          center
        >
          <div className="ModalDelete">
            <h2>ลบพนักงาน</h2>
            <div>ยืนยันการลบ</div>
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
            {errors.firstName.length > 0 && (
              <p className="error">{errors.firstName}</p>
            )}
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
            {errors.lastName.length > 0 && (
              <p className="error">{errors.lastName}</p>
            )}
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
            {errors.staffTel.length > 0 && (
              <p className="error">{errors.staffTel}</p>
            )}
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
            {errors.staffEmail.length > 0 && (
              <p className="error">{errors.staffEmail}</p>
            )}
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
            {errors.staffPassword.length > 0 && (
              <p className="error">{errors.staffPassword}</p>
            )}
            <label htmlFor="upload-photo" className="upload-picture">
              เลือกรูป
            </label>
            <input
              className="photoinput"
              type="file"
              name="photo"
              id="upload-photo"
              accept="image/*"
              onChange={this.fileSelectedHandler}
            />
            <Loader
              className="loader_spinner"
              type="Oval"
              color="#29A8AB"
              height={25}
              width={25}
              visible={this.state.spinner}
            />
            {this.state.spinner ? (
              <p className="loader_waiting">กรุณารอสักครู่...</p>
            ) : null}
          </form>
          <div className="modalButton">
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
          </div>
        </Modal>

        <table className="staffTable">
          <th>ชื่อ</th>
          <th>นามสกุล</th>
          <th>อีเมล์</th>
          <th>เบอร์โทร</th>
          <tbody>{this.staffTable()}</tbody>
        </table>

        <div className="Table-header title-haeder">
          พนักงานรักษาความปลอดภัย
          <img src={securityguard} className="Headicon" />
        </div>
        <div className="button-add">
          <button
            className="addSecurityguard"
            onClick={this.onOpenAddSecurityguardModal}
          >
            เพิ่มพนักงานรักษาความปลอดภัย
          </button>
        </div>
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
            {errors.firstName.length > 0 && (
              <p className="error">{errors.firstName}</p>
            )}

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
            {errors.lastName.length > 0 && (
              <p className="error">{errors.lastName}</p>
            )}

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
            {errors.staffTel.length > 0 && (
              <p className="error">{errors.staffTel}</p>
            )}

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
            {errors.staffEmail.length > 0 && (
              <p className="error">{errors.staffEmail}</p>
            )}

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
            {errors.staffPassword.length > 0 && (
              <p className="error">{errors.staffPassword}</p>
            )}

            <label htmlFor="upload-photo" className="upload-picture">
              เลือกรูป
            </label>
            <input
              className="photoinput"
              type="file"
              name="photo"
              id="upload-photo"
              onChange={this.fileSelectedHandler}
            />
            <Loader
              className="loader_spinner"
              type="Oval"
              color="#29A8AB"
              height={25}
              width={25}
              visible={this.state.spinner}
            />
            {this.state.spinner ? (
              <p className="loader_waiting">กรุณารอสักครู่...</p>
            ) : null}
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
