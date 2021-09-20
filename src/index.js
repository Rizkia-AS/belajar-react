import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {StoreProvider} from "easy-peasy"
import store from "./store.js"

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <Router>
        {/* saat URL berada pada root maka akan merender App component */}
        <Route path="/" component={App}/>
      </Router>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);