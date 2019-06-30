import React, { Component } from 'react';
import Header from './Header';
import Navibar from './Navibar';
import './Staff.css'
import Modal from 'react-responsive-modal';

var staffdata = [];
var sgdata = [];

class Staff extends Component {

    constructor(props) {
        super(props)
        this.state = {
            staff: [],
            securityguard: [],
            firstName: '',
            lastName: '',
            staffEmail: '',
            staffTel: '',
            openAdd: false,
            openAddSecurityguard: false
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

    onOpenAddModal = () => {
        this.setState({ openAdd: true });
    };

    onCloseAddModal = () => {
        this.setState({ openAdd: false });
    };

    onOpenAddSecurityguardModal = () => {
        this.setState({ openAddSecurityguard: true });
    };

    onCloseAddSecurityguardModal = () => {
        this.setState({ openAddSecurityguard: false });
    };

    handleChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value

        })
        console.log("rr",event.target.name);
        console.log("rr",event.target.value);
    }

    handleSubmitAdmin = (event) => {
        event.preventDefault();
        this.onAfterInsertAdmin();
        this.setState({
            firstName: '',
            lastName: '',
            staffEmail: '',
            staffTel: '',
            openAdd:false
        })
    }

    onAfterInsertAdmin = () => {
        const url = 'http://localhost:5000/addstaff';
        const bodyData = JSON.stringify({
            firstName: this.state.firstName,
            lastName:this.state.lastName,
            staffEmail:this.state.staffEmail,
            staffTel:this.state.staffTel
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

    validateAdmin =()=>{
        
    }

    handleSubmitSecurity = (event) => {
        event.preventDefault();
        this.onAfterInsertSecurity();
        this.setState({
            firstName: '',
            lastName: '',
            staffEmail: '',
            staffTel: '',
            openAddSecurityguard:false
        })
    }
    onAfterInsertSecurity = () => {
        const url = 'http://localhost:5000/addsecurityguard';
        const bodyData = JSON.stringify({           
            firstName: this.state.firstName,
            lastName:this.state.lastName,
            staffEmail:this.state.staffEmail,
            staffTel:this.state.staffTel
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
                <button className='addStaff' onClick={this.onOpenAddModal}>Add Admin</button>
                <Modal open={this.state.openAdd} onClose={this.onCloseAddModal} center>
                    <h2>Add Staff</h2>
                    <form onSubmit={this.handleSubmitAdmin}>
                        <label htmlFor="firstName">FirstName: </label >
                        <input type="text" name='firstName' onChange={event => this.handleChange(event)} value={this.state.firstName} />
                        <label htmlFor="lastName">LastName: </label>
                        <input type="text" name='lastName' onChange={event => this.handleChange(event)} value={this.state.lastName} />
                        <label htmlFor="staffTel">Phone number: </label>
                        <input type="text" name='staffTel' onChange={event => this.handleChange(event)} value={this.state.staffTel} />
                        <label htmlFor="staffEmail">Email: </label>
                        <input type="text" name='staffEmail' onChange={event => this.handleChange(event)} value={this.state.staffEmail} />
                        
                        <div></div>
                    </form>
                    <button onClick={event => this.handleSubmitAdmin(event)} type="submit">Add</button>
                    <button onClick={this.onCloseAddModal}>Cancel</button>
                </Modal>
                <table >
                    <tbody className='staffTable'>
                        {this.staffTable()}
                    </tbody>
                </table>

                <h2>securityguard</h2>
                <button className='addSecurityguard' onClick={this.onOpenAddSecurityguardModal}>AddSecurityguard </button>
                <Modal open={this.state.openAddSecurityguard} onClose={this.onCloseAddSecurityguardModal} center>
                    <h2>AddSecurityguard </h2>
                    <form>
                        <p>FirstName: </p>
                        <input type="text" name='firstName' onChange={event => this.handleChange(event)} value={this.state.firstName}/>
                        <p>LastName: </p>
                        <input type="text" name='lastName' onChange={event => this.handleChange(event)} value={this.state.lastName}/>
                        <p>Email: </p>
                        <input type="text" name='staffTel' onChange={event => this.handleChange(event)} value={this.state.staffTel}/>
                        <p>Phone number: </p>
                        <input type="text" name='staffEmail' onChange={event => this.handleChange(event)} value={this.state.staffEmail}/>
                        <div></div>
                    </form>
                    <button onClick={event => this.handleSubmitSecurity(event)}>Add</button>
                    <button onClick={this.onCloseAddSecurityguardModal}>Cancel</button>
                </Modal>
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