import React from 'react';
import './App.css';
import Main from './containers/main'
import BlogDetail from './containers/blog-details'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import {Provider} from 'react-redux';
import {store} from './store'


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Route path="/" exact component={Main}/>
          <Route path="/blog/id" component={BlogDetail}/>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
