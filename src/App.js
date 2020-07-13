import React, { Component } from 'react';
import './App.css';
import BabyList from './containers/BabyList/BabyList';
import axios from 'axios';
import { withRouter } from "react-router";
import {connect} from 'react-redux';
import * as aType from './store/actions';
import Cable from 'actioncable';

class App extends Component {

  state = {
    newBabyName: "",
    errorMessage: null
  }

  componentWillUnmount(){
    this.cable.subscriptions.remove(this.subscription);
  }

  subscribe = () => {
    this.cable = Cable.createConsumer(`wss://frozen-gorge-38819.herokuapp.com/cable`);
    this.subscription = this.cable.subscriptions.create({
      channel: "BabiesChannel",
      room: this.props.list_id
    }, {
      connected: () => {console.log('WS connected')},
      disconnected: () => {console.log('WS disconnected')},
      received: data => {
        if (data.type === 'new_baby') this.props.onAddBaby(data.baby);
        if (data.type === 'cross_baby') this.props.onBabyCross(data.baby.id, data.baby.crossed_out);
      },
      createBaby: function(newBaby){
        this.perform("create_baby", {baby: newBaby});
      },
      crossBaby: function(baby){
        this.perform("cross_baby", {baby: baby});
      }
    })
  }

  componentDidMount() {
    let queryId = new URLSearchParams(this.props.location.search).get("list_id");
    if (queryId){
      axios.get('/lists/' + queryId)
      .then(response => {
        this.props.onCreateList(response.data.id, response.data.public_id, response.data.babies);
        this.subscribe();
     })
      .catch(error => {
        console.log(error);
      });
    } else { // Returns new list
      axios.get('/lists')
      .then(response => {
        this.props.onCreateList(response.data.id, response.data.public_id, response.data.babies);
        this.props.history.push(`?list_id=${this.props.public_id}`);
        this.subscribe();
    })
      .catch(error => {
        console.log(error);
      });
    }
  }

  addBabyHandler = () => {
    const newBaby = {
      name: this.state.newBabyName,
      list_id: this.props.list_id
    }
    axios.post('babies', newBaby)
      .then(response => {
        this.setState({newBabyName: ""});
        this.props.onAddBaby(response.data);
        this.subscription.createBaby(newBaby); // Notifies Action Cable
      })
      .catch(error => {
        if (error.response) this.setState({errorMessage: error.response.data.name[0]});
        else {console.log(error)}
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
        <br></br>
        <button
          className="sorters" 
          onClick={() => this.props.onOrderBabies('name')}>
          Sort by Name
        </button>
        <button 
          className="sorters"
          onClick={() => this.props.onOrderBabies('time')}>
          Sort by Time
        </button>
        <button 
          className="sorters"
          onClick={() => this.props.onOrderBabies('length')}>
          Sort by Length
        </button>
        {error}
        <BabyList 
          publicId={this.props.public_id}
          crossBaby={(baby)=>this.subscription.crossBaby(baby)}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    list_id: state.list_id,
    public_id: state.public_id,
    babies: state.babies
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddBaby: (newBaby) => dispatch({type: aType.ADD_BABY, baby: newBaby}),
    onCreateList: (list_id, public_id, babies) => dispatch({
      type: aType.CREATE_LIST, 
      list_id: list_id,
      public_id: public_id,
      babies: babies
    }),
    onOrderBabies: (sortOrder) => dispatch({type: aType.ORDER_BABIES, sortOrder: sortOrder}),
    onBabyCross: (id, crossed_out) => dispatch({type: aType.CROSS_BABY, id: id, crossed_out: crossed_out})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
