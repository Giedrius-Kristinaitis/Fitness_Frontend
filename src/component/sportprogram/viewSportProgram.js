import React from "react";
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

    const openSportProgramPage = <SportProgramForm sportprogram={getSportProgram}/>
    return openSportProgramPage;
}

export default ViewSportProgram;
//
// class ViewSportProgram extends React.Component {
//     constructor(props) {
//         super(props);
//
//         const idParam = this.props.match.params.id;
//         this.loadIfNeeded(idParam);
//     }
//
//     loadIfNeeded(id) {
//         const sportProgram = this.props.sportprogram;
//         if (!sportProgram || sportProgram && sportProgram.idSportoPrograma !== id) {
//             this.props.dispatch(fetchSportProgram(id));
//         }
//     }
//
//     getSportProgram() {
//         return this.props.sportprogram;
//     }
//
//     openSportProgramPage() {
//         const sportProgram = this.getSportProgram();
//
//         return (
//             <SportProgramForm sportprogram={sportProgram}/>
//         );
//     }
//
//     render() {
//         return this.openSportProgramPage();
//     }
//
//
// }
//
// const mapStateToProps = (state, ownProps) => {
//     return {sportprogram: state.sportProgramsReducer.sportprogram, isFetching: state.sportProgramsReducer.isFetching}
// }
//
// export default connect(mapStateToProps)(ViewSportProgram);