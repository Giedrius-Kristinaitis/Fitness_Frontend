import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux';
import { mainReducer } from "./reducer";
import React from 'react';
import middlewareThunk from 'redux-thunk';
import './App.css';
import CompetitionList from "./component/competition/competitionList";

// @ts-ignore
const store = createStore(mainReducer, applyMiddleware(middlewareThunk));

const App = () => (
    <Provider store={store}>
        <Router>
            <Route path="/competition/all" component={CompetitionList}/>
        </Router>
    </Provider>
);

export default App;
