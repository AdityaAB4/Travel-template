"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import AuthContext from "../contexts/AuthContext";

const Auth = () => {
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignup
      ? `${process.env.NEXT_PUBLIC_API_AUTH_URL}/signup`
      : `${process.env.NEXT_PUBLIC_API_AUTH_URL}/login`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Authentication failed!");
        throw new Error(data.message || "Authentication failed");
      }

      if (data.token) {
        login(data.token, data.isAdmin);
      }

      if (data.isAdmin) {
        toast.success("Welcome Admin!");
        router.push("/admin"); // Redirect admin to dashboard
      } else {
        toast.success("Welcome user!");
        router.push("/"); // Redirect regular users
      }
    } catch (error) {
      console.error("Authentication error:", error.message);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-pink-200 to-pink-400">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
          <h2 className="text-2xl font-semibold text-pink-600 text-center mb-4">
            {isSignup
              ? "Sign Up for Admin Use Only"
              : "Sign In for Admin Use Only"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
            />
            <button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-lg transition duration-300"
            >
              {isSignup ? "Register" : "Login"}
            </button>
          </form>
          <p
            onClick={() => setIsSignup(!isSignup)}
            className="mt-4 text-center text-sm text-gray-600 cursor-pointer hover:text-pink-600"
          >
            {isSignup
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Auth;
