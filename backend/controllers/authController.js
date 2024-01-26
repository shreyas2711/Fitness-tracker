const ErrorResponse = require('../utils/ErrorResponse');
const express = require('express');
const User = require('../models/usermodel');
const uuid = require('uuid');



exports.signUp = async(req,res,next)=>{

    try{
        const userId = uuid.v4();
        const user = await User.create({
            userId,
            username:req.body.username,
            email:req.body.email,
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            password:req.body.password
            

        });
        res.status(201).json({
            success:true,
            user
        })
        
    }
    catch(error){
        next(error);
    }
}


exports.signIn = async (req, res, next) => {
    try {
      const { email, password, username } = req.body;
  
      if (!email && !username) {
        return next(new ErrorResponse("Please enter email or username", 403));
      }
      if (!password) {
        return next(new ErrorResponse("Please enter password", 403));
      }
  
      let user;
      
      if (email) {
        user = await User.findOne({ email });
      } else if (username) {
        user = await User.findOne({ username });
      }
  
      console.log('User:', email || username);
  
      if (!user) {
        return next(new ErrorResponse("Invalid credentials", 400));
      }
  
      const isMatched = await user.comparePassword(password);
      console.log(isMatched);
  
      if (!isMatched) {
        return next(new ErrorResponse("Invalid credentials", 400));
      }
        
     

  
      sendTokenResponse(user, 200, res);
    } catch (error) {
      next(error);
    }
  };
  



const sendTokenResponse = async(user,codeStatus,res)=>{

    const token = await user.getJWtToken();
    res
    .status(codeStatus)
    .cookie('token',token,{maxAge:60*60*1000,httpOnly:true})
    .json({success:true,token,user})
}


exports.logOut = async(req,res,next)=>{


    res.clearCookie('token');
    res.status(200).json({
        success:true,
        message:"Logged out successfully"
    })

}

