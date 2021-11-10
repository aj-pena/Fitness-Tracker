const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const Workout = require('./models/Workout.js');
const path = require('path');
const routes = require('./controllers')

const PORT = process.env.PORT || 3000

const app = express();
// middleware
app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.use(routes); 

  // route to get excercises.html
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname,'./public','exercise.html'))    
}
);

// create connection via mongoose with Mongo database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology:true,
  useCreateIndex:true
});

// routes
//  /api/workouts   (getLastWorkout, CreateWorkout)
//  /api/workouts/:id   (addExercise)
//  /api/workouts/range   (getWorkoutsInRange)


// route to create new workout


// listener for server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
