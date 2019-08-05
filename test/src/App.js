import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import Navibar from "./Navibar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problem: []
    };
  }
  componentDidMount() {
    fetch("http://localhost:5000/problem ")
      .then(response => {
        return response.json();
      })
      .then(problem => {
        this.setState({ problem });
      });
  }

  problemTable() {
    return this.state.problem.map(pro => {
      const {
        problemID,
        dateOfProblem,
        timeOfProblem,
        scene,
        licensePlate,
        allegation,
        firstName,
        problemDetails
      } = pro;
      return (
        <tr className='eventTable-Row' key={problemID}>
          <td>{problemID}</td>
          <td>{dateOfProblem.substr(0,10)}</td>
          <td>{timeOfProblem}</td>
          <td>{scene}</td>
          <td>{licensePlate}</td>
          <td>{allegation}</td>
          <td>{firstName}</td>
          <td>{problemDetails}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Navibar />
        <p className="Table-header">เหตุการณ์</p>
        {this.state.problem.length > 0 ? (
          <table className='eventTable'>{this.problemTable()}</table>
        ) : (
          <h1>เปิดเซิฟดิ้...</h1>
        )}
      </div>
    );
  }
}
export default App;
