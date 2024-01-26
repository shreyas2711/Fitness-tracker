const express = require('express');
const { createNutrition, getNurtitions, deleteNutritions, deleteAllNutritions } = require('../controllers/nutritionController');
const { isAuthenticated } = require('../middleware/auth');
const router = express.Router();



router.post('/nutrition/create',isAuthenticated,createNutrition);
router.get('/nutrition/show',isAuthenticated,getNurtitions);
router.delete('/nutrition/delete/:id',isAuthenticated,deleteNutritions);
router.delete('/nutrition/deleteall/',isAuthenticated,deleteAllNutritions);

module.exports = router