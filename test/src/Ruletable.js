import React, { Component } from 'react';

import {
  BootstrapTable,
  TableHeaderColumn
} from 'react-bootstrap-table';
import './ruletable.css'
class Ruletable extends Component {

  createCustomInsertButton = (openModal) => {
    return (
      <button class="btn btn-outline-info" style={ {fontFamily:'kanit', width:'10%', height:'40px',fontSize:'14pt',marginLeft:'7px', marginBottom:'8px'} }
       onClick={ openModal }>เพิ่มกฎ</button>
    );
  }

  onAfterInsertRow = (Data) => {
    console.log(Data)
    const Url = 'http://54.169.164.58:5000/addrule';

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
      insertBtn: this.createCustomInsertButton,
      page: 1,  // which page you want to show as default
      sizePerPageList: [ {
        text: '5', value: 5
      }, {
        text: '10', value: 10
      }, {
        text: 'All', value: this.props.ruledata.length
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
      <div className="ruletable">
        <BootstrapTable data={this.props.ruledata} trClassName='formatdatastyle' insertRow={true} options={options} pagination={ true } >
          <TableHeaderColumn isKey dataField='ruleName'width='25%' className="headerColumnFormat" >
            กฎ
            </TableHeaderColumn>
          <TableHeaderColumn dataField='maxWarning' width='12%'className="headerColumnFormat" >
            จำนวนครั้งที่เตือน
            </TableHeaderColumn>
          <TableHeaderColumn dataField='price' width='8%'className="headerColumnFormat">
            ค่าปรับ
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