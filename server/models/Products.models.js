const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Workout name is required"],
        minlength: [3, "Workout needs to be at least 3 characters long"]
    },
    lifts: [{
        liftName: {
            type: String
        },
        reps: {
            type: Number
        },
        sets: {
            type: Number
        }

    }],
    isCompleted: false,
    day: {
        type: String,
        required: [true, "Day of workout is required"],
    }

})

const Workout = mongoose.model("Workout", WorkoutSchema);


module.exports.Workout = Workout;