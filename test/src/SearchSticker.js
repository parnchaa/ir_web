import React,{Component} from 'react';
import Header from './Header';
import Navibar from './Navibar';
import './SearchSticker.css'
import Modal from 'react-responsive-modal';


class SearchSticker extends Component{
    constructor(props) {
        super(props)
        this.state = {
            carOwner:[],
            openEdit: false
        }
    }
    componentDidMount() {
        fetch('http://localhost:5000/carOwner')
            .then((response) => {
                return response.json();
            })
            .then((carOwner) => {
                this.setState({ carOwner })
                console.log("carOwner", this.state.carOwner)
            });
    }

    onOpenEditModal = (ruleID) => (e) => {
      this.setState({
          openEdit: true,
          openRuleID: ruleID
      });
    };

    carOwnerTable() {
        return this.state.carOwner.map((carOwner) => {
            const { carOwnerFirstName, carOwnerLastName, carOwnerTel, carOwnerEmail, carOwnerAddress } = carOwner
            return (
                <div>
                <Modal  open={this.state.openAddSecurityguard} onClose={this.onCloseAddSecurityguardModal} center>
                    <h2>AddSecurityguard </h2>
                    <form>l
                        <p>FirstName: </p>
                        <input type="text" name='firstName' onChange={event => this.handleChange(event)} value={this.state.firstName} />
                        <p>LastName: </p>
                        <input type="text" name='lastName' onChange={event => this.handleChange(event)} value={this.state.lastName} />
                        <p>Email: </p>
                        <input type="text" name='staffTel' onChange={event => this.handleChange(event)} value={this.state.staffTel} />
                        <p>Phone number: </p>
                        <input type="text" name='staffEmail' onChange={event => this.handleChange(event)} value={this.state.staffEmail} />
                        <div></div>
                    </form>
                    <button onClick={event => this.handleSubmitSecurity(event)}>Add</button>
                    <button onClick={this.onCloseAddSecurityguardModal}>Cancel</button>
                </Modal>
                <tr>
                    <td>{carOwnerFirstName}</td>
                    <td>{carOwnerLastName}</td>
                    <td>{carOwnerTel}</td>
                    <td>{carOwnerEmail}</td>
                    <td>{carOwnerAddress}</td>
                    <td><button className='EditModalButton' onClick={this.onOpenEditModal(carOwner)}>Edit</button></td>
                </tr>
                </div>
            )
        }
        )
    }


    render() {

     return(
         <div>
            <Header/>
            <Navibar/>
            <table className='table'>
                    <tbody>
                        {this.carOwnerTable()}
                    </tbody>
            </table>


         </div>

     );

    } 

}

export default SearchSticker;