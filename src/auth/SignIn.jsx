// src/components/SignIn.jsx
"use client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert
import { useAuth } from "../Context/AuthContext";

const SignIn = () => {
  const { signIn } = useAuth();

  // Step 1: Set up state for form data and UI states
  const [formData, setFormData] = useState({
    email: "", // For email or username
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Step 2: Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      preConfirm: (email) => {
        // Here you would connect to your password reset API
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 1000);
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
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
    setIsLoading(true);

    // Loading indicator
    Swal.fire({
      title: "Signing in...",
      text: "Please wait",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });

    // Step 4: Make API call with error handling
    try {
      const data = await signIn(formData);
      console.log(formData);

      if (data.success) {
        // Step 6: Redirect to home page or dashboard
        Swal.fire({
          title: "Welcome back!",
          text: "You have been successfully logged in",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate("/");
        });
      } else {
        Swal.fire({
          title: "Invalid Credentials",
          text: "Please check your email and password",
          icon: "error",
          confirmButtonColor: "#EAB308",
        });
      }
    } catch (err) {
      // Step 7: Handle errors
      console.error("Login error:", err);

      Swal.fire({
        title: "Login Failed",
        text:
          err.response?.data?.message || "Invalid email/username or password",
        icon: "error",
        confirmButtonColor: "#EAB308",
      });

      setError(
        err.response?.data?.message || "Invalid email/username or password"
      );
    } finally {
      // Step 8: Reset loading state
      setIsLoading(false);
    }
  };

  // Step 9: Render the form
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Sign In</h1>
          <p className="mt-2 text-gray-600">Welcome back to GainCards!</p>
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
            />
          </div>

          <div className="flex items-center justify-between">
            {/* <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                onClick={() => {
                  Swal.fire({
                    title: 'Remember Me',
                    text: 'Your login details will be remembered on this device',
                    icon: 'info',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                  })
                }}
              />
              <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-900">
                Remember me
              </label>
            </div> */}

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
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-yellow-600 hover:text-yellow-500"
              onClick={(e) => {
                // If you want a transition effect between pages
                if (e.ctrlKey || e.metaKey) return; // Allow ctrl/cmd+click to open in new tab
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
                  navigate("/signup");
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
