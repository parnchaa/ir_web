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
          <div className='profile'>
            <img src={profile} className='profilePic'></img>
            <div>
              
            </div>
          </div>
        </div>
      );
    }
  }

  export default Header;