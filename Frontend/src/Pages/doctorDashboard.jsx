
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";


function doctorDashboard() {

  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {  setIsAuthenticated } = useContext(Context);

  const handleLogout = async () => {
    await axios
      .get("http://localhost:4000/api/v1/user/doctor/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
        navigate("/")
        
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      
  };
 // eslint-disable-next-line react-hooks/rules-of-hooks
 const navigate=useNavigate();

  return (
    <div>
      <h1>
      i am a doctor 
      <button onClick={handleLogout}> 
        logout
      </button>
      </h1>
    </div>
  )
}

export default doctorDashboard;
