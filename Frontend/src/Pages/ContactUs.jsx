  import axios from "axios";
  import { FaPhoneVolume } from "react-icons/fa6";
  import { TfiEmail } from "react-icons/tfi";
  import { toast } from "react-toastify";
  import { useState } from "react";




  const ContactUs = () => {

  const [firstName,setfirstName]=useState("");
  const [lastName,setlastName]=useState("");
  const [email,setemail]=useState("");
  const [phone,setphone]=useState("");
  const[message,setMessage]=useState("");

  const handleMessage=async(e)=>{
    e.preventDefault();
    try{
    await axios.post(
        "http://localhost:4000/api/v1/message/send",
        {firstName,lastName,email,phone,message},
        {
          withCredentials:true,
          headers:{
            "Content-Type":"application/json",
          },
        }
      ).then(res=>{
        toast.success(res.data.message);
        setfirstName("");
        setMessage("");
        setlastName("");
        setemail("");
        setphone("");
      })
    }
    catch(error){
      toast.error(error.response.data.message);
    }
  }
    return (
      <div>
      <form onSubmit={handleMessage}>
      <div className="conatainer-fluid " style={{backgroundColor:"#f7f7f7",minHeight:"100vh"}}>
            <div className="row " id="mainrowcon">
            <div style={{textAlign:"center",color:"navy",fontFamily:"monospace", marginTop:"50px",fontWeight:"bolder",fontSize:"50px"}}>
            <span>Contact-US</span>
            </div>
                <div className="col-sm-2"></div>
                <div className="col-sm-8 rCon d-flex"> 
                  
                  <div className="col-sm-6" id="leftcon">
                  <div>
                      <input type="text" className="form-control " value={firstName} onChange={(e)=>setfirstName(e.target.value)} placeholder="First Name" id="inpcon" />
                    </div>
                    <div > 
                      <input type="text" className="form-control " value={lastName} onChange={(e)=>setlastName(e.target.value)} placeholder="Last Name" id="inpcon" />
                    </div>
                 
                    <div>
                      <input type="text" className="form-control " value={email} onChange={(e)=>setemail(e.target.value)} placeholder="Email" id="inpcon" />
                    </div>
                    <div>
                      <input type="text" className="form-control " value={phone} onChange={(e)=>setphone(e.target.value)} placeholder="Phone" id="inpcon" />
                    </div>
                    <div>
                      <textarea  className="form-control mt-5 " id="txtar" value={message} onChange={(e)=>setMessage(e.target.value)} style={{height:"100px",border:"4px solid lightblue",color:"gray", background:"none",boxShadow:"none"}} placeholder="Enquiry Here...." />
                    </div>
                    <div style={{textAlign:"end"}}>
                      <button type="submit" className="btn btn-warning mt-4">Enquiry Now</button>
                    </div>
                  </div>
                  <div className="col-sm-6 p-2 mt-5">
                      <div style={{color:"white",marginLeft:"5%",borderRadius:"35px",marginTop:"10%"}}> 
                      <span style={{fontSize:"25px",padding:"2%"}} >
                      <FaPhoneVolume id="phonecon" />
                      </span>
                      <span style={{color:"white"}}>+91 5588664444</span>
                      </div>
                    
                      <div style={{color:"white",marginLeft:"5%",borderRadius:"35px",}}> 
                      <span style={{fontSize:"25px",padding:"2%"}} >
                      <TfiEmail  />
                      </span>
                      <span style={{color:"white"}}>supportvhi@gmail.ac.in</span>
                      </div>
                      
                  </div>
                </div>
                <div className="col-sm-2"></div>
            </div>
        </div>
      </form>
      </div>
    )
  }

  export default ContactUs;
