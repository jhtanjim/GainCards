"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import {
  checkAuthStatus,
  login,
  logout,
  refresh,
  register,
} from "../api/auth.js";
import { myProfile } from "../api/profile";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const queryClient = useQueryClient();

  // Check auth status on initialization - this should run first
  const {
    data: authStatus,
    isLoading: authStatusLoading,
    error: authStatusError,
    isSuccess: authStatusSuccess,
    isError: authStatusIsError,
  } = useQuery({
    queryKey: ["auth", "status"],
    queryFn: async () => {
      try {
        const result = await checkAuthStatus();
        return result;
      } catch (error) {
        // Return a default object instead of throwing
        return { authenticated: false, user: null };
      }
    },
    enabled: isInitialized, // Only run after initialization
    retry: false, // Don't retry on auth failures
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 0, // Always check on mount
    // Provide a default value
    placeholderData: { authenticated: false, user: null },
  });

  // Query for user profile data - only run if authenticated
  const {
    data: user,
    isLoading: userLoading,
    error: userError,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["user", "profile"],
    queryFn: async () => {
      try {
        const result = await myProfile();
        return result;
      } catch (error) {
        throw error;
      }
    },
    enabled: isInitialized && authStatus?.authenticated === true,
    retry: (failureCount, error) => {
      // Don't retry if it's a 401 (unauthorized)
      if (error?.response?.status === 401) return false;
      return failureCount < 1;
    },
    staleTime: 5 * 60 * 1000,
    onError: (error) => {
      console.error("Error fetching user data:", error);
      // If unauthorized, clear the auth status
      if (error?.response?.status === 401) {
        queryClient.setQueryData(["auth", "status"], { authenticated: false });
        queryClient.setQueryData(["user", "profile"], null);
      }
    },
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async (loginResponse) => {
      // Update auth status immediately
      queryClient.setQueryData(["auth", "status"], {
        authenticated: true,
        user: loginResponse.user,
      });

      if (loginResponse.user) {
        queryClient.setQueryData(["user", "profile"], loginResponse.user);
      } else {
        // Refetch user profile
        queryClient.invalidateQueries(["user", "profile"]);
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
      // Update auth status immediately
      queryClient.setQueryData(["auth", "status"], {
        authenticated: true,
        user: registerResponse.user,
      });

      if (registerResponse.user) {
        queryClient.setQueryData(["user", "profile"], registerResponse.user);
      } else {
        // Refetch user profile
        queryClient.invalidateQueries(["user", "profile"]);
      }
    },
    onError: (error) => {
      console.error("Registration error:", error);
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Clear all auth-related data
      queryClient.setQueryData(["auth", "status"], { authenticated: false });
      queryClient.setQueryData(["user", "profile"], null);
      queryClient.removeQueries({ queryKey: ["user"] });
      // Don't clear all queries, just invalidate auth-related ones
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError: (error) => {
      console.error("Error during logout:", error);
      // Clear local data even if logout API fails
      queryClient.setQueryData(["auth", "status"], { authenticated: false });
      queryClient.setQueryData(["user", "profile"], null);
      queryClient.removeQueries({ queryKey: ["user"] });
    },
  });

  // Refresh token mutation
  const refreshMutation = useMutation({
    mutationFn: refresh,
    onSuccess: async () => {
      // Invalidate queries to refetch with new token
      queryClient.invalidateQueries(["auth", "status"]);
      queryClient.invalidateQueries(["user", "profile"]);
    },
    onError: (error) => {
      console.error("Error refreshing token:", error);
      // If refresh fails, user should be logged out
      queryClient.setQueryData(["auth", "status"], { authenticated: false });
      queryClient.setQueryData(["user", "profile"], null);
    },
  });

  // Initialize auth on mount
  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true);
    }
  }, []);

  // Auth methods
  const signIn = async (formData) => {
    try {
      const result = await loginMutation.mutateAsync(formData);
      return { success: true, data: result };
    } catch (error) {
      console.error("SignIn error:", error);
      return {
        success: false,
        error:
          error.response?.data?.message || error.message || "Failed to sign in",
      };
    }
  };

  const signUp = async (userData) => {
    try {
      const result = await registerMutation.mutateAsync(userData);
      return { success: true, data: result };
    } catch (error) {
      console.error("SignUp error:", error);
      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to create account",
      };
    }
  };

  const signOut = async () => {
    try {
      await logoutMutation.mutateAsync();
      return { success: true };
    } catch (error) {
      console.error("Logout API failed, but clearing local data:", error);
      return { success: true, localOnly: true };
    }
  };

  const refreshToken = async () => {
    try {
      await refreshMutation.mutateAsync();
      return true;
    } catch (error) {
      queryClient.setQueryData(["auth", "status"], { authenticated: false });
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
      if (error?.response?.status === 401) {
        queryClient.setQueryData(["auth", "status"], { authenticated: false });
        queryClient.setQueryData(["user", "profile"], null);
      }
      return null;
    }
  };

  // Determine authentication state
  const isAuthenticated = authStatus?.authenticated === true && !!user;

  // Combine loading states - show loading until we have a definitive auth status
  const loading =
    !isInitialized ||
    authStatusLoading ||
    (authStatus?.authenticated === true && userLoading) ||
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
    isAuthenticated,
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
    authStatusError,
    // Add these for debugging
    authStatus,
    _debug: {
      isInitialized,
      authStatusLoading,
      authStatusSuccess,
      authStatusIsError,
      authStatusError,
      userLoading,
      authStatus,
      user,
      userError,
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
