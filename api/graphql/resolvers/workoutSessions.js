import Users from "../../models/Users.js";
import WorkoutSession from "../../models/WorkoutSession.js";

const workoutSessionsResolver = {

    getWorkoutSessions: async () => {
        try {
            const sessions = await WorkoutSession.find();
            return sessions;
        } catch (err) {
            throw err('Cant find workout sessions')
        }
    },


    createWorkoutSession: async ({ workoutSessionInput }) => {
        if (!req.secureAuth) {
            throw new Error('Unauthenticated!')
        }
        try {
            const { userId, workoutLogIds } = workoutSessionInput;

            const user = await Users.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            const session = new WorkoutSession({
                creator: user._id,
                workoutLogs: workoutLogIds,
            });

            const result = await session.save();

            return { ...result._doc };

        } catch (err) {
            console.log(err);
            throw err;
        }
    },



}

export default workoutSessionsResolver;