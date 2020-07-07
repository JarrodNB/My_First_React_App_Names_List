import React from 'react';
import './Baby.css';

const Baby = (props) => {

  return (
    <div className="Baby">
      <h5>{props.name}</h5>
    </div>
  );

}

export default Baby;