
import logomain from '../images/logo.png'
import Login from '../Pages/Login';
import {Link} from 'react-router-dom'




const Hero = () => {
  return (
    <div>
        <div className="container-fluid">
        <div className="row d-flex" id="hrow">
            <div className="col-md-8" style={{padding:"12%"}}>
                <div style={{marginTop:"-290px",marginLeft:"-170px", position:"fixed"}}>
                <img src={logomain} alt="" style={{maxHeight:"40vh" }} />
                </div>
                <div >
                <h3 style={{marginTop:"10%", fontWeight:"800", color:"#563f46",fontFamily:"monospace"}}>Welcome to My Virtual Health Integration|Your Trusted Healthcare Provider.. </h3>
                </div>
                <div style={{fontFamily:"Serif"}}>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus, enim nulla numquam nesciunt optio quaerat quos repellendus obcaecati tenetur temporibus iste placeat, consectetur reiciendis qui in culpa ducimus mollitia quia?
                    </p>
                </div>
            </div>
            <div className="col-md-4 mt-2  " style={{gap:".5rem",paddingLeft:"12%",}}> 
                <div>
                    <Login/>
                </div>
                <div id='buttonanimation' style={{maxWidth:"90%", backgroundColor:"orange", marginTop:"5%",height:"100px",textAlign:"center",alignContent:"center"}}>
                    <Link to="/Register" style={{textDecoration:"none",color:"white"}}>Registration</Link>
                </div>
            </div>
        </div>
        </div>
      
    </div>
  )
}



export default Hero;
