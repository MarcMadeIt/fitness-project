import Users from "../../models/Users.js";
import WorkoutLogs from "../../models/WorkoutLogs.js";
import WorkoutSession from "../../models/WorkoutSession.js";

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


    createWorkoutLog: async ({ workoutLogInput }) => {
        if (!req.secureAuth) {
            throw new Error('Unauthenticated!')
        }
        try {
            const user = await Users.findById(workoutLogInput.user);
            if (!user) {
                throw new Error('User not found');
            }

            const session = await WorkoutSession.findById(workoutLogInput.sessionId);
            if (!session) {
                throw new Error('Session not found');
            }

            const log = new WorkoutLogs({
                workoutType: workoutLogInput.workoutTypeId,
                weight: workoutLogInput.weight,
                sets: workoutLogInput.sets,
                reps: workoutLogInput.reps,
                creator: user._id,
            });


            const result = await log.save();


            session.workoutLogs.push(result._id);
            await session.save();

            const populatedResult = await WorkoutLogs.findById(result._id)
                .populate('workoutType')
                .exec();

            return { ...populatedResult._doc };

        } catch (err) {
            console.log(err);
            throw err;
        }
    },
}

export default workoutLogsResolver;