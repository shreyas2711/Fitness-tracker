const mongoose = require('mongoose');
// const { ObjectId } = require('mongoose').Types;
const Activity = require('../models/activitySchema');
const { ObjectId } = mongoose.Types;

exports.createActivity = async (req, res, next) => {
  try {
    // const uniqueId = new ObjectId();
    const userId = new ObjectId(req.user._id);
    

    const activity = await Activity.create({
      userId:userId,
      username:req.user.username,
      activityType: req.body.activityType,
      duration: req.body.duration,
      distance: req.body.distance,
      caloriesBurned: req.body.caloriesBurned,
      date: Date.now(),
    });

    res.status(201).json({
      success: true,
      activity,
    });
  } catch (error) {
    console.error('Error creating activity:', error);
    res.status(500).json({ success: false, error: 'Failed to create activity.' });
  }
};


exports.getActivity = async(req,res,next)=>{


    try{
      const userId = req.user._id;
      console.log('User id is:',userId);
    const activity = await Activity.find({userId});
    console.log(activity);
      
      res.status(200).json({
        success:true,
        activity

      })
  }
  catch(error){
    next(error);
  }
}


exports.deleteActivity = async(req,res,next)=>{

      try{
        const userId = req.user._id;
        const activity = await Activity.deleteOne({userId});

        res.status(200).json({
          success:true,
          message:'Activity deleted successfully!'
        });

      }
      catch(error){
        next(error);
      }

}



exports.deleteAllActivities = async(req,res,next)=>{

  try{
    const userId=req.user._id;
      const activity = await Activity.deleteMany({userId});

      res.status(201).json({
          success:true,
          message:"All records deleted successfully!",
        
      })
      

  } 
  catch(error){
      next(error);
  }
}







