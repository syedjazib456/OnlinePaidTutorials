const Course = require('../models/course-model');
const fs = require('fs');
const path = require('path');
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
const addCourse = async (req, res) => {
  try {
    const { coursename, coursedesc, courseinstruct } = req.body; // Adjust based on your schema
    const imagePath = req.file ? req.file.path : null;
    if (!imagePath) {
        return res.status(400).json({ msg: "Image file is required." });
    }
    console.log("Uploaded File:", req.file);
    // Create a new course instance
    const newCourse = new Course({
      coursename,
      coursedesc,
      courseinstruct,
      courseimage:imagePath
    });
    
    // Save the course to the database
    const savedCourse = await newCourse.save();
    
    // Respond with the saved course
    res.status(201).json({ msg: "Course added", course: savedCourse });
  } catch (error) {
    console.log('Add Course Error: ' + error);
    res.status(500).json({ msg: "Error adding course" });
  }
};

module.exports={courses,addCourse};