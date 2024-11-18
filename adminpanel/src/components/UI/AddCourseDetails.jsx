import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
const baseURL = import.meta.env.VITE_API_URL;

function AdminCourseDetails() {
  const [courses, setCourses] = useState([]); // List of courses
  const [selectedCourseId, setSelectedCourseId] = useState(''); // Selected course ID
  const [price, setPrice] = useState('');
  const [detailedDescription, setDetailedDescription] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  // Fetch all courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${baseURL}/api/data/frontendcourses`);
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          if(Array.isArray(data.msg)){
          setCourses(data.msg); // Set courses data
          }
        } else {
          console.error('Error fetching courses:', data.msg);
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    };

    fetchCourses();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseURL}/api/data/details`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: selectedCourseId,
          price,
          detailedDescription,
          isPublished,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Course details added/updated successfully!');
        // Clear form fields
        setSelectedCourseId('');
        setPrice('');
        setDetailedDescription('');
        setIsPublished(false);
      } else {
        toast.error(data.msg);
        console.error('Error:', data.msg);
      }
    } catch (err) {
      console.error('Error adding/updating course details:', err);
    }
  };

  return (
    <div className="container my-4">
      <h1>Admin: Add/Edit Course Details</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="course">Select Course</label>
          <select
            id="course"
            className="form-control"
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            required
          >
            <option value="">Select a Course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.coursename}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="detailedDescription">Detailed Description</label>
          <textarea
            id="detailedDescription"
            className="form-control"
            value={detailedDescription}
            onChange={(e) => setDetailedDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            id="isPublished"
            className="form-check-input"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="isPublished">
            Publish Course
          </label>
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Save Details
        </button>
      </form>
    </div>
  );
}

export default AdminCourseDetails;
