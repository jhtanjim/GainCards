// src/components/SignUp.jsx
"use client";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../Context/AuthContext";

const fetchCountries = async () => {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const data = await res.json();

  // map to { name, code } and sort by name
  return data
    .map((c) => ({
      name: c.name.common,
      code: c.cca2, // ISO-3166 alpha-2
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
};

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "Pallet Town",
  });
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    fetchCountries()
      .then(setCountries)
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  const mutation = useMutation({
    mutationFn: async (submitData) => {
      return await signUp(submitData);
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: "Your GainCards account has been created successfully!",
        confirmButtonColor: "#ca8a04",
      }).then(() => navigate("/"));
    },
    onError: (err) => {
      const errorMessage =
        err.response?.data?.message || "Registration failed. Try again.";
      Swal.fire({ icon: "error", title: "Error", text: errorMessage });
    },
    onSettled: () => {
      if (Swal.isLoading()) Swal.close();
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match.",
      });
    }

    if (formData.password.length < 6) {
      return Swal.fire({
        icon: "error",
        title: "Password Too Short",
        text: "Password must be at least 6 characters.",
      });
    }

    Swal.fire({
      title: "Creating your account...",
      html: "Please wait while we set up your GainCards account.",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => Swal.showLoading(),
    });

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value);
    });
    if (profilePicture) {
      submitData.append("profilePicture", profilePicture);
    }

    mutation.mutate(submitData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="mt-2 text-gray-600">
            Join GainCards and start collecting!
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {[
            { id: "username", label: "Username", type: "text" },
            { id: "email", label: "Email Address", type: "email" },
            { id: "password", label: "Password", type: "password" },
            {
              id: "confirmPassword",
              label: "Confirm Password",
              type: "password",
            },
          ].map(({ id, label, type }) => (
            <div key={id}>
              <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700"
              >
                {label}
              </label>
              <input
                id={id}
                name={id}
                type={type}
                required
                value={formData[id]}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
          ))}

          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country
            </label>

            <select
              id="country"
              name="country"
              required
              value={formData.country}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            >
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="profilePicture"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Picture (Optional)
            </label>
            <input
              id="profilePicture"
              name="profilePicture"
              type="file"
              accept="image/*"
              required
              onChange={handleFileChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>

          <button
            type="submit"
            disabled={mutation.isLoading}
            className="w-full flex justify-center py-2 px-4 rounded-md text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50"
          >
            {mutation.isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-medium text-yellow-600 hover:text-yellow-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
