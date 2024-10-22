import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Navigation hook
import { app } from "../config/firebase/firebaseconfig"; // Firebase configuration
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Firebase authentication functions
import "../Styles/login.css"; // Login page styles
import "../Styles/universal.css"; // Universal styles

const Login = () => {
  const navigate = useNavigate(); // Hook for navigation
  const auth = getAuth(app); // Initialize Firebase authentication

  const email = useRef(); // Reference to email input field
  const password = useRef(); // Reference to password input field
  const [error, setError] = useState(); // State to store any errors

  // Function to handle user sign-in
  function signInUser(event) {
    event.preventDefault();

    signInWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        // Signed in
        navigate("/home"); // Navigate to home page after successful sign-in
      })
      .catch((error) => {
        // Handle sign-in error
        setError("Oh No! Looks like the password is wrong!!");
      });

    // Logging the input values for debugging
    console.log(email.current.value);
    console.log(password.current.value);

    // Clearing the input fields
    email.current.value = "";
    password.current.value = "";
  }

  // Function to navigate to the registration page
  function sendToRegister() {
    navigate(-1);
  }

  return (
    <form onSubmit={signInUser}>
      <h1 className="text-center text-2xl mt-20">Welcome Back!</h1>
      <label className="inp input input-bordered flex items-center gap-2 w-1/2 mx-auto mt-7">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
          <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
        </svg>
        <input type="text" placeholder="Email" ref={email} />
      </label>
      <label className="inp input input-bordered flex items-center gap-2 w-1/2 mx-auto mt-7">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70 "
        >
          <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="password"
          placeholder="Password"
          className="grow"
          ref={password}
        />
      </label>
      <div className="flex justify-center">
        <button className="btn btn-outline btn-success mt-8">
          Sign in{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </button>
      </div>
      <Link to="register">
        <h1 className="alreadylogin text-center mt-8">
          Don't Have an Account?
        </h1>
      </Link>
      <h1 className="text-center mt-8">{error}</h1>
    </form>
  );
};

export default Login;
