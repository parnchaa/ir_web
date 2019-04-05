import React, { Component } from 'react';
import {
  BootstrapTable,
  TableHeaderColumn
} from 'react-bootstrap-table';

import './Stafftable.css'





class Stafftable extends Component {

  
      
  onAfterInsertRow = (Data) => {
    console.log(Data)
    const Url='http://localhost:5000/addstaff';

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


  render() {
    const options = {
      afterInsertRow: this.onAfterInsertRow
    };
    return (
      <div className="admintable" >
        <BootstrapTable data={this.props.staffdata} trClassName='formatdatastyle' options={options} insertRow={ true }>
          <TableHeaderColumn isKey dataField='firstName'className="headerColumnFormat">
            ชื่อ
          </TableHeaderColumn>
          <TableHeaderColumn dataField='lastName'className="headerColumnFormat">
            นามสกุล
          </TableHeaderColumn>
          <TableHeaderColumn dataField='userID'className="headerColumnFormat" >
            รหัสพนักงาน
          </TableHeaderColumn>
          <TableHeaderColumn className="headerColumnFormat">
            เพิ่มเติม
          </TableHeaderColumn>
        </BootstrapTable>

      </div>
    );
  }
}

export default Stafftable;