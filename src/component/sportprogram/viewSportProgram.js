import React, {useState} from "react";
import {fetchSportProgram} from "../../action/sportprogram";
import {connect, useSelector} from "react-redux";
import SportProgramForm from "./sportProgramForm";
import {useParams} from "react-router";
import sportProgramsReducer from "../../reducer/sportprogram";

const ViewSportProgram = (props) => {
    const {id} = useParams();


    const getSportProgram = useSelector((state) => {
        if(!id) {
            return null;
        }

        for(const p of state.sportProgramsReducer.sportprograms) {
            if (p.idSportoPrograma === +id) {
                return p;
            }
        }

        return null;
    });

    const [sportProgram, setSportProgram] = useState({...getSportProgram});


    const openSportProgramPage = <SportProgramForm sportprogram={sportProgram} updateSportProgram={setSportProgram}/>
    return openSportProgramPage;
}

export default ViewSportProgram;