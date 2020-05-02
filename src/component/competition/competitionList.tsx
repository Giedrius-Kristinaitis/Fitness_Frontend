import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Competition, CompetitionUIListState } from "../../state/competition";
import { createFetchAllCompetitionsAction } from "../../action/competition";
import { AppState } from "../../state";
import { Button, LinearProgress, Typography } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

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
        console.log(competitionId);
    }

    useEffect(() => {
        // @ts-ignore
        dispatch(createFetchAllCompetitionsAction());
    }, [dispatch]);

    const progress = props.loadingState === CompetitionUIListState.STATE_LOADING ? <LinearProgress/> : null;

    const competitionList = props.loadingState === CompetitionUIListState.STATE_LOADED ?
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Title</StyledTableCell>
                        <StyledTableCell align="right">Location</StyledTableCell>
                        <StyledTableCell align="right">Starts On</StyledTableCell>
                        <StyledTableCell align="right">Ends On</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.competitions.map((competition: Competition) => (
                        <TableRow className="tableRow" key={competition.id}
                                  onClick={() => itemClicked(competition.id)}>
                            <StyledTableCell component="th" scope="row">{competition.pavadinimas}</StyledTableCell>
                            <StyledTableCell align="right">{competition.vieta}</StyledTableCell>
                            <StyledTableCell align="right">{competition.prasidejimoData}</StyledTableCell>
                            <StyledTableCell align="right">{competition.pabaigosData}</StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer> : (props.loadingState === CompetitionUIListState.STATE_EMPTY || !props.competitions ? (<Typography align="center">No competitions found</Typography>) : null);

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<AddIcon />}
            >
                New Competition
            </Button>
            {progress}
            {competitionList}
        </div>
    );
}

export default CompetitionList;