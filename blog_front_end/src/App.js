import React from 'react';
import './App.css';
import Main from './containers/main'
import BlogDetail from './containers/blog-details'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Provider} from 'react-redux';
import {store} from './store'
import {USER_LOGIN} from './store/actions/types'

import Profile from './containers/profile'

if(localStorage.getItem('access_token')) {
  console.log("TUT!!!!")
  store.dispatch({
    type: USER_LOGIN,
    payload: localStorage.getItem('access_token')
  })
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Route path="/" exact component={Main}/>
          <Route path="/blog/:id" component={BlogDetail}/>
          <Route path="/profile" component={Profile}/>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
