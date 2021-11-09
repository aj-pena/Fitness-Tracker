const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const Workout = require('./models/Workout.js');

const PORT = process.env.PORT || 3000

const app = express();

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// create connection via mongoose with Mongo database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Workouts", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology:true,
  useCreateIndex:true
});

// routes
app.use(require("./public/api.js"));
// err: requires use of middleware,at api.js-> const router = require('express').Router()?


// route to create new workout
app.post("/api/workouts", ({ body }, res) => {
    const workout = new Workout(body);
      
    Workout.create(workout)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

// listener for server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
