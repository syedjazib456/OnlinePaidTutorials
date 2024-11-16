import { createContext, useContext, useEffect, useState } from "react";
//Provider
// Create Auth Context
const AuthContext = createContext();//Provider
// It provides a way to share values (like user authentication status, theme settings, or any other global data)
//  across the entire component tree without the need for props drilling
export const AuthProvider = ({ children }) => {//Object Destructuring
    // Initialize token from localStorage
   //*
    const [token, setToken] = useState(() => localStorage.getItem("token"));  //**** *///hooks

    const [admintoken,setAdminToken] =useState(()=>localStorage.getItem("adminToken"));///Application token:asfjakjbka
    const [user,SetUser] = useState("");

    const [courses,SetCourses] = useState("");
    // isLoggedIn based on token
    const isLoggedIn = !!token; // This will automatically update based on token
    // !!undefined becomes false
    // !!some string" becomes true
    const isAdminLoggedIn = !!admintoken;
    // Function to store token **
    const storeToken = (serverToken) => { //**** */
        setToken(serverToken); // Update state//token  storeToken(res_data.token)
        localStorage.setItem('token', serverToken); // Store in localStorage
    };
    const storeAdminToken = (serverToken) => { //**** */
        setAdminToken(serverToken); // Update state
        localStorage.setItem('adminToken', serverToken); // Store in localStorage
    };
    // Logout functionality
    const logoutUser = () => {
        setToken(''); // Clear token state //value
        localStorage.removeItem('token'); // Remove from localStorage
    };

    const logoutAdmin = () => {
        setAdminToken(''); // Clear token state //value
        localStorage.removeItem('adminToken'); // Remove from localStorage
    };
    //to get authenticate user data 

    const userAuthentication= async ()=>{

        
        try {
        const response = await fetch('http://localhost:5000/api/auth/user',{
            method:'GET',
            headers:{
                Authorization:`Bearer ${token}`//necessary to write bearer when we use JWT for security reasons
            }
        });
            if(response.ok){
                const data = await response.json();
                console.log('User Data',data.userData);
                SetUser(data.userData);//hooks
            }
        } catch (error) {
            console.log("Error Fetching Authenticate User Data");
        }
    }

    const getCourses =async ()=>{
        try {
            const response = await fetch('http://localhost:5000/api/data/frontendcourses',{
            method:'GET'
            });
            if(response.ok){
                const data = await response.json();
                console.log(data.msg);
                SetCourses(data.msg);//hooks
            }
        } catch (error) {
            console.log('Services Frontend Error'+error);
        }
    }
//For an Authentication
// Without token in the Dependency Array
// Effect Behavior:
    // The useEffect will run only once when the component mounts
    //  (i.e., when it is first rendered) and will not run again on subsequent renders, 
    // even if the token changes.
// This means that if the user logs in or out (resulting in a change to the token), the functions userAuthentication() and getServices() will not be called again unless the component unmounts and remounts.
   useEffect(()=>{//setState 
    userAuthentication();
    getCourses();
    //The above code render with the help of this dependency array
   },[token]);//Dependency Array


     //For Authentication
   
    return ( //**** */
        <AuthContext.Provider value={{ isLoggedIn, storeToken, logoutUser ,user,courses,storeAdminToken,isAdminLoggedIn,logoutAdmin}}>
            {children} {/* Here {children} means components that consume these functions */}
        </AuthContext.Provider>
    );




  
};
//Consumer that uses the Provider Auth Context
export const useAuth = () => {//**** */ consumer
    const authContextValue = useContext(AuthContext);
    
    if (!authContextValue) {
        throw new Error("Auth Provider not used as a Parent in main.jsx");
    }
    
    return authContextValue;//storeToken isLogged
};
