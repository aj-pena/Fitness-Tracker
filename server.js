const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
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

// route to get stats.html
app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname,'./public','stats.html'))    
}
);

// create connection via mongoose with Mongo database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/FitnessTracker", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology:true,
  useCreateIndex:true
});

// routes
//  /api/workouts   (getLastWorkout, CreateWorkout)
//  /api/workouts/:id   (addExercise)
//  /api/workouts/range   (getWorkoutsInRange)




// listener for server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
