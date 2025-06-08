"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { login, logout, refresh, register } from "../api/auth.js";
import { myProfile } from "../api/profile";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const queryClient = useQueryClient();

  // Query for user profile data
  const {
    data: user,
    isLoading: userLoading,
    error: userError,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["user", "profile"],
    queryFn: myProfile,
    enabled: isInitialized,
    retry: false,
    staleTime: 5 * 60 * 1000,
    onError: (error) => {
      console.error("Error fetching user data:", error);
      // If unauthorized, clear user data
      if (error?.response?.status === 401) {
        queryClient.setQueryData(["user", "profile"], null);
      }
    },
    onSuccess: (userData) => {
      console.log("User data fetched:", userData);
    },
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async (loginResponse) => {
      console.log("Login successful:", loginResponse);

      if (loginResponse.user) {
        queryClient.setQueryData(["user", "profile"], loginResponse.user);
      } else {
        await refetchUser();
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: async (registerResponse) => {
      console.log("Registration successful:", registerResponse);

      if (registerResponse.user) {
        queryClient.setQueryData(["user", "profile"], registerResponse.user);
      } else {
        await refetchUser();
      }
    },
    onError: (error) => {
      console.error("Registration error:", error);
    },
  });

  // Logout mutation - FIXED
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      console.log("Logout successful");
      // Clear all user-related data
      queryClient.setQueryData(["user", "profile"], null);
      queryClient.removeQueries({ queryKey: ["user"] });
      // Invalidate all queries to prevent stale data
      queryClient.invalidateQueries();
      // Clear the entire query cache for a clean slate
      queryClient.clear();
    },
    onError: (error) => {
      console.error("Error during logout:", error);
      // Clear user data locally even if API call fails
      queryClient.setQueryData(["user", "profile"], null);
      queryClient.removeQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries();
      queryClient.clear();
    },
  });

  // Refresh token mutation - FIXED
  const refreshMutation = useMutation({
    mutationFn: refresh,
    onSuccess: async () => {
      console.log("Token refreshed successfully");
      await refetchUser();
    },
    onError: (error) => {
      console.error("Error refreshing token:", error);
      // If refresh fails, user should be logged out
      queryClient.setQueryData(["user", "profile"], null);
      queryClient.removeQueries({ queryKey: ["user"] });
    },
  });

  // Initialize auth on mount
  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Auth methods
  const signIn = async (formData) => {
    try {
      console.log("Attempting login with:", formData);
      await loginMutation.mutateAsync(formData);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || error.message || "Failed to sign in",
      };
    }
  };

  const signUp = async (userData) => {
    try {
      await registerMutation.mutateAsync(userData);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to create account",
      };
    }
  };

  // FIXED signOut method
  const signOut = async () => {
    try {
      await logoutMutation.mutateAsync();
      return { success: true };
    } catch (error) {
      console.error("Logout API failed, but clearing local data:", error);
      // Still clear local data even if API fails
      return { success: true, localOnly: true };
    }
  };

  const refreshToken = async () => {
    try {
      await refreshMutation.mutateAsync();
      return true;
    } catch (error) {
      // If refresh fails, clear user data
      queryClient.setQueryData(["user", "profile"], null);
      return false;
    }
  };

  const fetchUserData = async () => {
    try {
      const userData = await refetchUser();
      return userData.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      // If fetch fails due to auth, clear user data
      if (error?.response?.status === 401) {
        queryClient.setQueryData(["user", "profile"], null);
      }
      return null;
    }
  };

  // Combine loading states
  const loading =
    !isInitialized ||
    userLoading ||
    loginMutation.isLoading ||
    registerMutation.isLoading ||
    refreshMutation.isLoading;

  const value = {
    user: user || null,
    loading,
    signIn,
    signUp,
    signOut,
    refreshToken,
    isAuthenticated: !!user,
    fetchUserData,
    isLoggingIn: loginMutation.isLoading,
    isRegistering: registerMutation.isLoading,
    isLoggingOut: logoutMutation.isLoading,
    isRefreshing: refreshMutation.isLoading,
    userError,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    logoutError: logoutMutation.error,
    refreshError: refreshMutation.error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
