import  { useContext, useEffect, useState} from "react";
import { Context } from "../main";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import adminpic from "../images/admin.webp";
import { toast } from "react-toastify";


const DashboardAdmin = () => {
  
  const [doctorCount,setDoctorCounts]=useState(0);
  const [adminCount,setAdminCounts]=useState(0);
  const [appointmentCount,setAppointmentCounts]=useState(0);
  const [admins,setAdmin]=useState([]);

  const { isAuthenticated,} = useContext(Context);

  useEffect(()=>{
    const getdoctorCounts=async()=>{
      try{
        const {data}=await axios.get("http://localhost:4000/api/v1/user/doctorcounts",{withCredentials:true});
        setDoctorCounts(data.doctorcounts);
      }catch(error){
        console.error("something wrong b/w data fetching",error)
      }
    }
    getdoctorCounts();
  },[]);

  useEffect(()=>{
    const getAdminCounts=async()=>{
      try{
        const {data}=await axios.get("http://localhost:4000/api/v1/user/admincounts",{withCredentials:true});
        setAdminCounts(data.admincounts);
      }catch(error){
        console.error("something wrong b/w data fetching",error)
      }
    }
    getAdminCounts();
  },[]);

  useEffect(()=>{
    const getAppointmentCounts=async()=>{
      try{
        const {data}=await axios.get("http://localhost:4000/api/v1/appointment/appointmentcount",{withCredentials:true});
        setAppointmentCounts(data.appointmentcounts);
      }catch(error){
        console.error("something wrong b/w data fetching",error)
      }
    }
    getAppointmentCounts();
  },[]);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/admin/getadmin",
          { withCredentials: true }
        );
        setAdmin(data.admin);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    if(isAuthenticated){
      fetchAdmin();
    }
  }, [isAuthenticated]);


  
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <div className="container-fluid" id="dashboard">
        <div className="row p-3">
          <div className="d-flex"  style={{minHeigh:"200px",maxWidth:"100%",backgroundColor:"lightblue"}}>
              <div style={{marginLeft:"10%",marginTop:".5%"}}> 
                <img src={adminpic} alt=""  style={{height:"190px"}}/>
              </div>
              <div style={{marginLeft:"10%"}}>
                 <span style={{fontSize:"80px",color:"#d64161",fontFamily:"fantasy",textAlign:"center"}}>
                 {
                    admins.map(admin=>(
                      `${admin.firstName} ${admin.lastName}`
                    ))
                  }
                 </span>
                 <hr />
                 
              </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4" style={{alignContent:"center"}}>
         <Link to="/doctors" style={{textDecoration:"none"}}>
         <div className="card" id="box1" >              
            <h2>Total Doctor</h2>
              <div style={{textAlign:"center"}}>
              <span style={{fontSize:"50px",fontWeight:"bold",textDecoration:"underline"}}>{doctorCount}</span>
              </div>
          </div>
         </Link>
          </div>
          <div className="col-md-4">
          <Link to="/getall/appointments" style={{textDecoration:"none"}}>
          <div className="card" id="box2" >
          <h2>Appointments</h2>
              <div style={{textAlign:"center"}}>
              <span style={{fontSize:"50px",fontWeight:"bold",textDecoration:"underline"}}>{appointmentCount}</span>
              </div>
            </div>
            </Link>
          </div>
          <div className="col-md-4">
          <div className="card" id="box3"  >
          <h2>Total Admins</h2>
              <div style={{textAlign:"center"}}>
              <span style={{fontSize:"50px",fontWeight:"bold",textDecoration:"underline"}}>{adminCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardAdmin;