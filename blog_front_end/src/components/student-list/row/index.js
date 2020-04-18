import React from 'react';
import './row.css';
import Cell from '../cell'
function Row(props) {
  return (
    <div className="row">
       <Cell value={props.item.id}/>
       <Cell value={props.item.name}/>
       <Cell value={props.item.age}/>
    </div>
  );
}

export default Row;
