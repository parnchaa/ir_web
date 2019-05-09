import React, { Component } from 'react';
import {
  BootstrapTable,
  TableHeaderColumn
} from 'react-bootstrap-table';

import './Table.css'

class Locationtable extends Component {
  
  render() {
    return (
      <div className="locationtablestyle">
        <BootstrapTable data={this.props.locationdata} trClassName='formatdatastyle'>
          <TableHeaderColumn dataField='locationName' className="headerColumnFormat">
            ชื่อ
          </TableHeaderColumn>
          <TableHeaderColumn isKey dataField='locationCode' className="headerColumnFormat">
            โค้ด
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default Locationtable;