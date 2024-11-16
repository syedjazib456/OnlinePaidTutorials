const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
      
    },
    usermessage:{
        type:String,
        required:true
    },
  
  
})

const contact = new mongoose.model("contacts",contactSchema);//collection

module.exports = contact;//