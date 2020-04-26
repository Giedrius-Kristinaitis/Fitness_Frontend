import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux';
import { mainReducer } from "./reducer";
import { initialState } from "./state";

import React from 'react';
import middlewareThunk from 'redux-thunk';

import './App.css';

// @ts-ignore
const store = createStore(mainReducer, initialState, applyMiddleware(middlewareThunk));

const App = () => (
    <Provider store={store}>
        <Router>
            <Route path="/" component={undefined}/>
        </Router>
    </Provider>
);

export default App;
