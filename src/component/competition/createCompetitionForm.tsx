import React from 'react';
import CompetitionForm from "./competitionForm";

const CreateCompetitionForm: React.FC = () => {
    const actionButtonAction: Function = (name: string, description: string, location: string, startingDate: string, endingDate: string) => {

    };

    return <CompetitionForm title="Create New Competition" actionButtonText="Create"
                            actionButtonAction={actionButtonAction} competition={null}/>;
}

export default CreateCompetitionForm;