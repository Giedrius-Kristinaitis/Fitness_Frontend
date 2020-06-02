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
import MainPage from "./component/main/mainPage";
import ExerciseList from "./component/exercise/exerciseList";
import CreateExerciseForm from "./component/exercise/createExerciseForm";
import ExerciseDetailsForm from "./component/exercise/updateExerciseForm";
import ExerciseListView from "./component/trainer/exerciseList";
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

            <Route path="/index" component={MainPage}/>
            <Route path="/exercise/all" component={ExerciseList}/>
            <Route path="/exercise/create" component={CreateExerciseForm}/>
            <Route path="/exercise/view/:id" component={ExerciseDetailsForm}/>
            <Route path="/trainer/exercise/all" component={ExerciseListView}/>

            <Route path="/sportprograms/all" component={SportProgramList}/>
            <Route path="/sportprograms/create" component={CreateSportProgram}/>
            <Route path="/sportprograms/view/:id" component={ViewSportProgram}/>

            <Route path="/coaches/search" component={CoachesListView}/>
            <Route path="/coaches/recommended" component={CoachList}/>
        </Router>
    </Provider>
);

export default App;

/*
//import ExerciseListView from "./component/trainer/exerciseListView";
//import TrainerExerciseDetailsForm from "./component/trainer/updateExerciseForm";
            <Route path="/trainer/view/:id" component={TrainerExerciseDetailsForm}/>
            <Route path="/trainer/all" component={ExerciseListView}/>

<Route path="/sportprogram/all" component={SportProgramList}/>
<Route path="/sportprogram/view/:id" component={SportProgramDetailsForm}/>
<Route path="/sportprogram/create" component={CreateSportProgramForm}/>

<Route path="/exercise/view/:id" component={ExerciseInfoView}/>
<Route path="/sportsman" component={SportsmanView}/>
<Route path="/sportsman/create" component={CreateSportsmanIllnessForm}/>
<Route path="/sportsman/recommendedtrainers/all" component={RecommendedTrainerList}/>*/