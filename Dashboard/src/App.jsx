import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardAdmin from './component/DashboardAdmin';
import Login from './component/Login';
import AddNewDoctor from './component/AddNewDoctor';
import Messages from './component/Messages';
import AllDoctor from './component/AllDoctor';
import AddNewAdmin from './component/AddNewAdmin';
import Sidebar from './component/Sidebar';
import { useContext} from 'react';
import { Context } from './main'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import GetAppointment from './component/GetAppointment';


const App = () => {
  const { isAuthenticated} = useContext(Context);

 

  

  return (
    <Router>
      <div className="main d-flex">
        {isAuthenticated && (
          <div className="sidebarWrapper">
            <Sidebar />
          </div>
        )}
        <div className="content w-100">
        <Routes>
  {!isAuthenticated ? (
    <>
     
      <Route path="*" element={<Navigate to="/login" />} />
    </>
  ) : (
    <>
      <Route path="/" element={<Navigate to="/DashboardAdmin" />} />
      <Route path="/DashboardAdmin" element={<DashboardAdmin />} />
      <Route path="/doctor/addnew" element={<AddNewDoctor />} />
      <Route path="/admin/addnew" element={<AddNewAdmin />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/doctors" element={<AllDoctor />} />
      <Route path="/getall/appointments" element={<GetAppointment />} />
    </>
  )}
  <Route path="login" element={<Login />} />
</Routes>

        </div>
      </div>
      <ToastContainer />
    </Router>
  );
};

export default App;
