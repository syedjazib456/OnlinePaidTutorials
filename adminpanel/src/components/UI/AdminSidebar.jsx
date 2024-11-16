import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import './styles.css';
import { useAuth } from "../../store/Auth";

function AdminSidebar() {
  const { logoutAdmin } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Create a ref to check if the click was inside the sidebar
  const sidebarRef = useRef(null);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close the sidebar when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false); // Close sidebar
      }
    };

    // Attach the event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="container"></div>
      <input
       hidden
        type="checkbox"
        id="check"
        checked={isSidebarOpen}
        onChange={toggleSidebar} // toggle sidebar visibility
      />
      <label htmlFor="check">
        <i className="fas fa-bars" id="btn"></i>
        <i className="fas fa-times" id="cancel"></i>
      </label>
      <div
        ref={sidebarRef}
        className={`sidebar ${isSidebarOpen ? "open" : ""}`} // Add open class if sidebar is open
      >
        <header>Menu</header>
        <NavLink to="/admindashboard" className="active">
          <i className="fas fa-qrcode"></i>
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/adminlist">
          <i className="fas fa-link"></i>
          <span>Admin Details</span>
        </NavLink>
        <NavLink to="/viewcourses">
          <i className="fas fa-stream"></i>
          <span>View Courses</span>
        </NavLink>
        <NavLink to="/events">
          <i className="fas fa-calendar"></i>
          <span>Events</span>
        </NavLink>
        <NavLink to="/about">
          <i className="far fa-question-circle"></i>
          <span>About</span>
        </NavLink>
        <NavLink to="/services">
          <i className="fas fa-sliders-h"></i>
          <span>Services</span>
        </NavLink>
        <NavLink
          to="/logout"
          onClick={(e) => {
            logoutAdmin(); // Call logout function
          }}
        >
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </NavLink>
      </div>

      <div className="frame">
        {/* Add any content here */}
      </div>
    </>
  );
}

export default AdminSidebar;
