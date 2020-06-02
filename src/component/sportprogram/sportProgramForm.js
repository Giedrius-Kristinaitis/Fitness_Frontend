import React, {useState} from "react";
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
    deleteSportProgram,
    resetRedirection,
    updateSportProgram
} from "../../action/sportprogram";
import {useDispatch, useSelector} from "react-redux";
import {history} from "../../customHistory";
import {useParams} from "react-router";
import ExerciseForm from "./exerciseForm";

const SportProgramForm = (props) => {
    const dispatch = useDispatch();

    const redirectRequired = useSelector((state) => {
        return state.sportProgramsReducer.redirectToListRequired;
    });

    if (redirectRequired) {
        dispatch(resetRedirection());
        history.push('/sportprograms/all');
    }

    const {sportprogram} = props;
    const {id} = useParams();


    const [name, setName] = useState(sportprogram ? sportprogram.pavadinimas : '');
    const [description, setDescription] = useState(sportprogram ? sportprogram.aprasas : '');
    const [photoUrl, setPhotoUrl] = useState(sportprogram ? sportprogram.nuotraukosUrl : '');
    const [exercises, setExercise] = useState(sportprogram ? sportprogram.sportoProgramosPratimas : []);

    const isEditing = sportprogram ? !!sportprogram.idSportoPrograma : false;

    const handleSubmit = () => {
        const updatedSportProgram = {pavadinimas: name, aprasas: description, nuotraukosUrl: photoUrl, fkTrenerisId: 2};

        if (isEditing) {
            dispatch(updateSportProgram(updatedSportProgram));
        } else {
            dispatch(createSportProgram(updatedSportProgram));
        }
    }

    const handleDeleteClick = () => {
        dispatch(deleteSportProgram(id));
    }

    const addNewExerciseForm = () => {
        dispatch(addNewExercise(id, {}))
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

    return (
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
                    {exercises.map(e => (
                        <ExerciseForm key={e.fkPratimas} exercise={e} />
                    ))}
                    {/*{exercises.map(e => (*/}
                    {/*    <div key={e.idSportoProgramosPratimas}>*/}
                    {/*        <FormControl className="formElement">*/}
                    {/*            <InputLabel htmlFor={`id${e.idSportoProgramosPratimas}`}>Pavadinimas</InputLabel>*/}
                    {/*            <Input id={`id${e.idSportoProgramosPratimas}`} value={e.fkPratimas.pavadinimas}/>*/}
                    {/*        </FormControl>*/}
                    {/*        <FormControl className="formElement">*/}
                    {/*            <InputLabel htmlFor={`desc${e.idSportoProgramosPratimas}`}>Aprašymas</InputLabel>*/}
                    {/*            <Input id={`desc${e.idSportoProgramosPratimas}`} value={e.fkPratimas.aprasymas}/>*/}
                    {/*        </FormControl>*/}
                    {/*        <FormControl className="formElement">*/}
                    {/*            <InputLabel htmlFor={`photoUrl${e.idSportoProgramosPratimas}`}>Nuotraukos*/}
                    {/*                url</InputLabel>*/}
                    {/*            <Input id={`photoUrl${e.idSportoProgramosPratimas}`}*/}
                    {/*                   value={e.fkPratimas.nuotraukosUrl ? e.fkPratimas.nuotraukosUrl : ''}/>*/}
                    {/*        </FormControl>*/}
                    {/*        <FormControl className="formElement">*/}
                    {/*            <InputLabel htmlFor={`sets${e.idSportoProgramosPratimas}`}>Setai</InputLabel>*/}
                    {/*            <Input id={`sets${e.idSportoProgramosPratimas}`} value={e.setai}/>*/}
                    {/*        </FormControl>*/}
                    {/*        <FormControl className="formElement">*/}
                    {/*            <InputLabel htmlFor={`reps${e.idSportoProgramosPratimas}`}>Kartojimai</InputLabel>*/}
                    {/*            <Input id={`reps${e.idSportoProgramosPratimas}`} value={e.kartojimai}/>*/}
                    {/*        </FormControl>*/}
                    {/*    </div>*/}
                    {/*))}*/}
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
        </div>
    );
}

export default SportProgramForm;

// export default class SportProgramForm extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//
//     getSportProgram() {
//         const sportProgram = this.props.changedprogram;
//         let validatedSportProgram = {pavadinimas: '', aprasas: '', nuotraukosUrl: '', sportoProgramosPratimas: []};
//         validatedSportProgram.pavadinimas = sportProgram ? sportProgram.pavadinimas ? sportProgram.pavadinimas : '' : '';
//         validatedSportProgram.aprasas = sportProgram ? sportProgram.aprasas ? sportProgram.aprasas : '' : '';
//         validatedSportProgram.nuotraukosUrl = sportProgram ? sportProgram.nuotraukosUrl ? sportProgram.nuotraukosUrl : '' : '';
//         validatedSportProgram.sportoProgramosPratimas = sportProgram ? sportProgram.sportoProgramosPratimas ? sportProgram.sportoProgramosPratimas : [] : [];
//
//         return validatedSportProgram;
//     }
//
//     handleName(event) {
//         const newName = event.target.value;
//         this.props.dispatch(changeSportProgram({pavadinimas: newName}));
//     }
//
//     handleDescription(event) {
//         this.props.dispatch(changeSportProgram({aprasas: event.target.value}));
//     }
//
//     handlePhotoUrl(event) {
//         this.props.dispatch(changeSportProgram({nuotraukosUrl: event.target.value}));
//     }
//
//     saveSportProgram() {
//
//     }
//
//     handleSubmit(event) {
//         event.preventDefault();
//
//     }
//
//     openSportProgramPage() {
//         const {sportprogram} = this.props;
//         const [name, setName] = useState(sportProgram ? sportProgram.pavadinimas : '');
//
//         const sportProgram = this.getSportProgram();
//         // const name = sportProgram.pavadinimas
//         const description = sportProgram.aprasas;
//         const photoUrl = sportProgram.nuotraukosUrl;
//         const exercises = sportProgram.sportoProgramosPratimas;
//
//         const deleteButton = this.props.sportprogram ? (
//             <Button
//                 variant="contained"
//                 color="secondary"
//                 style={{marginTop: '1vh', marginLeft: '1vw'}}
//                 startIcon={<DeleteIcon/>}
//             >
//                 Delete
//             </Button>
//         ) : null;
//
//         return (
//             <div>
//                 <Typography variant="h4" component="h1">Sporto programos informacija</Typography>
//                 <img src={photoUrl} height="200"/>
//                 <form action="#" method="POST" onSubmit={this.handleSubmit}>
//                     <FormGroup>
//                         <FormControl className="formElement">
//                             <InputLabel htmlFor="name">Pavadinimas</InputLabel>
//                             <Input id="name" onChange={(e) => setName(e.target.value)} value={name}/>
//                         </FormControl>
//                         <FormControl className="formElement">
//                             <InputLabel htmlFor="description">Aprašas</InputLabel>
//                             <Input id="description" onChange={(e) => this.handleDescription(e)} value={description}/>
//                         </FormControl>
//                         <FormControl className="formElement">
//                             <InputLabel htmlFor="photoUrl">Nuotraukos url</InputLabel>
//                             <Input id="photoUrl" onChange={(e) => this.handlePhotoUrl(e)} value={photoUrl}/>
//                         </FormControl>
//                         <Typography variant="h5" component="h1">Pratimai</Typography>
//                         {exercises.map(e => (
//                             <div key={e.idSportoProgramosPratimas}>
//                                 <FormControl className="formElement">
//                                     <InputLabel htmlFor={`id${e.idSportoProgramosPratimas}`}>Pavadinimas</InputLabel>
//                                     <Input id={`id${e.idSportoProgramosPratimas}`} value={e.fkPratimas.pavadinimas}/>
//                                 </FormControl>
//                                 <FormControl className="formElement">
//                                     <InputLabel htmlFor={`desc${e.idSportoProgramosPratimas}`}>Aprašymas</InputLabel>
//                                     <Input id={`desc${e.idSportoProgramosPratimas}`} value={e.fkPratimas.aprasymas}/>
//                                 </FormControl>
//                                 <FormControl className="formElement">
//                                     <InputLabel htmlFor={`photoUrl${e.idSportoProgramosPratimas}`}>Nuotraukos
//                                         url</InputLabel>
//                                     <Input id={`photoUrl${e.idSportoProgramosPratimas}`}
//                                            value={e.fkPratimas.nuotraukosUrl ? e.fkPratimas.nuotraukosUrl : ''}/>
//                                 </FormControl>
//                                 <FormControl className="formElement">
//                                     <InputLabel htmlFor={`sets${e.idSportoProgramosPratimas}`}>Setai</InputLabel>
//                                     <Input id={`sets${e.idSportoProgramosPratimas}`} value={e.setai}/>
//                                 </FormControl>
//                                 <FormControl className="formElement">
//                                     <InputLabel htmlFor={`reps${e.idSportoProgramosPratimas}`}>Kartojimai</InputLabel>
//                                     <Input id={`reps${e.idSportoProgramosPratimas}`} value={e.kartojimai}/>
//                                 </FormControl>
//                             </div>
//                         ))}
//                     </FormGroup>
//                     <Button
//                         variant="contained"
//                         color="primary"
//                         style={{marginTop: '1vh'}}
//                         startIcon={<AddIcon/>}
//                     >
//                         Add New Exercise
//                     </Button>
//                     <div className="blockWrapperAlignRight">
//                         <Button
//                             variant="contained"
//                             color="primary"
//                             style={{marginTop: '1vh'}}
//                             startIcon={<SaveIcon/>}
//                             onClick={() => this.saveSportProgram()}
//                         >
//                             Update
//                         </Button>
//                         {deleteButton}
//                     </div>
//                 </form>
//             </div>
//         );
//     }
//
//     render() {
//         return this.openSportProgramPage();
//     }
// }