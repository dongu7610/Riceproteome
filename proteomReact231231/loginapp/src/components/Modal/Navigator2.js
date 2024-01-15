 
import { Accordion, Card,Form,Modal,Button,Navbar, Nav,Container } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import 'bootstrap/dist/css/bootstrap.min.css';
import React,{useState, useEffect,Suspense} from 'react';
import { NavLink } from "react-router-dom";
import Chart from "react-google-charts";
import { tree } from "d3";
import { Item } from "semantic-ui-react";
import "../../css/Palette.css";
import { BsQuestionLg } from 'react-icons/bs';

export default function Navigator2(props)  {
  const [pie,setpie]=useState(false)
  const [getop,setop]=useState('Normal')
  const [data,setdata]=useState(false)
  const [show, setShow] = useState(false);

  const palette = [
    'brown','#FF33CC', '#CCCCFF','#000033','darkturquoise',  'maroon',  '#808080','#FDBF6F','#FF3366','#F2F3F4','#50bcdf','#6A3D9A','#FFA500'
  ];



//"blue","#E31A1C",  "#6A3D9A"
  const palette2= ["#5e5e5e","#50bcdf","#E31A1C",  "#6A3D9A","black"
  , "green"
  ,"#CAB2D6"
  ,"#FDBF6F","#FFF0F5","#8B0000","#FF33CC"
,"darkturquoise",
  "#FFA500" ,'#A52A2A' ,'#B5B5B5'
]

const palette3= ["#5e5e5e",'#B5B5B5',"#50bcdf","#E31A1C",  "#6A3D9A","black"
, "green"
,"#CAB2D6"
,"#FDBF6F","#FFF0F5","#8B0000","#FF33CC"
,"darkturquoise",
"#FFA500" ,'#A52A2A' ,'#B5B5B5'
]

;


    const uploadModule3 =async (e) =>{
      setop(e.target.text)
      e.target.text=='Main'?setdata(false):setdata(true)

       props.getNETinfo(e.target.text)
       
        
      }

      
      const CreateDiv2=()=>{
        
const innernodeinfo=        ['GroupA' , 'GroupB', 'VMV', 'GO' ,'BULK', 'VMV&GO' ,'VMV&BULK','GO&BULK', 'VMV&GO&BULK','With GroupA','With GroupB','With GroupA&B' ,'yourprotein' ]
     
        const chrum=['None','Chr 1','Chr 2','Chr 3','Chr 4','Chr 5','Chr 6','Chr 7','Chr 8','Chr 9','Chr 10','Chr 11','Chr 12']
   
const goitem = ['None','BP','MF','CC']
   //'#5e5e5e',
const venndata= ['Identified','Unidentified' ]//['Venn area Type','Counts']
const vennitems=props.vennitem.map(a=>{return a.sets[0]})  
vennitems.map((a,i)=>{
  venndata.push(a)

})

const Items=[]
if (getop=='GO'){
 
  
  Items.push(goitem)
}
else if(getop=='Venn')
{
 
  Items.push(venndata)
}
else if(getop=='Chr'){
 
  Items.push(chrum)

}


/*
        const pieOptions2 = {
          pieHole: 0.6,
         
          slices: [
            {
              color: "blue"
            },
            {
              color: "#E31A1C"
            },
            {
              color: "#6A3D9A"
            },
            {
              color: "black"
            }
            ,
            {
              color: "green"
            }
            ,
            {
              color: "#CAB2D6"
            }
            ,
            {
              color: "#FDBF6F"
            },
            {
              color: "gray"
            },
            {
              color: "maroon"
            },
            {
              color: "#FF33CC"
            },
            {
              color: "darkturquoise"
            },
            {
              color: "orange"
            },
           { color:"brown" },{color:"#B5B5B5"}
          ],
          backgroundColor: {
            fill: "none",
          },
   
      
          legend: {
            position: "bottom",
            alignment: "left",
            textStyle: {
              color: "#233238",
              fontSize: 14
            },
            title: 'Number of Item(protein)'
          },
          tooltip: {
            showColorCode: true
          },
          chartArea: {
            left: 0,
            top: 0,
            width: "100%",
            height: "30%"
          },
          fontName: "Roboto",
          title: "test",
         
        };

        */

        const colorBoxes = innernodeinfo.map((c,iitem) => (
          <div style={{ backgroundColor: `${palette[iitem]}` }}>&nbsp;{c}&nbsp;</div>
        ));

        const colorBoxes2 = Items.length>0 ? getop=='Venn' ? Items[0].map((c,i) => (
          <div style={{ backgroundColor: `${palette3[i]}` }}>&nbsp;{c}&nbsp;</div>
        )): Items[0].map((c,i) => (
          <div style={{ backgroundColor: `${palette2[i]}` }}>&nbsp;{c}&nbsp;</div>
        )): false
      
       
      
      return(<>
      
      <h3 style={{'textAlign':'left'}}>Node color information</h3>
      <div className="Palette" style={{'font-weight':'bold' ,'color':'white','textAlign':'center'}}>
     {colorBoxes}

        </div>

      
      { data!=false?
      <h3 style={{'textAlign':'left'}}>Node stroke color information</h3> :false}
 { data!=false?
      <div className="Palette" style={{'font-weight':'bold' ,'color':'white','textAlign':'center'}}> 
        {colorBoxes2}
        </div>
      :false}
</>

      )
      
       }




    return (
<>

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{"width":'800px'}}>

  <Container>
  <Navbar.Brand href="#Main" onClick={uploadModule3}>Main</Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Navbar.Collapse id="responsive-navbar-nav">
                
<Nav>
      <Nav.Link href="#Venn"  onClick={uploadModule3}>Venn</Nav.Link>
      <Nav.Link eventKey={2} href="#Chr"  onClick={uploadModule3}>
      Chr
      </Nav.Link>
      <Nav.Link eventKey={3} href="#GO"  onClick={uploadModule3}> 
      GO
      </Nav.Link> 
    </Nav>

                </Navbar.Collapse>
            </Container>

            </Navbar>
            <p/>
<CreateDiv2/>


      
 
      <Accordion defaultActiveKey={["0"]} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Label information(Node color)</Accordion.Header>
        <Accordion.Body>
          <p>GroupA:Proteins included in Group A.</p>
          <p>GroupB:Proteins included in Group B.</p>
          <p> VMV:Among the proteins included in the "Protein Basket", 
            the proteins added on the "VMV page (Volcano plot, Manhattan plot,Venn diagram)". </p>
          <p>GO: Among the proteins included in the "Protein Basket",
            the proteins added on the "GO page (GO table)".</p>
          <p>BULK: Among the proteins included in the "protein basket",
            Proteins added as "BULK". </p>
          <p>VMV&GO: VMV and GO </p>
          <p>VMV&BULK: VMV and BULK</p>
          <p>GO&BULK: GO and BULK</p>
          <p>VMV&GO&BULK: VMV and GO and BULK</p>
          <p>With GroupA: Node between two or more group A </p>
          <p>With GroupB: Node between one group A and one group B</p>
          <p>With GroupA&B:Node between Two or more group A, one or more group B </p>
          <p>yourprotein: Left-click to select. (Group A and Group B do not change color)  </p>
        </Accordion.Body>
      </Accordion.Item>
     
      {getop=='Venn'?<Accordion.Item eventKey="1">
        <Accordion.Header>Label information(Node stroke color)</Accordion.Header>
        <Accordion.Body>
        <p>Identified: Identified protein</p>
        <p>compare: Position of protein in volcano plot for each comparison group (up, down, similar)</p>
       
        </Accordion.Body>
      </Accordion.Item>:false}
      {getop=='Chr'?<Accordion.Item eventKey="1">
        <Accordion.Header>Label information(Node stroke color)</Accordion.Header>
        <Accordion.Body>
        <p>None:None</p>
        <p>Chromosome : Chromosome number of proteins</p>
        
        </Accordion.Body>
      </Accordion.Item>:false}

      {getop=='GO'?<Accordion.Item eventKey="1">
        <Accordion.Header>Label information(Node stroke color)</Accordion.Header>
        <Accordion.Body>
        <p>None:None</p>
        <p>The GO terms of the BP, CC and MF</p>
       
        </Accordion.Body>
      </Accordion.Item>:false}
    
    
    </Accordion>



</>
    );
  
}




