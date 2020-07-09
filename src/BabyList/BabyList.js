import React, { useState, useEffect } from 'react';
import './BabyList.css';
import Baby from '../Baby/Baby';
import axios from 'axios';

const BabyList = props => {

  const [babyState, setBabyState] = useState({
    babies: props.babies
  });

  useEffect(()=>{
    if (babyState.babies !== props.babies){
      setBabyState({babies: props.babies});
    }
  })

  const babyClickHandler = (event, id) => {
    const babyIndex = babyState.babies.findIndex(b => {
      return b.id === id;
    });
    const baby = {...babyState.babies[babyIndex]};
    baby.crossed_out = !baby.crossed_out;

    axios.patch('babies/' + id, baby)
      .then(response =>{
        props.change();
      })
      .catch(error => {

    });

  }

  let babyJSX = <p style={{align: 'center'}}>Please add some baby names.</p>;
  if (babyState.babies && babyState.babies.length) {
    babyJSX = (
      <div>
        {
          babyState.babies.map(baby => {
            return (
              <Baby 
                key={baby.id} 
                name={baby.name}
                crossedOut={baby.crossed_out}
                clicked={(event) => babyClickHandler(event, baby.id)}>
              </Baby>
            )
          })
        }  
      </div>
    )
    
  }
  return (
    <div className="BabyList">
      <h2>List Id: {props.publicId}</h2>
      {babyJSX}
    </div>
  );

}

export default BabyList;