import React, { Component } from 'react';
import Header from './Header';
import Navibar from './Navibar';
import './Area.css'

class Area extends Component {

    state =
        {
            locationID: '',
            locationName: '',
            locationCode: ''
        }

    handleChange = (event) => {
        event.preventDefault();
        console.log(event.target.name);
        console.log(event.target.value);
        this.setState({
            [event.target.name]: event.target.value

        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.onAfterInsertRow();
        this.setState({
            locationID: '',
            locationName: '',
            locationCode: ''
        })
    }

    onAfterInsertRow = () => {
        const url = 'http://54.169.164.58:5000/addlocation';
        const bodyData = JSON.stringify({
            locationID: this.state.locationID,
            locationName: this.state.locationName,
            locationCode: this.state.locationCode
        });
        console.log(bodyData)
        const othepram = {
            headers: {
                "content-type": "application/json; charset=UTF-8"
            },
            body: bodyData,
            method: "POST"
        };
        fetch(url, othepram)
            .then(data => console.log(data))
    }
    render() {
        const options = {
            afterInsertRow: this.onAfterInsertRow
        };

        return (
            <div>
                <Header />
                <Navibar />
                <div className="wrapper">
                    <div className="form-wrapper">
                        <form onSubmit={this.handlesubmit} Validate options={options}>
                            <h1>เพิ่มพื้นที่</h1>
                            <div className="locationID">
                                <label htmlFor="locationID">หมายเลขพื้นที่: </label>
                            </div>
                            <input type="text" placeholder="หมายเลขพื้นที่" name='locationID' onChange={event => this.handleChange(event)} value={this.state.locationID} />
                            <div className="locationName">
                                <label htmlFor="locationName">พื้นที่: </label>
                            </div>
                            <input type="text" placeholder="พื้นที่" name='locationName' onChange={event => this.handleChange(event)} value={this.state.locationName}/>
                            <div className="locationCode">
                                <label htmlFor="locationCode">โค้ด: </label>
                            </div>
                            <input type="text" placeholder="โค้ด" name='locationCode' onChange={event => this.handleChange(event)} value={this.state.locationCode}/>
                            <div className="addarea">
                                <button onClick={event => this.handleSubmit(event)} type="submit">เพิ่มพื้นที่</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        );
    }
}
export default Area;