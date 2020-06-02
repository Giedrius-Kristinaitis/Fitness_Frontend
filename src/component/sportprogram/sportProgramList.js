import React, {useState} from "react";
import {fetchAllSportPrograms} from "../../action/sportprogram";
import {connect} from "react-redux";
import {Button, Paper} from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {withStyles} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {history} from "../../customHistory";
import AddIcon from "@material-ui/icons/Add";
import {Alert} from "../alert";
import Snackbar from "@material-ui/core/Snackbar";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

class SportProgramList extends React.Component {
    constructor(props) {
        super(props);

        const dispatch = this.props.dispatch;
        dispatch(fetchAllSportPrograms());
    }

    handleClick(sportProgramId) {
        history.push(`/sportprograms/view/${sportProgramId}`);
    }

    getAllPrograms() {
        const {sportprograms} = this.props;
        return sportprograms;
    }

    createSportProgram() {
        history.push('/sportprograms/create');
    }


    openSportProgramPage() {
        const sportprograms = this.getAllPrograms();
        return (
            <div>
                <Button
                    style={{marginBottom: '1vh'}}
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon/>}
                    onClick={() => this.createSportProgram()}
                >
                    New Sport Program
                </Button>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>ID</StyledTableCell>
                                <StyledTableCell>Pavadinimas</StyledTableCell>
                                <StyledTableCell>Aprašymas</StyledTableCell>
                                <StyledTableCell align="right">Pratimai</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sportprograms.map(program => (
                                <TableRow key={program.idSportoPrograma}
                                          onClick={() => this.handleClick(program.idSportoPrograma)}>
                                    <StyledTableCell>{program.idSportoPrograma}</StyledTableCell>
                                    <StyledTableCell>{program.pavadinimas}</StyledTableCell>
                                    <StyledTableCell>{program.aprasas}</StyledTableCell>
                                    <StyledTableCell
                                        align="right">{program.sportoProgramosPratimas.length}</StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }

    render() {
        return this.openSportProgramPage();
    }
}

const mapStateToProps = (state) => {
    return {
        sportprograms: state.sportProgramsReducer.sportprograms,
        isFetching: state.sportProgramsReducer.isFetching,
        message: state.sportProgramsReducer.message
    }
}

export default connect(mapStateToProps)(SportProgramList);