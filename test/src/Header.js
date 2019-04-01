import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import irp from './ir-parking.jpg';
import { Table } from 'reactstrap';
import profile from './ceo.png';

class Header extends Component{
    
    render() {

      var name={
        fontSize:60,
        
      }
      var pro={
        fontSize:20,
        color:'#29A8AB'
      }
      var head={
        backgroundColor:'#DDDDDD',
        color: '#29A8AB', 
        fontFamily: 'kanit',
        paddingTop:30
      }
      var logout={
        color:'red'
      }
      
      
      return (
        <Container style={head} fluid>
          <Row>
            <Col md={1} ><img src={irp} width="90" height="90" /></Col> 
            <Col md={3} style={name}>IR-Parking</Col>
            <Col md={4}></Col> 
            <Col md={4}>
                <Table id="prof">
                  
                    <tr>
                      <th rowSpan="2"> <img src={profile} width="70" height="70"/></th>
                      <th colSpan="2" style={pro}>nutchaphon phutthisophin</th>
                    </tr>
                    <tr>
                      <th style={pro}>student</th>
                      <th style={logout}>ออกจากระบบ</th>
                    </tr>
                  
                </Table>
            </Col>
          </Row>
        </Container>
      );
    }
  }

  export default Header;