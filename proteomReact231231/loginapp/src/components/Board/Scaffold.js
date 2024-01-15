import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router'
//import 'bootstrap/dist/css/bootstrap.min.css';
//import '../../css/Scaffold.css';

import imgfile from '../../img/save.png';
import imgfile2 from '../../img/results.png';
import imgfile3 from '../../img/results2.png';
import imgfile4 from '../../img/results3.png';
import imgfile5 from '../../img/results4.png';
import imgfile6 from '../../img/results6.png';
import imgfile7 from '../../img/results7.png';
import imgfile8 from '../../img/drawio1.png';
import imgfile9 from '../../img/drawio2.png';
import svgfile10 from '../../img/banner.svg';
import svgfile12 from '../../img/Banner2.png';


import pdffile11 from '../../manual/manual.pdf';
import { Container,Col,Row,Image,Modal,Button,ButtonToolbar} from 'react-bootstrap';

function Scaffold(props){
    const [show, setShow] = useState(false);

    const PDFDownloadClick = () => {
      const pdfUrl = pdffile11;
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "User’s_manual.pdf"; // specify the filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

    const goEmpty = (e) => {


      localStorage.removeItem('interitem3')
      localStorage.removeItem('reset2')
      localStorage.removeItem('decision')
      localStorage.removeItem('getitem2')
      localStorage.removeItem('reset1')
      localStorage.removeItem('getitem1')
      localStorage.removeItem('resultID')
      localStorage.removeItem('SID')
      localStorage.removeItem('AID')
      localStorage.removeItem('EXPID')
      localStorage.removeItem('ProjectID2')
      localStorage.removeItem('ProjectID')
      };
      
      
      
    /* <Image
      src={imgfile}
      className='img-thumbnail'
      alt='...'
      style={{ maxWidth: '24rem' }}/> */
      
      //    style={{"height":'none',backgroundImage: `url(${imgfile}` }} imgfile2imgfile3imgfile4imgfile5
 //localStorage.clear()
    return(<>
{

goEmpty()

//interitem3,reset2,decision,getitem2,reset1,getitem1,resultID,SID,AID,EXPID,ProjectID2,ProjectID






}
   
<div id="wholeT2" style={{
   
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    margin: "2% 0px",
    padding: "50px 0px",
  }}>
<Container id="wholeT3" class="container" style={{
    
    "box-shadow": "rgba(0, 0, 0, 0.08) 2px 5px 40px 0px",
    "box-sizing": "border-box",
    "border-radius": "12px"}}>
      
            <Row class="row align-items-center" style={{"display":"flex","align-items": "center","justify-content": "center"}}>
            <Col class="col-md-5" style={{
    display: "flex",
    "align-items": "center",
    "justify-content": "center"}}> 
      <Image 
      src={svgfile12}//svgfile10
      className='img-thumbnail'
      alt='...'
      />
            </Col>
                <Col class="justify-content-md-center col-md-7" style={{
            "margin-left": "auto!important"}}> 
                <div class="p-5">
                    <h3 style={{
"font-weight": 700,
display: "block",
"margin": "10px 0px 30px",
"font-size":"2rem",

}}>RiceProteome Data management, Analysis Database</h3>
                    <p style={{
"color": "darkgray",
"letter-spacing": "0.8px",
"line-height": "1.5em",
"width": "96%",
"font-size":"20px"}}
>
                        RPDB simplifies data management, providing features for organization,
     preprocessing, method selection, result validation, and data sharing.
     The user-friendly interface facilitates easy navigation and interaction, allowing researchers to access, analyze,
     and explore processed rice proteomics data. Emphasizing visualization,
     RPDB enhances insights into major protein functions, fostering collaboration and contributing to proteomics research and 
    knowledge dissemination.
    
                    </p>
                     <div class="col" style={{
"margin": "5%",
display: "flex",
"justify-content": "center"}}>
                                              <a href="/Onestep">
            <button type="button" class="btn btn-primary" id="banner-button-id" style={{
"font-size": "25px",
"width": "200px",
"--bs-btn-color": "white",
"--bs-btn-hover-color": "white",
"--bs-btn-hover-bg": "gray",
"--bs-btn-bg": "darkgray",
"--bs-btn-border-color": "white",
"--bs-btn-hover-border-color": "white",
"--bs-btn-border-radius": "1rem"

}}
>
                Get started!
            </button>
        </a>
                                    </div>
                </div>
            </Col></Row>
              <Row class="row justify-content-md-center" >
        <div class="p-5" style={{
    "display": "flex",
    "justify-content": "center"}}
>
                        <text style={{            "font-size": "25px"}}>
                          Download Manual -  
                          <a role="button" id="STARTbt"  variant="link" onClick={PDFDownloadClick}
                           style={{         "color": "#1e70bf",       "font-size": "25px"}}>User's Manual </a>  </text> 
                            

                        
                    </div>    
            
                </Row></Container></div>


    </>
      )

}
export default Scaffold;