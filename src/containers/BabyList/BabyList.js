import React, { Component } from 'react';
import './BabyList.css';
import Baby from '../../components/Baby/Baby';
import axios from 'axios';
import {connect} from 'react-redux';
import * as aType from '../../store/actions';

class BabyList extends Component{

  babyClickHandler = (event, id) => {
    const babyIndex = this.props.babies.findIndex(b => {
      return b.id === id;
    });
    const baby = {...this.props.babies[babyIndex]};
    baby.crossed_out = !baby.crossed_out;

    axios.patch('babies/' + id, baby)
      .then(response =>{
        this.props.onBabyCross(baby.id, baby.crossed_out);
        this.props.crossBaby(baby); // Notifies Action Cable of change
      })
      .catch(error => {
        console.log(error);
    });
  }
  render() {
    let babyJSX = <p style={{align: 'center'}}>Please add some baby names.</p>;
    if (this.props.babies && this.props.babies.length) {
      babyJSX = (
        <div>
          {
            this.props.babies.map(baby => {
              return (
                <Baby 
                  key={baby.id} 
                  name={baby.name}
                  crossedOut={baby.crossed_out}
                  clicked={(event) => this.babyClickHandler(event, baby.id)}>
                </Baby>
              )
            })
          }  
        </div>
      )
    }
    return (
      <div className="BabyList">
        <h2>List Id: {this.props.publicId}</h2>
        {babyJSX}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    babies: state.babies
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onBabyCross: (id, crossed_out) => dispatch({type: aType.CROSS_BABY, id: id, crossed_out: crossed_out})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BabyList);