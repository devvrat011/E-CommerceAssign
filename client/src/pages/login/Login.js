import React, { useEffect, useState } from "react";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import LoginImg from "../../images/login_img2.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import LockIcon from "@mui/icons-material/Lock";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice.js";
// import EmailIcon from "@mui/icons-material/Email";
// import PersonIcon from "@mui/icons-material/Person";

function LoginSignup() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({});
  const [resetForm, setResetForm] = useState(false);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loading1, error: errorMessage1 } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok || data.success === false) {
        return dispatch(signInFailure(data.message || "Login failed"));
      }
      localStorage.setItem("token", data.token);
      dispatch(signInSuccess(data.rest));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password || !formData.email || !formData.name) {
      return setErrorMessage("Please fill out all fields.");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok || data.success === false) {
        setLoading(false);
        return setErrorMessage(data.message || "Registration failed");
      }
      setLoading(false);
      onClickSignIn();
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  };

  const onClickSignIn = () => {
    setFormData({});
    setIsSignUp(false);
  };

  


  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="flex-1 relative bg-gray-100 flex items-center justify-center h-screen">
        <div className="top-4 flex absolute items-center">
          <Link to={"/"} className="ml-3 text-xl font-bold">
            3legant.
          </Link>
        </div>
        <img
          src={LoginImg}
          alt="Elegant Chair"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md">
          {isSignUp ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Sign up</h2>
              <p className="text-gray-500">
                Already have an account?{" "}
                <span
                  className="text-green-500 cursor-pointer"
                  onClick={() => setIsSignUp(false)}
                >
                  Sign in
                </span>
              </p>
              <form className="space-y-4" onSubmit={handleSignUp}>
                <input
                  type="text"
                  id="name"
                  placeholder="Your name"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                />
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                />
                <input
                  type="text"
                  id="email"
                  placeholder="Email address"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                />
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                />
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">
                    I agree with{" "}
                    <a href="#" className="text-green-500">
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-green-500">
                      Terms of Use
                    </a>
                  </span>
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
                >
                  {loading ? <Spinner size="sm" /> : "Sign Up"}
                </button>
              </form>
              {errorMessage && (
                <Alert color="failure">
                  <span>{errorMessage}</span>
                </Alert>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Sign In</h2>
              <p className="text-gray-500">
                Don't have an account yet?{" "}
                <span
                  className="text-green-500 cursor-pointer"
                  onClick={() => setIsSignUp(true)}
                >
                  Sign Up
                </span>
              </p>
              <form className="space-y-4" onSubmit={handleSignIn}>
                <input
                  type="text"
                  id="username"
                  placeholder="Your username"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                />
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
                />
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Remember me</span>
                  </div>
                  <a href="#" className="text-green-500 text-sm">
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
                >
                  {loading1 ? <Spinner size="sm" /> : "Sign In"}
                </button>
              </form>
              {errorMessage1 && (
                <Alert color="failure">
                  <span>{errorMessage1}</span>
                </Alert>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;

