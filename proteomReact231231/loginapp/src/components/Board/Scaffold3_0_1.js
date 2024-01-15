import React,{useState, useEffect,useMemo,Component} from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router'
//import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';  // DatePicker 라는 컴포넌트도 가져오깅
import "react-datepicker/dist/react-datepicker.css"; 
import {Divider ,Dropdown}  from 'semantic-ui-react';
import $ from 'jquery';
import { BsQuestionLg } from 'react-icons/bs';
import { GrLock,GrUnlock } from "react-icons/gr";

import {InputGroup, Container,Col,Row,Image,Modal,Button,Form,Card,Table,DropdownButton,FormControl} from 'react-bootstrap';
import { tree } from 'd3';
import { string } from 'prop-types';
import Select from 'react-select'

import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOptions,
  TableBody,
  TableHeader
} from "react-bs-datatable";

//import AddData from "./AddData";

function Scaffold3_0_1(props){
  const history = useNavigate()
    const [getshow, setShow_project] = useState(false);
    const [getoption,setoption]=useState(false)
    const [getRefresh,setRefrash]=useState(false)

    const [getexp,setexpwhole]=useState([])
    const [testformdata,settestformdata]=useState(false)
    const [numexp,setnumexp]=useState(false)

    const [Progress,setProgress]= useState(false);
    const [getstate,setgetstate]= useState({});

    //PROGRESS setgetstate
  

          const STORY_HEADERS = [
            {
              prop: "id",
              title: "id",
              isSortable: true,
              
            },
            {
              prop: "ProjectName",
              title: "Project Name",
              isFilterable: true
            },
            {
              prop: "ExperimentName",
              title: "Experiment Name",
              isFilterable: true
            },{
              prop: "date",
              title: "date",
              isSortable: true,
        
            }, 
            {
              prop: "User",
              title: "User",
              isFilterable: true
            },
            {
              prop: "Software",
              title: "Software"
            },
            {
              prop: "Label(TMT/LFQ)",
              title: "Label(TMT/LFQ)"
            },
            
            {
              prop: "Filter",
              title: "Filter"
            },
           
            {
              prop: "NormMethod",
              title: "NormMethod"
            },
            
            {
              prop: "ImputeMethod",
              title: "ImputeMethod"
            },
            {
              prop: "Analysis",
              title: "Analysis",
              cell: row => (
                

               /*<a href={row.Analysis} target="_blank">
               
                
        
        





                </a><Button variant="link" style={{textAlign:"left"}} onClick={(e)=> props.getEXPID(row.ExperimentName)}>{row.Analysis}</Button>
               x==4?115:b==3? 123:11
.length
               
                */ 

               row.Analysis=='select'?
                (<Button variant="link" style={{textAlign:"left"}}  onClick={(e)=> props.getEXPID([row.ExperimentName,[row.ProjectName]])}>{row.Analysis}</Button>)
                :    (<Button variant="dark" style={{textAlign:"left"}} >{row.Analysis}</Button>)
               
              )
           
            }
            
          ];
     
  
    //alert? 

/*
setShow_project(false),
setRefrash(false))
*/
   
   
    useMemo(() => {
   //   props.user != false      ?
   (
      
        fetch('http://127.0.0.1:5506/api/uplist/')
        .then((res)=>res.json())
        .then((posts)=>{

          const explistfiluser=posts//.results
          const tosexp=   explistfiluser.filter(id=>id.Change2p=='Public')  
          const tosTable= tosexp.map((a,i)=>{
            
            
            const url= `http://127.0.0.1:5506/api/${'progress_'+a.taskId}/`
            const taskfin=  a.taskfin!='fin'?      updateProgress(url) : 'fin'
      
             const falseck=Object.keys(getstate).length!=0 

             
             const taskid=  taskfin=='fin'? 'select' : 'data preprocessing'
             
//       const taskid=  (url!=false && getstate[url]=='SUCCESS')||( url!=false && getstate[url]== 'PENDING' )? 'select' :(url!=false &&  getstate[url]== 'PROGRESS') ?  'data processing': 'Wait'
           // const taskid= getstate[url]=='SUCCESS' || getstate[url]== 'PENDING'?'select' :'data processing' PROGRESS

            //const taskid=a.taskId=='select'? 'select':'data processing'

            return      {"id":(i+1),"projecttitle":a.projecttitle,'description':a.description,"date": a.created_at,'username':a.username,'Software':a.Software,'LabelMethod':a.LabelMethod,'FilterMethod':a.FilterMethod,'NormMethod':a.NormMethod,'ImputeMethod':a.ImputeMethod,'Analysis':taskid}
                })
                const tosTable2= tosTable!=false?      tosTable.filter(id=> id.Analysis[0]!='pass')               :[]
                tosTable2.sort((a, b) => parseFloat(b.date.split('-').join('').split('T').join('').split(':').join('').split('.')[0]) - parseFloat(a.date.split('-').join('').split('T').join('').split(':').join('').split('.')[0]))
                //a.created_at
                
            
                const tosTable3= tosTable2.map((a,i)=>{
            
                  return      {"id":(i+1),"ProjectName":a.projecttitle,'ExperimentName':a.description,"date": a.date,'User':a.username,'Software':a.Software,'Label(TMT/LFQ)':a.LabelMethod,'Filter':a.FilterMethod,'NormMethod':a.NormMethod,'ImputeMethod':a.ImputeMethod,'Analysis':a.Analysis}
                })
            
            
            
            setexpwhole(tosTable3)
                setnumexp(tosexp)
                
         setRefrash(true) 
        })
      
      
      
              )
       //   :setexpwhole(false)          setRefrash(true) 
      
    }, [getRefresh])


    //

  
  useEffect(()=>{
   // props.user != false?
   (
      
  fetch('http://127.0.0.1:5506/api/uplist/')
  .then((res)=>res.json())
  .then((posts)=>{
    const explistfiluser=posts//.results
    const tosexp= explistfiluser.filter(id=>id.Change2p=='Public')  
   
     const tosTable= tosexp.map((a,i)=>{
     
      const url= `http://127.0.0.1:5506/api/${'progress_'+a.taskId}/`
     const taskfin= a.taskfin!='fin'?      updateProgress(url) : 'fin'

     const taskid=  taskfin=='fin'? 'select' : 'data preprocessing'

       
       //(url!=false && getstate[url]=='SUCCESS')||( url!=false && getstate[url]== 'PENDING' )? 'select' :(url!=false &&  getstate[url]== 'PROGRESS') ?  'data processing': 'Wait'
      // const taskid= getstate[url]=='SUCCESS' ? 'select' : getstate[url]== 'PENDING'?  'Wait':'data processing'
      
//      const taskid=a.taskId=='select'? 'select':'data processing'
return      {"id":(i+1),"projecttitle":a.projecttitle,'description':a.description,"date": a.created_at,'username':a.username,'Software':a.Software,'LabelMethod':a.LabelMethod,'FilterMethod':a.FilterMethod,'NormMethod':a.NormMethod,'ImputeMethod':a.ImputeMethod,'Analysis':taskid}  })
    const tosTable2= tosTable!=false?      tosTable.filter(id=> id.Analysis[0]!='pass')               :[]
    
    tosTable2.sort((a, b) => parseFloat(b.date.split('-').join('').split('T').join('').split(':').join('').split('.')[0]) - parseFloat(a.date.split('-').join('').split('T').join('').split(':').join('').split('.')[0]))
    //a.created_at
    

    const tosTable3= tosTable2.map((a,i)=>{

      return      {"id":(i+1),"ProjectName":a.projecttitle,'ExperimentName':a.description,"date": a.date,'User':a.username,'Software':a.Software,'Label(TMT/LFQ)':a.LabelMethod,'Filter':a.FilterMethod,'NormMethod':a.NormMethod,'ImputeMethod':a.ImputeMethod,'Analysis':a.Analysis}
    })



setexpwhole(tosTable3)




    setnumexp(tosexp)
  })



        )
   // :setexpwhole(false)
 
},[props.user])
function updateProgress (progressUrl) {
  fetch(progressUrl).then(function(response) {
      response.json().then(function(data) {


        const getobj=getstate
        
        

        //        setgetstate()
          // update the appropriate UI components
          //setProgress([data.state, data.details]);
         
         
        
          
          if(data=='process'){ 
            setTimeout(updateProgress, 1000, progressUrl);
           
          }
          else if (data=='fin'){
            setRefrash(false)
            }
          else{


            setRefrash(false)

          }
            
         
          //
          
          setgetstate(getobj)
    
        });
  });
  }
 
  



//<Card.Link href="#">Card Link</Card.Link>
//<Card.Link href="#">Another Link</Card.Link>
//href="/Twostep"
const CardExampleHeaderCard = () => {
  return(
    <Container>
<Row>

{ getexp.length>0 &&numexp!=false? 
    <Button variant="secondary" >  <GrUnlock/> <text>Public</text></Button> 
:<>
<Card border="dark" style={{ width: '18rem' }}> 
<Card.Header style={{"font-size": "15px" }} >{props.ProjectID[0]!=false? props.ProjectID[0]:'Please select from Project'}</Card.Header>
</Card>
<br/> </>
}
</Row>
  
    

  </Container>

)}


const CardExampleHeaderCard2 = () => {
  return(


<>
   {
    getexp.length>0 &&numexp!=false? 
   <DatatableWrapper
   body={getexp}
   headers={STORY_HEADERS}
   paginationOptionsProps={{
     initialState: {
       rowsPerPage: 10,
       options: [5, 10, 15, 20]
     }
   }}
 >
 <Row className="mb-4 p-2">

<Col xs={4}
       sm={4}
       lg={4}       className="d-flex flex-col justify-content-start align-items-center">
       <Filter />
     </Col>

   </Row>

   <Row>
    <Col xs={12}
       sm={6}
       lg={6}
       className="d-flex flex-col justify-content-lg-left align-items-center justify-content-sm-start mb-2 mb-sm-0">
    </Col>
   </Row>

   <Table>
     <TableHeader />
     <TableBody />
   </Table>
   <br/>
<Row className="mb-4 p-2">

<Col        className="d-flex flex-col justify-content-start align-items-center">
<PaginationOptions />
 
   </Col> 
<Col        className="d-flex flex-col justify-content-center align-items-center">

 
<Pagination  />
   </Col> 

   <Col        >

   </Col> 
   </Row>
   <br/>
 </DatatableWrapper>:
 
 <div>There are no Experiments converted to Public.
 </div>
 }
  
   
 </>

    


)}






const ADDoption = (e) =>{
  setShow_project(e[0])
  setoption(e[1])
  setProgress(false)
}



    return(
    <>

    <Container  id='wholeT'>
     
    <Row > 

    { props.ProjectID[0]!=false?    <Col lg={6} sm={6}  class='Headerstyle' style={{'font-weight':'bold', "font-size": "25px" , "align-items":"center","padding":'5px'}}>&nbsp;Experiment management(Public)&nbsp;  </Col>
 :<Col lg={6} sm={6}  class='Headerstyle' style={{'font-weight':'bold',"font-size": "25px" , "align-items":"center","padding":'5px' }}>&nbsp; Experiment List(Public)&nbsp;</Col> }


<Col style={{"display": "flex","justify-content": "end","align-items":"end"}}>  



      </Col>
      </Row>
      <div id='SCAFFOLD'> 

      <Row > 

      <Col lg={1} sm={1}  style={{textAlign: "left"}}></Col>
      <Col  lg={7} sm={5} style={{textAlign: "left" ,"margin-top":'1%'}}> 
      
      </Col>
       </Row>
      <Row style={{textAlign:"left"}}> 
      <Col lg={6} sm={6} >      
 </Col>
      <Col lg={1} sm={1}  style={{textAlign: "left"}}></Col>
      <Col  lg={6} sm={5} style={{textAlign: "left" ,"margin-top":'1%'}}> 
     
      </Col>
      

     

     
      </Row>
 <Row >

 <Col>
 <span class="badge bg-primary" style={{"padding":"5px"}}>  <GrUnlock/> <text style={{"font-size": "20px" ,'font-weight':'bold' }}>Public</text></span>
<br/>


</Col>
</Row>
<Row>
<Divider/>

<Col  >
<text style={{"font-size": "20px",'font-weight':'bold' }}>Public Experiment list</text>
<br/>
{getshow== false? <CardExampleHeaderCard2/>:false}
</Col>
</Row>
</div>
</Container>
       </>
      )

}
export default Scaffold3_0_1;
