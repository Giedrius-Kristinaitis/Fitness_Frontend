import React, { useEffect, useState } from 'react';
import CompetitionForm from "./competitionForm";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../state";
import { useParams } from 'react-router-dom';
import { Competition } from "../../state/competition";
import { createFetchSingleCompetitionAction, createUpdateCompetitionAction } from "../../action/competition";

const CompetitionDetailsForm: React.FC = () => {
    const { id } = useParams();

    const [ queuedUpUpdateCompetition, setQueuedUpUpdateCompetition ] = useState<Competition | null>(null);

    const competition = useSelector((state: AppState) => {
        if (!id) {
            return null;
        }

        const competitionId = Number(id);

        if (!(competitionId in state.competitionEntityReducer.entities)) {
            return null;
        }

        return state.competitionEntityReducer.entities[competitionId];
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (competition) {
            return;
        }

        dispatch(createFetchSingleCompetitionAction(Number(id)));
    }, [ competition, id, dispatch ]);

    useEffect(() => {
        if (!queuedUpUpdateCompetition) {
            return;
        }

        dispatch(createUpdateCompetitionAction(queuedUpUpdateCompetition));
    }, [ queuedUpUpdateCompetition, dispatch ]);

    const actionButtonAction: Function = (name: string, description: string, location: string, startingDate: string, endingDate: string): void => {
        if (!competition) {
            return;
        }

        const updatedCompetition: Competition = { ...competition };

        updatedCompetition.name = name;
        updatedCompetition.description = description;
        updatedCompetition.location = location;
        updatedCompetition.startingDate = startingDate;
        updatedCompetition.endingDate = endingDate;

        setQueuedUpUpdateCompetition(updatedCompetition);
    };

    return <CompetitionForm title="Competition Details" actionButtonText="Save"
                            actionButtonAction={actionButtonAction} competition={competition}/>;
}

export default CompetitionDetailsForm;