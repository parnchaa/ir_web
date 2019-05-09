import React, { Component } from 'react';

import {
  BootstrapTable,
  TableHeaderColumn
} from 'react-bootstrap-table';
import './ruletable.css'
class Ruletable extends Component {

  onAfterInsertRow = (Data) => {
    console.log(Data)
    const Url = 'http://localhost:5000/addrule';

    const othepram = {
      headers: {
        "content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(Data),
      method: "POST"
    };
    fetch(Url, othepram)
      .then(data => { return data.json() })
      .then(res => { localStorage.setItem("user", res) })
      .catch(error => console.log(error))
  }

  createCustomModalHeader(onClose, onSave) {
    const headerStyle = {
      backgroundColor: '#29A8AB',
      fontFamily: 'kanit',
      color: '#FFFFFF',
      paddingTop: 30
    };
    return (
      <div className='modal-header' style={headerStyle}>
        <h3>เพิ่มกฎองค์กร</h3>
        <button className='btn btn-danger' onClick={onClose}>ปิด</button>
      </div>
    );
  }

  createCustomModalFooter = (onClose, onSave) => {
    const style = {
      backgroundColor: '#ffffff'
    };
    return (
      <div className='modal-footer' style={style}>
        <button className='btn btn-xs btn-danger' onClick={onClose}>ปิด</button>
        <button className='btn btn-xs btn-info' onClick={onSave}>เพิ่ม</button>
      </div>
    );
  }



  render() {
    const options = {
      afterInsertRow: this.onAfterInsertRow,
      insertModalHeader: this.createCustomModalHeader,
      insertModalFooter: this.createCustomModalFooter,

    };
    return (
      <div className="ruletable">
        <BootstrapTable data={this.props.ruledata} trClassName='formatdatastyle' insertRow={true} options={options}>
          <TableHeaderColumn isKey dataField='ruleName'width='25%' className="headerColumnFormat" >
            กฎ
            </TableHeaderColumn>
          <TableHeaderColumn dataField='maxWarning' width='11%'className="headerColumnFormat" >
            จำนวนครั้งที่เตือน
            </TableHeaderColumn>
          <TableHeaderColumn dataField='price' width='8%'className="headerColumnFormat">
            ราคา
            </TableHeaderColumn>
          <TableHeaderColumn dataField='ruleDetails' width='56%'className="headerColumnFormat">
            รายละเอียด
            </TableHeaderColumn>
        </BootstrapTable>

      </div>
    );
  }
}

export default Ruletable;