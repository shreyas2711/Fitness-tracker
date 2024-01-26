const mongoose = require('mongoose');
const NutritionSchema = new mongoose.Schema({
    userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required:true,
    default:mongoose.Types.ObjectId 
  
  },
    foodItem:{
      type:String,
    },
    quantity:{
      type:Number,
    },
    caloriesConsumed:{
      type:Number,
    },
    protienIntake:{
      type:Number,
    },
    date:{
      type:Date,
      default:Date.now
    }

  });
  
  module.exports = mongoose.model("Nutrition",NutritionSchema);   