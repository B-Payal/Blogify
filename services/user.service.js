const { default: mongoose } = require('mongoose');
const User = require('../models/User.model')
const crypto=require('crypto');
const { request } = require('http');

const getUsers = async ()=>{
    const user = await User.find();
    return user
    // const{cursor,limit=2}=query
    // let q;
    // if(cursor && mongoose.Types.ObjectId.isValid(cursor)){
    //      q={_id:{$lt:new mongoose.Types.ObjectId(cursor)}}
    // }
    // const user=await User.find(q).sort({_id:-1}).limit(limit+1).lean()
    // const hasMore=user.length>limit
    // if(hasMore){
    //     user.pop()
    // }
    // const hasNext=hasMore && user.length>0?user[user.length-1]._id:null
    // return {user,hasMore,hasNext}
}

const getUserById = async (req)=>{
        const user = await User.findById(req.params.id);
    return user
}

const registerUser = async (req)=>{
    const newUser = await User.create(req.body);
    return newUser
}

const updateUser = async (req)=>{
    const updated = await User.findByIdAndUpdate(req.params.id , req.body , {new:true , runValidators:true} )
    return updated
}

const deleteUser = async (req)=>{
    await User.findByIdAndDelete(req.params.id)
}


// const forgotPassword = async (req)=>{
//     const {email} = req.body;
//     const user = await User.findOne({email});
//     if(!user){
//         return {message:"if user exists , email with token has been sent "};
//     }
//     const token = await crypto.randomBytes(32).toString('hex');
//     const hashed = await crypto.createHash('sha256').update(token).digest('hex');
//     user.resetPasswordToken = hashed;
//     user.resetPasswordExpires = Date.now() + 360000;
//     await user.save();
//     return {message:"token is sent" , token};
    
// }

// const resetPassword = async (req)=>{
//     const {token} = req.params;
//     const hashed = await crypto.createHash('sha256').update(token).digest('hex');
//     const newPass = req.body.newPassword;
//     const user = await User.findOne({resetPasswordToken:hashed});
//     if(user && user.resetPasswordExpires>Date.now()){
//         user.password = newPass;
//          user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;
    
//     await user.save();
//     return {newPassword: user.password,message:'Password reset successful. You can now log in.'}


//     }
//     else{
//         throw new Error("TOKEN_INVALID")
//     }
// }



const forgotPassword = async (req)=>{
    const {email} = req.body
    const user = await User.findOne({email});
    if(!user){
        return {message:"if user with this email exists , email has been sent"}
    }
    const token = await crypto.randomBytes(32).toString('hex');
    const hashed = await crypto.createHash('sha256').update(token).digest('hex');

    user.resetPasswordToken = hashed;
    user.resetPasswordExpires = Date.now()+360000;
    await user.save()
    return {message: "token is generated" , token}
}


const resetPassword = async (req)=>{
    const {newpassword} = req.body;
    const {token} = req.params;
    const hashed = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({resetPasswordToken:hashed ,  resetPasswordExpires: {$gt: Date.now()}});
    if(user){
        user.password = newpassword;
        user.resetPasswordToken=undefined;
        user.resetPasswordExpires=undefined;
        await user.save();
        return {message:"password changed successfully"}

    }else{
        throw new Error("TOKEN_INVALID")
    }

    
}
module.exports = {getUsers , getUserById , registerUser , updateUser , deleteUser , forgotPassword , resetPassword}