const multer = require('multer');
const aws = require('aws-sdk');
const multers3 = require('multer-s3');
const awsConfig = require('../../config').aws;

var storage;

if (process.env.NODE_ENV == 'develop' || process.env.NODE_ENV == 'test') {
	storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, 'public/uploads')
		},
		filename: function (req, file, cb) {
			cb(null, Date.now() + '.jpg')
		}
	})
}

else {
    var s3 = new aws.S3({
        accessKeyId: awsConfig.accessKeyId,
        secretAccessKey: awsConfig.secretAccessKey
    })
    
	storage = multers3({
		s3: s3,
		bucket: 'memoryfilerimages',
		key: function(req, file, cb) {
			cb(null, Date.now().toString() + '.jpg')
		}
	})
}


module.exports = storage;