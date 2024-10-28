import { useAuth } from "../../store/Auth";


function About(){
    const {user} = useAuth();
    return (

        <div>
  {/* About Page */}
  <section className="py-5 bg-light">
    <div className="container">
      <div className="row">
        <div className="col-md-6 text-center mt-5">
          <h1 className="display-4">Welcome  
         {user ? (
         [
          <span className="text-warning"> {user.username}  </span> ,
          <span>To Our Website</span>// Apply a custom style or class here
         ]
              ) : 
           (
           " To Our WebSite"
           )}
          </h1>
          <p className="lead text-muted">
            We are dedicated to providing the best services and resources to help you achieve your goals. Our team is committed to excellence and we strive to make a positive impact in our community.
          </p>
          <p>
            Whether you're here to learn, connect, or grow, we have something for everyone. Explore our offerings and join us on this journey.
          </p>
          <a href="/services" className="btn btn-warning text-white mt-3">
            Explore Our Services
          </a>
        </div>
        <div className="col-md-6">
          <img
            width="500"
            height="400"
            className="img-fluid rounded"
            src="https://img.freepik.com/free-photo/business-people-meeting-conference-room_1098-15740.jpg"
            alt="About Us"
          />
        </div>
      </div>
    </div>
  </section>

  {/* Mission and Vision Section */}
  <section className="py-5 bg-dark text-white">
    <div className="container">
      <h2 className="text-center mb-4">Our Mission</h2>
      <p className="text-center">
        Our mission is to empower individuals and organizations through innovative solutions and unwavering support. We believe in the potential of every person and are here to help you realize it.
      </p>
      <h2 className="text-center mt-4">Our Vision</h2>
      <p className="text-center">
        We envision a world where everyone has access to the resources and opportunities they need to succeed. Join us in making this vision a reality.
      </p>
    </div>
  </section>
</div>

    );
}

export default About;