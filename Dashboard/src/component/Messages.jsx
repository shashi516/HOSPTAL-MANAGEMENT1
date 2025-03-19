
import axios from "axios";
import  { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import { SiGooglemessages } from "react-icons/si";
import { IoTrashBin } from "react-icons/io5";
import Swal from 'sweetalert2';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { isAuthenticated } = useContext(Context);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/message/getall",
          { withCredentials: true }
        );
        setMessages(data.messages);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      customClass:{
        popup:"custom-popup"
      }
    });
   if(result.isConfirmed){
    try {
      const response= await axios.delete(`http://localhost:4000/api/v1/message/delete/${id}`, {withCredentials:true});
  
      if (response.data.success) {
        Swal.fire(
        'Deleted!',
        'The message has been deleted successfully.',
        'success'
        );
        setMessages(messages.filter(message => message._id !== id));
      } else {
        Swal.fire(
        'Error!',
        'There was a problem deleting the message.',
        'error');
      } 
    } catch {
      Swal.fire('An error occurred while trying to delete the message.');
    }
  };
   }

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="container-fluid" style={{backgroundColor:"#eaece5",minHeight:"100vh"}}>
       <div style={{textAlign:"center"}}>
       <span style={{fontSize:"100px"}}>{< SiGooglemessages />}</span>
      <h1>MESSAGE</h1>
      <hr />
       </div>
      <div className="row">
        {messages && messages.length > 0 ? (
          messages.map((element) => {
            return (
              <div className="box" key={element._id}>
                <div className="details" style={{float:"left"}}>
                  <li>
                    <b>First Name:</b> <span>{element.firstName}</span>
                  </li>
                  <li>
                    <b>Last Name:</b> <span>{element.lastName}</span>
                  </li>
                  <li>
                    <b>Email:</b> <span>{element.email}</span>
                  </li>
                  <li>
                    <b>Phone:</b> <span>{element.phone}</span>
                  </li>
                  <li>
                    <b>Message:</b> <span>{element.message}</span>
                  </li>
                </div>
                <div style={{ marginLeft:"90%" }}>
                      <span>{<IoTrashBin id="trash" onClick={() => handleDelete(element._id)} style={{float:"left",fontSize:"60px"}}/>}</span>
                    </div>
              </div>
            );
          })
        ) : (
          <h1>No Messages!</h1>
        )}
      </div>
    </div>
  );
};

export default Messages;
