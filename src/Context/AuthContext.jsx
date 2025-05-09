"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { login, logout, refresh, register } from "../api/auth.js";
import { myProfile } from "../api/profile";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const userData = await myProfile();
      setUser(userData);
      console.log(userData);
      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check auth status when component mounts
    fetchUserData();
  }, []);

  const signIn = async (formData) => {
    setLoading(true);

    try {
      console.log(formData);
      const data = await login(formData);
      await fetchUserData(); // fetch user from profile endpoint
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || error.message || "Failed to sign in",
      };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (userData) => {
    setLoading(true);
    try {
      const data = await register(userData);
      await fetchUserData(); // fetch user from profile endpoint
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to create account",
      };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      // Try to logout through the API
      await logout();
      // Even if the API call fails, we should still clear the user state
      setUser(null);
      return { success: true };
    } catch (error) {
      console.error("Error during logout:", error);
      // Even if server logout fails, we should still log out locally
      setUser(null);
      // Return success true because the user was still logged out locally
      return { success: true, localOnly: true };
    }
  };

  const refreshToken = async () => {
    try {
      await refresh();
      return true;
    } catch (error) {
      console.error("Error refreshing token:", error);
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
