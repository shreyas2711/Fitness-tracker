const User = require('../models/usermodel');





exports.getUsers = async(req,res,next)=>{

    try{
    const Users = await User.find();

    res.status(200).json({
        success:true,
        Users
    })
    
    }
    catch(error){
        next();
    }
}


exports.deleteUser = async(req,res,next)=>{

        try{
          const user = await User.findOneAndDelete({ _id: req.params.id });

            res.status(200).json({
                success:true,
                message:"User deleted successfully!"
            })
        }
        catch(error){
            next();
        }
}