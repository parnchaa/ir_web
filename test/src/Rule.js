import React, { Component } from 'react';
import Header from './Header';
import Navibar from './Navibar';
import './Rule.css'
import Modal from 'react-responsive-modal';
import axios from "axios";

class Rule extends Component {

    constructor(props) {
        super(props)
        this.state = {
            rule: [],
            openDelete: false
        }
    }
    componentDidMount() {
        fetch('http://localhost:5000/rule')
            .then((response) => {
                return response.json();
            })
            .then((rule) => {
                this.setState({ rule })
                console.log("rule", this.state.rule)
            });
    }

    onOpenDeleteModal = (ruleID) => (e) => {
        this.setState({
            openDelete: true,
            openRuleID: ruleID
        });
    };

    onCloseDeleteModal = () => {
        this.setState({ openDelete: false });
    };

    submitDeleteTask = () => {
        this.deleteFetch()
        this.onCloseDeleteModal()
    }

    deleteFetch = () => {
        const url = 'http://localhost:5000/deleteRule';
        const bodyData = JSON.stringify({
            ruleID: this.state.openRuleID
        });
        console.log(bodyData)
        const othepram = {
            headers: {
                "content-type": "application/json; charset=UTF-8"
            },
            body: bodyData,
            method: "POST"
        };
        console.log('aaa',othepram)
        fetch(url, othepram)
            .then(data => console.log(data))
    }

    ruleTable() {
        return (
            <div>
                <Modal className='Modal' open={this.state.openDelete} onClose={this.onCloseDeleteModal} center>
                    <h2 className='deleteTitle'>Delete!!!</h2>
                    <div>
                        <button onClick={event => { this.submitDeleteTask(this.state.openRuleId) }}>Delete</button>
                        <button onClick={this.onCloseDeleteModal}>Cancel</button>
                    </div>
                </Modal>
                {
                // const {ruleName, price, maxWarning, ruleDetails } = rule
                 this.state.rule.map((rule) => {
                return(
                    <tr>
                    <td>{rule.ruleName}</td>
                    <td>{rule.price}</td>
                    <td>{rule.maxWarning}</td>
                    <td>{rule.ruleDetails}</td>
                    <td><button className='deleteModalButton' onClick={this.onOpenDeleteModal(rule.ruleID)}>Delete</button></td>
                </tr>
                )
                })
            }
            </div>
        )
        
        
}

render() {

    return (
        <div>
            <Header />
            <Navibar />
            <table >
                <tbody className='ruleTable'>
                    {this.ruleTable()}
                </tbody>
            </table>

        </div>

    );

}

}

export default Rule;