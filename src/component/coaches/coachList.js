import React, {useEffect, useState} from "react";
import {withStyles} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import {Button, Paper} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import {useDispatch, useSelector} from "react-redux";
import {getRecommendedCoaches} from "../../action/coaches";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const CoachList = (props) => {
    const coaches = useSelector(state => state.coachesReducer.coaches);

    const showCoaches = coaches ? coaches.map(coach => (
        <TableRow key={coach.idNaudotojas}>
            <StyledTableCell>{coach.idNaudotojasNavigation.vardas}</StyledTableCell>
            <StyledTableCell>{coach.idNaudotojasNavigation.pavarde}</StyledTableCell>
            <StyledTableCell>{coach.idNaudotojasNavigation.epastas}</StyledTableCell>
            <StyledTableCell>{coach.kaina}</StyledTableCell>
        </TableRow>
    )) : null;


    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Vardas</StyledTableCell>
                            <StyledTableCell>Pavarde</StyledTableCell>
                            <StyledTableCell>E. Paštas</StyledTableCell>
                            <StyledTableCell>Kaina</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {showCoaches}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default CoachList;