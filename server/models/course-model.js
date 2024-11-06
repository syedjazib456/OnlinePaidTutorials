const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    coursename:{
        type:String,
        required:true
    },
    coursedesc:{
        type:String,
        required:true,
      
    },
    courseinstruct:{
        type:String,
        required:true
    },
    courseimages:{
        type:[String],
        required:true
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

    

//define the model or the collection name

const course = new mongoose.model("Course",courseSchema);//collection

module.exports = course;//