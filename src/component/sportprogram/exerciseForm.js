import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

const ExerciseForm = (props) => {
    const {exercise} = props;
    const e = exercise;
    return (
        <div>
            <FormControl className="formElement">
                <InputLabel htmlFor={`id${e.idSportoProgramosPratimas}`}>Pavadinimas</InputLabel>
                <Input id={`id${e.idSportoProgramosPratimas}`} value={e.fkPratimas.pavadinimas}/>
            </FormControl>
            <FormControl className="formElement">
                <InputLabel htmlFor={`desc${e.idSportoProgramosPratimas}`}>Aprašymas</InputLabel>
                <Input id={`desc${e.idSportoProgramosPratimas}`} value={e.fkPratimas.aprasymas}/>
            </FormControl>
            <FormControl className="formElement">
                <InputLabel htmlFor={`photoUrl${e.idSportoProgramosPratimas}`}>Nuotraukos
                    url</InputLabel>
                <Input id={`photoUrl${e.idSportoProgramosPratimas}`}
                       value={e.fkPratimas.nuotraukosUrl ? e.fkPratimas.nuotraukosUrl : ''}/>
            </FormControl>
            <FormControl className="formElement">
                <InputLabel htmlFor={`sets${e.idSportoProgramosPratimas}`}>Setai</InputLabel>
                <Input id={`sets${e.idSportoProgramosPratimas}`} value={e.setai}/>
            </FormControl>
            <FormControl className="formElement">
                <InputLabel htmlFor={`reps${e.idSportoProgramosPratimas}`}>Kartojimai</InputLabel>
                <Input id={`reps${e.idSportoProgramosPratimas}`} value={e.kartojimai}/>
            </FormControl>
        </div>
    );
}

export default ExerciseForm;