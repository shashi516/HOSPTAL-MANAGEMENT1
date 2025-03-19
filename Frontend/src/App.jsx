
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./main";
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import Register from "./Pages/Register";
import PatientDashboard from "./Pages/PatientDashboard";
import DoctorDashboard from "./Pages/DoctorDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { isAuthenticated, user } = useContext(Context);

  return (
    
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/register" element={<Register />} />
        

        {/* Protected Routes for Patients */}
        {isAuthenticated && user?.role === "Patient" ? (
          <>
            <Route path="/patient-dashboard" element={<PatientDashboard />} />
            
            {/* Ensure Patient Routes Are Shown */}
          </>
        ) : null}

        {/* Protected Routes for Doctors */}
        {isAuthenticated && user?.role === "Doctor" ? (
          <>
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          </>
        ) : null}

        {/* Handle Unauthenticated Users */}
        {!isAuthenticated ? <Route path="*" element={<Navigate to="/" />} /> : null}
        
        {/* Role-Based Redirect */}
        {isAuthenticated && user?.role === "Patient" && (
          <Route path="*" element={<Navigate to="/patient-dashboard" />} />
        )}  
        
        {isAuthenticated && user?.role === "Doctor" && (
          <Route path="*" element={<Navigate to="/doctor-dashboard" />} />
        )}
      </Routes>

      <ToastContainer />
    </Router>
  );
};

export default App; 