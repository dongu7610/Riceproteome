import React, { useEffect, useState ,useNavigate} from 'react';
import {Link} from 'react-router-dom';
//import '../../css/Navi.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Nav ,Container,Navbar} from 'react-bootstrap';

function Navi(props){
    let pgN = document.location.href.split('/')[3]
    let [underline, setUnderline] = useState({left:"0%"})

    //    <Nav.Link href="/home">Home</Nav.Link>
    //<Navbar.Collapse className="justify-content-end">
    return(
        <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container >

    <Nav.Item>
<Navbar.Brand href="/">Home</Navbar.Brand>
</Nav.Item>

    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
          <Nav
           className="me-auto"
          >

<Nav.Item>
<Nav.Link href="/Onestep">Project</Nav.Link>

</Nav.Item>


<Nav.Item>

<Nav.Link href="/Public">Experiment(Public)</Nav.Link>
</Nav.Item>

</Nav>
</Navbar.Collapse>  


<Navbar.Collapse className="justify-content-end" >
<Nav  className="justify-content-end"

           
          >
{props.modal== false? 
  <Nav.Item className="justify-content-end" style={{'text-align': 'center'}}>

  <Nav.Link href="/login">Sign in</Nav.Link>


  </Nav.Item>

:
<Nav.Item  className="justify-content-end" style={{'text-align': 'center'}}>

<Navbar.Text  style={{"display": "flex", 'text-align': 'center'}} >
Signed in as: {props.user} <Button variant="outline-success" onClick={(e)=> props.handleLogout(e)} >Log out</Button>
</Navbar.Text>
</Nav.Item>

}
</Nav>
</Navbar.Collapse>

  
    </Container>
  </Navbar>
  
        </>
    )
}
export default Navi;



