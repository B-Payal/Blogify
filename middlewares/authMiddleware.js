require('dotenv').config();
const jwt = require('jsonwebtoken');

const authentication = (req , res , next)=>{
    try{
        let token;
        if(req.cookies.token){
            token = req.cookies.token;
        }
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(" ")[1]

    }

    if(!token){
        return res.status(401).json({message:"no token provided"})
    }

    const decoded = jwt.verify(token , process.env.JWT_SECRET);

    req.user = decoded;
    next();}
    catch(err){
         return res.status(401).json({ message: "Invalid token", error:err });
    }

}

module.exports = authentication;