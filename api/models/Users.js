import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UsersSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    createdWorkout: [
        {
            type: Schema.Types.ObjectId,
            ref: 'WorkoutTypes'
        }
    ]

}, { timestamps: true });

export default mongoose.model("Users", UsersSchema)