const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const adminSchema = new mongoose.Schema({
    adminname:{
        type:String,
        required:true
    },
    adminemail:{
        type:String,
        required:true,
        unique:true
    },
  
    adminpassword:{
        type:String,
        required:true
    },
    adminImage:{
        type:String,
     
    },
    isAdmin:{
        type:Boolean,
        default:true
    }
})
//1. Separation of Concerns
// Model Responsibility: The model should handle data-related logic (like hashing passwords), 
//    while the controller should focus on handling requests and responses. 
    //   This separation keeps your code cleaner and easier to maintain.
// 2. Code Reusability
// By placing the hashing logic in the model, 
//    any time you save a user (whether through a registration process or updating the password), 
    //   the logic is automatically applied. This avoids duplicating code in multiple controllers.

    
adminSchema.pre('save', async function(){ //pre middleware

console.log("pre save",this);
const admin = this;//userchema

if(!admin.isModified("adminpassword")){
   return; // Exit early if the password hasn't changed
}
try{
    // Rounds: 
    //  The "rounds" parameter specifies how many times the hashing algorithm will process the input data.
    //  More rounds make the hashing process slower, 
    //  increasing security by making it more difficult for attackers to guess passwords.
  const saltRound = await bcrypt.genSalt(10);//round

  const hashpassword = await bcrypt.hash(admin.adminpassword,saltRound);
  admin.adminpassword = hashpassword;
}
catch(error){
 console.error(error);
}
})
// JWT is a powerful tool for handling authentication and authorization in web applications, 
//   offering a balance of security, flexibility, and efficiency.

// Generating a token with JSON Web Tokens (JWT) in a MERN (MongoDB, Express, React, Node.js) stack application is a common practice for several reasons:

// 1- User Authentication: JWTs are widely used for authenticating users. After a user logs in, a JWT is generated and sent back to the client. This token can then be included in the headers of subsequent requests, allowing the server to verify the user's identity without needing to store session data.
// 2- Statelessness: In a MERN application, using JWT allows the server to remain stateless. Each token contains all the necessary information (like user ID and roles) to identify the user, eliminating the need for server-side session storage. This simplifies scaling and improves performance.
// 3- Security: JWTs can be signed and optionally encrypted, which helps to protect against tampering and ensures that the token's contents can only be read by intended recipients. This is crucial for securing sensitive user data.
// 4- Cross-Domain Support: Since the frontend (React) and backend (Node/Express) can be hosted on different domains, JWTs facilitate cross-domain authentication without issues related to cookies.
adminSchema.methods.generateToken  = async function(){
    try{
    //  jwt.sign(payload, secretOrPrivateKey, [options, callback])

    return jwt.sign({
    //payload
    adId:this._id.toString(),
    ademail:this.adminemail,
    isAdmin:this.isAdmin
    },
    // //secretORPrivatekey
    // HMAC (Hash-based Message Authentication Code) algorithms, 
    // the secret key is a critical component for generating and validating the HMAC
    
//     RSA:
// Rivest, Shamir, Adleman (the names of the inventors)
// ECDSA:
// Elliptic Curve Digital Signature Algorithm
// Related Terms
// PEM:

// Privacy-Enhanced Mail (a base64 encoding format for keys and certificates)

    process.env.JWT_SECRET_KEY,
    {
        expiresIn:"30d"
    }

);
    }
    catch(error){
     console.error(error);
    }
}
//define the model or the collection name

const Admin = new mongoose.model("admins",adminSchema);//collection

module.exports =Admin;