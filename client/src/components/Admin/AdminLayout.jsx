import React from "react";
import { Outlet,useLocation } from "react-router-dom";
import AdminHeader from "./AdminHeader";

function AdminLayout(){
    const location =useLocation() ;
    // Define routes where you want to hide the Header and Footer
  const hideHeaderFooterRoutes = ['/admin/adminlogin','/admin/adminregister'];
    const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(location.pathname);
return (
 
    <React.Fragment>
    <div className="container">
    {shouldHideHeaderFooter? null :<AdminHeader/>}
         <Outlet/>
    </div>
    </React.Fragment>
   
);
}

export default AdminLayout;