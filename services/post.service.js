const Post = require('../models/Post.model')

const getPosts = async ()=>{
    const posts = await Post.find();
    return posts
}

const getPostById = async (req)=>{
        const post = await Post.find({author:req.params.id});
    return post
}

const createPost = async (req)=>{
    const newPost = await Post.create(req.body);
    return newPost
}

const updatePost = async (req)=>{
    const updated = await Post.findByIdAndUpdate(req.params.id , req.body , {new:true , runValidators:true} )
    return updated
}

const deletePost = async (req , userId)=>{
    const post = await Post.findById(req.params.id);
    if(!post){
        throw new Error("NOT_FOUND")
    }
    if(post.author.toString()!=userId){
        throw new Error("UNAUTHORIZED")
    }

    await Post.findByIdAndDelete(req.params.id)
    return {message:"Post deleted successfully  "}
}

module.exports = {getPosts , getPostById , createPost , updatePost , deletePost}