const router = require('express').Router();

// const apiRoutes = require('../public/api');
const workoutRoutes = require('./Workout-routes');

router.use('/api', workoutRoutes);
// router.use('/', apiRoutes);
// router.get('*', (req, res) => { 
//     res.render('homepage');
//   })

module.exports = router;



