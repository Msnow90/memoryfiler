const router = require('express').Router()

const Request = require('../../models/Request');


router.post('/request', (req, res, next) => {
    Request.create({
        category: req.sanitize(req.body.category),
        content: req.sanitize(req.body.content)
    }, (err, result) => {
        if (err)
            return next(err);
        res.json('Success')
    })
})


module.exports = router;