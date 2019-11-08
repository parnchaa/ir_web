import React, { Component } from 'react';
import irp from './picture/ir-parking.jpg';
import profile from './picture/ceo.png';
import logout from './picture/exit.png'
import './Header.css'
// import { url } from 'inspector';
import Modal from "react-responsive-modal";

class Header extends Component{
  constructor(props){
    super(props);
    this.state = {
      logout: false,
      firstName: '',
      lastName: '',
      role:'',
      staffImages:''
    }
  }
  

setProflie = () => {

  let userData = JSON.parse(localStorage.getItem('tk'));

  let tkFirstName = userData[0].firstName
  let tkLastName = userData[0].lastName
  let tkRole = userData[0].staffRole
  let tkImages = userData[0].staffImages

  this.setState({
    firstName: tkFirstName,
    lastName: tkLastName,
    role: tkRole,
    staffImages: tkImages
  })
  
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
  this.setProflie()
}

    render() {
      let { firstName, lastName , role , staffImages } = this.state
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