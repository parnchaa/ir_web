import React, { Component } from 'react';
import Header from './Header';
import Navibar from './Navibar';
import './Table.css'
import Stafftable from './Stafftable';
import Securityguardtable from './Securityguardtable';

var staffdata = [];
var sgdata = [];

class Staff extends Component {

    constructor(props) {
        super(props)
        this.state = {
            staff1: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/staff')
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                this.setState({ staff1: myJson })
                console.log("staff1", this.state.staff1)
            });
        fetch('http://localhost:5000/securityguard')
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                this.setState({ securityguard: myJson })
                console.log("securityguard", this.state.securityguard)
            });
    }
    render() {

        return (
            <div>
                <Header />
                <Navibar />
                <h2>Administrator</h2>
                <Stafftable staffdata={this.state.staff1} />
                <h2>Securityguard</h2>
                <Securityguardtable sgdata={this.state.securityguard}></Securityguardtable>



            </div>

        );

    }

}

export default Staff;