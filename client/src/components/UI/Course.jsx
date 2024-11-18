import React, { useState } from 'react';
import { useAuth } from '../../store/Auth';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import './course.css';

const baseURL = import.meta.env.VITE_API_URL;

function Course() {
  const { courses } = useAuth();

  return (
    <div className="container my-4">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
        {courses.map((currentElement, index) => {
          const { _id, coursename, coursedesc, courseinstruct, courseimages } = currentElement;  // Make sure to destructure _id

          return (
            <div className="col my-3" key={index}>
              <div className="card h-100 border-2 shadow-lg">
                {/* Image Carousel */}
                <ImageCarousel courseimages={courseimages} coursename={coursename} />

                <div className="card-body">
                  <h5 className="card-title text-warning">{coursename}</h5>
                  <p className="card-text text-secondary">{coursedesc}</p>
                  <p className="card-text text-dark">{courseinstruct}</p>

                  {/* Link to Course Details page with the course id */}
                  <Link to={`/courses/${_id}`} className="btn btn-warning">
                    Explore Courses
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ImageCarousel({ courseimages, coursename }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleTabClick = (index) => {
    setActiveImageIndex(index);
  };

  return (
    <div className="card-img-container">
      {/* Displaying active image */}
      <div className="image-main-container">
        <img
          src={`${baseURL}/${courseimages[activeImageIndex]}`}
          alt={`${coursename} image ${activeImageIndex + 1}`}
          className="img-fluid"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            maxHeight: '300px',
          }}
        />
      </div>

      {/* Image tabs */}
      <div className="image-tabs mt-2 d-flex justify-content-center">
        {courseimages.map((image, index) => (
          <div
            key={index}
            className={`tab-button ${index === activeImageIndex ? 'active' : ''}`}
            onClick={() => handleTabClick(index)}
            style={{
              width: '50px',
              height: '50px',
              margin: '0 5px',
              borderRadius: '5px',
              backgroundColor: index === activeImageIndex ? '#FFD700' : '#f0f0f0',
              cursor: 'pointer',
              display: 'inline-block',
            }}
          >
            <img
              src={`${baseURL}/${image}`}
              alt={`${coursename} thumbnail ${index + 1}`}
              className="img-fluid"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '5px',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Course;
