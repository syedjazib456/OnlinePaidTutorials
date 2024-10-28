import { createContext, useContext, useEffect, useState } from "react";
//Provider
// Create Auth Context
const AuthContext = createContext();
// It provides a way to share values (like user authentication status, theme settings, or any other global data)
//  across the entire component tree without the need for props drilling
export const AuthProvider = ({ children }) => {
    // Initialize token from localStorage
 

    const [admintoken,setAdminToken] =useState(()=>localStorage.getItem("adminToken"));


    const authorizationtoken = `Bearer ${admintoken}`;
    // isLoggedIn based on token

    // !!undefined becomes false
    // !!some string" becomes true
    const isAdminLoggedIn = !!admintoken;
    // Function to store token
 
    const storeAdminToken = (serverToken) => { //**** */
        setAdminToken(serverToken); // Update state
        localStorage.setItem('adminToken', serverToken); // Store in localStorage
    };
    // Logout functionality
 
    const logoutAdmin = () => {
        setAdminToken(''); // Clear token state //value
        localStorage.removeItem('adminToken'); // Remove from localStorage
    };
    //to get authenticate user data 

   

   
//For an Authentication
// Without token in the Dependency Array
// Effect Behavior:
    // The useEffect will run only once when the component mounts
    //  (i.e., when it is first rendered) and will not run again on subsequent renders, 
    // even if the token changes.
// This means that if the user logs in or out (resulting in a change to the token), the functions userAuthentication() and getServices() will not be called again unless the component unmounts and remounts.



     //For Authentication

    return ( //**** */
        <AuthContext.Provider value={{ isAdminLoggedIn,storeAdminToken,logoutAdmin,authorizationtoken}}>
            {children} {/* Here {children} means components that consume these functions */}
        </AuthContext.Provider>
    );




  
};
//Consumer that uses the Provider Auth Context
export const useAuth = () => {//**** */
    const authContextValue = useContext(AuthContext);
    
    if (!authContextValue) {
        throw new Error("Auth Provider not used as a Parent in main.jsx");
    }
    
    return authContextValue;
};
