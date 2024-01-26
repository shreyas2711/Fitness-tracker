const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema({



    userId: {
        type: String,
        unique: true,
        required: true,
    },

    username:{
        type:String,
        unique:true,
        // required:true,
    },
    email:{
        type:String,
        trim:true,
        requried:[true,'e-mail is required'],
        unique:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter valid email']
    },
    password:{
        type:String,
        required:true,
    },
    firstname:{
        type:String,
    },
    lastname:{
        type:String,
    },
    height:{
        type:String,
    },
    weight:{
        type:String,
    }

});


UserSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
    

});

UserSchema.methods.comparePassword = async function(enteredPassword){
    
    // console.log(this.password);
    // console.log(enteredPassword);
    return await bcrypt.compare(enteredPassword,this.password);

}

UserSchema.methods.getJWtToken = function(){
    
    console.log(this.id);
    return jwt.sign({id:this.id},process.env.JWT_SECRET,{
        
        expiresIn:3600
    });
}



module.exports = mongoose.model("User",UserSchema); 