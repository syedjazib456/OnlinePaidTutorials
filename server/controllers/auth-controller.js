//A List of Controllers
const User = require('../models/user-model');//model
const Contact = require('../models/contact-model');
const bcrypt = require('bcryptjs');
const home = async (req,res)=>{
 try{
  res.status(200).send('This is my Home Controller');
 }
 catch(error){
  console.log(error);
 }
}
const register = async (req,res)=>{
    try{
        console.log("Incoming Data :",req.body);
        const {name,mail,pnum,pass} = req.body;//"Izhan","asjaksf"
        const UserExist = await User.findOne({email:mail});
        if(UserExist){
         return  res.status(400).json({msg:"Email Already Exists"});//Not Found
        }
        
       const userCreate = await User.create({username:name,email:mail,phonenumber:pnum,password:pass})
       return res.status(201).json({//ok
        msg:userCreate,
        token:await userCreate.generateToken(),
        userId:userCreate._id.toString()
    }); //User Created   
    
    }
    catch(error){
        console.error("Error during user registration:", error);
        if(error.name=='ValidationError'){
        return res.status(400).json({ msg: error.message });
        }
        return res.status(500).json({msg:"Internal Server Error"});
    }
}

const login = async (req,res)=>{
    try{
     const {mail,pass} = req.body;
     const userExist = await User.findOne({email:mail});
   
     console.log(userExist);
     if(!userExist){
        return res.status(400).json({msg:"Invalid Credentials"});
     }
     const user = await bcrypt.compare(pass,userExist.password);
     if(user){
        return res.status(200).json({
            msg:"Login Successfully",
            token:await userExist.generateToken(),
            userId:userExist._id.toString()
        });
     }else{
      return res.status(401).json({msg:"Invalid Email or Password"})
     }
    }catch(error){
     return res.status(500).json({
        msg:"Internal Server Error"
     })
    }
}

//check user web token logic 

const usertokencheck = async (req,res)=>{
try {
    const userData = req.user;//middleware
    console.log(userData);
    return res.status(200).json({userData});
} catch (error) {
    console.log(`Error from the user Route ${error}`);
}
}


const contact = async (req, res) => {
  try {
    console.log("Incoming Contact Data:", req.body);

    // Destructure request body
    const { name, mail, message } = req.body;

    // Validate input
    if (!name || !mail || !message) {
      return res.status(400).json({ msg: "All fields are required." });
    }

    // Create and save contact message in the database
    const newContact = await Contact.create({ name:name, email:mail, usermessage:message });

    return res.status(201).json({
      msg: "Message Sent successfully.",
      contactId: newContact._id.toString(),
    });
  } catch (error) {
    console.error("Error during contact form submission:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({ msg: error.message });
    }

    // Handle other server errors
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};



module.exports = {home,register,login,usertokencheck,contact};