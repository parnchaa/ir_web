import React, { Component } from 'react';

import {
    BootstrapTable,
    TableHeaderColumn
  } from 'react-bootstrap-table';
 import './Stafftable.css'
  class Ruletable extends Component {

    onAfterInsertRow = (Data) => {
      console.log(Data)
      const Url='http://localhost:5000/addrule';
  
      const othepram={
        headers:{
          "content-type":"application/json; charset=UTF-8"
        },
        body: JSON.stringify(Data),
        method:"POST"
      };
      fetch(Url,othepram)
      .then(data=>{return data.json()})
      .then(res=>{localStorage.setItem("user",res)})
      .catch(error=>console.log(error))
    }
  
    render() {
      const options = {
        afterInsertRow: this.onAfterInsertRow
      };
      return (
        <div className="sgtable">
          <BootstrapTable data={this.props.ruledata} trClassName='formatdatastyle' insertRow={true} options={options}>
            <TableHeaderColumn isKey dataField='ruleID' className="headerColumnFormat">
              ID
            </TableHeaderColumn>
            <TableHeaderColumn dataField='ruleName'className="headerColumnFormat">
              กฎ
            </TableHeaderColumn>
            <TableHeaderColumn dataField='maxWarnning'className="headerColumnFormat" >
              จำนวนครั้งที่เตือน
            </TableHeaderColumn>
            <TableHeaderColumn dataField='price' className="headerColumnFormat">
              ราคา
            </TableHeaderColumn>
          </BootstrapTable>
  
        </div>
      );
    }
  }
  
  export default Ruletable;