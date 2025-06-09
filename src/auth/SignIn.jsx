// src/components/SignIn.jsx
"use client";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../Context/AuthContext";

const SignIn = () => {
  const { signIn, isLoggingIn, loginError, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const getRedirectUrl = () => {
    const searchParams = new URLSearchParams(location.search);
    const redirectFromQuery = searchParams.get("redirect");
    const redirectFromState = location.state?.from;

    return redirectFromQuery || redirectFromState || "/";
  };

  const redirectUrl = getRedirectUrl();

  // Step 1: Set up state for form data and UI states
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectUrl, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectUrl]);

  // Handle login errors from React Query
  useEffect(() => {
    if (loginError) {
      const errorMessage =
        loginError.response?.data?.message ||
        loginError.message ||
        "Invalid email/username or password";

      setError(errorMessage);

      Swal.fire({
        title: "Login Failed",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: "#EAB308",
      });
    }
  }, [loginError]);

  // Step 2: Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  // Handle forgot password
  const handleForgotPassword = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Reset Password",
      text: "Enter your email address to reset your password",
      input: "email",
      inputPlaceholder: "Enter your email",
      showCancelButton: true,
      confirmButtonColor: "#EAB308",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Send Reset Link",
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
      preConfirm: (email) => {
        if (!email) {
          Swal.showValidationMessage("Please enter your email");
          return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          Swal.showValidationMessage("Please enter a valid email");
          return false;
        }

        // Here you would typically call your forgot password API
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(email);
          }, 1000);
        });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Email Sent!",
          text: "Check your inbox for password reset instructions",
          icon: "success",
          confirmButtonColor: "#EAB308",
        });
      }
    });
  };

  // Step 3: Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Show loading state
    Swal.fire({
      title: "Signing in...",
      text: "Please wait",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const result = await signIn(formData);

      if (result.success) {
        // Success - user will be redirected by useEffect when isAuthenticated becomes true
        Swal.fire({
          title: "Welcome back!",
          text: `Redirecting you to ${
            redirectUrl === "/" ? "home" : "your requested page"
          }...`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        // Handle specific error from signIn
        setError(result.error);
        Swal.fire({
          title: "Invalid Credentials",
          text: result.error || "Please check your email and password",
          icon: "error",
          confirmButtonColor: "#EAB308",
        });
      }
    } catch (err) {
      // This shouldn't happen with the new auth context, but kept for safety
      console.error("Unexpected login error:", err);
      const errorMessage = "An unexpected error occurred. Please try again.";
      setError(errorMessage);

      Swal.fire({
        title: "Login Failed",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: "#EAB308",
      });
    }
  };

  // Show redirect info if there's a redirect URL
  const showRedirectInfo = redirectUrl && redirectUrl !== "/";

  // Step 9: Render the form
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Sign In</h1>
          <p className="mt-2 text-gray-600">Welcome back to GainCards!</p>
          {showRedirectInfo && (
            <p className="mt-1 text-sm text-blue-600 bg-blue-50 p-2 rounded">
              You'll be redirected after signing in
            </p>
          )}
        </div>

        {error && (
          <div
            className="p-4 text-sm text-red-700 bg-red-100 rounded-lg"
            role="alert"
          >
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email or Username
            </label>
            <input
              id="email"
              name="email"
              type="text"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoggingIn}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoggingIn}
            />
          </div>

          <div className="flex items-center justify-end">
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-yellow-600 hover:text-yellow-500"
                onClick={handleForgotPassword}
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoggingIn ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to={`/signup${
                redirectUrl !== "/"
                  ? `?redirect=${encodeURIComponent(redirectUrl)}`
                  : ""
              }`}
              className="font-medium text-yellow-600 hover:text-yellow-500"
              onClick={(e) => {
                // Allow ctrl/cmd+click to open in new tab
                if (e.ctrlKey || e.metaKey) return;
                e.preventDefault();

                Swal.fire({
                  title: "Creating an account...",
                  allowOutsideClick: false,
                  showConfirmButton: false,
                  willOpen: () => {
                    Swal.showLoading();
                  },
                  timer: 800,
                  timerProgressBar: true,
                }).then(() => {
                  navigate(
                    `/signup${
                      redirectUrl !== "/"
                        ? `?redirect=${encodeURIComponent(redirectUrl)}`
                        : ""
                    }`
                  );
                });
              }}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
