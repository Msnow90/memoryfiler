const router = require('express').Router();

// require api routes here
const memoryRoutes = require('./memory');
const nodeRoutes = require('./node');
const requestRoutes = require('./request');

// attach to index router
router.use(memoryRoutes);
router.use(nodeRoutes);
router.use(requestRoutes);


module.exports = router;