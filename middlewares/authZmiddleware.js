const Post = require('../models/Post.model')


const isAdmin = (req , res , next)=>{
    if(!req.user){
        return res.status(401).json({message:"authentication required"})
    }

    if(req.user.role!="admin"){
        return res.status(403).json({message:"You are not an admin"})
    }

   next();
}

function checkRole(...allowedRoles){
    return (req , res , next)=>{
        if(!req.user){
            return res.status(401).json({message:"authentication required"})
    
        }
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({message:`You are not authorized.Must be of role ${allowedRoles.join("or")}`,
        yourRole:req.user.role});
        }
        next();
    }
}

const canEditPost = async (req , res , next)=>{
    try{
    const post = await Post.findById(req.params.id);
    if(!post){
        return res.status(404).json({message:"post not found"})
    }

    if(req.user.role=="admin"){
       return next();
    }

    if((req.user._id.toString()!=post.author.toString())){
        return res.status(403).json({message:"you can only edit your own posts"})
    }
    next();
}
    catch(err){
        return res.status(500).json({error:err})
    }
}

const ROLE_LEVEL={
        "user":1,
        "moderator":2,
        "admin":3
    }
function minRoleRequired(minRole){
    return(req,res,next)=>{
    const currRole = ROLE_LEVEL[req.user.role];
    const required = ROLE_LEVEL[minRole];
    if(currRole<required){
        return res.status(403).json({
             error: `Minimum role required: ${minRole}`
        })
    }
    next();
}
    
}

function hasPermission(permission){
    return (req,res,next)=>{
        if(!req.user.permissions.includes(permission)){
            return res.status(403).json({error: `Permission required: ${permission}` })
        }
        next();
    }
}

module.exports = {isAdmin , checkRole , canEditPost , minRoleRequired , hasPermission};