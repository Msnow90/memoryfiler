const router = require('express').Router();
const multer = require('multer');

const Node = require('../../models/Node');
const User = require('../../models/User');

const verifyToken = require('../../middleware/routes/verifyToken');

const storage = require('../utils/storage');

var upload = multer({ storage: storage })

var uploadFile = upload.single('memory-image');

const aws = require('aws-sdk');
const awsConfig = require('../../config').aws;
const fs = require('fs');
const path = require('path');

var s3 = new aws.S3({
	accessKeyId: awsConfig.accessKeyId,
	secretAccessKey: awsConfig.secretAccessKey
})




router.get('/nodes/:memoryId', (req, res, next) => {

	var memoryId = req.sanitize(req.params.memoryId);

	Node.find({ parentMemoryId: memoryId }, (err, nodes) => {

		if (err) return next(err);

		res.json(nodes);
	})
})

router.post('/nodes', verifyToken, (req, res, next) => {

	var memoryId = req.sanitize(req.body.memoryId);

	Node.create({

		title: req.sanitize(req.body.node.title),
		description: req.sanitize(req.body.node.description),
		nodeIndex: req.body.node.nodeIndex,
		parentMemoryId: memoryId,
		linkedMemory: req.sanitize(req.body.node.linkedMemory),
		left: req.sanitize(req.body.node.left),
		top: req.sanitize(req.body.node.top)

	}, (err, result) => {

		if (err) return next(err);

		res.json(result);

	})
})


router.put('/nodes', verifyToken, (req, res, next) => {

	var nodeTitle = req.sanitize(req.body.nodeTitle);
	var nodeDescription = req.sanitize(req.body.nodeDescription);
	var nodeId = req.body.nodeId;
	var memoryId = req.sanitize(req.body.memoryId);
	var nodeIndex = req.body.nodeIndex;

	Node.findOne({ _id: nodeId, parentMemoryId: memoryId }, (err, node) => {

		node.title = nodeTitle;
		node.description = nodeDescription;
		node.nodeIndex = nodeIndex;

		Node.updateOne({ _id: nodeId }, node, (err, updated) => {

			if (err) return next(err);

			res.json(node);
		})
	})
})




router.delete('/nodes', verifyToken, (req, res, next) => {

	var nodeId = req.sanitize(req.body.nodeId);
	var memoryId = req.sanitize(req.body.memoryId);

	Node.findOne({ _id: nodeId, parentMemoryId: memoryId }, (err, foundNode) => {
		if (err) {
			return next(err);
			// do something else here
		}

		Node.deleteOne({ _id: nodeId, parentMemoryId: memoryId }, (err, nodeDeleted) => {

			if (err) {
				// change this form of error handling
				return next(err);
			}

			// Before sending res.json(true) we need to delete our uploads from either local or s3 bucket
			if (process.env.NODE_ENV == 'develop') {
				// delete from /uploads
				var deleteAllUploadsPromises = [];
				var memDelete = new Promise(function (resolve, reject) {
					fs.unlink(path.resolve(__dirname + '/../../public/uploads/' + foundNode.imageFilePath), (err) => {
						if (err)
							reject(err);
						resolve(true);
					})
				})

				deleteAllUploadsPromises.push(memDelete);

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
				objParams.Delete.Objects.push({ key: foundNode.imageFilePath }); 

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


router.post('/nodes/childmemory', uploadFile, verifyToken, (req, res, next) => {

	var imageFilePath = (process.env.NODE_ENV == 'develop') ? req.file.filename : req.file.key
	var memoryId = req.sanitize(req.body.memoryId);
	var title = req.sanitize(req.body.title);
	var description = req.sanitize(req.body.description);
	var index = req.body.index;

	User.findOne({ _id: res.locals.user._id }, (err, user) => { 
		if (err)
			return next(err) //customize...

		if (user.memoryLocationCount >= 30)
			return res.json({ err: 'Reached free trial limit. Please subscribe to increase your limit.'})

		//user.memoryLocationCount += 1; // uncomment if you want to implement memory limits

		User.updateOne({ _id: res.locals.user._id }, user, (err, updated) => { 
			if (err)
				return next(err)
			
			Node.create({
		
				title,
				description,
				nodeIndex: index,
				parentMemoryId: memoryId,
				imageFilePath,
				isMemory: true,
				left: req.sanitize(req.body.nodeLeft),
				top: req.sanitize(req.body.nodeTop)
		
			}, (err, result) => {
		
				if (err) 
					return next(err);
		
				res.json(result);
		
			})
			
		})
	})

})



module.exports = router;