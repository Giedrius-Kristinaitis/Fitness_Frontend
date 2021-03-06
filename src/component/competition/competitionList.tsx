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
import {Competition, CompetitionUIListState} from "../../state/competition";
import {
    createCompetitionResetRedirectRequiredAction, createDeleteCompetitionAction,
    createFetchAllCompetitionsAction,
    createFetchAllCompetitionsCompletedAction, createJoinCompetitionAction
} from "../../action/competition";
import {AppState, FormMessageType} from "../../state";
import {Button, LinearProgress, Typography} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import {history} from "../../customHistory";
import Snackbar from "@material-ui/core/Snackbar";
import {Alert} from "../alert";
import {createFetchAllUserExercisesCompletedAction} from "../../action/exercise";

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

interface CompetitionProps {
    competitions: Competition[],
    loadingState: CompetitionUIListState,
}

const extractCompetitionsFromState = (state: AppState): Competition[] => {
    const competitions: Competition[] = [];

    for (const competitionId in state.competitionEntityReducer.entities) {
        competitions.push(state.competitionEntityReducer.entities[competitionId]);
    }

    return competitions;
}

const CompetitionList: React.FC = () => {
    const props: CompetitionProps = useSelector((state: AppState) => {
        return {
            competitions: extractCompetitionsFromState(state),
            loadingState: state.competitionUIReducer.state,
        }
    });

    const dispatch = useDispatch();
    const classes = useStyles();

    const itemClicked: Function = (competitionId: number) => {
        history.push(`/competition/view/${competitionId}`);
    }

    const [ messageOpen, setMessageOpen ] = useState<boolean>(true);

    useEffect(() => {
        dispatch(createCompetitionResetRedirectRequiredAction());
        // @ts-ignore
        dispatch(createFetchAllCompetitionsAction());
    }, [ dispatch ]);

    const newCompetitionClicked = () => {
        history.push('/competition/create');
    }
    const deleteItem: Function = (competitionId: number) => {
        dispatch(createDeleteCompetitionAction(competitionId));
        //dispatch(createFetchAllUserExercisesAction(1));

        const items = props.competitions.filter(item => item.id !== competitionId);
        props.competitions = items;
        dispatch(createFetchAllCompetitionsCompletedAction(items))
        setMessageOpen(true);
        //history.push(`/exercise/all`);
    }
    const joinCompetition: Function = (competition: Competition) => {
        dispatch(createJoinCompetitionAction(competition,1));
        //dispatch(createFetchAllUserExercisesAction(1));
        //setMessageOpen(true);

        //dispatch(createFetchAllCompetitionsCompletedAction(items))

        //history.push(`/exercise/all`);
    }
    const { listMessage, listMessageType } = useSelector((state: AppState) => {
        return {
            listMessage: state.competitionUIReducer.competitionListMessage,
            listMessageType: state.competitionUIReducer.competitionListMessageType,
        };
    });

    const progress = props.loadingState === CompetitionUIListState.STATE_LOADING ? <LinearProgress/> : null;

    const message = listMessage && listMessageType !== FormMessageType.MESSAGE_NONE ?
        // @ts-ignore
        <Snackbar open={messageOpen} autoHideDuration={5000} onClose={() => setMessageOpen(false)}><Alert severity={listMessageType}>{listMessage}</Alert></Snackbar> : null;

    const competitionList = props.loadingState === CompetitionUIListState.STATE_LOADED ?
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Title</StyledTableCell>
                        <StyledTableCell align="right">Location</StyledTableCell>
                        <StyledTableCell align="right">Starts On</StyledTableCell>
                        <StyledTableCell align="right">Ends On</StyledTableCell>
                        <StyledTableCell align="right">Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.competitions.map((competition: Competition) => (
                        <TableRow className="tableRow" key={competition.id}
                                  >
                            <StyledTableCell component="th" scope="row">{competition.name}</StyledTableCell>
                            <StyledTableCell align="right">{competition.location}</StyledTableCell>
                            <StyledTableCell
                                align="right">{new Date(competition.startingDate).toLocaleString('lt-LT')}</StyledTableCell>
                            <StyledTableCell
                                align="right">{new Date(competition.endingDate).toLocaleString('lt-LT')}</StyledTableCell>
                            <StyledTableCell
                                align="right">
                                <button  onClick={(e) => { if (window.confirm('Do you want to join this competition??')) joinCompetition(competition)  } }>
                                    Join
                                </button>
                                <button  onClick={(e) => { itemClicked(competition.id) } }>
                                    Update
                                </button>
                                <button  onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) deleteItem(competition.id) } }>
                                    Delete
                                </button>
                            </StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer> : (props.loadingState === CompetitionUIListState.STATE_EMPTY
        || props.loadingState === CompetitionUIListState.STATE_FAILED
        || !props.competitions ? (
            <Typography align="center">No competitions found</Typography>) : null);

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<AddIcon/>}
                onClick={() => newCompetitionClicked()}
            >
                New Competition
            </Button>
            {progress}
            {competitionList}
            {message}
        </div>
    );
}

export default CompetitionList;