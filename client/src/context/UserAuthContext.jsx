import { createContext, useContext, useState } from "react";
import axios from "axios";

const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {

    // Store the logged-in normal user
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Store the normal user's JWT separately from the admin token
    const [userToken, setUserToken] = useState(() => {
        return localStorage.getItem("userToken");
    });

    // Register a new user
    const register = async (name, email, password) => {
        try {
            const { data } = await axios.post("/api/user/register", {
                name,
                email,
                password,
            });

            return data;

        } catch (error) {
            console.error("User Registration Error:", error);

            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Registration failed",
            };
        }
    };

    // Login an existing user
    const login = async (email, password) => {
        try {
            const { data } = await axios.post("/api/user/login", {
                email,
                password,
            });

            if (data.success) {
                setUser(data.user);
                setUserToken(data.token);

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                localStorage.setItem(
                    "userToken",
                    data.token
                );
            }

            return data;

        } catch (error) {
            console.error("User Login Error:", error);

            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Login failed",
            };
        }
    };

    // Logout the normal user
    const logout = () => {
        setUser(null);
        setUserToken(null);

        localStorage.removeItem("user");
        localStorage.removeItem("userToken");
    };

    const value = {
        user,
        userToken,
        register,
        login,
        logout,
    };

    return (
        <UserAuthContext.Provider value={value}>
            {children}
        </UserAuthContext.Provider>
    );
};

export const useUserAuth = () => {
    return useContext(UserAuthContext);
};