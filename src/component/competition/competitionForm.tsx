import React, { useEffect, useState } from 'react';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Button, FormControl, FormGroup, Input, InputLabel, LinearProgress, Typography } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { Competition } from "../../state/competition";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from "react-redux";
import { AppState, FormMessageType } from "../../state";
import { createDeleteCompetitionAction } from "../../action/competition";
import Snackbar from '@material-ui/core/Snackbar';
import { history } from "../../customHistory";
import { Alert } from "../alert";

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        marginLeft: theme.spacing(3),
    },
}));

interface CompetitionFormProps {
    title: string,
    actionButtonText: string,
    actionButtonAction: any,
    competition: Competition | null,
}

const CompetitionForm: React.FC<CompetitionFormProps> = (props: CompetitionFormProps) => {
    const redirectRequired = useSelector((state: AppState) => {
        return state.competitionUIReducer.redirectToListRequired;
    });

    useEffect(() => {
        if (!redirectRequired) {
            return;
        }

        history.push('/competition/all');
    }, [ redirectRequired ]);

    const classes = useStyles();
    const dispatch = useDispatch();

    const { competition, title, actionButtonText, actionButtonAction } = props;

    const [ messageOpen, setMessageOpen ] = useState<boolean>(true);

    const [ deleteRequired, setDeleteRequired ] = useState<boolean>(false);
    const [ name, setName ] = useState<string>(competition ? competition.name : '');
    const [ description, setDescription ] = useState<string>(competition ? competition.description : '');
    const [ location, setLocation ] = useState<string>(competition ? competition.location : '');
    const [ startingDate, setStartingDate ] = useState<Date>(competition ? new Date(competition.startingDate) : new Date());
    const [ endingDate, setEndingDate ] = useState<Date>(competition ? new Date(competition.endingDate) : new Date());

    const competitionProcessing = useSelector((state: AppState) => {
        return state.competitionUIReducer.competitionProcessing;
    });

    const { formMessage, formMessageType } = useSelector((state: AppState) => {
        return {
            formMessage: state.competitionUIReducer.competitionFormMessage,
            formMessageType: state.competitionUIReducer.competitionFormMessageType,
        };
    });

    useEffect(() => {
        if (!competition) {
            return;
        }

        setName(competition.name);
        setDescription(competition.description);
        setLocation(competition.location);
        setStartingDate(new Date(competition.startingDate));
        setEndingDate(new Date(competition.endingDate));
    }, [ competition ]);

    const handleNameChange = (event: any) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event: any) => {
        setDescription(event.target.value);
    }

    const handleLocationChange = (event: any) => {
        setLocation(event.target.value);
    }

    const handleStartingDateChange = (startingDate: MaterialUiPickersDate) => {
        if (!startingDate) {
            return;
        }

        setStartingDate(new Date(startingDate.toString()));
    }

    const handleEndingDateChange = (endingDate: MaterialUiPickersDate) => {
        if (!endingDate) {
            return;
        }

        setEndingDate(new Date(endingDate.toString()));
    }

    useEffect(() => {
        if (!deleteRequired || !competition) {
            return;
        }

        dispatch(createDeleteCompetitionAction(competition.id));
    }, [ dispatch, deleteRequired, competition ]);

    const deleteButton = competition ? <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon/>}
        onClick={() => setDeleteRequired(true)}
    >
        Delete
    </Button> : null;

    const progressBar = competitionProcessing ? <LinearProgress/> : null;

    const message = formMessage && formMessageType !== FormMessageType.MESSAGE_NONE ?
        // @ts-ignore
        <Snackbar open={messageOpen} autoHideDuration={5000} onClose={() => setMessageOpen(false)}><Alert severity={formMessageType}>{formMessage}</Alert></Snackbar> : null;

    return (
        <div>
            {progressBar}
            <Typography variant="h4" component="h1">{title}</Typography>
            <form action="#" method="POST">
                <FormGroup>
                    <FormControl className="formElement">
                        <InputLabel htmlFor="competitionTitle">Title</InputLabel>
                        <Input value={name} onChange={handleNameChange} id="competitionTitle"
                               aria-describedby="my-helper-text"/>
                    </FormControl>
                    <FormControl className="formElement">
                        <InputLabel htmlFor="competitionDescription">Description</InputLabel>
                        <Input value={description} onChange={handleDescriptionChange} id="competitionDescription"
                               aria-describedby="my-helper-text"/>
                    </FormControl>
                    <FormControl className="formElement">
                        <InputLabel htmlFor="competitionLocation">Location</InputLabel>
                        <Input value={location} onChange={handleLocationChange} id="competitionLocation"
                               aria-describedby="my-helper-text"/>
                    </FormControl>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDateTimePicker
                            className="formElement"
                            variant="inline"
                            ampm={false}
                            label="Starting Date"
                            value={startingDate}
                            onChange={handleStartingDateChange}
                            onError={console.log}
                            format="yyyy/MM/dd HH:mm"
                        />
                        <KeyboardDateTimePicker
                            className="formElement"
                            variant="inline"
                            ampm={false}
                            label="Ending date"
                            value={endingDate}
                            onChange={handleEndingDateChange}
                            onError={console.log}
                            format="yyyy/MM/dd HH:mm"
                        />
                    </MuiPickersUtilsProvider>
                </FormGroup>
                <div className="blockWrapperAlignRight">
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<SaveIcon/>}
                        onClick={() => actionButtonAction(name, description, location, startingDate, endingDate)}
                    >
                        {actionButtonText}
                    </Button>
                    {deleteButton}
                </div>
            </form>
            {message}
        </div>
    );
};

export default CompetitionForm;