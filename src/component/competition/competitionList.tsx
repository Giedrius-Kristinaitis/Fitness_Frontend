import React, { useEffect } from 'react';
import { connect, DispatchProp } from 'react-redux';
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

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        width: "100%"
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

interface CompetitionProps extends DispatchProp {
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

const mapStateToProps = (state: AppState) => {
    return {
        competitions: extractCompetitionsFromState(state),
        loadingState: state.competitionUIReducer.state,
    }
}

const CompetitionList: React.FC<CompetitionProps> = (props: CompetitionProps) => {
    const classes = useStyles();

    const itemClicked: Function = (competitionId: number) => {
        console.log(competitionId);
    }

    useEffect(() => {
        const { dispatch } = props;

        // @ts-ignore
        dispatch(createFetchAllCompetitionsAction());
    }, []);

    return (
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
                        <StyledTableRow className="tableRow" key={competition.id} onClick={() => itemClicked(competition.id)}>
                            <StyledTableCell component="th" scope="row">{competition.pavadinimas}</StyledTableCell>
                            <StyledTableCell align="right">{competition.vieta}</StyledTableCell>
                            <StyledTableCell align="right">{competition.prasidejimoData}</StyledTableCell>
                            <StyledTableCell align="right">{competition.pabaigosData}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

// @ts-ignore
export default connect(mapStateToProps)(CompetitionList);