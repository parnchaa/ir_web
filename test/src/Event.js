import React, { Component } from 'react';
import Header from './Header';
import Navibar from './Navibar';
import './Event.css'

import Eventtable from './Eventtable';

var data = [];

class Event extends Component {

    constructor(props){
        super(props)
        this.state={
            problem:[]
        }
    
    }

    componentDidMount() {
        fetch('http://localhost:5000/problem ')
            .then( (response) =>  {
                return response.json();
            })
            .then((myJson) => {
                this.setState({problem:myJson})
                // var temp = {day: myJson.date}
                // data.push(temp)
                console.log("Problem",this.state.problem)
            });
    }

    render() {

        return (
            <div className="App">
                <Header />
                <Navibar />
                <p className="Table-header">เหตุการณ์</p>
                <Eventtable data={this.state.problem} />



            </div>

        );

    }

}

export default Event;



//วิธีใช้ FUnction
// fetch('wwww',function(res,data){

// })

// fetch('wwww',(res,data) => {

// })