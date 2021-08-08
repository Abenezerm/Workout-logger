const router = require("express").Router();
const mongojs = require('mongojs');
const mongoose = require("mongoose")
const Workout = require("../model/workout.js");

//GET Requests..
router.get("/workouts", (req, res) => {
  Workout.find({})
    .sort({
      day: 1
    })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/workouts/range", async (req, res) => {
  Workout.find({}).limit(7)
		.then((dbWorkouts) => {
			res.json(dbWorkouts);
		})
		.catch((err) => {
			res.json(err);
		});
})



//POST Requests...
router.post("/workouts", ({
  body
}, res) => {
  const workout = new Workout(body);

  Workout.create(workout)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});




//PUT Requests...
router.put("/workouts/:id", (req, res) => {
  Workout.updateOne({
      _id: mongojs.ObjectId(req.params.id)
    }, {
      $push: {
        exercises: req.body
      }
    })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
