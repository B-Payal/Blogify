const userService = require('../services/user.service')
const {validationResult} = require('express-validator')

const getUser = async (req , res)=>{
    const data = await userService.getUsers();
    return res.status(200).json({message:"success" , data:data})
  
}

const getUserById = async (req , res)=>{
    const data = await userService.getUserById(req);
    return res.status(200).json({message:"success" , data:data})
    
}

const registerUser = async (req , res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({message: "info not correctly entered" , errors:errors.array()});
    }
    const data = await userService.registerUser(req);
    return res.status(201).json({message:"successfully registered" , user:data})
    
}

const updateUser = async (req , res)=>{
    const data = await userService.updateUser(req);
    return res.status(200).json({message:"successfully updated" , user:data})
    
    
}

const deleteUser = async (req , res)=>{
    
    await userService.deleteUser(req);
    return res.status(204).json({message:"successfully deleted"})
    
}

const forgot = async (req,res)=>{
    const message = await userService.forgotPassword(req);
    return res.status(200).json({message})

}
const reset = async (req, res)=>{
    try{
    const message = await userService.resetPassword(req);
    return res.status(200).json({message})
    }catch(err){
        return res.status(400).json({message:err.message})

    }

}

module.exports = {getUser , getUserById , registerUser , updateUser , deleteUser , forgot , reset}