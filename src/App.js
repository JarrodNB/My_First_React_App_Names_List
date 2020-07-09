import React, { Component } from 'react';
import './App.css';
import BabyList from './BabyList/BabyList';
import axios from 'axios';
import { withRouter } from "react-router";

class App extends Component {

  state = {
    id: null,
    publicId: null,
    babies: null,
    newBabyName: "",
    errorMessage: null
  }

  componentDidMount() {
    let queryId = new URLSearchParams(this.props.location.search).get("list_id");
    if (queryId){
      axios.get('/lists/' + queryId)
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
    } else {
      axios.get('/lists')
      .then(response => {
        this.setState({
          id: response.data.id,
          publicId: response.data.public_id,
          babies: response.data.babies
        });
        this.props.history.push(`?list_id=${this.state.publicId}`);
    })
      .catch(response => {
        //to do
      });
    }
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
        this.setState({errorMessage: error.response.data.name[0]});
      });
  }

  updateCurrentList = () => {
    axios.get('/lists/' + this.state.publicId)
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
    this.setState({
      newBabyName: event.target.value,
      errorMessage: null
    });
  }

  render() {
    let error = null;
    if (this.state.errorMessage){
      error = <h5 style={{color: 'red'}}>{this.state.errorMessage}</h5>
    }
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
        {error}
        <BabyList 
          publicId={this.state.publicId} 
          babies={this.state.babies}
          change={this.updateCurrentList}
        />
      </div>
    );
  }
}

export default withRouter(App);
