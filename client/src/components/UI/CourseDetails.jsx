import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Subscription from './Subscription'; // Import the Subscription component

const baseURL = import.meta.env.VITE_API_URL;

const CourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await fetch(`${baseURL}/api/data/course/${id}/details`);
                const data = await response.json();
                if (response.ok) {
                    setCourse(data); // Assuming the course data contains price
                } else {
                    console.error('Course not found', data);
                }
            } catch (error) {
                console.error('Error fetching course details:', error);
            }
        };

        fetchCourseDetails();
    }, [id]);

    if (!course) {
        return <div>Loading...</div>;
    }

    const {
        coursename,
        coursedesc,
        courseinstruct,
        courseimages = [],
        price,
        detailedDescription,
        isPublished,
    } = course;

    return (
        <div className="course-details container my-4">
            <div className="row">
                {/* Image Section */}
                <div className="col-md-6">
                    {courseimages.length > 0 ? (
                        <div id="courseCarousel" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                {courseimages.map((image, index) => (
                                    <div
                                        className={`carousel-item ${index === 0 ? 'active' : ''}`}
                                        key={index}
                                    >
                                        <img
                                            src={`${baseURL}/${image}`}
                                            className="d-block w-100"
                                            alt={`Course Image ${index + 1}`}
                                            style={{
                                                objectFit: 'contain',
                                                height: '400px',
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                            <button
                                className="carousel-control-prev"
                                type="button"
                                data-bs-target="#courseCarousel"
                                data-bs-slide="prev"
                            >
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button
                                className="carousel-control-next"
                                type="button"
                                data-bs-target="#courseCarousel"
                                data-bs-slide="next"
                            >
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    ) : (
                        <img
                            src="/placeholder-image.png" // Replace with your placeholder image path
                            alt="No images available"
                            className="img-fluid"
                            style={{
                                objectFit: 'contain',
                                height: '400px',
                            }}
                        />
                    )}
                </div>

                {/* Details Section */}
                <div className="col-md-6">
                    <h1 className="text-primary">{coursename}</h1>
                    <p className="text-muted">{coursedesc}</p>
                    <p className="text-secondary">
                        <strong>Instructor:</strong> {courseinstruct}
                    </p>
                    <h3 className="text-success">Price: {price}</h3>
                    <p>{detailedDescription}</p>
                    <p>
                        <strong>Status:</strong> {isPublished ? 'Published' : 'Not Published'}
                    </p>
                    {/* Render the Subscription component, passing the course price */}
                    <Subscription coursePrice={price} />
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
