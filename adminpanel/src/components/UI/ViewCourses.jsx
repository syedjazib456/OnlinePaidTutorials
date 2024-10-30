import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/Auth"; // Adjust the import path according to your project structure
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
const baseURL = import.meta.env.VITE_API_URL;
function CourseList() {
  const { authorizationtoken } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/data/courses", {
          headers: {
            Authorization: authorizationtoken,
          },
        });
        setCourses(response.data.msg); // Adjust according to your response structure
      } catch (err) {
        setError(err.response?.data?.msg || "Error fetching courses");
        toast.error(err.response?.data?.msg || "Error fetching courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [authorizationtoken]);

  if (loading) {
    return <div>Loading courses...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <React.Fragment>
    <button className="btn btn-primary mb-3" onClick={() => navigate('/addcourse')}>
    Add Course
  </button>
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Image</th>
            <th>Course Name</th>
            <th>Description</th>
            <th>Instructor</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course._id}>
              <td>
                <img
                  src={`${baseURL}/${course.courseimage}`} // Adjust path based on your server
                  alt={course.coursename}
                  style={{ width: '100px', height: 'auto' }} // Adjust image size as needed
                />
              </td>
              <td>{course.coursename}</td>
              <td>{course.coursedesc}</td>
              <td>{course.courseinstruct}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </React.Fragment>
  );
}

export default CourseList;
