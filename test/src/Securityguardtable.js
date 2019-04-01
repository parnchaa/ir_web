import React, { Component } from 'react';
import {
  BootstrapTable,
  TableHeaderColumn
} from 'react-bootstrap-table';

import './Stafftable.css'

class Securityguardtable extends Component {
  render() {
    return (
      <div className="sgtable">
        <BootstrapTable data={this.props.sgdata} trClassName='formatdatastyle'>
          <TableHeaderColumn isKey dataField='firstName' className="headerColumnFormat">
            ชื่อ
          </TableHeaderColumn>
          <TableHeaderColumn dataField='lastName'className="headerColumnFormat">
            นามสกุล
          </TableHeaderColumn>
          <TableHeaderColumn dataField='userID'className="headerColumnFormat">
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

export default Securityguardtable;