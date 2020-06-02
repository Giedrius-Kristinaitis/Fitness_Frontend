import React, { useEffect, useState } from 'react';
import ExerciseInfoView from "./exerciseInfoView";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../state";
import { useParams } from 'react-router-dom';
import { Exercise } from "../../state/exercise";
import { createFetchSingleExerciseAction, createUpdateExerciseAction } from "../../action/exercise";

const TrainerExerciseDetailsForm: React.FC = () => {
    const { id } = useParams();
    const [ queuedUpUpdateExercise, setQueuedUpUpdateExercise ] = useState<Exercise | null>(null);

    const exercise = useSelector((state: AppState) => {
        if (!id) {
            return null;
        }

        const exerciseId = Number(id);

        if (!(exerciseId in state.exerciseEntityReducer.entities)) {
            return null;
        }

        return state.exerciseEntityReducer.entities[exerciseId];
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (exercise) {
            return;
        }

        dispatch(createFetchSingleExerciseAction(Number(id)));
    }, [ exercise, id, dispatch ]);

    useEffect(() => {
        if (!queuedUpUpdateExercise) {
            return;
        }

        dispatch(createUpdateExerciseAction(queuedUpUpdateExercise));
    }, [ queuedUpUpdateExercise, dispatch ]);

    const actionButtonAction: Function = (sportId: number, videoUrl: string, num: number): void => {
        if (!exercise) {
            return;
        }

        const updatedExercise: Exercise = { ...exercise };

        updatedExercise.sportId = sportId;
        updatedExercise.videoUrl = videoUrl;
        updatedExercise.num = num;


        setQueuedUpUpdateExercise(updatedExercise);

    };

    return <ExerciseInfoView title="Exercise Details" actionButtonText="Save"
                             actionButtonAction={actionButtonAction} exercise={exercise}/>;
}

export default TrainerExerciseDetailsForm;