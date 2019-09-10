const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
var validator = require("email-validator");

const stripe = require("stripe")("sk_test_IB0K5EvUZJJSqydXhrS0ZP6I001hn4LaFq");

router.post('/charge', async (req, res, next) => {
	try {
		let {status} = await stripe.charges.create({
		  amount: 2000,
		  currency: "usd",
		  description: "An example charge",
		  source: req.body
		});
	
		res.json({status});
	  } catch (err) {
		res.status(500).end();
	  }
})

router.post('/register', (req, res, next) => {

	var ip = (req.ip === '::1') ? '::ffff:127.0.0.1' : req.ip;
	var username = req.sanitize(req.body.username);
	var password = req.sanitize(req.body.password);
	var email = req.sanitize(req.body.email);

	User.register(username, password, email, ip, (err, user) => {
		if (err) {
			console.log('why did this happen: ', err)
			if (err.code === 11000) 
				err.message = 'Username is already taken.'; // this is a unique mongoose code for errors when duplicate username creation happens
			
			return res.json({ err: err.message });
		}		

		res.json(signToken(user, ip));
	})
})

router.post('/login', (req, res, next) => {

	var username = req.sanitize(req.body.username);
	var password = req.sanitize(req.body.password);
	var ip = (req.ip === '::1') ? '::ffff:127.0.0.1' : req.ip;

	User.authenticate(username, password, (err, user) => {

		if (err) {
			err.message = 'Invalid login credentials.'
			return res.json({ err: err.message });
		}

		res.json(signToken(user, ip));
	})
})

router.post('/verify', (req, res, next) => {

	var ip = (req.ip === '::1') ? '::ffff:127.0.0.1' : req.ip;

	jwt.verify(req.body.token, ip, (err, user) => {

		if (err) {
			err.message = 'Invalid token. Please login with username and password to receive a new token.';
			return res.json({ err: err.message });
		}

		res.json(constructVerifyResponse(req.body.token, user));
	})
})

module.exports = router;


/* 

Helper Functions

*** Consider wrapping in an IIFE for performance enhancements

*/

function signToken(user, ip) {
	var obj = {};

	var token = jwt.sign({ _id: user._id, username: user.username}, ip, { expiresIn: '7d' });
	obj.token = token;

	obj.err = null;
	obj.user = user;

	return obj;
}

function constructVerifyResponse(token, user) {

	var obj = {};
	obj.user = {};

	obj.token = token;
	obj.user = user;


	return obj;
}