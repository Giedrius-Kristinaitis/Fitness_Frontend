import React, { useEffect, useState } from 'react';
import ExerciseForm from "./exerciseForm";
import { useDispatch } from "react-redux";
import { Exercise } from "../../state/exercise";
import { createCreateExerciseAction } from "../../action/exercise";

const CreateExerciseForm: React.FC = () => {
    const dispatch = useDispatch();

    const [ createRequired, setCreateRequired ] = useState<boolean>(false);
    const [ exercise, setExercise ] = useState<Exercise | null>(null);

    useEffect(() => {
        if (!createRequired || !exercise) {
            return;
        }

        dispatch(createCreateExerciseAction(exercise));
    }, [dispatch, exercise, createRequired]);

    const actionButtonAction: Function = (videoUrl: string, sportsmanId: number, sportId: number,) => {
        setExercise({
            id: 100,
            videoUrl,
            sportsmanId,
            sportId, eval: 0, evalDate: "", num: 0, sportName: ""
        });

        setCreateRequired(true);
    };

    return <ExerciseForm title="Create New Exercise" actionButtonText="Create"
                            actionButtonAction={actionButtonAction} exercise={null}/>;
}

export default CreateExerciseForm;