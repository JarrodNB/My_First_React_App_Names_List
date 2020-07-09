import React, { Component } from 'react';
import './App.css';
import BabyList from './BabyList/BabyList';
import axios from 'axios';

class App extends Component {

  state = {
    publicId: null,
    babies: null,
    newBabyName: ""
  }

  componentDidMount() {
    axios.get('/lists')
      .then(response => {
        this.setState({
          id: response.data.id,
          publicId: response.data.public_id,
          babies: response.data.babies
        });
    })
      .catch(response => {
        //to do
      });
  }

  addBabyHandler = (event) => {
    const newBaby = {
      name: this.state.newBabyName,
      list_id: this.state.id
    }
    axios.post('babies', newBaby)
      .then(response => {
        this.setState({newBabyName: ""});
        this.updateCurrentList();
      })
      .catch(error => {
        //to do
        console.log(error.response.data.name[0]);
      });
  }

  updateCurrentList = () => {
    axios.get('/lists/' + this.state.id)
      .then(response => {
        this.setState({
          id: response.data.id,
          publicId: response.data.public_id,
          babies: response.data.babies
        });
     })
      .catch(response => {
        //to do
      });
  }

  babyNameHandler = (event) => {
    this.setState({newBabyName: event.target.value});
  }

  render() {
    return (
      <div className="App">
        <h1>Jarrod's Baby Name List</h1>
        <input 
          type="text" 
          onChange={this.babyNameHandler}
          value={this.state.newBabyName}
        />
        <button 
          onClick={this.addBabyHandler}>
          Submit Baby Name
        </button>
        <BabyList 
          publicId={this.state.publicId} 
          babies={this.state.babies}
        />
      </div>
    );
  }
}

export default App;
