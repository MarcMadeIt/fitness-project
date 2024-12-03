import mongoose from "mongoose";


const Schema = mongoose.Schema;

const WorkoutTypesSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true
    },
    part: {
        type: String,
        required: true,
        enum: ['Legs', 'Back', 'Front', 'Overall']
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }

}, { timestamps: true });

export default mongoose.model("WorkoutTypes", WorkoutTypesSchema)