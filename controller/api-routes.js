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
  Workout.aggregate([{
        $unwind: "$exercises"
      },
      {
        $group: {
          _id: "$day",
          day: {
            $push: {
              $max: "$day"
            }
          },
          totalDuration: {
            $sum: "$exercises.duration"
          },
          totalWeight: {
            $sum: "$exercises.weight"
          }
        }
      },
      {
        $sort: {
          _id: -1
        }
      },
      {
        $limit: 7
      },
      {
        $sort: {
          _id: 1
        }
      },
    ])
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      console.log(err)
      res.status(400).json(err);
    });
})



//POST Requests...
router.post("/workouts", ({
  body
}, res) => {
  const workout = new Workout(body);
  workout.workoutDuration();

  Workout.create(workout)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post("/workouts/bulk", ({
  body
}, res) => {
  Workout.insertMany(body)
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
