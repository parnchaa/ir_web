import React, { Component } from 'react';
import irp from './picture/ir-parking.jpg';
import profile from './picture/ceo.png';
import logout from './picture/exit.png'
import './Header.css'
// import { url } from 'inspector';
import * as jwt_decode from 'jwt-decode';
import Modal from "react-responsive-modal";

class Header extends Component{
  state={
    decoded:"",
    logout: false
  }

//   getUserData = async () => {
//     var token = localStorage.getItem('tk');
//     let {firstName, lastName} = this.state;
//     const othepram = {
//         headers: {
//             tkAuth: token,
//             firstName: firstName,
//             lastName: lastName
//         },
//         method: "GET"
//     };
//     const data = await Promise.all([
//         fetch(url+'/userData', othepram)
//             .then((response) => {
//                 return response.json();
//             })
//     ])

// }
checkToken = () => {
  // let token = localStorage.getItem('sc');
  let detailtk = localStorage.getItem('tk');

      var decoded = jwt_decode(detailtk)
      console.log(decoded,'decoded')
      this.setState({decoded})
}

confirmLogout = () =>{
  this.setState({logout: true})
}

onCloseConfirmLogout = () =>{
  this.setState({logout: false})
}

logout(){
  localStorage.removeItem('tk')
  window.location.href="/"
}

componentDidMount(){
  this.checkToken()
  console.log(this.state.decoded.staffImages,'tt')
}

    render() {
      const {firstName,lastName,role,staffImages} = this.state.decoded
        return (
          <div className='header'>
            <div>
              <img src={irp} className='logo'></img>
            </div>
            <div className='irName'>IR-Parking</div>
            <table className='profile'>
              <td className='profilePicBox'>
              <img src={staffImages} className='profilePic'></img>
              </td>
              <td className='profileInfo'>
                <tr>{firstName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{lastName}</tr>
                <tr className="role">{role}</tr>
              </td>
            </table>
            <button className='logout' onClick={this.confirmLogout}><img src={logout} className='logoutIcon' alt="ออกจากระบบ" /></button>
            <Modal
              open={this.state.logout}
              onClose={this.onCloseConfirmLogout}
              center
            >
            <div className="ModalDelete">
              <h4>คุณต้องการออกจากระบบหรือไม่</h4>
              <button
                className="ButtonDelete"
                onClick={this.logout} >
                ออกจากระบบ
              </button>
              <button
                className="ButtonCancel"
                onClick={this.onCloseDeleteModalLocation}
              >
                ยกเลิก
              </button>
            </div>
            </Modal>
          </div>
        );
      }
      
    }
  
  

  export default Header;