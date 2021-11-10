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
router.put("/workouts/:id", ({ body, params }, res) => {
  Workout.findByIdAndUpdate(params.id, {
    $push: {exercises: body}
  })
  .then(() => res.send('Exercise added!'))
  .catch((err) => {
    console.log(err);
    res.send(err);    
  })
  
});

// router.get('/workouts/range', )


module.exports = router;