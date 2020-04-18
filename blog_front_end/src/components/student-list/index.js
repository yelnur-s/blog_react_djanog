import React, {useState} from 'react';
import './table.css';
import Row from './row'

function StudentList(props) {

  console.log(props.students)
  
  const list = props.students.map(item => (<Row key={item.id} item={item}/>))

  return (
    <div className="table">
       {list}
    </div>
  );
}

export default StudentList;
