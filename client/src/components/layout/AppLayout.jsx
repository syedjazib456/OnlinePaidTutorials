import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";

function AppLayout(){
  // const location =useLocation() ;

  // Define routes where you want to hide the Header and Footer
  // const hideHeaderFooterRoutes = ['/adminlogin','/admindashboard','/adminregister'];

  // const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(location.pathname);
 return (


    <React.Fragment>
      <div className="container">  
        <Header/>
      {/*shouldHideHeaderFooter ? null : <Header />*/} {/* Render Header only if not hiding */}
        <Outlet/>
      {/*shouldHideHeaderFooter ? null : <Footer />*/} {/* Render Footer only if not hiding */}
        <Footer/>
        </div>
    </React.Fragment>
 );
}

export default AppLayout;