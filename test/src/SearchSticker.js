import React, { Component } from "react";
import Header from "./Header";
import Navibar from "./Navibar";
import "./SearchSticker.css";
import Modal from "react-responsive-modal";

class SearchSticker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carOwner: [],
      openEdit: false,
      
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

  carOwnerTable() {
    return this.state.carOwner.map(carOwner => {
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
            className='editCarowner'
            open={this.state.openEdit}
            onClose={this.onCloseEditModal}
            center
          >
            <h2>Edit CarOwner </h2>
            <form>
              <div className='editModal'>
                <p>FirstName: </p>
                <input
                  type="text"
                  name="carOwnerFirstName"
                  onChange={event => this.handleChange(event)}
                  value={this.state.carOwnerFirstName}
                />
              </div>
              <div className='editModal'>
                <p>LastName: </p>
                <input
                  type="text"
                  name="carOwnerLastName"
                  onChange={event => this.handleChange(event)}
                  value={this.state.carOwnerLastName}
                />
              </div>
              <div className='editModal'>
                <p>Email: </p>
                <input
                  type="text"
                  name="carOwnerEmail"
                  onChange={event => this.handleChange(event)}
                  value={this.state.carOwnerEmail}
                />
              </div>
              <div className='editModal'>
                <p>Phone number: </p>
                <input
                  type="text"
                  name="carOwnerTel"
                  onChange={event => this.handleChange(event)}
                  value={this.state.carOwnerTel}
                />
              </div>
              <div className='editModal'>
                <p>Address: </p>
                <input
                  type="text"
                  name="carOwnerAddress"
                  onChange={event => this.handleChange(event)}
                  value={this.state.carOwnerAddress}
                />
              </div>
            </form>
            <button className='buttonUpdate' onClick={event => this.handleEditCarOwner(event)}>
              Update
            </button>
            <button className='buttonCancel' onClick={this.onCloseEditModal}>Cancel</button>
          </Modal>

          <div className='carOwnerTask'>
              <div className='carOwnerName'>
                <div className='fieldName'>ชื่อ: </div>
                <div>{carOwnerFirstName}</div>
                <div className='fieldName'>นามสกุล: </div>
                <div>{carOwnerLastName}</div>
              </div>
              <div className='carOwnerEmailTel'>
                <div className='fieldName'>อีเมล: </div>
                <div>{carOwnerEmail}</div>
                <div className='fieldName'>เบอร์โทรศัพท์: </div>
                <div>{carOwnerTel}</div>
              </div>
              <div className='carOwnerAddress'>
                <div className='fieldName'>ที่อยู่: </div>
                <div>{carOwnerAddress}</div>
              </div>
              <div className='carOwnerDate'>
                <div className='fieldName'>วันที่ต่อสัญญา: </div>
                <div>{registerDate.substr(0,10)}</div>
                <div className='fieldName'>วันหมดอายุ: </div>
                <div>{expiredDate.substr(0,10)}</div>
              </div>
              <button
                className="EditModalButton"
                onClick={this.onOpenEditModal(carOwnerID)}
              >
                Edit
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
        <table className="table">
          <tbody>{this.carOwnerTable()}</tbody>
        </table>
      </div>
    );
  }
}

export default SearchSticker;
