import React, { Component } from "react";
import Header from "./Header";
import Navibar from "./Navibar";
import "./SearchSticker.css";
import Modal from "react-responsive-modal";
import search from "./picture/search.png";


class SearchSticker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carOwner: [],
      searchCarOwner:[],
      choosedData:[],
      openEdit: false,
      searchValue:""
    };
  }

  getData() {
    fetch("http://localhost:5000/carOwner")
      .then(response => {
        return response.json();
      })
      .then(carOwner => {
        this.setState({ carOwner });
        console.log(carOwner,'cc')
      });
  }

  getSearchValue(){
    fetch("http://localhost:5000/getSearchValue/" + this.state.searchValue) 
      .then((response) => {
        return response.json();
      })
      .then((responseJson) =>{
        this.setState({searchCarOwner: responseJson})
      })
  }

  handleChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value

    })
    console.log("rr", event.target.name);
    console.log("rr", event.target.value);
}

  handleEditCarOwner = event => {
    this.onAfterEditCarOwner();
    this.onCloseEditModal();
  };

  onAfterEditCarOwner = () => {
    const {openCarOwnerID,carOwnerFirstName,carOwnerLastName,carOwnerEmail,carOwnerTel,carOwnerAddress} = this.state
    const url = 'http://localhost:5000/editCarOwner';
    const bodyData = JSON.stringify({
      carOwnerID: openCarOwnerID,
      carOwnerFirstName: carOwnerFirstName,
      carOwnerLastName: carOwnerLastName,
      carOwnerEmail: carOwnerEmail,
      carOwnerTel: carOwnerTel,
      carOwnerAddress:carOwnerAddress
    });
    console.log(bodyData,'bodyData')
    const othepram = {
        headers: {
            "content-type": "application/json; charset=UTF-8"
        },
        body: bodyData,
        method: "POST"
    };
    fetch(url, othepram)
        .then(data => console.log(data))
        .then(response => {
          this.getData();
        })
        .catch(error => {});
}

  onOpenEditModal = carOwnerID => e => {
    const eachCarOwnerID = this.state.carOwner.find(Id=>{
      return Id.carOwnerID === carOwnerID
    })
    this.setState({
      openEdit: true,
      openCarOwnerID: carOwnerID,
      carOwnerFirstName: eachCarOwnerID.carOwnerFirstName,
      carOwnerLastName: eachCarOwnerID.carOwnerLastName,
      carOwnerEmail: eachCarOwnerID.carOwnerEmail,
      carOwnerTel: eachCarOwnerID.carOwnerTel,
      carOwnerAddress: eachCarOwnerID.carOwnerAddress
    });
  };

  onCloseEditModal = () => {
    this.setState({ openEdit: false });
  };

  componentWillMount(){
   this.getData() 
  }

  // componentDidUpdate(prevState){
  //   if(prevState.searchValue !== ""){
  //     // this.filterSticker()
  //   }
  // }

  onKeyPress = (event) => {
    if(event.key === 'Enter'){
      console.log('Adding....') 
      this.getSearchValue()
      // this.carOwnerTable() 
    }
  } 

  filterSticker = (event) => {
    this.setState({
      searchValue: event.target.value
    })
    console.log(this.state.searchValue,'kkk')
  }

  carOwnerTable() {
    // if(this.state.searchValue !== ""){
    //       this.setState({
    //         choosedData: this.state.searchCarOwner
    //       })
    //     }
    //     if(this.state.searchValue === ""){
    //       this.getData()
    //       this.setState({
    //         choosedData: this.state.carOwner
    //       })
    //     }
    let tableData = ""
    if(this.state.searchValue === ""){
      tableData = this.state.carOwner
    }
    if(this.state.searchValue !== ""){
      tableData = this.state.searchCarOwner
    }
    return tableData.map(carOwner => {
      const {
        carOwnerID,
        carOwnerFirstName,
        carOwnerLastName,
        carOwnerTel,
        carOwnerEmail,
        carOwnerAddress,
        registerDate,
        expiredDate
      } = carOwner;
      return (
        <div>
          <Modal
            classNames='ModalEditSicker'
            open={this.state.openEdit}
            onClose={this.onCloseEditModal}
            center
          >
            <h2 className='titleEdit'>แก้ไขข้อมูลเจ้าของรถ</h2>
           <form className='formAddEdit'>
              <div className='editModal'>
                <p>ชื่อ : </p>
                <input
                  type="text"
                  name="carOwnerFirstName"
                  onChange={event => this.handleChange(event)}
                  value={this.state.carOwnerFirstName}
                />
              </div>
          
              <div className='editModal'>
                <p>นามสกุล : </p>
                <input
                  type="text"
                  name="carOwnerLastName"
                  onChange={event => this.handleChange(event)}
                  value={this.state.carOwnerLastName}
                />
              </div>

              <div className='editModal'>
                <p>อีเมล์ : </p>
                <input
                  type="text"
                  name="carOwnerEmail"
                  onChange={event => this.handleChange(event)}
                  value={this.state.carOwnerEmail}
                />
              </div>

              <div className='editModal'>
                <p>เบอร์โทรศัพท์ : </p>
                <input
                  type="text"
                  name="carOwnerTel"
                  onChange={event => this.handleChange(event)}
                  value={this.state.carOwnerTel}
                />
              </div>

              <div className='editModal'>
                <p>ที่อยู่ : </p>
                <input
                  type="text"
                  name="carOwnerAddress"
                  onChange={event => this.handleChange(event)}
                  value={this.state.carOwnerAddress}
                />
              </div>

            </form>
            <button className='buttonUpdate' onClick={event => this.handleEditCarOwner(event)}>
              แก้ไข
            </button>
            <button className='buttonCancel' onClick={this.onCloseEditModal}>ยกเลิก</button>
          </Modal>
          <div className='carOwnerTask'>
              <div className='carOwnerName'>
                <div >ชื่อ : </div>
                <div className='fieldName'>{carOwnerFirstName}</div>
                <div >นามสกุล : </div>
                <div className='fieldName'>{carOwnerLastName}</div>
              </div>
              <div className='carOwnerEmailTel'>
                <div >อีเมล์ : </div>
                <div className='fieldName'>{carOwnerEmail}</div>
                <div >เบอร์โทรศัพท์ : </div>
                <div className='fieldName'>{carOwnerTel}</div>
              </div>
              <div className='carOwnerAddress'>
                <div>ที่อยู่ : </div>
                <div className='fieldName'>{carOwnerAddress}</div>
              </div>
              <div className='carOwnerDate'>
                <div >วันที่ต่อสัญญา : </div>
                <div className='fieldName'>{registerDate.substr(0,10)}</div>
                <div >วันหมดอายุ : </div>
                <div className='fieldName'>{expiredDate.substr(0,10)}</div>
              </div>
              <button
                className="EditModalButton"
                onClick={this.onOpenEditModal(carOwnerID)}
              >
                แก้ไขข้อมูล
              </button>
          </div>
          
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <Header />
        <Navibar />
        <div>
          <input className="InputSearch"
           placeholder="ค้นหาชื่อ,นามสกุล"
            name="searchValue"
            value={this.state.searchValue}
            onChange={event => this.filterSticker(event)}
            onKeyPress= {event=> this.onKeyPress(event)}
            />
            <img src={search} className="search" />
</div>

          <h2 className="Table-header">ข้อมูลผู้ขอสติกเกอร์</h2>
        <table className="table">
          <tbody>{this.carOwnerTable()}</tbody>
        </table>
        
      </div>
    );
  }
}

export default SearchSticker;
