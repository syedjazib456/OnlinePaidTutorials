import React from "react";
import { NavLink } from "react-router-dom";
import './styles.css';
import { useAuth } from "../../store/Auth";

function AdminSidebar() {
  const {logoutAdmin} = useAuth();
  return (
    <>
    <div className="container"></div>
      <input type="checkbox" id="check" />
      <label htmlFor="check">
        <i className="fas fa-bars" id="btn"></i>
        <i className="fas fa-times" id="cancel"></i>
      </label>
      <div className="sidebar">
        <header>Menu</header>
        <NavLink to="/admindashboard" className="active">
          <i className="fas fa-qrcode"></i>
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/adminlist">
          <i className="fas fa-link"></i>
          <span>Admin Details</span>
        </NavLink>
        <NavLink to="/overview">
          <i className="fas fa-stream"></i>
          <span>Overview</span>
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
      
      </div>
    </>
  );
}

export default AdminSidebar;
