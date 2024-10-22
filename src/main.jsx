import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./screens/Home";
import Detail from "./screens/Detail";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Sell from "./screens/Sell";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      { path: "home", element: <Home /> },
      { path: "sell", element: <Sell /> },
      { path: "register", element: <Register /> },
      { path: "/detail/:id", element: <Detail /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
