require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User.model');
const cookie = require('cookie-parser');
const express = require('express');
const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
const postRoute = require('./routes/post.route');
const authMiddleware = require('./middlewares/authMiddleware')
const {isAdmin , checkRole} = require('./middlewares/authZmiddleware')


const app = express();

mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("MONGODB CONNECTED"))
.catch((err)=>console.log(err))


app.use(express.json());
app.use(cookie());

app.use('/users' , userRoute);
app.use('/auth' , authRoute);
app.get('/protected' , authMiddleware , (req,res)=>{
    res.status(200).json({message:"protected route accessed" , user:req.user})
})
app.use('/posts' ,  postRoute);
app.get('/profile' , authMiddleware , (req , res)=>{
    return res.status(200).json({
        user:req.user,
        message:"Your profile data"
    })
});

app.get('/admin/dashboard' , authMiddleware , isAdmin , (req,res)=>{
    return res.status(200).json({message: 'Admin dashboard data',
    stats: { users: 1250, orders: 450 }});
})

app.get('/manage/posts' , authMiddleware , checkRole('moderator' , 'admin') , (req,res)=>{
    return res.status(200).json({ message: 'Manage posts',
      role: req.user.role})
})

app.get('/admin/users' , authMiddleware , isAdmin , async (req , res)=>{
    try{
        const users = await User.find().select("-password");
        return res.status(200).json({users})
    }catch(err){
        return res.status(500).json({message:"server error" , err:err.message})
    }
    
})

app.patch('/admin/users/:id/role' , authMiddleware , isAdmin  , async (req , res)=>{
   try{
    const {role}=req.body;
    if(!["user" , "moderator" , "admin"].includes(role)){
        return res.status(400).json({message:"invalid role type"})
    }

    const user = await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({message:"user not found"})
    }

    user.role = role;
    await user.save()

    return res.status(200).json({message:"role updation successfull" , user:{id:user._id , username:user.username , role:user.role}})}
    catch(err){
        return res.status(500).json({error:err.message})
    }
})





app.listen(process.env.PORT , ()=>{
    console.log(`server is running on ${process.env.PORT}`)
})