import React, { Component } from 'react';
import Header from './Header';
import Navibar from './Navibar';
import './Rule.css'

var ruledata = [];

class Rule extends Component {

    constructor(props) {
        super(props)
        this.state = {
            rule: []
        }
    }
    componentDidMount() {
        fetch('http://localhost:5000/rule')
            .then((response) => {
                return response.json();
            })
            .then((rule) => {
                this.setState({ rule})
                console.log("rule", this.state.rule)
            });
    }

    ruleTable() {
        return this.state.rule.map((rule) => {
            const { ruleName, price, maxWarning, ruleDetails } = rule
            return (
                <tr>
                    <td>{ruleName}</td>
                    <td>{price}</td>
                    <td>{maxWarning}</td>
                    <td>{ruleDetails}</td>
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