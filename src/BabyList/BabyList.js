import React, { useState } from 'react';
import './BabyList.css';
import Baby from '../Baby/Baby';

const BabyList = props => {

  const [babyState, setBabyState] = useState({
    babies: [
      {id: '1', name: "John"},
      {id: '2', name: "Susan"},
      {id: '3', name: "Ashley"},
      {id: '4', name: "Jason"}
    ]
  });

  return (
    <div className="BabyList">
      <h2>List id: {props.publicId}</h2>
      {
        babyState.babies.map(baby => {
          return (
            <Baby 
              key={baby.id} 
              name={baby.name}>
            </Baby>
          )
        })
      }        
    </div>
  );

}

export default BabyList;