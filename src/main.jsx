import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./assets/pages/Home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./assets/pages/error_page.jsx";
import LoginPage from "./assets/pages/LoginPage.jsx";
import BookPage from "./assets/pages/books_page.jsx";
import ProtectedRoute from "./assets/components/ProtectedRoute.jsx";
import RegisterPage from "./assets/pages/RegisterPage.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/books",
    element: (
      <ProtectedRoute>
        <BookPage />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/homeuser",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
