import React, { Component } from 'react';
import {
  BootstrapTable,
  TableHeaderColumn
} from 'react-bootstrap-table';

import './Table.css'

class Eventtable extends Component {
  componentDidMount(){
    console.log(this.props.data)
  }
  render() {
    return (
      <div className="Eventtablestyle">
        <BootstrapTable data={this.props.data} trClassName='formatdatastyle'>
        <TableHeaderColumn isKey dataField='problemID'width='5%' className="headerColumnFormat">
            
          </TableHeaderColumn>
          <TableHeaderColumn dataField='dateOfProblem' width='8%' className="headerColumnFormat">
            วันที่
          </TableHeaderColumn>
          <TableHeaderColumn dataField='timeOfProblem' width='8%' className="headerColumnFormat">
            เวลา
          </TableHeaderColumn>
          <TableHeaderColumn dataField='scene' width='10%' className="headerColumnFormat">
            สถานที่เกิดเหตุ
          </TableHeaderColumn>
          <TableHeaderColumn dataField='licensePlate' width='9%' className="headerColumnFormat">
            เลขทะเบียนรถ
          </TableHeaderColumn>
          <TableHeaderColumn dataField='allegation'className="headerColumnFormat">
            ข้อหา
          </TableHeaderColumn>
          <TableHeaderColumn dataField='countProblems' width='7%' className="headerColumnFormat">
            เตือนครั้งที่
          </TableHeaderColumn>
          <TableHeaderColumn dataField='firstName' width='7%' className="headerColumnFormat">
            ผู้แจ้ง
          </TableHeaderColumn>
          <TableHeaderColumn dataField='problemDetails'className="headerColumnFormat">
            หมายเหตุ
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default Eventtable;