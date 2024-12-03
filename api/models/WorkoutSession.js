import mongoose from "mongoose";

const Schema = mongoose.Schema;

const WorkoutSessionSchema = new Schema({

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    workoutLogs: [{
        type: Schema.Types.ObjectId,
        ref: 'WorkoutLog'
    }],

}, { timestamps: true });

export default mongoose.model("WorkoutSession", WorkoutSessionSchema)