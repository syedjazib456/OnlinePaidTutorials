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
    images: [], // For multiple image uploads
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };
  //Previous 
  // const handleFileChange = (e) => {
  //   const files = Array.from(e.target.files); // Convert the file list to an array
  //   console.log(files);
  //   setCourse((prev) => ({ ...prev, images: files })); // Store all selected files in the 'images' array
  // };
  //Updated
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files); // Convert FileList to an array
    setCourse((prev) => ({
      ...prev,
      images: [...prev.images, ...newFiles], // Append new files to the existing array
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("coursename", course.coursename);
    formData.append("coursedesc", course.coursedesc);
    formData.append("courseinstruct", course.courseinstruct);

    // Append all selected images to the FormData
    course.images.forEach((image, index) => {
      formData.append("images", image); // 'images' is the field name that the server expects
    });

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
                <label htmlFor="images">Upload Images:</label>
                <input
                  type="file"
                  id="images"
                  name="images"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="form-control"
                  multiple// Allow multiple files
                  required
                />
              </div>
              {/* Display previews of selected images */}
        <div className="image-previews">
          {course.images.length > 0 &&
             Array.from(course.images).map((image, index) => (
            <div key={index} className="image-preview">
              <img
                src={URL.createObjectURL(image)}
                alt={`preview-${index}`}
                style={{ width: '100px', height: '100px', margin: '5px' }}
              />
            </div>
          ))}
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
