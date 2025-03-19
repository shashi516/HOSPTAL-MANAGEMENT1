import { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../PatientDashboard/Sidebar";

function PatientDashboard() {
  const { isAuthenticated, user, setIsAuthenticated } = useContext(Context);
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "Patient") {
      navigate("/");
    }

    const fetchPatient = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/v1/user/patient/me", { withCredentials: true });
        setPatient(data.patient); // Ensure API returns `user`
      } catch  {
        toast.error("Error fetching patient data");
        navigate("/");
      }
    };
    fetchPatient();
  }, [isAuthenticated, user, navigate]);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:4000/api/v1/user/logout", { withCredentials: true });
      toast.success("Logged out successfully!");
      setIsAuthenticated(false);
      navigate("/");
    } catch  {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="container-fluid">
     <div className="row">
      <div className="col-sm-1">
        <Sidebar/>
      </div>
      <div className="col-sm-10">
        <h2>
          welcome {patient.firstName}
        </h2>
      </div>
      <div className="col-sm-1">
        <button onClick={handleLogout}>
          logout
        </button>
      </div>
     </div>
    </div>
  );
}

export default PatientDashboard;
