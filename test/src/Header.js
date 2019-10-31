import React, { Component } from 'react';
import irp from './picture/ir-parking.jpg';
import profile from './picture/ceo.png';
import './Header.css'
// import { url } from 'inspector';
import * as jwt_decode from 'jwt-decode';

class Header extends Component{
  state={
    decoded:""
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

logout(){
  localStorage.removeItem('tk')
  window.location.href="/login"
}

componentDidMount(){
  this.checkToken()
}

    render() {
      const {firstName,lastName,role} = this.state.decoded
        return (
          <div className='header'>
            <div>
              <img src={irp} className='logo'></img>
            </div>
            <div className='irName'>IR-Parking</div>
            <table className='profile'>
              <td className='profilePicBox'>
              <img src={profile} className='profilePic'></img>
              </td>
              <td className='profileInfo'>
                <tr>{firstName}</tr>
                <tr>{role}</tr>
              </td>
              <td className='profileInfo'>
                <tr>{lastName}</tr>
                <tr><div>
                  <button className='logout' onClick={this.logout}>logout</button>
                  </div>
                  </tr>
              </td>
            </table>
          </div>
        );
      }
      
    }
  
  

  export default Header;