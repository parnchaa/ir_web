import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Navibar from './Navibar';
import Rule from './Rule';
import { Container, Row, Col } from 'react-grid-system';
        


class App extends Component {

  render() {

    return (
      <div>
        
        <Header />
        <Navibar />
      </div>
    );
  }
}


export default App;
