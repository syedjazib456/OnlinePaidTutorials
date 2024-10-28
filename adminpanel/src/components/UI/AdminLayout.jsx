import React from "react";
import { Outlet,useLocation } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";


function AdminLayout(){
    const location =useLocation() ;
    // Define routes where you want to hide the Header and Footer
  const hideHeaderFooterRoutes = ['/','/adminlogin','/adminregister'];
    const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(location.pathname);
return (
 
    <React.Fragment>
    <div className="admin-layout">
   {/* {shouldHideHeaderFooter? null :<AdminSidebar className="admin-sidebar"/>} */}
   <div className="admin-content">
    {shouldHideHeaderFooter? null :<AdminSidebar/>}
         <Outlet/>
         </div>
         </div>
    </React.Fragment>
   
);
}

export default AdminLayout;