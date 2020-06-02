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
    createDeleteExerciseAction, createDeleteRateExerciseAction,
    createExerciseResetRedirectRequiredAction,
    createFetchAllExercisesAction,
    createFetchAllUserExercisesAction,
    createFetchAllUserExercisesCompletedAction,
    createInsertRateExerciseAction
} from "../../action/exercise";
import {AppState, FormMessageType} from "../../state";
import {Button, LinearProgress, Typography, DialogContent} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import {history} from "../../customHistory";
import Snackbar from "@material-ui/core/Snackbar";
import {Alert} from "../alert";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";

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

const ExerciseListView: React.FC = () => {
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
    const [open, setOpen] = React.useState(false);
    const [rating, setRating] = React.useState(1);
    const [num, setNum] = React.useState(0);


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleRatingChange = (event: any) => {
        setRating(event.target.value);
    };
    const handleNumChange = (event: any) => {
        setNum(event.target.value);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const addClicked: Function = (exercise: Exercise) => {
        const updatedExercise: Exercise = { ...exercise };

        updatedExercise.eval = rating;
        updatedExercise.num = num;
        updatedExercise.trainerId = 2;


        dispatch(createInsertRateExerciseAction(updatedExercise));
        setOpen(false);

        const items = props.exercises.filter(item => item.id !== exercise.id);
        const item1 = props.exercises.filter(item => item.id !== exercise.id);
        var tempDate = new Date();
        var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
        const currDate = date;
        item1[0].eval = rating;
        item1[0].num = num;
        item1[0].evalDate = currDate;
        const all = items.concat(item1);

        //props.exercises = items;
        dispatch(createFetchAllUserExercisesCompletedAction(all))



        //dispatch(createFetchAllExercisesAction());


    }
    const removeClicked: Function = (exerciseId: number) => {
        dispatch(createDeleteRateExerciseAction(exerciseId));
        setOpen(false);
        //dispatch(createFetchAllExercisesAction());

    }
    useEffect(() => {
        dispatch(createExerciseResetRedirectRequiredAction());
        // @ts-ignore
        dispatch(createFetchAllExercisesAction());
    }, [ dispatch ]);


    const itemClicked: Function = (exerciseId: number) => {
        dispatch(createDeleteExerciseAction(exerciseId));
        //dispatch(createFetchAllUserExercisesAction(1));

        const items = props.exercises.filter(item => item.id !== exerciseId);
        props.exercises = items;
        dispatch(createFetchAllUserExercisesCompletedAction(items))
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
                            <StyledTableCell  component="th" scope="row">{exercise.videoUrl}</StyledTableCell>
                            <StyledTableCell align="right">{exercise.num}</StyledTableCell>
                            <StyledTableCell align="right">{exercise.eval}</StyledTableCell>
                            <StyledTableCell
                                align="right">{new Date(exercise.evalDate).toLocaleString('lt-LT')}</StyledTableCell>
                            <StyledTableCell
                                align="right">
                                <button  onClick={(e) => {handleClickOpen()} }>
                                    Rate
                                </button>
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">{"Rating exercise"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            How well did the user perform his exercises? (1-10)
                                            How many times did the user do the exact exercise? (number)
                                        </DialogContentText>
                                        <TextField

                                            margin="dense"
                                            id="rating"
                                            label="Your rating"
                                            type="number"
                                            value={rating}
                                            onChange={handleRatingChange}

                                        />
                                        <TextField

                                            margin="dense"
                                            id="num"
                                            label="Number of times"
                                            type="number"
                                            value={num}
                                            onChange={handleNumChange}

                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose} color="primary">
                                            Cancel
                                        </Button>
                                        <Button  onClick={(e) => {removeClicked(exercise.id)}} color="primary">
                                            Remove rating
                                        </Button>
                                        <Button onClick={(e) => {addClicked(exercise)}} color="primary" autoFocus>
                                            Add rating
                                        </Button>
                                    </DialogActions>
                                </Dialog>
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

            {progress}
            {exerciseList}
            {message}
        </div>
    );
}

export default ExerciseListView;