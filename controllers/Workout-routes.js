const router = require('express').Router();
const Workout = require('../models/Workout');

// route to create new workout
router.post("/workouts", ({ body }, res) => {
  console.log("workouts work")
      
    Workout.create({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  }
);


router.get("/workouts", ({ body }, res) => {
  console.log("workouts work")
      
    Workout.aggregate([
    {
      $addFields:{
        totalDuration:{
          $sum:'$exercises.duration',
        }
      }
    }
    ])
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  }
);


// route to create new exercise
router.post("/workouts/:id", ({ body }, res) => {
  const workout = new Workout(body);
    
  Workout.create(workout)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
}
);

// router.get('/workouts/range', )


module.exports = router;