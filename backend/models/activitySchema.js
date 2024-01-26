const mongoose = require('mongoose');
const FitnessActivitySchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        default:mongoose.Types.ObjectId
    },

    username:{
        type:String,
        ref:'User'
    },

    activityType:{
        type:String,
    },
    duration:{

        type:String
    },
    distance:{
        type:String,
    },
    caloriesBurned:{
        
        type:Number 
    },

    date:{
        type:Date,
        default:Date.now,
    }
});

module.exports = mongoose.model("Activity",FitnessActivitySchema); 