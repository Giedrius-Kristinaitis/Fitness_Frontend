import { Provider } from 'react-redux'
import { Router, Route } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux';
import { mainReducer } from "./reducer";
import React from 'react';
import middlewareThunk from 'redux-thunk';
import './App.css';
import CompetitionList from "./component/competition/competitionList";
import { history } from './customHistory';
import CreateCompetitionForm from "./component/competition/createCompetitionForm";
import CompetitionDetailsForm from "./component/competition/updateCompetitionForm";

// @ts-ignore
const store = createStore(mainReducer, applyMiddleware(middlewareThunk));

const App = () => (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/competition/all" component={CompetitionList}/>
            <Route path="/competition/create" component={CreateCompetitionForm}/>
            <Route path="/competition/view/:id" component={CompetitionDetailsForm}/>
        </Router>
    </Provider>
);

export default App;
