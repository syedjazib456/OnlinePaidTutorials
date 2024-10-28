const jwt = require('jsonwebtoken');
const User = require('../models/user-model');
//MiddleWare handles the request/response and passing these to the respective method 
// Standard Convention:

// The "Bearer" prefix is part of the OAuth 2.0 specification
const authmiddleware = async (req,res,next)=>{
    const webtoken = req.header('Authorization');//value Bearer tokemn
    if(!webtoken){
      return res.status(401).json({msg:'Unauthorized HTTP, Token not Provided'});
    }
    console.log("token from auth middleware",webtoken);
    // const token = webtoken.replace('Bearer ','');
    const token = webtoken.replace('Bearer','').trim();
    try {
        const isVerified=jwt.verify(token,process.env.JWT_SECRET_KEY);
        console.log(isVerified);

        const userData = await User.findOne({email:isVerified.email}).select({password:0});
        req.user=userData;
        req.gettoken=token;
        req.userID = req.user._id;
        console.log(userData);
        next();
    } catch (error) {
       return res.status(401).json({msg:'Unauthorized, Invalid Token'});
    }
   
}

module.exports=authmiddleware;