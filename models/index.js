const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    exercise: {
        type: String,
        trim: true
    },
    duration: {
        type: Number
    },
    
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
