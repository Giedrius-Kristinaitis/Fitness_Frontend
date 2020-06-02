import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

const ExerciseForm = (props) => {
    const {exercise} = props;

    if(!exercise) {
        return;
    }

    const id = exercise.idSportoProgramosPratimas ? exercise.idSportoProgramosPratimas : '';
    const name = exercise.fkPratimas ? exercise.fkPratimas.pavadinimas : '';
    const description = exercise.fkPratimas ? exercise.fkPratimas.aprasymas : '';
    const nuotraukosUrl = exercise.fkPratimas ? exercise.fkPratimas.nuotraukosUrl : '';
    const sets = exercise.setai ? exercise.setai : '';
    const reps = exercise.repai ? exercise.repai : '';

    return (
        <div>
            <FormControl className="formElement">
                <InputLabel htmlFor={name}>Pavadinimas</InputLabel>
                <Input id={name} value={name}/>
            </FormControl>
            <FormControl className="formElement">
                <InputLabel htmlFor={description}>Aprašymas</InputLabel>
                <Input id={description} value={description}/>
            </FormControl>
            <FormControl className="formElement">
                <InputLabel htmlFor={nuotraukosUrl}>Nuotraukos url</InputLabel>
                <Input id={nuotraukosUrl}
                       value={nuotraukosUrl}/>
            </FormControl>
            <FormControl className="formElement">
                <InputLabel htmlFor={sets}>Setai</InputLabel>
                <Input id={sets} value={sets}/>
            </FormControl>
            <FormControl className="formElement">
                <InputLabel htmlFor={reps}>Kartojimai</InputLabel>
                <Input id={reps} value={reps}/>
            </FormControl>
        </div>
    );
}

export default ExerciseForm;