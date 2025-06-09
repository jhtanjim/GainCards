"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { login, logout, refresh, register } from "../api/auth.js";
import { myProfile } from "../api/profile";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [shouldFetchProfile, setShouldFetchProfile] = useState(false);
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
    enabled: isInitialized && shouldFetchProfile,
    retry: false,
    staleTime: 5 * 60 * 1000,
    onError: (error) => {
      console.error("Error fetching user data:", error);
      // If unauthorized, stop trying to fetch profile
      if (error?.response?.status === 401) {
        queryClient.setQueryData(["user", "profile"], null);
        setShouldFetchProfile(false);
      }
    },
    onSuccess: (userData) => {
      console.log("User data fetched:", userData);
    },
  });

  // Function to check if user has auth cookies
  const checkAuthCookies = () => {
    if (typeof document === "undefined") return false;

    const cookies = document.cookie.split(";");
    const hasAccessToken = cookies.some((cookie) =>
      cookie.trim().startsWith("access_token=")
    );
    const hasRefreshToken = cookies.some((cookie) =>
      cookie.trim().startsWith("refresh_token=")
    );

    return hasAccessToken || hasRefreshToken;
  };

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async (loginResponse) => {
      console.log("Login successful:", loginResponse);

      // Enable profile fetching after successful login
      setShouldFetchProfile(true);

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

      // Enable profile fetching after successful registration
      setShouldFetchProfile(true);

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

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      console.log("Logout successful");
      // Disable profile fetching after logout
      setShouldFetchProfile(false);
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
      // Disable profile fetching even if logout fails
      setShouldFetchProfile(false);
      // Clear user data locally even if API call fails
      queryClient.setQueryData(["user", "profile"], null);
      queryClient.removeQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries();
      queryClient.clear();
    },
  });

  // Refresh token mutation
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
      setShouldFetchProfile(false);
    },
  });

  // Initialize auth on mount
  useEffect(() => {
    if (!isInitialized) {
      console.log("Initializing auth...");

      // Check if user has auth cookies
      const hasAuthCookies = checkAuthCookies();
      console.log("Has auth cookies:", hasAuthCookies);

      if (hasAuthCookies) {
        // If cookies exist, enable profile fetching
        setShouldFetchProfile(true);
      }

      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Auth methods
  const signIn = async (formData) => {
    try {
      console.log("Attempting login with:", formData);
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
      console.log("Attempting registration with:", userData);
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
      setShouldFetchProfile(false);
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
        setShouldFetchProfile(false);
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
