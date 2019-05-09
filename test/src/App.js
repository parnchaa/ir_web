import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Navibar from './Navibar';
import Eventtable from './Eventtable';

var data = [];

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      problem: []
    }

  }
  componentDidMount() {
    fetch('http://localhost:5000/problem ')
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        myJson.forEach(e => {
          var cutDate = e.dateOfProblem.substr(0, 10)
          e.dateOfProblem = cutDate
        });
        this.setState({ problem: myJson })
        // // var temp = {day: myJson.date}
        // // data.push(temp)
        // console.log("Problem",this.state.problem)
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


export default App;


//วิธีใช้ FUnction
// fetch('wwww',function(res,data){

// })

// fetch('wwww',(res,data) => {

// })