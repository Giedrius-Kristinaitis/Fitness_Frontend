import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
//import { Competition, CompetitionUIListState } from "../../state/competition";
//import {
//    createCompetitionResetRedirectRequiredAction,
//    createFetchAllCompetitionsAction
//} from "../../action/competition";
//import { AppState, FormMessageType } from "../../state";
import {Button, LinearProgress, Typography} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
//import { history } from "../../customHistory";
import Snackbar from "@material-ui/core/Snackbar";
import {history} from "../../customHistory";
//import { Alert } from "../alert";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 700,
        width: "100%",
    },
    button: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

const competitionClicked = () => {
    history.push('/competition/all');
}
const sportProgramsClicked = () => {
    history.push('/competition/all');
}
const exercisesClicked = () => {
    history.push('/exercise/all');
}
const sportsmanClicked = () => {
    history.push('/competition/all');
}
const trainerClicked = () => {
    history.push('/competition/all');
}

const MainPage: React.FC = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    return (
        <div>
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<AddIcon/>}
                    onClick={() => competitionClicked()}
                >
                    Competitions
                </Button>
            </div>
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<AddIcon/>}
                    onClick={() => sportProgramsClicked()}
                >
                    Sport programs list
                </Button>
            </div>
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<AddIcon/>}
                    onClick={() => exercisesClicked()}
                >
                    Exercises
                </Button>
            </div>
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<AddIcon/>}
                    onClick={() => sportsmanClicked()}
                >
                    Sportsman View
                </Button>
            </div>
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<AddIcon/>}
                    onClick={() => trainerClicked()}
                >
                    Trainer View
                </Button>
            </div>
        </div>
    );
}

export default MainPage;