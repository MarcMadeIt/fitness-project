import WorkoutLogs from "../../models/WorkoutLogs.js";
import WorkoutTypes from "../../models/WorkoutTypes.js";

const workoutLogsResolver = {

    getWorkoutLogs: async () => {
        try {
            const logs = await WorkoutLogs.find()
                .populate('user')
                .exec();
            return logs.map(log => {
                return { ...log._doc, _id: log.id, createdAt: new Date(booking._doc.createdAt).toISOString() }
            })
        } catch (err) {
            throw err('Cant find workout logs')
        }
    },

    createWorkoutLog: async ({ workoutLogInput }, req) => {

        try {
            const userId = req.userId;

            const workoutType = await WorkoutTypes.findById(workoutLogInput.workoutTypeId);

            if (!workoutType) {
                throw new Error("Workout type not found");
            }

            const log = new WorkoutLogs({
                workoutType: workoutType._id,
                weight: workoutLogInput.weight,
                sets: workoutLogInput.sets,
                reps: workoutLogInput.reps,
                creator: userId,
            });

            // Save workout log
            const result = await log.save();

            return { ...result._doc };
        } catch (err) {
            console.error(err);
            throw new Error("Error creating workout log");
        }
    },
}

export default workoutLogsResolver;