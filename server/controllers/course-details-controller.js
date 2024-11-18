const Course = require('../models/course-model');
const CourseDetails = require('../models/course-details');


const addCourseDetails = async (req, res) => {
    const { courseId, price, detailedDescription, isPublished } = req.body;
    try {
        const courseDetails = new CourseDetails({
            courseId,
            price,
            detailedDescription,
            isPublished
        });
        await courseDetails.save();
        res.status(201).json({ message: "Course details added successfully", courseDetails });
    } catch (err) {
        res.status(500).json({ message: "Error adding course details", error: err.message });
    }
};



const getCourseWithDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id);
        const courseDetails = await CourseDetails.findOne({ courseId: id });

        if (!course || !courseDetails) {
            return res.status(404).json({ message: "Course or details not found" });
        }

        res.status(200).json({ course, courseDetails });
    } catch (err) {
        res.status(500).json({ message: "Error fetching course data", error: err.message });
    }
};

module.exports = {addCourseDetails,getCourseWithDetails}