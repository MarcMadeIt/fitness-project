import WorkoutSession from '../../models/WorkoutSession.js'


const workoutSessionsResolver = {

    getWorkoutSessions: async (_, req) => {
        const userId = req.userId;
        if (!userId) {
            throw new Error("User is not authenticated");
        }

        try {
            const workoutSessions = await WorkoutSession.find({ creator: userId })
                .sort({ createdAt: -1 })
                .populate({
                    path: 'creator',
                    select: 'username _id',
                })
                .populate({
                    path: 'workoutLogs',
                    populate: {
                        path: 'workoutType',
                        select: 'name',
                    }
                })
                .exec();

            if (!workoutSessions.length) {
                throw new Error("No workout sessions found for this user");
            }

            return workoutSessions;
        } catch (error) {
            console.error("Error in getWorkoutSessions:", error);
            throw new Error("Failed to fetch workout sessions for user");
        }
    },


    getAllWorkoutSessions: async () => {
        try {
            const workoutSessions = await WorkoutSession.find()
                .sort({ createdAt: -1 })
                .populate({
                    path: 'creator',
                    select: 'username _id',
                })
                .populate({
                    path: 'workoutLogs',
                    populate: {
                        path: 'workoutType',
                        select: 'name',
                    }
                })
                .exec();

            if (!workoutSessions.length) {
                throw new Error("No workout sessions found");
            }

            return workoutSessions;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch all workout sessions');
        }
    },

    getWorkoutLimitSessions: async (_, req) => {
        const userId = req.userId;
        if (!userId) {
            throw new Error("User is not authenticated");
        }

        try {
            const workoutSessions = await WorkoutSession.find({ creator: userId })
                .sort({ createdAt: -1 })
                .limit(4)
                .populate({
                    path: 'creator',
                    select: 'username _id',
                })
                .populate({
                    path: 'workoutLogs',
                    populate: {
                        path: 'workoutType',
                        select: 'name',
                    }
                })
                .exec();

            if (!workoutSessions.length) {
                throw new Error("No workout sessions found for this user");
            }

            return workoutSessions;
        } catch (error) {
            console.error("Error in getWorkoutSessions:", error);
            throw new Error("Failed to fetch workout sessions for user");
        }
    },



    createWorkoutSession: async ({ workoutSessionInput }, req) => {

        try {
            const userId = req.userId;
            if (!userId) {
                throw new Error("Creator not found");
            }

            const session = new WorkoutSession({
                creator: userId,
                workoutLogs: workoutSessionInput.workoutLogIds,
            });

            const result = await session.save();
            return { ...result._doc };
        } catch (err) {
            console.error("Error in createWorkoutSession:", err);
            throw new Error("Error creating workout session");
        }
    }


}

export default workoutSessionsResolver;