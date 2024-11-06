import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/Auth"; // Adjust the import path according to your project structure
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from 'react-router-dom';

const baseURL = import.meta.env.VITE_API_URL;
function CourseList() {
  const { authorizationtoken } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    // Optimistically update the state
    setCourses((prevAdmins) => prevAdmins.filter(course => course._id !== id));
    toast.error('Course Deleted Successfully'); // Show success message

    try {
        const response = await fetch(`http://localhost:5000/api/data/course/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: authorizationtoken,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            // If the response isn't ok, roll back the optimistic update
            setCourses((prevAdmins) => [...prevAdmins, { _id: id }]); // You may want to fetch the admin's full data
            toast.error(data.msg || 'Failed to delete Course'); // Show error message
        }
    } catch (error) {
        console.error(error);
        toast.error('An error occurred while deleting the Course');
        // Rollback optimistic update if necessary
        // setAdmins((prevAdmins) => [...prevAdmins, { _id: id }]); // This may need more info to restore the admin
    }
};

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
            <th>Actions</th>
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
              <NavLink className="mx-4 btn btn-primary" to={`/courseupdate/${course._id}/edit`}>Edit</NavLink>
              <button className="mx-4 btn btn-danger" onClick={() => handleDelete(course._id)}>Delete</button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </React.Fragment>
  );
}

export default CourseList;
