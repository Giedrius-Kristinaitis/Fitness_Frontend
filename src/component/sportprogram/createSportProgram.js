import React from "react";
import SportProgramForm from "./sportProgramForm";
import {connect} from "react-redux";

class CreateSportProgram extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SportProgramForm sportprogram={null}/>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {sportprogram: state.sportProgramsReducer.sportprogram, isFetching: state.sportProgramsReducer.isFetching}
}

export default connect(mapStateToProps)(CreateSportProgram);