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
      required: "Please enter the name for this exercise."
    },
    type: {
      type: String,
      trim: true,
      required: "Please enter a type for this workout"
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
  totalDuration: {
        type: Number,
        default: 0,
  },
});

//custom method to return total time spent workingout...

workoutSchema.methods.workoutDuration = function () {
  for (let i = 0; i < this.exercises.length; i++)
    {
        this.totalDuration += this.exercises[i].duration;
    }
    return this.totalDuration;
}
const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
