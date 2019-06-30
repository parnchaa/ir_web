import React, { Component } from 'react';
import Header from './Header';
import Navibar from './Navibar';
import './Staff.css'

var staffdata = [];
var sgdata = [];

class Staff extends Component {

    constructor(props) {
        super(props)
        this.state = {
            staff: [],
            securityguard: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/staff')
            .then((response) => {
                return response.json();
            })
            .then((staff) => {
                this.setState({ staff })
                console.log("staff1", this.state.staff)
            });
        fetch('http://localhost:5000/securityguard')
            .then((response) => {
                return response.json();
            })
            .then((securityguard) => {
                this.setState({ securityguard })
                console.log("securityguard", this.state.securityguard)
            });
    }

    staffTable() {
        return this.state.staff.map((staff) => {
            const { firstName, lastName, staffEmail, staffTel } = staff
            return (
                <tr>
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>{staffEmail}</td>
                    <td>{staffTel}</td>
                </tr>
            )
        }
        )
    }

    securityguardTable() {
        return this.state.securityguard.map((securityguard) => {
            const { firstName, lastName, staffEmail, staffTel } = securityguard
            return (
                <tr>
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>{staffEmail}</td>
                    <td>{staffTel}</td>
                </tr>
            )
        }
        )
    }


    render() {

        return (
            <div>
                <Header />
                <Navibar />
                <h2>Admin</h2>
                <table >
                    <tbody className='staffTable'>
                        {this.staffTable()}
                    </tbody>
                </table>
                <h2>securityguard</h2>
                <table >
                    <tbody className='staffTable'>
                        {this.securityguardTable()}
                    </tbody>
                </table>
            </div>

        );

    }

}

export default Staff;