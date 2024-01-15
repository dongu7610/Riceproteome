 
import React,{useState, useEffect,Suspense} from 'react';
import {Link} from 'react-router-dom';
//import '../../css/Navi.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Accordion,Nav ,Container,Navbar,Form,Col,Row} from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsQuestionLg } from 'react-icons/bs';
function Navi_bot2(props){

  const uploadModule3 =async (e) =>{
   
    console.log(e)
   
    
   
  }



    let pgN = document.location.href.split('/')[3]
    let [underline, setUnderline] = useState({left:"0%"})

    //    <Nav.Link href="/home">Home</Nav.Link>
    return(


        <>
        <Navbar bg="dark" variant="dark" fixed="bottom" style={{'padding-top':'1rem'}}>
    <Container>
   
<Navbar.Toggle />
<Navbar.Collapse className="justify-content-center">



<br/>


<text style={{'color':'white'}}> 
contact: github.com/dongu7610/Riceproteome


</text>
</Navbar.Collapse>  

   
    </Container>

 

  </Navbar>
  
  




  
        </>
    )
}
export default Navi_bot2;



