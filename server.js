const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000

const app = express();

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// create connection via mongoose with Mongo database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/FitnesTracker", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology:true,
  useCreateIndex:true
});

// routes
app.use(require("./public/api.js"));

// listener for server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
