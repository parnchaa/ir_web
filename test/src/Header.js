import React, { Component } from 'react';
import irp from './picture/ir-parking.jpg';
import profile from './picture/ceo.png';
import './Header.css'

class Header extends Component{
    render() {

      
      
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
              <tr>name</tr>
              <tr>role</tr>
            </td>
            <td className='profileInfo'>
              <tr>surname</tr>
              <tr><button className='logout'>logout</button></tr>
            </td>
          </table>
        </div>
      );
    }
  }

  export default Header;