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
      courseinstruct: req.body.courseinstruct
      // Add other fields as necessary
    };

    // Verify that the admin exists
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ msg: "Course not found." });
    }


    const imagePath = req.file ? req.file.path : null;

    // Handle image deletion if a new image is uploaded
    if (imagePath) {
      const oldImagePath = path.join(__dirname, '..', course.courseimage); // Use admin.image for the old image filename
      console.log("Old image path:", oldImagePath);

      fs.access(oldImagePath, fs.constants.F_OK, (err) => {
        if (!err) {
          fs.unlink(oldImagePath, (unlinkErr) => {
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
      updatedCourseData.coursename = updatedCourseData.coursename;
      updatedCourseData.coursedesc = updatedCourseData.coursedesc;
      updatedCourseData.courseinstruct = updatedCourseData.courseinstruct;

      updatedCourseData.courseimage = imagePath; // Update with new image path
    } else {
      updatedCourseData.coursename = updatedCourseData.coursename;
      updatedCourseData.coursedesc = updatedCourseData.coursedesc;
      updatedCourseData.courseinstruct = updatedCourseData.courseinstruct;
      updatedCourseData.courseimage = course.courseimage;
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