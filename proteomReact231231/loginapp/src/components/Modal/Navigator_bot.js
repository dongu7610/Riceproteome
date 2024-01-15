
import React,{useState, useEffect,Suspense,useMemo} from 'react';
import {Link} from 'react-router-dom';
//import '../../css/Navi.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Accordion,Nav ,Container,Navbar,Form,Col,Row} from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsQuestionLg } from 'react-icons/bs';
//import Blink from 'react-blink-text';

function Navi_bot(props){



   const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [mainContainerHeight, setMainContainerHeight] = useState(30);

  const handleAccordionClick = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

   useEffect(() => {
    if( props.decision==0){
    const vmv=document.querySelector("#root > div > nav.navbar.navbar-expand.navbar-dark.bg-secondary.fixed-bottom > div > div:nth-child(3) > div:nth-child(1) > form > div > div > h2 > button")
    const go= document.querySelector("#root > div > nav.navbar.navbar-expand.navbar-dark.bg-secondary.fixed-bottom > div > div:nth-child(3) > div:nth-child(2) > form > div > div > h2 > button")
    const bulk=document.querySelector("#root > div > nav.navbar.navbar-expand.navbar-dark.bg-secondary.fixed-bottom > div > div:nth-child(3) > div:nth-child(3) > form > div > div > h2 > button")
    const vmvgobulkproperty=[ vmv.ariaExpanded, go.ariaExpanded, bulk.ariaExpanded]
    const mainContainer = document.querySelector('#SCAFFOLD');
    if (mainContainer) {
    if(vmvgobulkproperty.includes('true')) {mainContainer.style.marginBottom='190px';}
    else{ mainContainer.style.marginBottom='30px'; }


    };
  }
  }, [isAccordionOpen]);

 
  const uploadModule3 =async (e) =>{
   
    //console.log(e)
   
    
   
  }

  const [good,setgood]=useState(1);
  const [good2,setgood2]=useState(1);
  const [good3,setgood3]=useState(1);

  useMemo(()=>{
if(props.getitem1!=false)
 {   setgood(2)
}
//    setTimeout(setgood(1),5000)

 
},[props.getitem1])


useMemo(()=>{
  if(props.getitem2!=false)
 {   setgood2(2)
}

//  setTimeout(setgood(1),5000)


},[props.getitem2])
useMemo(()=>{
  if(props.interitem3!=false)
 {   setgood3(2)
}
//  setTimeout(setgood(1),5000)


},[props.interitem3])

useMemo(()=>{
if(good==2 )
{
  setTimeout(function() {
    
  setgood(1) }, 2500);
 }

//    setTimeout(setgood(1),5000)


},[good])
useMemo(()=>{
  if(good2==2 )
  {
    setTimeout(function() {
      
    setgood2(1) }, 2500);
   }
  
  //    setTimeout(setgood(1),5000)
  
  
  },[good2])
  useMemo(()=>{
    if(good3==2 )
    {
      setTimeout(function() {
        
      setgood3(1) }, 2500);
     }
    
    //    setTimeout(setgood(1),5000)
    
    
    },[good3])



    let pgN = document.location.href.split('/')[3]
    let [underline, setUnderline] = useState({left:"0%"})

    //    <Nav.Link href="/home">Home</Nav.Link>
    //
//Add some interesting protein.
//(Volcano plot, Manhattan plot, Venndiagram-Manhattan plot can be added by clicking)
//<Navbar.Collapse className="justify-content-center">
  
  //</Navbar.Collapse>  
  //<Accordion defaultActiveKey={["0"]} alwaysOpen>


    return(


        <>       
        {props.decision==0? (<Navbar bg="secondary" variant="dark" fixed="bottom" style={{'padding-top':'1rem'}}>
        
    <Container>
   
<Navbar.Toggle />
<Row>
<Navbar.Brand>


<text  style={{ "font-size": "25px",'fontWeight':'bold'}} >Protein Basket
<br/>
(Add some interesting protein.)</text> 


 


        
       
        
</Navbar.Brand>
</Row>


<Row>
        <Col>
<Form onSubmit={uploadModule3 } >
 
{good==1? 
<text style={{ "font-size": "13px",color:'red'}} >ProteinfromVMVPAGE</text>
:
<span  className="blink-text" style={{'fontWeight':'bold','color':'orange' }}> 
      ProteinfromVMVPAGE(Added)  </span>}
<Accordion  >

        <Accordion.Item eventKey="0" active={isAccordionOpen} onClick={handleAccordionClick} >
        

          <Accordion.Header>ProteinfromVMVPAGE</Accordion.Header>
          <Accordion.Body>
          <FloatingLabel controlId="floatingTextarea2" label="add from vmv ">
    <Form.Control
     
     as="textarea"
     placeholder={props.getitem1!=false? props.getitem1: ''} defaultValue={props.getitem1!=false? props.getitem1: ''}

      style={{ height: '100px' }}
    />


  </FloatingLabel>
  {props.indexinfo == 1?   <Button variant="outline-dark"    onClick={() => props.resetinterNodes(1)} > reset item</Button> 

:false
}

          </Accordion.Body>
        

        </Accordion.Item>
        </Accordion>

</Form>
</Col>

<Col>
<Form onSubmit={uploadModule3 }>
{good2==1? 
<text style={{ "font-size": "13px" ,color:'yellow'}} >ProteinfromGO</text>
:

<span  className="blink-text" style={{'fontWeight':'bold','color':'orange' }}>
       ProteinfromGO(Added)</span>}
<Accordion  >
        <Accordion.Item eventKey="0"  active={isAccordionOpen} onClick={handleAccordionClick} >
          <Accordion.Header>ProteinfromGO</Accordion.Header>
         
<Accordion.Body>
<FloatingLabel controlId="floatingTextarea2" label="add from GO">
<Form.Control

as="textarea"
placeholder={props.getitem2!=false? props.getitem2: ''} defaultValue={props.getitem2!=false? props.getitem2: ''}
 style={{ height: '100px' }}
/>
</FloatingLabel>
{props.indexinfo == 2?   <Button variant="outline-dark"    onClick={() => props.resetinterNodes2(1)} > reset item</Button> 

:false
}

</Accordion.Body>


        </Accordion.Item>
        </Accordion>
        </Form>

</Col>
<Col>
<Form>
{good3==1? 
<text style={{ "font-size": "13px",color:'blue'}} >proteinlist(bulk)</text>
:
<span  className="blink-text" style={{'fontWeight':'bold','color':'orange' }}>
       proteinlist_bulk(Added)</span>}

<Accordion >

        <Accordion.Item eventKey="0"  active={isAccordionOpen} onClick={handleAccordionClick} >
          <Accordion.Header>bulkprotein</Accordion.Header>
          <Accordion.Body>
          <FloatingLabel controlId="floatingTextarea2" label="add bulk">
     <Form.Control
className={'textareaitem'}
id={'textareaitem'}
as="textarea"
placeholder={props.interitem3}
style={{ height: '100px' }}
/>

  </FloatingLabel>
  {props.indexinfo == 2? 
  <Button variant="outline-dark"    onClick={(e) => props.getinterNodes2(e)} > apply items</Button>
  :false
}


 
          </Accordion.Body>
        </Accordion.Item>

</Accordion>

</Form>
</Col>
</Row>


<br/>



   
    </Container>

 

  </Navbar>
  
  
):false}



  
        </>
    )
}
export default Navi_bot;



