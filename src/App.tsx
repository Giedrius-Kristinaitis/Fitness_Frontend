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
import MainPage from "./component/main/mainPage";
import ExerciseList from "./component/exercise/exerciseList";
import CreateExerciseForm from "./component/exercise/createExerciseForm";

const store = createStore(mainReducer, applyMiddleware(middlewareThunk));

const App = () => (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/competition/all" component={CompetitionList}/>
            <Route path="/competition/create" component={CreateCompetitionForm}/>
            <Route path="/competition/view/:id" component={CompetitionDetailsForm}/>
            <Route path="/index" component={MainPage}/>
            <Route path="/exercise/all" component={ExerciseList}/>
            <Route path="/exercise/create" component={CreateExerciseForm}/>
            <Route path="/exercise/view/:id" component={CompetitionDetailsForm}/>
        </Router>
    </Provider>
);

export default App;
/*
<Route path="/sportprogram/all" component={SportProgramList}/>
<Route path="/sportprogram/view/:id" component={SportProgramDetailsForm}/>
<Route path="/sportprogram/create" component={CreateSportProgramForm}/>

<Route path="/exercise/view/:id" component={ExerciseInfoView}/>
<Route path="/sportsman" component={SportsmanView}/>
<Route path="/sportsman/create" component={CreateSportsmanIllnessForm}/>
<Route path="/sportsman/recommendedtrainers/all" component={RecommendedTrainerList}/>
<Route path="/trainer/view/:id" component={CoachViewForm}/>
<Route path="/trainer" component={CoachView}/>*/