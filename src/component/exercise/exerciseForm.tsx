import React, { useEffect, useState } from 'react';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Button, FormControl, FormGroup, Input, InputLabel, LinearProgress, Typography } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { Exercise } from "../../state/exercise";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from "react-redux";
import { AppState, FormMessageType } from "../../state";
import { createDeleteExerciseAction } from "../../action/exercise";
import Snackbar from '@material-ui/core/Snackbar';
import { history } from "../../customHistory";
import { Alert } from "../alert";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        marginLeft: theme.spacing(3),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

interface ExerciseFormProps {
    title: string,
    actionButtonText: string,
    actionButtonAction: any,
    exercise: Exercise | null,
}

const ExerciseForm: React.FC<ExerciseFormProps> = (props: ExerciseFormProps) => {
    const redirectRequired = useSelector((state: AppState) => {
        return state.exerciseUIReducer.redirectToListRequired;
    });

    useEffect(() => {
        if (!redirectRequired) {
            return;
        }

        history.push('/exercise/all');
    }, [ redirectRequired ]);

    const classes = useStyles();
    const dispatch = useDispatch();

    const { exercise, title, actionButtonText, actionButtonAction } = props;

    const [ messageOpen, setMessageOpen ] = useState<boolean>(true);

    const [ deleteRequired, setDeleteRequired ] = useState<boolean>(false);
    const [ sportId, setSport ] = useState<string>(exercise ? exercise.sportId.toString() : '1');
    const [ videoUrl, setVideoURL ] = useState<string>(exercise ? exercise.videoUrl : '');
    const [ num, setNum ] = useState<string>(exercise ? exercise.num.toString() : '');


    const exerciseProcessing = useSelector((state: AppState) => {
        return state.exerciseUIReducer.exerciseProcessing;
    });

    const { formMessage, formMessageType } = useSelector((state: AppState) => {
        return {
            formMessage: state.exerciseUIReducer.exerciseFormMessage,
            formMessageType: state.exerciseUIReducer.exerciseFormMessageType,
        };
    });

    useEffect(() => {
        if (!exercise) {
            return;
        }

        setSport(exercise.sportId.toString());
        setVideoURL(exercise.videoUrl);
        setNum(exercise.num.toString());

    }, [ exercise ]);

    const handleSportChange = (event: any) => {
        setSport(event.target.value);
    };

    const handleUrlChange = (event: any) => {
        setVideoURL(event.target.value);
    }

    const handleNumChange = (event: any) => {
        setNum(event.target.value);
    }



    useEffect(() => {
        if (!deleteRequired || !exercise) {
            return;
        }

        dispatch(createDeleteExerciseAction(exercise.id));
    }, [ dispatch, deleteRequired, exercise ]);


    const progressBar = exerciseProcessing ? <LinearProgress/> : null;

    const message = formMessage && formMessageType !== FormMessageType.MESSAGE_NONE ?
        // @ts-ignore
        <Snackbar open={messageOpen} autoHideDuration={5000} onClose={() => setMessageOpen(false)}><Alert severity={formMessageType}>{formMessage}</Alert></Snackbar> : null;

    return (
        <div>
            {progressBar}
            <Typography variant="h4" component="h1">{title}</Typography>
            <form action="#" method="POST">
                <FormGroup>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Exercise</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={sportId}
                            onChange={handleSportChange}
                        >
                            <MenuItem value='1'>Sit-Up</MenuItem>
                            <MenuItem value='2'>Bench Press</MenuItem>
                            <MenuItem value='3'>Crunches</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl className="formElement">
                        <InputLabel htmlFor="exerciseURL">Video URL</InputLabel>
                        <Input value={videoUrl} onChange={handleUrlChange} id="exerciseURL"
                               aria-describedby="my-helper-text"/>
                    </FormControl>


                </FormGroup>
                <div className="blockWrapperAlignRight">
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<SaveIcon/>}
                        onClick={() => actionButtonAction(sportId, videoUrl, 1)}
                    >
                        {actionButtonText}
                    </Button>
                </div>
            </form>
            {message}
        </div>
    );
};

export default ExerciseForm;