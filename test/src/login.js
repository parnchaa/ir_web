import React, { Component } from "react";
import "./login.css";
import irbackground from "./picture/irbackground.png";

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
    switch (name) {
      case "staffEmail":
        errors.staffEmail = validEmailRegex.test(value)
          ? ""
          : "กรุณากรอกอีเมล์ให้ถูกต้อง";
        break;
    }
    this.setState({ errors, [name]: value });
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
      } 
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
    const url = "https://irweb-api.tech/login";
    const bodyData = JSON.stringify({
        staffEmail: this.state.staffEmail,
        staffPassword: this.state.staffPassword,
    });
    const othepram = {
      headers: {
        "content-type": "application/json; charset=UTF-8"
      },
      body: bodyData,
      method: "POST"
    };
    fetch(url, othepram)
    .then(res=>res.json())
    .then((token)=>{
      if(token === "wrong"){
        alert("อีเมล์หรือรหัสผ่านไม่ถูกต้อง")
      }else{
        fetch("https://irweb-api.tech/userData/" + this.state.staffEmail,
        {
          method: 'GET',
          headers:{ 'Authorization': token }
        })
        .then(res=>res.json())
        .then((result) => {
          localStorage.setItem('tk',JSON.stringify(result))
          window.location.href="/Event"
        })
      }
    })
  };

  render() {
    const { errors } = this.state;
    return (
      <div className='login'>
        <img src={irbackground} className="bg"/>
        <div className="boxLogin">
        <div>
        <label>อีเมล์:</label>
        <input  
          className="emailinput"
          name="staffEmail"
          placeholder="กรอกอีเมล์"
          value={this.state.staffEmail}
          onChange={event => this.handleChange(event)}
        ></input>
         </div>
        {errors.staffEmail.length > 0 && (
              <p className="error">{errors.staffEmail}</p>
            )}
       
        <div>
        <label>รหัสผ่าน:</label>
        <input
        className="emailinput"
          name="staffPassword"
          type="password"
          placeholder="กรอกรหัสผ่าน"
          value={this.state.staffPassword}
          onChange={event => this.handleChange(event)}
        ></input>
        </div>
        {errors.staffPassword.length > 0 && (
              <p className="error">{errors.staffPassword}</p>
            )}
            <div className="positionbutton">
        <button className="buttonLogin" onClick={event => this.handlelogin(event)} type="submit">
          เข้าสู่ระบบ
        </button>
        </div>
        </div>
      </div>
    );
  }
}

export default login;
