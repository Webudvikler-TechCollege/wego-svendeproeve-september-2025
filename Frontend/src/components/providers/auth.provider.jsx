import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};



export const AuthProvider = ({ children }) => {
    const [loginData, setLoginDataState] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    // Custom setLoginData that also stores in sessionStorage
    const setLoginData = (data) => {
        setLoginDataState(data);
        if (data) {
            // Store token in sessionStorage when logging in
            sessionStorage.setItem('access_token', JSON.stringify(data));
        } else {
            // Remove from sessionStorage when logging out
            sessionStorage.removeItem('access_token');
        }
    };

    // Check for existing token on app initialization
    useEffect(() => {
        const storedToken = sessionStorage.getItem('access_token');
        if (storedToken) {
            try {
                const parsedToken = JSON.parse(storedToken);
                setLoginDataState(parsedToken); // Use internal state setter to avoid re-storing
            } catch (error) {
                console.error('Error parsing stored token:', error);
                sessionStorage.removeItem('access_token');
            }
        }
        setLoading(false);
    }, []);

    // Custom logout function that clears both state and storage
    const logout = () => {
        setLoginData(null); // This will handle both state and storage
        const notify = () => toast.info("Logged out successfully");
        notify();
    };

    const value = {
        loginData,
        setLoginData,
        logout,
        loading,
        isLoggedIn: !!loginData
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};