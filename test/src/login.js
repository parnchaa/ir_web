import React, { Component } from "react";

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffEmail: "",
      staffPassword: "",
      errors: {
        staffEmail: "",
        staffPassword: ""
      }
    };
  }
  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    const validEmailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const strongRegex = /^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/i;
    switch (name) {
      case "staffEmail":
        errors.staffEmail = validEmailRegex.test(value)
          ? ""
          : "กรุณากรอกอีเมล์ให้ถูกต้อง เช่น somchai@gmail.com";
        break;
      case "staffPassword":
        errors.staffPassword = strongRegex.test(value)
          ? ""
          : "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวและต้องมีตัวเลขอย่างน้อย 1 ตัว";
        break;
    }
    this.setState({ errors, [name]: value }, () => {
      console.log(errors);
    });
  };

  handlelogin = event => {
    event.preventDefault();
    const { staffEmail, staffPassword } = this.state;
    if (
        staffEmail !== "" &&
        staffPassword !== "" 
    ) {
      if (this.validateForm(this.state.errors)) {
        this.onAfterLogin();
        console.log("Valid Form");
      } else {
        console.error("Invalid Form");
      }
    } else {
      console.log("pls fill");
    }
  };

  validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      val => val.length > 0 && (valid = false)
    );
    return valid;
  };

  onAfterLogin = () => {
    const url = "http://localhost:5000/login";
    const bodyData = JSON.stringify({
        staffEmail: this.state.staffEmail,
        staffPassword: this.state.staffPassword,
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
    .then(res=>res.json())
    .then(json=>{
        console.log(json)
        localStorage.setItem('tk',json)
    })
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <label>email:</label>
        <input
          name="staffEmail"
          value={this.state.staffEmail}
          onChange={event => this.handleChange(event)}
        ></input>
        {errors.staffEmail.length > 0 && (
              <p className="error">{errors.staffEmail}</p>
            )}
        <label>password:</label>
        <input
          name="staffPassword"
          value={this.state.staffPassword}
          onChange={event => this.handleChange(event)}
        ></input>
        {errors.staffPassword.length > 0 && (
              <p className="error">{errors.staffPassword}</p>
            )}
        <button onClick={event => this.handlelogin(event)} type="submit">
          login
        </button>
      </div>
    );
  }
}

export default login;
