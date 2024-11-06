import React from "react";

function Home() {
  return (
    <div>
      {/* Carousel */}
      <div id="carouselExampleIndicators" className="carousel slide">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
        <div className="carousel-item active">
            <img height="450"
              src="https://i0.wp.com/ksfaction.com/wp-content/uploads/2023/01/Expert-Faculty.png?fit=1600%2C750&ssl=1"
              className="d-block w-100"
              alt="Third slide"
            />
            
          </div>
          <div className="carousel-item ">
            <img height="450"
              src="https://corp.kaltura.com/wp-content/uploads/2023/08/Flexible-Learning_-Effective-Strategies-Key-Insights.jpg"
              className="d-block w-100"
              alt="First slide"
            />
           
          </div>
          <div className="carousel-item">
            <img height="450"
              src="https://plus.unsplash.com/premium_photo-1670315267653-2adecd823d9e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fG9mZmljZXxlbnwwfHwwfHx8MA%3D%3D"
              className="d-block w-100"
              alt="Second slide"
            />

          </div>
       
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Cards */}
      <div className="container my-5">
  <div className="row justify-content-center">
    <div className="col-md-4">
      <div className="card h-100 border-2 shadow-lg">
        <img
          src="https://media.istockphoto.com/id/1265582169/photo/elementary-school-science-teacher-uses-interactive-digital-whiteboard-to-show-classroom-full.jpg?s=612x612&w=0&k=20&c=pER6vSKJisVmUjUQuA3WSRMG2ppFiUb5Yebbg7EwElg="
          className="card-img-top"
          alt="Interactive Learning"
        />
        <div className="card-body">
          <h5 className="card-title text-warning">Interactive Learning</h5>
          <p className="card-text text-light">
            Join our interactive courses to enhance your skills and knowledge in a fun and engaging way.
          </p>
          <a href="#" className="btn btn-warning">Learn More</a>
        </div>
      </div>
    </div>
    
    <div className="col-md-4">
      <div className="card h-100 border-2 shadow-lg">
        <img
          src="https://i0.wp.com/ksfaction.com/wp-content/uploads/2023/01/Expert-Faculty.png?fit=1600%2C750&ssl=1"
          className="card-img-top"
          alt="Expert Instructors"
        />
        <div className="card-body">
          <h5 className="card-title text-warning">Expert Instructors</h5>
          <p className="card-text text-light">
            Learn from industry experts who bring real-world experience to the classroom.
          </p>
          <a href="#" className="btn btn-warning">Explore Courses</a>
        </div>
      </div>
    </div>
    
    <div className="col-md-4">
      <div className="card h-100 border-2 shadow-lg">
        <img
          src="https://corp.kaltura.com/wp-content/uploads/2023/08/Flexible-Learning_-Effective-Strategies-Key-Insights.jpg"
          className="card-img-top"
          alt="Flexible Learning"
        />
        <div className="card-body">
          <h5 className="card-title text-warning">Flexible Learning</h5>
          <p className="card-text text-light">
            Study at your own pace, anytime and anywhere with our flexible online courses.
          </p>
          <a href="#" className="btn btn-warning">Get Started</a>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  );
}

export default Home;
