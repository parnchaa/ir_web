import React, { Component } from 'react';
import {
  BootstrapTable,
  TableHeaderColumn
} from 'react-bootstrap-table';


import './Stafftable.css'

class Securityguardtable extends Component {

  createCustomInsertButton = (openModal) => {
    return (
      <button class="btn btn-outline-info" style={ {fontFamily:'kanit', width:'10%', height:'40px',fontSize:'14pt',marginLeft:'7px', marginBottom:'8px'} }
       onClick={ openModal }>เพิ่มพนักงานรักษาความปลอดภัย</button>
    );
  }

  onAfterInsertRow = (Data) => {
    console.log(Data)
    const Url='http://localhost:5000/addsecurityguard';

    const othepram={
      headers:{
        "content-type":"application/json; charset=UTF-8"
      },
      body: JSON.stringify(Data),
      method:"POST"
    };
    fetch(Url,othepram)
    .then(data=>{return data.json()})
    .then(res=>{console.log(res)})
    .catch(error=>console.log(error))
  }

  createCustomModalHeader(onClose, onSave) {
    const headerStyle = {
      backgroundColor: '#29A8AB',
      fontFamily: 'kanit',
      color:'#FFFFFF',
      paddingTop:30
    };
    return (
      <div className='modal-header' style={ headerStyle }>
        <h3>เพิ่มพนักงานรักษาความปลอดภัย</h3>
        <button className='btn btn-danger' onClick={ onClose }>ปิด</button>
      </div>
    );
  }

  createCustomModalFooter = (onClose, onSave) => {
    const style = {
      backgroundColor: '#ffffff'
    };
    return (
      <div className='modal-footer' style={ style }>
        <button className='btn btn-xs btn-danger' onClick={ onClose }>ปิด</button>
        <button className='btn btn-xs btn-info' onClick={ onSave }>ยืนยัน</button>
      </div>
    );
  }

  render() {
    const options = {
      afterInsertRow: this.onAfterInsertRow,
      insertModalHeader: this.createCustomModalHeader,
      insertModalFooter: this.createCustomModalFooter,
      insertBtn: this.createCustomInsertButton

    };
    return (
      <div className="sgtable">
        <BootstrapTable data={this.props.sgdata} trClassName='formatdatastyle' options={options} insertRow={ true }>
          <TableHeaderColumn isKey dataField='firstName' width='20%' className="headerColumnFormat">
            ชื่อ
          </TableHeaderColumn>
          <TableHeaderColumn dataField='lastName' width='20%' className="headerColumnFormat">
            นามสกุล
          </TableHeaderColumn>
          <TableHeaderColumn dataField='staffTel' width='20%' className="headerColumnFormat">
            เบอร์โทรศัพท์
          </TableHeaderColumn>
          <TableHeaderColumn dataField='staffEmail' width='40%' className="headerColumnFormat">
            อีเมล
          </TableHeaderColumn>
        </BootstrapTable>

      </div>
    );
  }
}

export default Securityguardtable;