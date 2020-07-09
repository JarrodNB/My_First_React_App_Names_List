import React from 'react';
import './Baby.css';

const Baby = (props) => {
  let babyClasses = "Baby";
  if (props.crossedOut){
    babyClasses += " cross";
  }

  return (
    <div className={babyClasses} onClick={props.clicked}>
      <h5>{props.name}</h5>
    </div>
  );

}

export default Baby;