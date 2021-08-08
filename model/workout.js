//dependency..
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [{
    name: {
      type: String,
      trim: true,
      required: "Excercise name is required."
    },
    type: {
      type: String,
      trim: true,
      required: "Excercise type is required"
    },
    weight: {
      type: Number,
    },
    sets: {
      type: Number,
    },
    reps: {
      type: Number,
    },
    duration: {
      type: Number,
    },
    distance: {
      type: Number
    }
  }],
},
{ //lets us add virtual propeties
  toJson: {
    virtuals: true
  }
});

//dynamic propeties fro schema...
workoutSchema.virtual('totalDuration').get(function () {
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0);
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
