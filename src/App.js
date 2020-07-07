import React, { Component } from 'react';
import './App.css';
import BabyList from './BabyList/BabyList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Jarrod's Baby Name List</h1>
        <input type="text"/>
        <button>Submit Baby Name</button>
        <BabyList publicId="123test12345"/>
      </div>
    );
  }
}

export default App;
