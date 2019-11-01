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
    .then((token)=>{
      if(token === "wrong"){
        alert("อีเมล์หรือรหัสผ่านไม่ถูกต้อง")
      }else{
        fetch("http://localhost:5000/userData/" + this.state.staffEmail,
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
      {/* <div className='Loginpage'> */}
        <img src={irbackground} className="bg"/>
        <div className="boxLogin">
        <div>
        <label>E-mail:</label>
        <input  
          className="emailinput"
          name="staffEmail"
          value={this.state.staffEmail}
          onChange={event => this.handleChange(event)}
        ></input>
         </div>
        {errors.staffEmail.length > 0 && (
              <p className="error">{errors.staffEmail}</p>
            )}
       
        <div>
        <label>Password:</label>
        <input
        className="emailinput"
          name="staffPassword"
          type="password"
          value={this.state.staffPassword}
          onChange={event => this.handleChange(event)}
        ></input>
        </div>
        {errors.staffPassword.length > 0 && (
              <p className="error">{errors.staffPassword}</p>
            )}
            <div className="positionbutton">
        <button className="buttonLogin" onClick={event => this.handlelogin(event)} type="submit">
          login
        </button>
        </div>
        </div>
      {/* </div> */}
      </div>
    );
  }
}

export default login;
