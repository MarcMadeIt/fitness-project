import mongoose from "mongoose";

const Schema = mongoose.Schema;

const WorkoutLogsSchema = new Schema({

    workoutType: {
        type: Schema.Types.ObjectId,
        ref: 'WorkoutTypes'
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    weight: {
        type: Number,
        required: true
    },
    sets: {
        type: Number,
        required: true,
    },
    reps: {
        type: Number,
        required: true,
    },

}, { timestamps: true });

export default mongoose.model("WorkoutLogs", WorkoutLogsSchema)