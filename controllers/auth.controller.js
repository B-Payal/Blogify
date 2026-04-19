require('dotenv').config();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User.model')



const loginUser = async (req , res)=>{
    const {email , password} = req.body;
    const user = await User.findOne({email}).select('+password');
    if(!user){
        return res.status(404).json({message:"user not found"})
    }
    const comparison = await bcrypt.compare(password , user.password);
    if(!comparison){
        return res.status(403).json({message:"password entered is incorrect"})
    }
    const token = jwt.sign({userId:user._id , email:user.email , role:user.role , permissions:user.permissions} , process.env.JWT_SECRET , {expiresIn:'1d'})
    user.password=undefined;
    return res.status(200).cookie('token' , token , {expires:new Date(Date.now()+3600000) , httpOnly:true , secure: process.env.NODE_ENV === 'production'}).json({message:"user logged in sucessfully" , user:user })    


    
}

module.exports = {loginUser};