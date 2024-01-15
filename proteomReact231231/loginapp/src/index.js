
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'mdb-react-ui-kit/dist/css/mdb.min.css'
//import { createStore, applyMiddleware } from "redux";
//import { Provider } from "react-redux";
//import thunk from "redux-thunk";
//import { logger } from "redux-logger";
//import reducer from "./components/Board/reducers/index";
//const store = createStore(reducer, applyMiddleware(thunk, logger));
ReactDOM.render(

    <BrowserRouter>

      <App />

    </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

/*

ReactDOM.render(

    <BrowserRouter>
      <Provider store={store}>

      <App />
      </Provider>,

    </BrowserRouter>,
  document.getElementById('root')
);*/