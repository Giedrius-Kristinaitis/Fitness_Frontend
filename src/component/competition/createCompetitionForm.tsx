import React, { useEffect, useState } from 'react';
import CompetitionForm from "./competitionForm";
import { useDispatch } from "react-redux";
import { Competition } from "../../state/competition";
import { createCreateCompetitionAction } from "../../action/competition";

const CreateCompetitionForm: React.FC = () => {
    const dispatch = useDispatch();

    const [ createRequired, setCreateRequired ] = useState<boolean>(false);
    const [ competition, setCompetition ] = useState<Competition | null>(null);

    useEffect(() => {
        if (!createRequired || !competition) {
            return;
        }

        dispatch(createCreateCompetitionAction(competition));
    }, [dispatch, competition, createRequired]);

    const actionButtonAction: Function = (name: string, description: string, location: string, startingDate: string, endingDate: string) => {
        setCompetition({
            id: 0,
            name,
            description,
            location,
            startingDate,
            endingDate,
        });

        setCreateRequired(true);
    };

    return <CompetitionForm title="Create New Competition" actionButtonText="Create"
                            actionButtonAction={actionButtonAction} competition={null}/>;
}

export default CreateCompetitionForm;