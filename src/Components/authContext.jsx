// AuthContext.jsx
import React, {createContext, useContext, useEffect, useState} from "react";

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    const login = (token) => {
        setIsAuthenticated(true);
        setAccessToken(token);
        localStorage.setItem("accessToken", token);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setAccessToken(null);
        localStorage.removeItem("accessToken");
    };

    // Check for token on mount and validate it if necessary
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            // Optionally validate the token with your API (e.g., check if it's expired or valid)
            // For now, assume it's valid if it exists
            setIsAuthenticated(true);
            setAccessToken(token);
        }
        setIsLoading(false); // Set loading to false after checking
    }, []);

    const value = {
        isAuthenticated,
        accessToken,
        isLoading, // Expose loading state
        login,
        logout,
    };

    // Only render children when not loading to prevent premature redirects
    if (isLoading) {
        return <div>Loading...</div>; // Or a loading spinner
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);