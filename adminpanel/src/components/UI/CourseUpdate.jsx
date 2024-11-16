import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../store/Auth";
const baseURL = import.meta.env.VITE_API_URL;
const CourseUpdate = () => {
  const { authorizationtoken } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [course, setCourse] = useState({
    coursename: "",
    coursedesc: "",
    courseinstruct: "",
    images: [], // Store existing and new images
  });

  // Fetch course details by ID
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/data/course/${id}`,
          { headers: { Authorization: authorizationtoken } }
        );
        const data = response.data.msg;
        console.log(data);
        setCourse({
          coursename: data.coursename || "",
          coursedesc: data.coursedesc || "",
          courseinstruct: data.courseinstruct || "",
          images: data.courseimages || [], // Existing images as URLs
        });
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch course details");
      }
    };

    fetchCourse();
  }, [id, authorizationtoken]);

  // Handle input changes
  const handleInput = (e) => {
    const { name, value, files } = e.target;
    if (name === "images" && files) {
      setCourse((prev) => ({
        ...prev,
        images: [...prev.images, ...Array.from(files)], // Append new files
      }));
    } else {
      setCourse((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Remove image
  const removeImage = (index) => {
    setCourse((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("coursename", course.coursename);
    formData.append("coursedesc", course.coursedesc);
    formData.append("courseinstruct", course.courseinstruct);

    course.images.forEach((image) => {
      if (image instanceof File) {
        formData.append("images", image); // Append only new images
      }
    });

    try {
      await axios.patch(
        `http://localhost:5000/api/data/courseupdate/${id}`,
        formData,
        {
          headers: {
            Authorization: authorizationtoken,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Course updated successfully");
      navigate("/viewcourses");
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Failed to update course");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Update Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Course Name</label>
          <input
            type="text"
            className="form-control"
            name="coursename"
            value={course.coursename}
            onChange={handleInput}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Course Description</label>
          <textarea
            className="form-control"
            name="coursedesc"
            value={course.coursedesc}
            onChange={handleInput}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Course Instructor</label>
          <input
            type="text"
            className="form-control"
            name="courseinstruct"
            value={course.courseinstruct}
            onChange={handleInput}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Course Images</label>
          <input
            type="file"
            className="form-control"
            name="images"
            accept="image/*"
            multiple
            onChange={handleInput}
          />
        </div>
        {/* Image Previews */}
        <div className="image-previews">
  {course.images.map((image, index) => (
    <div key={index} className="image-preview">
    <img
        src={
          typeof image === "string" // Check if it's a previous image (URL string)
            ? `${baseURL}/${image}` // Add base URL for server-hosted images
            : URL.createObjectURL(image) // For newly added files
        }
        alt={`preview-${index}`}
        style={{ width: "100px", height: "100px", margin: "5px" }}
      />
      <button
        type="button"
        className="btn btn-danger btn-sm"
        onClick={() => removeImage(index)}
      >
        x
      </button>
    </div>
  ))}
</div>
        <button type="submit" className="btn btn-primary">
          Update Course
        </button>
      </form>
    </div>
  );
};

export default CourseUpdate;
