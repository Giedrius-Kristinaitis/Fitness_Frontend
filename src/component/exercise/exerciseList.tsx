import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Exercise, ExerciseUIListState} from "../../state/exercise";
import {
    createDeleteExerciseAction,
    createExerciseResetRedirectRequiredAction,
    createFetchAllExercisesAction, createFetchAllUserExercisesAction, createFetchAllUserExercisesCompletedAction
} from "../../action/exercise";
import {AppState, FormMessageType} from "../../state";
import {Button, LinearProgress, Typography} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import {history} from "../../customHistory";
import Snackbar from "@material-ui/core/Snackbar";
import {Alert} from "../alert";

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

interface ExerciseProps {
    exercises: Exercise[],
    loadingState: ExerciseUIListState,
}

const extractExercisesFromState = (state: AppState): Exercise[] => {
    const exercises: Exercise[] = [];

    for (const exerciseId in state.exerciseEntityReducer.entities) {
        exercises.push(state.exerciseEntityReducer.entities[exerciseId]);
    }

    return exercises;
}

const ExerciseList: React.FC = () => {
    const props: ExerciseProps = useSelector((state: AppState) => {
        return {
            exercises: extractExercisesFromState(state),
            loadingState: state.exerciseUIReducer.state,
        }
    });

    const dispatch = useDispatch();
    const classes = useStyles();


    const deleteItem: Function = (exerciseId: number) => {
        dispatch(createDeleteExerciseAction(exerciseId));
        //dispatch(createFetchAllUserExercisesAction(1));

        const items = props.exercises.filter(item => item.id !== exerciseId);
        props.exercises = items;
        dispatch(createFetchAllUserExercisesCompletedAction(items))

        //history.push(`/exercise/all`);
    }
    const [ messageOpen, setMessageOpen ] = useState<boolean>(true);

    useEffect(() => {
        dispatch(createExerciseResetRedirectRequiredAction());
        // @ts-ignore
        dispatch(createFetchAllUserExercisesAction(1));
    }, [ dispatch ]);

    const newExerciseClicked = () => {
        history.push('/exercise/create');
    }
    const itemClicked: Function = (exerciseId: number) => {
        history.push(`/exercise/view/${exerciseId}`);
    }

    const { listMessage, listMessageType } = useSelector((state: AppState) => {
        return {
            listMessage: state.exerciseUIReducer.exerciseListMessage,
            listMessageType: state.exerciseUIReducer.exerciseListMessageType,
        };
    });

    const progress = props.loadingState === ExerciseUIListState.STATE_LOADING ? <LinearProgress/> : null;

    const message = listMessage && listMessageType !== FormMessageType.MESSAGE_NONE ?
        // @ts-ignore
        <Snackbar open={messageOpen} autoHideDuration={5000} onClose={() => setMessageOpen(false)}><Alert severity={listMessageType}>{listMessage}</Alert></Snackbar> : null;

    const exerciseList = props.loadingState === ExerciseUIListState.STATE_LOADED ?
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Video URL</StyledTableCell>
                        <StyledTableCell align="right">Number</StyledTableCell>
                        <StyledTableCell align="right">Evaluation</StyledTableCell>
                        <StyledTableCell align="right">Evaluation date</StyledTableCell>
                        <StyledTableCell align="right">Actions</StyledTableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.exercises.map((exercise: Exercise) => (
                        <TableRow className="tableRow" key={exercise.id}
                                  >
                            <StyledTableCell onClick={() => itemClicked(exercise.id)} component="th" scope="row">{exercise.videoUrl}</StyledTableCell>
                            <StyledTableCell align="right">{exercise.num}</StyledTableCell>
                            <StyledTableCell align="right">{exercise.eval}</StyledTableCell>
                            <StyledTableCell
                                align="right">{new Date(exercise.evalDate).toLocaleString('lt-LT')}</StyledTableCell>
                            <StyledTableCell
                                align="right">
                                <button  onClick={(e) => { itemClicked(exercise.id) } }>
                                    Update
                                </button>
                                <button  onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) deleteItem(exercise.id) } }>
                                    Delete
                                </button>
                            </StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer> : (props.loadingState === ExerciseUIListState.STATE_EMPTY
        || props.loadingState === ExerciseUIListState.STATE_FAILED
        || !props.exercises ? (
            <Typography align="center">No completed exercises found</Typography>) : null);

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<AddIcon/>}
                onClick={() => newExerciseClicked()}
            >
                New Exercise
            </Button>
            {progress}
            {exerciseList}
            {message}
        </div>
    );
}

export default ExerciseList;