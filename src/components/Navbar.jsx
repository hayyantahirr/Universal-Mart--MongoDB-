import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; // Firebase authentication functions
import React, { useEffect, useState } from "react"; // React and hooks
import { useNavigate, useLocation, Link } from "react-router-dom"; // React Router hooks
import { app } from "../config/firebase/firebaseconfig"; // Firebase configuration
import "../Styles/universal.css"; // Universal CSS
import { useDispatch, useSelector } from "react-redux"; // Redux hooks
import { decrement, increment, removeFromCart } from "../config/Redux/cartSlice"; // Redux actions for cart management

const Navbar = () => {
  const auth = getAuth(app); // Initialize Firebase authentication
  const navigate = useNavigate(); // Hook for navigation
  const location = useLocation(); // Hook for getting the current location
  const cartItem = useSelector((state) => state); // Get cart items from Redux state

  const dispatch = useDispatch(); // Redux dispatch function
  const [user, setUser] = useState(null); // State to store the current user
  const [error, setError] = useState(null); // State to store any errors
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "emerald"
  ); // State to store the theme, default to "emerald"

  // Function to toggle between dark and light theme
  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("synthwave");
    } else {
      setTheme("emerald");
    }
  };

  // Set theme in localStorage on mount and update localStorage on theme change
  useEffect(() => {
    localStorage.setItem("theme", theme); // Store theme in localStorage
    const localTheme = localStorage.getItem("theme"); // Get theme from localStorage
    document.querySelector("html").setAttribute("data-theme", localTheme); // Set data-theme attribute for DaisyUI
  }, [theme]);

  // Listener for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Set user state if authenticated
      } else {
        setUser(null); // Set user state to null if not authenticated
      }
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, [auth]);

  // Function to log out the user
  const logOutUser = async () => {
    try {
      await signOut(auth); // Sign out user
      navigate("/"); // Navigate to home page after logging out
    } catch (error) {
      setError("Oops! Looks like a problem occurred"); // Set error message
    }
  };

  // Hide buttons on specific pages
  const hideButtons =
    location.pathname === "/login" ||
    location.pathname === "/" ||
    location.pathname === "/sell";

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <img
            src="/src/assets/universal_mart-removebg-preview.png"
            alt="Universal Mart Logo"
            width="70px"
          />
          <Link to="/home" className="btn btn-ghost text-xl">
            Universal Mart
          </Link>
        </div>
        <div className="flex-none flex items-center gap-2">
          {/* Add to cart button */}
          {user && !hideButtons && (
            <div className="form-control flex flex-row items-center">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle"
                >
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="badge badge-sm indicator-item">
                      {cartItem.persistedReducer.cart.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )}
                    </span>
                  </div>
                </div>
                <div
                  tabIndex={0}
                  className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-80 shadow"
                >
                  <div className="card-body">
                    <span className="text-lg font-bold">
                      Items :{" "}
                      {cartItem.persistedReducer.cart.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )}
                    </span>
                    <span className="text-info items-center ">
                      {cartItem.persistedReducer.cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 p-2 rounded mb-2"
                          style={{ width: "100%" }}
                        >
                          <div className="w-10 h-10">
                            <img
                              src={item.img}
                              alt={item.title}
                              className="w-10 h-10 mask mask-squircle"
                            />
                          </div>
                          <div className="flex-grow flex">
                            <p className="truncate">{item.title}</p>{" "}
                            <p className="truncate">${item.price}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              className="btn btn-primary btn-xs"
                              onClick={() => {
                                dispatch(increment(item));
                              }}
                            >
                              +
                            </button>
                            <span>{item.quantity}</span>
                            {item.quantity > 1 ? (
                              <button
                                className="btn btn-secondary btn-xs"
                                onClick={() => dispatch(decrement(item))}
                              >
                                -
                              </button>
                            ) : (
                              <button
                                className="btn btn-error btn-xs"
                                onClick={() => dispatch(removeFromCart(item))}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  className="size-5"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </span>
                    <span className="text-info">
                      Subtotal:$
                      {cartItem.persistedReducer.cart.reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                      )}
                    </span>

                    <div className="card-actions"></div>
                  </div>
                </div>
              </div>
              {user && !hideButtons && (
                <Link
                  to="/sell"
                  className="btn btn-outline btn-info w-[120px] p-0 ml-5"
                >
                  Sell Product
                </Link>
              )}
            </div>
          )}

          {error && <h1 className="text-center text-red-500">{error}</h1>}

          {/* Day and Night mode toggle */}
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              className="theme-controller"
              onChange={handleToggle}
              checked={theme === "emerald" ? false : true}
              value="synthwave"
            />
            {/* Sun icon */}
            <svg
              className="swap-off h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* Moon icon */}
            <svg
              className="swap-on h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>

          {/* Dropdown menu */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-square"
            >
              <div className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-5 w-5 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                  ></path>
                </svg>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                {user && !hideButtons && <a onClick={logOutUser}>Logout</a>}
                {error && <h1 className="text-center text-red-500">{error}</h1>}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

// ### Explanation of the Code:
// 1. **Firebase and React Imports:**
//    - `getAuth`, `onAuthStateChanged`, `signOut`: Firebase functions to manage authentication.
//    - `React`, `useEffect`, `useState`: Core React library and hooks.
//    - `useNavigate`, `useLocation`, `Link`: React Router hooks for navigation and routing.
//    - `app`: Your Firebase configuration.
//    - `universal.css`: Your global CSS styles.

// 2. **Redux Imports:**
//    - `useDispatch`, `useSelector`: Hooks to interact with the Redux store.
//    - `decrement`, `increment`, `removeFromCart`: Redux actions for managing the cart.

// 3. **Component States:**
//    - `user`: Stores the currently authenticated user.
//    - `error`: Stores any error messages.
//    - `theme`: Manages the theme of the application, either "emerald" or "synthwave".

// 4. **handleToggle Function:**
//    - Toggles the theme between light ("emerald") and dark ("synthwave").
//    - Updates the `theme` state and saves the selected theme in `localStorage`.

// 5. **useEffect for Theme Management:**
//    - On mount and whenever the theme changes, this hook updates the `data-theme` attribute of the HTML element to match the selected theme.

// 6. **useEffect for Authentication:**
//    - This hook listens for changes in the authentication state (whether a user is logged in or not) and updates the `user` state accordingly.
//    - `onAuthStateChanged` is used to set up this listener.

// 7. **logOutUser Function:**
//    - Signs out the user using `signOut`.
//    - Navigates back to the home page after logout.
//    - If an error occurs during logout, the `error` state is updated.

// 8. **hideButtons Variable:**
//    - Determines if certain buttons should be hidden based on the current route. For instance, buttons are hidden on the login, home, and sell pages.

// 9. **Navbar Render:**
//    - The component returns JSX that defines the navigation bar.
//    - Includes a logo, navigation links, a cart button with a dropdown showing cart items, a theme toggle switch, and a dropdown menu for logging out.
//    - Buttons and elements are conditionally rendered based on the user's authentication status and the current route.

// This should give you a good understanding of how each part of your code works and how the component behaves under different conditions. Let me know if you have any more questions!
