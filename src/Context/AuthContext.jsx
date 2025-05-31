"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { login, logout, refresh, register } from "../api/auth.js";
import { myProfile } from "../api/profile";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const fetchUserData = async () => {
    try {
      const userData = await myProfile();
      setUser(userData);
      console.log("User data fetched:", userData);
      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null);
      return null;
    }
  };

  // Only check auth status on initial load
  useEffect(() => {
    const initializeAuth = async () => {
      if (isInitialized) return;
      
      setLoading(true);
      try {
        await fetchUserData();
      } catch (error) {
        console.error("Failed to initialize auth:", error);
      } finally {
        setLoading(false);
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, [isInitialized]);

  const signIn = async (formData) => {
    setLoading(true);
    try {
      console.log("Attempting login with:", formData);
      const loginResponse = await login(formData);
      
      // If login returns user data, use it directly
      if (loginResponse.user) {
        setUser(loginResponse.user);
      } else {
        // Otherwise fetch user data
        await fetchUserData();
      }
      
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || "Failed to sign in",
      };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (userData) => {
    setLoading(true);
    try {
      const registerResponse = await register(userData);
      
      // If registration returns user data, use it directly
      if (registerResponse.user) {
        setUser(registerResponse.user);
      } else {
        // Otherwise fetch user data
        await fetchUserData();
      }
      
      return { success: true };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || "Failed to create account",
      };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      // Clear user state immediately for better UX
      setUser(null);
      
      // Try to logout through the API
      await logout();
      return { success: true };
    } catch (error) {
      console.error("Error during logout:", error);
      // User is already logged out locally
      return { success: true, localOnly: true };
    }
  };

  const refreshToken = async () => {
    try {
      await refresh();
      // Optionally refetch user data after refresh
      await fetchUserData();
      return true;
    } catch (error) {
      console.error("Error refreshing token:", error);
      setUser(null); // Clear user on refresh failure
      return false;
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    refreshToken,
    isAuthenticated: !!user,
    fetchUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};