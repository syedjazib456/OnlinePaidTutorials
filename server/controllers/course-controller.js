const Course = require('../models/course-model');
const fs = require('fs');
const path = require('path');
const courses = async (req, res) => {
  try {

    const response = await Course.find();

    if (!response) {
      return res.status(404).json({ msg: "No Courses Found" });
    }
    res.status(200).json({ msg: response });
  } catch (error) {
    console.log('Courses : ' + error);
  }
}
const addCourse = async (req, res) => {
  try {
    const { coursename, coursedesc, courseinstruct } = req.body; // Extract course details from body

    // Ensure images were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ msg: "At least one image file is required." });
    }

    // Extract the image paths
    const imagePaths = req.files.map(file => file.path);

    // Log the uploaded files (optional)
    console.log("Uploaded Files:", req.files);

    // Create a new course instance
    const newCourse = new Course({
      coursename,
      coursedesc,
      courseinstruct,
      courseimages: imagePaths // Save array of image paths
    });

    // Save the course to the database
    const savedCourse = await newCourse.save();

    // Respond with the saved course
    res.status(201).json({ msg: "Course added successfully", course: savedCourse });
  } catch (error) {
    console.log('Add Course Error: ', error);
    res.status(500).json({ msg: "Error adding course" });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const id = req.params.courseid;

    const response = await Course.deleteOne({ _id: id });

    if (response.deletedCount === 0) {
      return res.status(404).json({ msg: "Course Not Found" });
    }
    res.status(200).json({ msg: "Course Deleted Successfully" });
  } catch (error) {
    console.log('Course : ' + error);
  }
}
const getcoursebyId = async (req, res) => {
  try {
    const id = req.params.courseid;

    const response = await Course.findOne({ _id: id });


    res.status(200).json({ msg: response });
  } catch (error) {
    console.log('Course : ' + error);
  }
}
const updateacoursebyId = async (req, res, next) => {
  try {
    const id = req.params.courseid;
    const updatedCourseData = {
      coursename: req.body.coursename,
      coursedesc: req.body.coursedesc,
      courseinstruct: req.body.courseinstruct,
      // Initialize courseimage array
      courseimages: [], 
    };

    // Verify that the course exists
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ msg: "Course not found." });
    }

    // If new images are uploaded, handle image deletion for old ones
    if (req.files && req.files.length > 0) {
      const imagePaths = req.files.map(file => file.path); // Get paths of uploaded images
      updatedCourseData.courseimages = imagePaths; // Update with new image paths

      // Delete old images from disk
      course.courseimages.forEach((oldImagePath) => {
        const fullOldImagePath = path.join(__dirname, '..', oldImagePath);
        fs.access(fullOldImagePath, fs.constants.F_OK, (err) => {
          if (!err) {
            fs.unlink(fullOldImagePath, (unlinkErr) => {
              if (unlinkErr) {
                console.error("Failed to delete old image:", unlinkErr);
              } else {
                console.log("Old image deleted successfully.");
              }
            });
          } else {
            console.warn("Old image does not exist, skipping deletion.");
          }
        });
      });
    } else {
      updatedCourseData.courseimages = course.courseimages; // Keep existing images if no new ones are uploaded
    }

    const response = await Course.updateOne({ _id: id }, { $set: updatedCourseData });
    console.log("Update response:", response);

    if (response.nModified === 0) {
      return res.status(404).json({ msg: "Course not found or no changes made." });
    }

    return res.status(200).json(updatedCourseData);
  } catch (error) {
    console.error("Update error:", error);
    next(error);
  }
};

module.exports = { courses, addCourse, deleteCourse, getcoursebyId, updateacoursebyId };