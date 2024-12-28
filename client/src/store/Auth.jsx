import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [admintoken, setAdminToken] = useState(() => localStorage.getItem("adminToken"));
    const [user, setUser] = useState("");
    const [courses, setCourses] = useState([]);
    const [subscription, setSubscription] = useState(null); // New state for subscription
    const [isLoadingSubscription, setIsLoadingSubscription] = useState(true); // Loading state for subscription

    const isLoggedIn = !!token;
    const isAdminLoggedIn = !!admintoken;

    const storeToken = (serverToken) => {
        setToken(serverToken);
        localStorage.setItem("token", serverToken);
    };

    const storeAdminToken = (serverToken) => {
        setAdminToken(serverToken);
        localStorage.setItem("adminToken", serverToken);
    };

    const logoutUser = () => {
        setToken("");
        localStorage.removeItem("token");
        setSubscription(null); // Clear subscription data on logout
    };

    const logoutAdmin = () => {
        setAdminToken("");
        localStorage.removeItem("adminToken");
    };

    // Fetch authenticated user data
    const userAuthentication = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/user", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                const data = await response.json();
                console.log("User Data", data.userData);
                setUser(data.userData);
            }
        } catch (error) {
            console.error("Error fetching authenticated user data:", error);
        }
    };

    // Fetch courses
    const getCourses = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/data/frontendcourses", {
                method: "GET",
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data.msg);
                setCourses(data.msg);
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    // Fetch subscription status
    const fetchSubscription = async () => {
        try {
            setIsLoadingSubscription(true);
            const response = await fetch("http://localhost:5000/api/subscription/status", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                setSubscription(data.subscription);
            } else if (response.status === 404) {
                setSubscription(null); // No active subscription
            }
        } catch (error) {
            console.error("Error fetching subscription status:", error);
            setSubscription(null);
        } finally {
            setIsLoadingSubscription(false);
        }
    };

    // Automatically fetch user, courses, and subscription on token change
    useEffect(() => {
        if (token) {
            userAuthentication();
            
            fetchSubscription();
        }
        getCourses();
    }, [token]);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                storeToken,
                logoutUser,
                user,
                courses,
                subscription,
                fetchSubscription,
                isLoadingSubscription,
                storeAdminToken,
                isAdminLoggedIn,
                logoutAdmin,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);

    if (!authContextValue) {
        throw new Error("Auth Provider not used as a Parent in main.jsx");
    }

    return authContextValue;
};
