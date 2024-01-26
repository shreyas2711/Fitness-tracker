const ErrorResponse = require('../utils/ErrorResponse');
const jwt = require("jsonwebtoken");
const User = require('../models/usermodel');



exports.isAuthenticated = async(req,res,next)=>{

    const {token} = req.cookies;

    if(!token){
        
        return next(new ErrorResponse("Not authorized to access this route",401));
    }

    try{
        const decoded =jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    }
    catch (error) {
        console.error('Error in isAuthenticated middleware:', error);
        return res.status(401).json({ success: false, error: 'Unauthorized' });
    }
}