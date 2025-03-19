import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Appointment from '../Pages/Appointment';
import { FaSlidersH } from "react-icons/fa";


const Sidebar = () => {

    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate= useNavigate();

    const gotoprofile=()=>{
        navigate("/my-profile")
    }
   
    const ChangePassword=()=>{
      navigate("/change-password")
  }

  const AppointmentStatus=()=>{
    navigate("/appointment-status")
}
  return (
    <div>
       <Button variant="danger" onClick={handleShow}>
       <FaSlidersH />
      </Button>
      <Offcanvas show={show} onHide={handleClose} id="offc">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            Hello,
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <button id='btnps' onClick={gotoprofile} className='btn btn-info'>
           MyProfile 
          </button>
          <br/><br/>
          <Appointment/>
          <br/>
          <button id='btnps' onClick={ChangePassword} className='btn btn-info'>
           Change Password
          </button>
          <br/><br/>
          <button id='btnps' onClick={AppointmentStatus} className='btn btn-info'>
           Check Status
          </button>

        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}

export default Sidebar

