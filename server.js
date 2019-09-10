const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const expressSanitizer = require('express-sanitizer');
const bodyParser = require('body-parser');

const config = require('./config/config');

// ===== Database Setup ===== //
var dbUrl;

const prodDbUrl = config.prodDbUrl;
const localDbUrl = config.localDbUrl;
const testDbUrl = config.testDbUrl;


// for some reason cross-env is not working in production, so needed an else statement
if (process.env.NODE_ENV == 'develop')
	dbUrl = localDbUrl;
else if (process.env.NODE_ENV == 'test')
	dbUrl = testDbUrl;
else
	dbUrl = prodDbUrl;

mongoose.connect(dbUrl, {useNewUrlParser: true});

// requiring routes
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');

// ===== Begin Express Middleware and Routing ==== //


app.use(express.static(path.resolve(__dirname, 'node_modules')));
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());

// ===== Setup any global resources to be used in app, great for sharing cached data ===== //

app.use((req, res, next) => {
	console.log(`Incoming request is: ${req.url} from ip address: ${(req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim()}`)
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	next();
})

app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'public/index.html'));
})

app.get('/environment', (req, res) => {
	res.json({environment: process.env.NODE_ENV})
})

// === Beta Route Here === //
var Prospect = require('./models/Prospect');
app.post('/prospect', (req, res, next) => {

	var ip = req.sanitize(req.ip);
	var email = req.sanitize(req.body.email);

	Prospect.create({
		ip,
		email
	}, (err, created) => {
		if (err) return next(err);

		else res.json(true)
	})
})

// attach routes here
app.use(authRoutes);
app.use('/api', apiRoutes);


// catch all, will make sure app will go to react app on a page refresh from any route
app.use("/*", (req, res) => {
	res.sendFile(path.resolve(__dirname, 'public/index.html'));
})

// ===== Error Handler ===== //

app.use((err, req, res, next) => {
	// res.status(500).send(err)
	if (!err.statusCode)
		err.statusCode = 500;
	
	res.status(500).send(err);
})

var port  = process.env.PORT || 3000;

app.listen(port, () => {
	console.log('Server is listening on port: ' + port);
})