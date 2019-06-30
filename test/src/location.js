import React, { Component } from 'react';
import Header from './Header';
import Navibar from './Navibar';
import './Area.css'
import LT from './LocationTable'

var locationdata = [];

class Location extends Component {

    state =
        {
            
            locationName: '',
            locationCode: '',
            location1:[]
        }


    componentDidMount(){
        fetch('http://54.169.164.58:5000/location')
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                // console.log(myJson)
                this.setState({ location1: myJson })
                console.log("location1", this.state.location1)
            });
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
           
            locationName: '',
            locationCode: ''
        })
    }

    onAfterInsertRow = () => {
        const url = 'http://localhost:5000/addlocation';
        const bodyData = JSON.stringify({
            
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
                        <form onSubmit={this.handlesubmit}  options={options}>
                            <h1>เพิ่มพื้นที่</h1>
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
                <LT locationdata={this.state.location1}/>
                
            </div >
        );
    }
}
export default Location;