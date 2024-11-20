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
        const id = req.params.id;

        // Fetch course and course details
        const course = await Course.findById(id);
        const courseDetails = await CourseDetails.findOne({ courseId: id });

        if (!course || !courseDetails) {
            return res.status(404).json({ message: "Course or details not found" });
        }

        // Combine course and course details into a single object
        const response = {
            ...course.toObject(),
            ...courseDetails.toObject(),
        };

        // Optional: Remove duplicate `id` fields if necessary
        delete response._id; // Only if you don't want duplicate _id fields
        delete response.courseId; // Already represented as _id from Course

        res.status(200).json(response);
    } catch (err) {
        console.error("Error fetching course data:", err);
        res.status(500).json({ message: "Error fetching course data", error: err.message });
    }
};

const addOrUpdateCourseDetails = async (req, res) => {
    const { courseId, price, detailedDescription, isPublished } = req.body;

    try {
        // Check if course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Check if details already exist
        let courseDetails = await CourseDetails.findOne({ courseId });
        if (courseDetails) {
            // Update existing details
            courseDetails.price = price;
            courseDetails.detailedDescription = detailedDescription;
            courseDetails.isPublished = isPublished;
            await courseDetails.save();
            return res.status(200).json({ message: "Course details updated successfully", courseDetails });
        }

        // Add new details
        courseDetails = new CourseDetails({
            courseId,
            price,
            detailedDescription,
            isPublished,
        });
        await courseDetails.save();
        res.status(201).json({ message: "Course details added successfully", courseDetails });
    } catch (err) {
        res.status(500).json({ message: "Error adding/updating course details", error: err.message });
    }
};




module.exports = {addCourseDetails,getCourseWithDetails,addOrUpdateCourseDetails}