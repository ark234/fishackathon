// Import dependencies
const Fish = require('../models/fish.js');
const router = require('express').Router();

router.get('/', Fish.getSensorData, (req, res) => {
	console.log('Fish route hit! ');
	res.render('./fish', { sensorData: res.locals.sensorData });
});

module.exports = router;
