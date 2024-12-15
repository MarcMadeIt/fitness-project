import mongoose from "mongoose";

const Schema = mongoose.Schema;

const WorkoutSessionSchema = new Schema({

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    workoutLogs: [{
        type: Schema.Types.ObjectId,
        ref: 'WorkoutLogs'
    }],

}, { timestamps: true });

export default mongoose.model("WorkoutSession", WorkoutSessionSchema)