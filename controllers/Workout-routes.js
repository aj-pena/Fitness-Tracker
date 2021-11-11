const router = require('express').Router();
const Workout = require('../models/Workout');

// route to create new workout
router.post("/workouts", ({ body }, res) => {
  console.log("Request to create a new workout received")
      
    Workout.create({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  }
);

// route to get the last workout
router.get("/workouts", ({ body }, res) => {
  console.log("Request to get last workout received")
      
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

//route to get the last seven workouts stats 

// router.get('/workouts/range', (req, res) => {
//   // console.log(req);
//   // console.log(res);
//   Workout.aggregate
//   // .then()
//   // .catch((err)=>{
//   //   console.log(err);
//   //   res.send(err);
//   // })
// })


module.exports = router;