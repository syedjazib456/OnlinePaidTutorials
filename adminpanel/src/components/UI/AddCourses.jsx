import React, { useState } from "react";
import { useAuth } from "../../store/Auth";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function AddCourse() {
  const { authorizationtoken } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    coursename: "",
    coursedesc: "",
    courseinstruct: "",
    image: null, // For image upload
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setCourse((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    formData.append("coursename", course.coursename);
    formData.append("coursedesc", course.coursedesc);
    formData.append("courseinstruct", course.courseinstruct);
    formData.append("image", course.image); // Append the image

    try {
      const response = await axios.post("http://localhost:5000/api/data/coursereg", formData, {
        headers: {
          Authorization: authorizationtoken,
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });

      toast.success(response.data.msg);
      navigate('/viewcourses');
    } catch (error) {
      toast.error(error.response?.data?.msg || "Error adding course");
    }
  };

  return (
    <React.Fragment>
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="card border-2 shadow-lg">
            <h1 style={{ color: 'blue' }}><i>Add a new Course</i></h1>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="coursename">Course Name:</label>
                <input
                  type="text"
                  id="coursename"
                  name="coursename"
                  value={course.coursename}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div>
                <label htmlFor="coursedesc">Description:</label>
                <textarea
                  id="coursedesc"
                  name="coursedesc"
                  value={course.coursedesc}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div>
                <label htmlFor="courseinstruct">Instructor:</label>
                <input
                  type="text"
                  id="courseinstruct"
                  name="courseinstruct"
                  className="form-control"
                  value={course.courseinstruct}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="image">Upload Image:</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="form-control"
                  required
                />
              </div>
              <button type="submit">Add Course</button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AddCourse;
