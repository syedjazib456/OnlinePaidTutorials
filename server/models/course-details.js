const mongoose = require('mongoose');

const courseDetailsSchema = new mongoose.Schema({
    courseId: { // Reference to the course
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    price: { // Course price
        type: Number,
        required: true
    },
    detailedDescription: { // Full course description
        type: String,
        required: true
    },
    isPublished: { // Visibility for customers
        type: Boolean,
        default: false
    },
    createdAt: { // Timestamp for record creation
        type: Date,
        default: Date.now
    }
});

const CourseDetails = mongoose.model("CourseDetails", courseDetailsSchema); // Collection for course details
module.exports = CourseDetails;
