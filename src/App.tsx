import {Provider} from 'react-redux'
import {Route, Router} from 'react-router-dom'
import {applyMiddleware, createStore} from 'redux';
import {mainReducer} from "./reducer";
import React from 'react';
import middlewareThunk from 'redux-thunk';
import './App.css';
import CompetitionList from "./component/competition/competitionList";
import {history} from './customHistory';
import CreateCompetitionForm from "./component/competition/createCompetitionForm";
import CompetitionDetailsForm from "./component/competition/updateCompetitionForm";
import SportProgramList from "./component/sportprogram/sportProgramList";
import {composeWithDevTools} from 'redux-devtools-extension';
import ViewSportProgram from "./component/sportprogram/viewSportProgram";
import CreateSportProgram from "./component/sportprogram/createSportProgram";
import CoachesListView from "./component/coaches/coachesListView";
import CoachList from "./component/coaches/coachList";

const store = createStore(mainReducer, composeWithDevTools(applyMiddleware(middlewareThunk)));

const App = () => (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/competition/all" component={CompetitionList}/>
            <Route path="/competition/create" component={CreateCompetitionForm}/>
            <Route path="/competition/view/:id" component={CompetitionDetailsForm}/>

            <Route path="/sportprograms/all" component={SportProgramList}/>
            <Route path="/sportprograms/create" component={CreateSportProgram}/>
            <Route path="/sportprograms/view/:id" component={ViewSportProgram}/>

            <Route path="/coaches/search" component={CoachesListView}/>
            <Route path="/coaches/recommended" component={CoachList}/>
        </Router>
    </Provider>
);

export default App;
