import React, { Component } from 'react';
import './index.css';
import Board from './Board'
class App extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>MINE SWEEPER</h1>
        </header>
        <Board /> 
      </div>
    );
  }
}

export default App;
