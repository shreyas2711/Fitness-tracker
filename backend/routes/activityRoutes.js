const express = require('express');
const { createActivity, getActivity, deleteActivity, deleteAllActivities } = require('../controllers/activityController');
const { isAuthenticated } = require('../middleware/auth');
const router = express.Router();




router.post('/activity/create',isAuthenticated,createActivity);
router.get('/activity/show',isAuthenticated,getActivity);
router.delete('/activity/delete/:id',isAuthenticated,deleteActivity);
router.delete('/activity/deleteall',isAuthenticated,deleteAllActivities);

module.exports = router