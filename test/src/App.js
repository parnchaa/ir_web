import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Navibar from './Navibar';

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
      .then((problem) => {
        this.setState({ problem })
        console.log("ttt", this.state.problem)
        console.log("ttt", this.state.problem.map)

      });
  }

  problemTable() {
    return this.state.problem.map((pro) => {
      const { problemID, dateOfProblem, timeOfProblem, scene, licensePlate, allegation, firstName, problemDetails } = pro
      return (
        <tr key={problemID}>
          <td>{problemID}</td>
          <td>{dateOfProblem}</td>
          <td>{timeOfProblem}</td>
          <td>{scene}</td>
          <td>{licensePlate}</td>
          <td>{allegation}</td>
          <td>{firstName}</td>
          <td>{problemDetails}</td>

        </tr>
      )
    }

    )
  }


  render() {
    return (
      <div className="App">

        <Header />
        <Navibar />
        <p className="Table-header">เหตุการณ์</p>

        {
          this.state.problem.length > 0 ?
            <table >
              <tbody className='pro'>
                {this.problemTable()}
              </tbody>
            </table> :
            <h1>เปิดเซิฟดิ้...</h1>
        }

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