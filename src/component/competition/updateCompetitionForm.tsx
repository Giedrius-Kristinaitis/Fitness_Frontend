import React from 'react';
import CompetitionForm from "./competitionForm";
import { useSelector } from "react-redux";
import { AppState } from "../../state";
import { useParams } from 'react-router-dom';

const CompetitionDetailsForm: React.FC = () => {
    const { id } = useParams();

    const competition = useSelector((state: AppState) => {
        if (!id) {
            return null;
        }

        // TODO: get competition by id

        return null;
    });

    const actionButtonAction: Function = (name: string, description: string, location: string, startingDate: string, endingDate: string) => {

    };

    return <CompetitionForm title="Competition Details" actionButtonText="Save"
                            actionButtonAction={actionButtonAction} competition={competition}/>;
}

export default CompetitionDetailsForm;