// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mustache = require('mustache-express');
const dotenv = require('dotenv').config();

// Configure app
const app = express();
const PORT = process.env.PORT || 3000;

// Register the engine template
app.engine('html', mustache());
// Set default .html file extension for the views
app.set('view engine', 'html');
// Set up directory for mustache template files
app.set('views', __dirname + '/views');
// Set up directory for static resources
app.use(express.static(__dirname + '/public'));

// Set up morgan
app.use(morgan('dev'));

// Set up body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

app.listen(PORT, () => {
	console.log('Server started on port', PORT);
});

// Set up fish controller
const fishRouter = require('./controllers/fish.js');
app.use('/fish', fishRouter);

app.get('/', (req, res) => {
	res.redirect('/fish');
});

// Set up error handling middleware
app.use((err, req, res, next) => {
	console.log('Error encountered:', err);
	res.status(500);
	res.send(err);
});
