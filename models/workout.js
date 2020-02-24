const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },

    exercises:[{
    type: {
        type: String,
        trim: true,
    },
    name: {
        type: String,
        trim: true
    },
    distance: {
        type: Number
    },
    duration: {
        type: Number
    },
    weight: {
        type: Number
    },
    reps: {
        type: Number
    },
    sets: {
        type: Number
    }
    }],
    totalDuration: {
        type: Number,
        default: 40
    }
});

const Workout = mongoose.model("exercise", workoutSchema);

module.exports = Workout;