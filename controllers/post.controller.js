const postService = require('../services/post.service')

const getPost = async (req , res)=>{
    const data = await postService.getPosts();
    return res.status(200).json({message:"success" , data:data})
  
}

const getPostById = async (req , res)=>{
    const data = await postService.getPostById(req);
    return res.status(200).json({message:"success" , data:data})
    
}

const createPost = async (req , res)=>{
    const data = await postService.createPost(req);
    return res.status(201).json({message:"successfully registered" , user:data})
    
}

const updatePost = async (req , res)=>{
    const data = await postService.updatePost(req);
    return res.status(200).json({message:"successfully updated" , user:data})
    
    
}

const deletePost = async (req , res)=>{
    try{
    const userId = req.user.userId;
    
    const result = await postService.deletePost(req , userId);
    return res.status(204).json(result)}
    catch(err){
        if(err=='NOT_FOUND'){
            return res.status(404).json({message:"post not found"})
        }
        if(err=="UNAUTHORIZED"){
            return res.status(403).json({message:"you are not authorized to delete this"})
        }
    }
    
}

module.exports = {getPost , getPostById , createPost , updatePost , deletePost}