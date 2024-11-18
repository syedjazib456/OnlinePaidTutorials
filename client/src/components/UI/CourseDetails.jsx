import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // Import useParams


const baseURL = import.meta.env.VITE_API_URL;

function CourseDetails() {
  const { id } = useParams();  // Get the course id from the URL params
  const [courseDetails, setCourseDetails] = useState(null);

  // Fetch course details based on the course id
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`${baseURL}/api/data/course/${id}/details`);
        const data = await response.json();
        if (response.ok) {
          setCourseDetails(data);  // Set course data to state
        } else {
          console.error('Course not found', data);
        }
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourseDetails();
  }, [id]);

  if (!courseDetails) {
    return <div>Loading...</div>;
  }

  const { coursename, coursedesc, courseinstruct, courseimages, price, detailedDescription, isPublished } = courseDetails;

  return (
    <div className="course-details">
      <h1>{coursename}</h1>
      <p>{coursedesc}</p>
      <p>{courseinstruct}</p>
      <div>
        <img src={`${baseURL}/${courseimages[0]}`} alt={coursename} className="img-fluid" />
      </div>
      <div>
        <h3>Price: {price}</h3>
        <p>{detailedDescription}</p>
        <p>Status: {isPublished ? 'Published' : 'Not Published'}</p>
      </div>
    </div>
  );
}

export default CourseDetails;
