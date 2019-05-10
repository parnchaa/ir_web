import React, { Component } from 'react';
import {
  BootstrapTable,
  TableHeaderColumn
} from 'react-bootstrap-table';

import './Eventtable.css'

class Eventtable extends Component {
  componentDidMount() {
    console.log(this.props.data)
  }
  render() {
    const options = {

      page: 1,  // which page you want to show as default
      sizePerPageList: [{
        text: '5', value: 5
      }, {
        text: '10', value: 10
      }, {
        text: 'All', value: this.props.data.length
      }], // you can change the dropdown list for size per page
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
      <div className="Eventtablestyle">
        <BootstrapTable data={this.props.data} trClassName='formatdatastyle' options={options} pagination={ true }>
          <TableHeaderColumn isKey dataField='problemID' width='5%' className="headerColumnFormat" >

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
          <TableHeaderColumn dataField='allegation' className="headerColumnFormat">
            ข้อหา
          </TableHeaderColumn>
          <TableHeaderColumn dataField='countProblems' width='8 %' className="headerColumnFormat">
            เตือนครั้งที่
          </TableHeaderColumn>
          <TableHeaderColumn dataField='firstName' width='7%' className="headerColumnFormat">
            ผู้แจ้ง
          </TableHeaderColumn>
          <TableHeaderColumn dataField='problemDetails' className="headerColumnFormat">
            หมายเหตุ
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default Eventtable;