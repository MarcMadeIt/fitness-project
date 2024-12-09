import Users from "../../models/Users.js";
import WorkoutTypes from "../../models/WorkoutTypes.js";

const workoutTypesResolver = {

    getWorkoutTypes: async () => {
        try {
            const workouts = await WorkoutTypes.find();
            return workouts;
        } catch (err) {
            throw err;
        }
    },

    createWorkoutType: async ({ workoutTypeInput }, req) => {

        if (!req.isLoggedIn) {
            throw new Error("Unauthenticated");
        }

        try {

            const checkWorkout = await WorkoutTypes.findOne({ name: workoutTypeInput.name });
            if (checkWorkout) {
                throw new Error("WorkoutType already exists, try again!");
            }

            const creator = await Users.findById(req.userId);
            if (!creator) {
                throw new Error("Creator not found!");
            }

            const workout = new WorkoutTypes({
                name: workoutTypeInput.name,
                desc: workoutTypeInput.desc,
                part: workoutTypeInput.part,
                creator: req.userId,
            });

            const result = await workout.save();

            creator.createdWorkout.push(result._id);
            await creator.save();

            const populatedResult = await WorkoutTypes.findById(result._id)
                .populate("creator")
                .exec();

            return { ...populatedResult._doc };
        } catch (err) {
            throw err;
        }
    },


}

export default workoutTypesResolver;