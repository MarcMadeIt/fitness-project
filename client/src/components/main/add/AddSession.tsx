import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";
import {
  resetCurrentWorkout,
  addWorkout,
  toggleWorkout,
  addWorkoutLog,
} from "../../../store/workout/workoutSlice";
import { submitWorkoutSession } from "../../../store/workout/workoutThunks";
import AddWorkout from "./AddWorkout";
import { useState } from "react";
import Modal from "./elements/Modal";
import { v4 as uuidv4 } from "uuid";
import Alert from "../../messages/Alert";

const AddSession = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentWorkoutLogs, workouts, workoutTypes } = useSelector(
    (state: RootState) => state.workout
  );
  const userId = useSelector((state: RootState) => state.auth.user?.userId);

  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalMessage, setModalMessage] = useState<string>("");
  const [modalCallback, setModalCallback] = useState<() => void>(
    () => () => {}
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleSaveWorkout = (
    workoutType: { _id: string; name: string },
    workoutId: number,
    weight: number | null,
    sets: number | null,
    reps: number | null,
    creator: string
  ) => {
    dispatch(
      addWorkoutLog({
        _id: uuidv4(),
        workoutType,
        weight,
        sets,
        reps,
        creator,
      })
    );

    dispatch(addWorkout({ id: workoutId, name: workoutType.name }));
  };

  const handleCompleteSession = async () => {
    if (!userId) {
      console.error("User not authenticated!");
      return;
    }

    try {
      await dispatch(
        submitWorkoutSession({
          userId,
          workoutLogs: currentWorkoutLogs,
        })
      );
      closeModal();
      setAlertMessage("Session is succesfully completed!");
    } catch (error) {
      console.error("Error completing session:", error);
    }
  };

  const handleResetSession = () => {
    dispatch(resetCurrentWorkout());
    closeModal();
    setAlertMessage("The session is reset");
  };

  const handleToggleWorkout = (workoutId: number) => {
    dispatch(toggleWorkout(workoutId));
  };

  const openModal = (action: "complete" | "reset") => {
    if (action === "complete") {
      setModalTitle("Complete Session");
      setModalMessage("Are you sure you want to complete the session?");
      setModalCallback(() => handleCompleteSession);
    } else if (action === "reset") {
      setModalTitle("Reset Session");
      setModalMessage("Are you sure you want to reset the session?");
      setModalCallback(() => handleResetSession);
    }

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {alertMessage && (
        <Alert message={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
      <div className="flex flex-col gap-3 items-center">
        {workouts.map((workout) => (
          <div
            key={workout.id}
            className={`collapse bg-base-200 rounded-box ${
              workout.isOpen ? "collapse-open" : "collapse-close"
            }`}
          >
            <div
              className="collapse-title cursor-pointer bg-base-300 flex justify-between px-5"
              onClick={() => handleToggleWorkout(workout.id)}
            >
              <span className="font-medium">
                {workout.workoutTypeName || workout.name}
              </span>
              <span className="w-8 h-8 ring-2 ring-primary rounded-full flex items-center justify-center font-bold">
                {workout.id + 1}
              </span>
            </div>
            <div className="collapse-content">
              <AddWorkout
                workoutId={workout.id}
                onSave={handleSaveWorkout}
                isOpen={workout.isOpen}
                workoutTypes={workoutTypes}
              />
            </div>
          </div>
        ))}
        <div className="mt-6 flex flex-col items-center gap-4">
          <button
            className="btn btn-primary"
            onClick={() => openModal("complete")}
          >
            Complete Session
          </button>
          <button className="btn btn-sm" onClick={() => openModal("reset")}>
            Reset Session
          </button>
        </div>
        {isModalOpen && (
          <Modal
            title={modalTitle}
            message={modalMessage}
            onConfirm={modalCallback}
            onClose={closeModal}
          />
        )}
      </div>
    </>
  );
};

export default AddSession;
