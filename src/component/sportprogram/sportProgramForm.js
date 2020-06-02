import React, {useEffect, useState} from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import {Button, Typography} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import {
    addNewExercise,
    createSportProgram,
    deleteSportProgram, editSportProgram, resetMessage,
    resetRedirection,
} from "../../action/sportprogram";
import {useDispatch, useSelector} from "react-redux";
import {history} from "../../customHistory";
import {useParams} from "react-router";
import ExerciseForm from "./exerciseForm";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Exercises from "../../state/exercises";
import Snackbar from "@material-ui/core/Snackbar";
import {Alert} from "../alert";
import sportProgramsReducer from "../../reducer/sportprogram";

const SportProgramForm = (props) => {
    const dispatch = useDispatch();

    const redirectRequired = useSelector((state) => {
        return state.sportProgramsReducer.redirectToListRequired;
    });

    if (redirectRequired) {
        dispatch(resetRedirection());
        history.push('/sportprograms/all');
    }

    const {sportprogram, updateSportProgram} = props;
    const {id} = useParams();


    const [name, setName] = useState(sportprogram ? sportprogram.pavadinimas : '');
    const [description, setDescription] = useState(sportprogram ? sportprogram.aprasas : '');
    const [photoUrl, setPhotoUrl] = useState(sportprogram ? sportprogram.nuotraukosUrl : '');
    const [exercises, setExercise] = useState(sportprogram ? sportprogram.sportoProgramosPratimas : []);

    const [selection, setSelection] = useState(1);
    const handleSelection = (event) => {
        setSelection(event.target.value);
        console.log(selection);
    }

    const isEditing = sportprogram ? !!sportprogram.idSportoPrograma : false;

    const [ messageOpen, setMessageOpen ] = useState(true);

    const handleSubmit = () => {
        const updatedSportProgram = {pavadinimas: name, aprasas: description, nuotraukosUrl: photoUrl, fkTrenerisId: 2};

        if (isEditing) {
            let newExercise = {};
            if (selection === 1) {
                newExercise = Exercises[0];
            } else if (selection === 2) {
                newExercise = Exercises[1];
            }

            const updatedProgram = {
                ...sportprogram,
                pavadinimas: name,
                aprasas: description,
                nuotraukosUrl: photoUrl,
                FkTrenerisId: 2,
                sportoProgramosPratimas: [
                    newExercise
                ]
            };


            console.log(JSON.stringify(updatedProgram));
            dispatch(editSportProgram(updatedProgram));
            // updateSportProgram(updatedSportProgram);
            // dispatch(updateSportProgram(sportprogram));
        } else {
            dispatch(createSportProgram(updatedSportProgram));
        }

        setMessageOpen(true);
    }

    const handleDeleteClick = () => {
        dispatch(deleteSportProgram(id));
    }

    const addNewExerciseForm = () => {
        let shit = {...sportprogram};
        shit.sportoProgramosPratimas.push({});
        updateSportProgram(shit);
        // dispatch(addNewExercise(id, {}))
    }

    const deleteButton = sportprogram ? sportprogram.idSportoPrograma ? <Button
        style={{marginTop: '1vh', marginLeft: '1vw'}}
        variant="contained"
        color="secondary"
        startIcon={<DeleteIcon/>}
        onClick={handleDeleteClick}
    >
        Delete
    </Button> : null : null;

    const showExercises = exercises ? exercises.map((e, index) => (
        <ExerciseForm key={index} exercise={e}/>
    )) : null;

    const newExerciseSelection = (
        <div>
            <InputLabel id="demo-simple-select-placeholder-label-label">Naujas pratimas</InputLabel>
            <Select
                labelId="demo-simple-select-placeholder-label-label"
                id="demo-simple-select-placeholder-label"
                value={selection}
                onChange={handleSelection}
                style={{minWidth: '20vw'}}
            >
                <MenuItem value={1}>-</MenuItem>
                <MenuItem value={2}>pirmas pratimas (pirmo pratymo aprasymas) -> 1 verte</MenuItem>
                <MenuItem value={3}>antras pratimas (antro pratymo aprasymas) -> 2 verte</MenuItem>
            </Select>
        </div>
    );

    const { message, messageType } = useSelector((state) => {
        return {
            message: state.sportProgramsReducer.message,
            messageType: state.sportProgramsReducer.messageType,
        };
    });


    const messageSnackbar = message ?
        // @ts-ignore
        <Snackbar open={messageOpen} autoHideDuration={5000} onClose={() => { setMessageOpen(false); dispatch(resetMessage())}}><Alert severity={messageType}>{message}</Alert></Snackbar> : null;

    const editSportsProgram = (
        <div>
            <Typography variant="h4" component="h1">Sporto programos informacija</Typography>
            <img src={photoUrl} height="200"/>
            <form action="#" method="POST">
                <FormGroup>
                    <FormControl className="formElement">
                        <InputLabel htmlFor="name">Pavadinimas</InputLabel>
                        <Input id="name" onChange={(e) => setName(e.target.value)} value={name}/>
                    </FormControl>
                    <FormControl className="formElement">
                        <InputLabel htmlFor="description">Aprašas</InputLabel>
                        <Input id="description" onChange={(e) => setDescription(e.target.value)} value={description}/>
                    </FormControl>
                    <FormControl className="formElement">
                        <InputLabel htmlFor="photoUrl">Nuotraukos url</InputLabel>
                        <Input id="photoUrl" onChange={(e) => setPhotoUrl(e.target.value)} value={photoUrl}/>
                    </FormControl>
                    <Typography variant="h5" component="h1">Pratimai</Typography>
                    {showExercises}
                    {newExerciseSelection}
                </FormGroup>
                <Button
                    variant="contained"
                    color="primary"
                    style={{marginTop: '1vh'}}
                    startIcon={<AddIcon/>}
                    onClick={addNewExerciseForm}
                >
                    Add New Exercise
                </Button>
                <div className="blockWrapperAlignRight">
                    <Button
                        variant="contained"
                        color="primary"
                        style={{marginTop: '1vh'}}
                        startIcon={<SaveIcon/>}
                        onClick={handleSubmit}
                    >
                        Update
                    </Button>
                    {deleteButton}
                </div>
            </form>
            {messageSnackbar}
        </div>
    );

    return editSportsProgram;
}

export default SportProgramForm;