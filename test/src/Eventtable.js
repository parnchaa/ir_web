import React, { Component } from 'react';
import {
  BootstrapTable,
  TableHeaderColumn
} from 'react-bootstrap-table';

import './Table.css'
import { format } from 'url';

class Eventtable extends Component {
  
  render() {
    return (
      <div className="Eventtablestyle">
        <BootstrapTable data={this.props.data} trClassName='formatdatastyle'>
          <TableHeaderColumn isKey dataField='dateOfProblem' className="headerColumnFormat">
            วันที่
          </TableHeaderColumn>
          <TableHeaderColumn dataField='timeOfProblem'className="headerColumnFormat">
            เวลา
          </TableHeaderColumn>
          <TableHeaderColumn dataField='sence'className="headerColumnFormat">
            สถานที่เกิดเหตุ
          </TableHeaderColumn>
          <TableHeaderColumn dataField='licensePlate'className="headerColumnFormat">
            เลขทะเบียนรถ
          </TableHeaderColumn>
          <TableHeaderColumn dataField='allegation'className="headerColumnFormat">
            ข้อหา
          </TableHeaderColumn>
          <TableHeaderColumn dataField='countProblems'className="headerColumnFormat">
            เตือนครั้งที่
          </TableHeaderColumn>
          <TableHeaderColumn dataField='securityGuardUserName'className="headerColumnFormat">
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