
import  { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaNotesMedical } from "react-icons/fa";

const GetAppointment = () => {

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/appointment/getall/appointments",
          { withCredentials: true }
        );
        setAppointments(data.appointments);
      } catch  {
        setAppointments([]);
      }
    };
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const { isAuthenticated } = useContext(Context);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }


  return (
    <div>
      <div className="container-fluid bg-dark" style={{minHeight:"100vh",borderTopLeftRadius:"35px",borderBottomLeftRadius:"35px"}}>
        <div className="row">
          <div style={{textAlign:"center"}}>
            <span style={{fontSize:"100px",color:"white"}}>{< FaNotesMedical/>}</span>
          <h1 style={{color:"white"}}>Appointments</h1>
          <hr />
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-10">
          <div className="tablework">
          <table className="table table-responsive">
            <thead >
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody >
              {appointments && appointments.length > 0
                ? appointments.map((appointment) => (
                    <tr key={appointment._id}>
                      <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                      <td>{appointment.appointment_date.substring(0, 16)}</td>
                      <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                      <td>{appointment.department}</td>
                      <td>
                        <select
                          className={
                            appointment.status === "Pending"
                              ? "value-pending" 
                              : appointment.status === "Accepted"
                              ? "value-accepted"
                              : "value-rejected"
                          }
                          style={{
                            
                            border:'none',
                            color:"white",
                            backgroundColor:
                              appointment.status === "Pending"
                                ? "orange"
                                : appointment.status === "Accepted"
                                ? "green"
                                : "red",     
                          }}
                          value={appointment.status}
                          onChange={(e) =>
                            handleUpdateStatus(appointment._id, e.target.value)
                          }
                        >
                          <option value="Pending" className="value-pending">
                            Pending
                          </option>
                          <option value="Accepted" className="value-accepted">
                            Accepted
                          </option>
                          <option value="Rejected" className="value-rejected">
                            Rejected
                          </option>
                        </select>
                      </td>
                      <td>{appointment.hasVisited === true ? <GoCheckCircleFill style={{color:"green"}}/> : <AiFillCloseCircle style={{color:"red"}}/>}</td>
                    </tr>
                  ))
                : "No Appointments Found!"}
            </tbody>
          </table>
          {}
        </div>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </div>
  )
}

export default GetAppointment;
