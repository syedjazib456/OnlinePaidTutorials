const Course = require('../models/course-model');

const courses = async (req,res)=>{
  try {

    const response = await Course.find();

    if(!response){
        return res.status(404).json({msg:"No Courses Found"});
    }
    res.status(200).json({msg:response});
  } catch (error) {
    console.log('Courses : '+error);
  }
}

module.exports=courses;