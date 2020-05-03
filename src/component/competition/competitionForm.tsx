import React, { useState } from 'react';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from "@material-ui/pickers";
import { Button, FormControl, FormGroup, Input, InputLabel, Typography } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { Competition } from "../../state/competition";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';

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
    const classes = useStyles();

    const { competition, title, actionButtonText, actionButtonAction } = props;

    const [ name, setName ] = useState<string | null>(competition ? competition.pavadinimas : '');
    const [ description, setDescription ] = useState<string | null>(competition ? competition.aprasas : '');
    const [ location, setLocation ] = useState<string | null>(competition ? competition.vieta : '');
    const [ startingDate, setStartingDate ] = useState<MaterialUiPickersDate>(competition ? new Date(competition.prasidejimoData) : new Date());
    const [ endingDate, setEndingDate ] = useState<MaterialUiPickersDate>(competition ? new Date(competition.pabaigosData) : new Date());

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
        setStartingDate(startingDate);
    }

    const handleEndingDateChange = (endingDate: MaterialUiPickersDate) => {
        setEndingDate(endingDate);
    }

    const deleteButton = competition ? <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon/>}
        onClick={() => console.log('delete')}
    >
        Delete
    </Button> : null;

    return (
        <div>
            <Typography variant="h4" component="h1">{title}</Typography>
            <form action="#" method="POST">
                <FormGroup>
                    <FormControl className="formElement">
                        <InputLabel htmlFor="competitionTitle">Title</InputLabel>
                        <Input onChange={handleNameChange} id="competitionTitle" aria-describedby="my-helper-text"/>
                    </FormControl>
                    <FormControl className="formElement">
                        <InputLabel htmlFor="competitionDescription">Description</InputLabel>
                        <Input onChange={handleDescriptionChange} id="competitionDescription"
                               aria-describedby="my-helper-text"/>
                    </FormControl>
                    <FormControl className="formElement">
                        <InputLabel htmlFor="competitionLocation">Location</InputLabel>
                        <Input onChange={handleLocationChange} id="competitionLocation"
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
                            disablePast
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
                            disablePast
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
        </div>
    );
};

export default CompetitionForm;