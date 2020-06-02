import React, {useState} from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormGroup from "@material-ui/core/FormGroup";
import {Button, Typography} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import {useDispatch, useSelector} from "react-redux";
import {getRecommendedCoaches, resetCoachRedirect} from "../../action/coaches";
import {history} from "../../customHistory";
import {AppState, FormMessageType} from "../../state";
import Snackbar from "@material-ui/core/Snackbar";
import {Alert} from "../alert";

const CoachesListView = (props) => {
    const dispatch = useDispatch();

    const redirectRequired = useSelector((state) => {
        return state.coachesReducer.redirectToListRequired;
    });

    const redirect = () => {
        dispatch(resetCoachRedirect());
        history.push('/coaches/recommended');
    }

    if (redirectRequired) {
        redirect();
    }

    const [min, setMin] = useState(0);
    const [max, setMax] = useState(10000);
    
    const getPriceIntervalFrom = () => {
        return {min, max};
    }
    const [ messageOpen, setMessageOpen ] = useState(true);

    const handleSubmit = () => {
        dispatch(getRecommendedCoaches(getPriceIntervalFrom()))
        setMessageOpen(true);
    }

    const { message, messageType } = useSelector((state) => {
        return {
            message: state.coachesReducer.message,
            messageType: state.coachesReducer.messageType,
        };
    });


    const messageSnackbar = message && messageType === 'error' ?
        // @ts-ignore
        <Snackbar open={messageOpen} autoHideDuration={5000} onClose={() => setMessageOpen(false)}><Alert severity={messageType}>{message}</Alert></Snackbar> : null;

    return (
        <div style={{maxWidth: '50vw'}}>
            <Typography variant="h4" component="h1">Rekomenduojamų trenerių paieška</Typography>
            <form action="#" method="POST">
                <FormGroup>
                    <FormControl className="formElement">
                        <InputLabel htmlFor="name">Kaina min</InputLabel>
                        <Input id="name" onChange={(e) => setMin(e.target.value)} value={min}/>
                    </FormControl>
                    <FormControl className="formElement">
                        <InputLabel htmlFor="name">Kaina max</InputLabel>
                        <Input id="name" onChange={(e) => setMax(e.target.value)} value={max}/>
                    </FormControl>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{marginTop: '1vh'}}
                        startIcon={<SearchIcon/>}
                        onClick={() => handleSubmit()}
                    >
                        Search
                    </Button>
                </FormGroup>
            </form>
            {messageSnackbar}
        </div>
    );
}

export default CoachesListView;