import React, { createContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Create a context for authentication and user role management
export const Context = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  admin: false,
  setAdmin: () => {}
});

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });
  const [admin, setAdmin] = useState(() => {
    return localStorage.getItem("role") === "Admin"; // Assuming role is stored in localStorage
  });

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
    if (isAuthenticated) {
      // Optionally, set role based on login status
      localStorage.setItem("role", admin ? "Admin" : "Doctor");
    }
  }, [isAuthenticated, admin]);

  return (
    <Context.Provider value={{ isAuthenticated, setIsAuthenticated, admin, setAdmin }}>
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
