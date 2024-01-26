const ErrorResponse = require('../utils/ErrorResponse');
const mongoose = require('mongoose');
const Nutrition = require('../models/nutritionSchema');
const { ObjectId } = mongoose.Types;


exports.createNutrition = async(req,res,next)=>{

    try{
    
        const map1 = new Map();

        map1.set('Apple', {protien:0.3,calories:52});
        map1.set('Rice', {protien:2.7,calories:130});
        map1.set('Egg',{protien:6,calories:155})
        map1.set('Dal',{protien:10.36,calories:220})
        map1.set('Chana',{protien:13,calories:364})
        map1.set('Paneer',{protien:20,calories:296})
        map1.set('Roti',{protien:0.3,calories:52})

        let foodItem = req.body.foodItem;
        let quantity = req.body.quantity;

        let proteinpg = map1.get(foodItem)?.protien;
       console.log('Proteinpg', proteinpg);
        let caloriepg = map1.get(foodItem)?.calories;
        console.log('Caloriepg', caloriepg);
        let proteintotal = quantity*proteinpg/100;
        let caloriestotal = quantity*caloriepg/100;

        
        console.log(proteintotal);
        console.log(caloriestotal);

        
        const userId = new ObjectId(req.user._id);
        const nutrition = await Nutrition.create({
            userId:userId,
            foodItem:foodItem,
            quantity:quantity,
            caloriesConsumed:caloriestotal,
            protienIntake:proteintotal,
            date:Date.now() 

         

            });
            console.log(nutrition);
            res.status(201).json({
            success:true,
            nutrition,
    });

}
catch(error){
    console.error('Error creating nutrition:', error);
    res.status(500).json({ success: false, error: 'Failed to create nutrition.' });
}
     


}


exports.getNurtitions = async(req,res,next)=>{

    try{
        const userId = req.user._id;
        // console.log(userId)

        const nutritions = await Nutrition.find({userId});

        res.status(200).json({
            success:true,
            nutritions
        })
    }
    catch(error){
        console.error('Error loading nutrition:', error);
        res.status(500).json({ success: false, error: 'Failed to load nutrition.' });
    }

}



exports.deleteNutritions = async(req,res,next)=>{

    try{
        const userId = req.user._id;

        const nutritions = await Nutrition.deleteOne({userId});

        res.status(201).json({
            success:true,
            message:'Nutrition deleted successfully!'
        });
    }
    catch(error){
        next(error);
    }

}


exports.deleteAllNutritions = async(req,res,next)=>{

    try{
        const userId=req.user._id;
        const nutritions = await Nutrition.deleteMany({userId});

        res.status(201).json({
            success:true,
            message:"All records deleted successfully!"
        })
        

    } 
    catch(error){
        next(error);
    }
}




