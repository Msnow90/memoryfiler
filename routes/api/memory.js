const multer = require('multer');
const aws = require('aws-sdk');
const router = require('express').Router();
const awsConfig = require('../../config').aws;
const fs = require('fs');
const path = require('path');

const verifyToken = require('../../middleware/routes/verifyToken');

const MemoryLocation = require('../../models/MemoryLocation');
const Node = require('../../models/Node');
const User = require('../../models/User');

const storage = require('../utils/storage');

var upload = multer({ storage: storage })

var uploadFile = upload.single('memory-image');

var s3 = new aws.S3({
	accessKeyId: awsConfig.accessKeyId,
	secretAccessKey: awsConfig.secretAccessKey
})


router.get('/memorylocations', verifyToken, (req, res) => {

	MemoryLocation.find({ ownerName: res.locals.user.username }, (err, foundMems) => {

		if (err) return next(err);

		res.json(foundMems);
	})
})

router.post('/memorylocations', uploadFile, verifyToken, (req, res, next) => {

	User.findOne({ _id: res.locals.user._id }, (err, user) => {

		if (err) 
			return next(err);

		if (user.memoryLocationCount >= 30)
			return res.json({ err: 'Reached free trial limit. Please subscribe to increase your limit.'})
		
		//user.memoryLocationCount += 1; // uncomment this line if you want to implement the memory limit

		User.updateOne({ _id: res.locals.user._id }, user, (err, updated) => {

			if (err)
				return next(err);

			var parentMemoryTitle = req.sanitize(req.body['memory-parentMemory']);
			var title = req.sanitize(req.body['memory-title']);

			MemoryLocation.create({
				ownerName: res.locals.user.username,
				title: title,
				description: req.sanitize(req.body['memory-description']),
				imageFilePath: (process.env.NODE_ENV == 'develop') ? req.file.filename : req.file.key,
				childMemories: [],
				isParent: (parentMemoryTitle === undefined) ? true : false
			}, (err, createdMemLoc) => {

				if (err) return next(err);

				res.json(createdMemLoc);
			})

		})
	})

})


router.delete('/memorylocations', verifyToken, (req, res, next) => {

	var memoryId = req.sanitize(req.body.memoryId);
	var imageFilePath = req.sanitize(req.body.imageFilePath);

	MemoryLocation.deleteOne({ _id: memoryId }, (err, memory) => {

		if (err) {
			// change this form of error handling
			return next(err);
		}

		Node.find({ parentMemoryId: memoryId }, (err, foundNodes) => {
			if (err) {
				return next(err);
				// do something else here
			}

			Node.deleteMany({ parentMemoryId: memoryId }, (err, nodesDeleted) => {
				console.log('what are the nodes deleted: ', nodesDeleted)

				if (err) {
					// change this form of error handling
					return next(err);
				}

				// Before sending res.json(true) we need to delete our uploads from either local or s3 bucket
				if (process.env.NODE_ENV == 'develop') {
					// delete from /uploads
					var deleteAllUploadsPromises = [];
					var memDelete = new Promise(function (resolve, reject) {
						fs.unlink(path.resolve(__dirname + '/../../public/uploads/' + imageFilePath), (err) => {
							if (err)
								reject(err);
							resolve(true);
						})
					})

					deleteAllUploadsPromises.push(memDelete);

					foundNodes.forEach(node => {
						var nodeDelete = new Promise(function (resolve, reject) {
							fs.unlink(path.resolve(__dirname + '/../../public/uploads/' + node.imageFilePath), (err) => {
								if (err)
									reject(err);
								resolve(true);
							})
						})

						deleteAllUploadsPromises.push(nodeDelete);
					})

					Promise.all(deleteAllUploadsPromises)
						.then(resolved => {
							return res.json(true);
						})
						.catch(err => {
							return next(err);
						})
				}
				else {
					// delete from s3
					var objParams = {
						Bucket: 'memoryfilerimages',
						Delete: {
							Objects: []
						}
					};
					objParams.Delete.Objects.push({ key: imageFilePath }); 
					foundNodes.forEach(node => objParams.Delete.Objects.push({ key: node.imageFilePath }));

					s3.deleteObjects(objParams, (err, data) => {
						if (err) {
							return next(err);
						}
						return res.json(true);
					})
				}
			})
		})
	})
})



module.exports = router;