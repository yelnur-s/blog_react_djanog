import React, {useState} from 'react';
import './counter.css';

function Counter() {
  const [count, setCount] = useState(0)

  const minusClicked = () => {
    setCount(count - 1)
  } 
  
  const plusClicked = () => {
    setCount(count + 1)
  }



  return (
    <div className="counter">
        <button onClick={minusClicked}> - </button> <span> {count} </span> <button onClick={plusClicked}> +</button>
    </div>
  );
}

export default Counter;
