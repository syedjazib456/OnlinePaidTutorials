import React from 'react'
import { useAuth } from '../../store/Auth';

function Course(){

    const {courses} = useAuth();
    
return(
    <div className='container my-4'>
    <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3'>
    {
    courses.map((currentElement,index)=>{
    const {coursename,coursedesc,courseinstruct} = currentElement;
   
return (
   
    <div className='col my-3'>
    <div className="card h-100 border-2 shadow-lg" key={index}>
    <img
      src="https://i0.wp.com/ksfaction.com/wp-content/uploads/2023/01/Expert-Faculty.png?fit=1600%2C750&ssl=1"
      className="card-img-top"
      alt="Expert Instructors"
    />
    <div className="card-body">
      <h5 className="card-title text-warning">{coursename}</h5>
      <p className="card-text text-secondary">
       {coursedesc}
      </p>
      <p className="card-text text-dark">
       {courseinstruct}
      </p>
      <a href="#" className="btn btn-warning">Explore Courses</a>
    </div>
  </div>
  </div>
 


);
     })}
     </div>
     </div>
);
}

export default Course;