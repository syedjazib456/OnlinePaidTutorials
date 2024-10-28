import React from "react";
import { NavLink } from "react-router-dom";
// import '../vendor/fontawesome-free/css/all.min.css';
// import '../vendor/bootstrap/css/bootstrap.min.css';


function AdminHeader() {
  return (
    <>
    
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          {/* TopBar */}
          <nav className="navbar navbar-expand navbar-light bg-navbar topbar mb-4 static-top">
            <button id="sidebarToggleTop" className="btn btn-link rounded-circle mr-3">
              <i className="fa fa-bars"></i>
            </button>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown no-arrow">
                <NavLink className="nav-link dropdown-toggle" to="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="fas fa-search fa-fw"></i>
                </NavLink>
                <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                  <form className="navbar-search">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control bg-light border-1 small"
                        placeholder="What do you want to look for?"
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                        style={{ borderColor: "#3f51b5" }}
                      />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="button">
                          <i className="fas fa-search fa-sm"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </li>
              {/* Alerts Dropdown */}
              <li className="nav-item dropdown no-arrow mx-1">
                <NavLink className="nav-link dropdown-toggle" to="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="fas fa-bell fa-fw"></i>
                  <span className="badge badge-danger badge-counter">3+</span>
                </NavLink>
                <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                  <h6 className="dropdown-header">Alerts Center</h6>
                  <a className="dropdown-item d-flex align-items-center" href="#">
                    <div className="mr-3">
                      <div className="icon-circle bg-primary">
                        <i className="fas fa-file-alt text-white"></i>
                      </div>
                    </div>
                    <div>
                      <div className="small text-gray-500">December 12, 2019</div>
                      <span className="font-weight-bold">A new monthly report is ready to download!</span>
                    </div>
                  </a>
                  {/* Add more alerts as needed */}
                  <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                </div>
              </li>
              {/* Messages Dropdown */}
              <li className="nav-item dropdown no-arrow mx-1">
                <NavLink className="nav-link dropdown-toggle" to="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="fas fa-envelope fa-fw"></i>
                  <span className="badge badge-warning badge-counter">2</span>
                </NavLink>
                <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
                  <h6 className="dropdown-header">Message Center</h6>
                  <a className="dropdown-item d-flex align-items-center" href="#">
                    <div className="dropdown-list-image mr-3">
                      <img className="rounded-circle" src="img/man.png" style={{ maxWidth: "60px" }} alt="" />
                      <div className="status-indicator bg-success"></div>
                    </div>
                    <div className="font-weight-bold">
                      <div className="text-truncate">Hi there! I am wondering if you can help me with a problem I've been having.</div>
                      <div className="small text-gray-500">Udin Cilok · 58m</div>
                    </div>
                  </a>
                  {/* Add more messages as needed */}
                  <a className="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
                </div>
              </li>
              {/* User Dropdown */}
              <li className="nav-item dropdown no-arrow mx-1">
                <NavLink className="nav-link dropdown-toggle" to="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img className="img-profile rounded-circle" src="img/boy.png" style={{ maxWidth: "60px" }} alt="User" />
                  <span className="ml-2 d-none d-lg-inline text-white small">Maman Ketoprak</span>
                </NavLink>
                <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                  <NavLink className="dropdown-item" to="#">
                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                    Profile
                  </NavLink>
                  <NavLink className="dropdown-item" to="#">
                    <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                    Settings
                  </NavLink>
                  <NavLink className="dropdown-item" to="#">
                    <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                    Activity Log
                  </NavLink>
                  <div className="dropdown-divider"></div>
                  <NavLink className="dropdown-item" to="#" data-toggle="modal" data-target="#logoutModal">
                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                    Logout
                  </NavLink>
                </div>
              </li>
            </ul>
          </nav>
          {/* Topbar */}
        </div>
      </div>
    </>
  );
}

export default AdminHeader;
