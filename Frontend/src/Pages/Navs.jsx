
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function Navs() {
  return (
    <div >
      <div>
        <Navbar expand="lg" id="nav" >
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto " style={{textAlign:"center"}}>
            <Nav.Link className='nav-link' href="/">Home</Nav.Link>
            <Nav.Link  className='nav-link' href="/about-us">AboutUs</Nav.Link>
            <Nav.Link className='nav-link' href="/contact-us">ContactUs</Nav.Link>
          </Nav>
          
        </Navbar.Collapse>
    </Navbar>
      </div>
    </div>
  );
}

export default Navs;