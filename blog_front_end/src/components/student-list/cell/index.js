import React from 'react';
import './cell.css';

function Cell(props) {
  return (
    <div className="cell">
       {props.value}
    </div>
  );
}

export default Cell;
