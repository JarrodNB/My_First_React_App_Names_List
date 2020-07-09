import React, { useState, useEffect } from 'react';
import './BabyList.css';
import Baby from '../Baby/Baby';

const BabyList = props => {

  const [babyState, setBabyState] = useState({
    babies: props.babies
  });

  useEffect(()=>{
    if (babyState.babies !== props.babies){
      setBabyState({babies: props.babies});
    }
  })

  let babyJSX = <p style={{align: 'center'}}>Please add some baby names.</p>;
  if (babyState.babies && babyState.babies.length) {
    babyJSX = (
      <div>
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
    )
    
  }
  return (
    <div className="BabyList">
      <h2>List id: {props.publicId}</h2>
      {babyJSX}
    </div>
  );

}

export default BabyList;