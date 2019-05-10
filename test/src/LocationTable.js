import React, { Component } from 'react';
import {
  BootstrapTable,
  TableHeaderColumn
} from 'react-bootstrap-table';

import './Table.css'

class Locationtable extends Component {
  
  render() {

    const options = {
      
      page: 1,  // which page you want to show as default
      sizePerPageList: [ {
        text: '5', value: 5
      }, {
        text: '10', value: 10
      }, {
        text: 'All', value: this.props.locationdata.length
      } ], // you can change the dropdown list for size per page
      sizePerPage: 5,  // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 3,  // the pagination bar size.
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      firstPage: 'First', // First page button text
      lastPage: 'Last', // Last page button text
      paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
      paginationPosition: 'bottom',  // default is bottom, top and both is all available
      // hideSizePerPage: true ,
      alwaysShowAllBtns: true // Always show next and previous button
      // withFirstAndLast: false > Hide the going to First and Last page button
      

    };
    return (
      <div className="locationtablestyle" >
        <BootstrapTable data={this.props.locationdata} trClassName='formatdatastyle' pagination={ true } options={ options }>
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