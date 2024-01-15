import React,{useState, useEffect,useMemo} from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router'
//import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';  // DatePicker 라는 컴포넌트도 가져오깅
import "react-datepicker/dist/react-datepicker.css"; 
import { Alert } from 'reactstrap';
import $ from "jquery";
import { BsQuestionLg } from 'react-icons/bs';
import { GrLock,GrUnlock } from "react-icons/gr";

import {InputGroup, Container,Col,Row,Image,Modal,Button,Form,Card,Table} from 'react-bootstrap';
import { tree } from 'd3';
import { string } from 'prop-types';
import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOptions,
  TableBody,
  TableHeader
} from "react-bs-datatable";
import {Divider }  from 'semantic-ui-react';

function Scaffold3_1(props){
  const [ongoingcount, setongoingcount] = useState(0);
  const [TodoList, setTodoList] = useState(false);
  const [getRefresh,setRefrash]=useState(false)
  const [getRefresh2,setRefrash2]=useState(false)
  const [show, setShow] = useState(false);
  const [numexp,setnumexp]=useState(false)
  const [getexp,setexpwhole]=useState(false)
  const [getstate,setgetstate]= useState({});
  const [userlist,setuserlist]= useState(localStorage.getItem('userlist')==undefined ? false : JSON.parse(localStorage.getItem('userlist'))) 

  const [Publish, setPublish] = useState("Private");

  //JSON.parse(localStorage.getItem('userlist'))

  const TFck = (text) => {
     
      
    const set_userlist=  Array.from(new Set((text[0]+','+text[1]).split(',')))
     
      
    return set_userlist
    }
    
  const history = useNavigate()
/*
  const handleChange = (e) => {
    setPublish("Publish");
  };

  
  */
  const uploadModule3 = async (e) => {
   e.preventDefault();
    

    const expname=  TodoList!= false? TodoList[0]['expname']:false

    const Change2p=  TodoList!= false? TodoList[0]['Change2p']:false
    const dicp2p= {'Private':'Public','Public':'Private'}
    const dicp2p2= {'Private':'Private','Public':'Public'}

    const push2p =    TodoList != false ? dicp2p[Change2p] : false;
    const push2p2 =    TodoList != false ? dicp2p2[Change2p] : false;


    const projname=  TodoList!= false? TodoList[0]['projname']:false





 if (window.confirm('Change' ))
 {
  
  const formData = new FormData();
  formData.append("projecttitle",projname);
  formData.append("username",props.user); 
  formData.append("proj",expname);
  formData.append("Change2p",push2p);
  //http://127.0.0.1:5506/api/private2publish/
  fetch("http://127.0.0.1:5506/api/private2publish/", { 
   method : 'POST',
   headers: {
       Authorization : `JWT ${localStorage.getItem('token')}`,
     
   },
   body : formData
  }).then(res => {
    if (!res.ok) {
      throw Error("400/500 error");
      
    }
    return res.json();
  
  })
  .then(res => {
    //console.log(res)
  
    setRefrash(false)
    props.getEXPID([expname,[projname]])
  
   
  
  }
  )




   
   
 }
 else
 {


  const formData = new FormData();
  formData.append("projecttitle",projname);
  formData.append("username",props.user); 
  formData.append("proj",expname);
  formData.append("Change2p",push2p2);
  //http://127.0.0.1:5506/api/private2publish/
  fetch("http://127.0.0.1:5506/api/private2publish/", { 
   method : 'POST',
   headers: {
       Authorization : `JWT ${localStorage.getItem('token')}`,
     
   },
   body : formData
  }).then(res => {
    if (!res.ok) {
      throw Error("400/500 error");
      
    }
    return res.json();
  
  })
  .then(res => {
//    console.log(res)
  
    props.getEXPID([expname,[projname]])
   
  
   
  
  }
  )

   
 }


  }

  const STORY_HEADERS_finish = [
    {
      prop: "id",
      title: "id",
      isSortable: true,
      
    },
    
    {
      prop: "Analysisinfo",
      title: "AnalysisName",
      isFilterable: true,
      cell: row => (
      
       
       
       <text>{row.Analysisinfo.split(';')[1]}</text>
      )
    },
    {
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
      prop: "Label(TMT/LFQ)",
      title: "Label(TMT/LFQ)"
    },
    
    {
      prop: "Filter",
      title: "Filter"
    },{
      prop: "Analysis",
      title: "Analysis",
      cell: row => (
       /*<a href={row.Analysis} target="_blank">
          
        </a>
         :  Object.keys(getstate).length>0?      (<Button variant="dark" style={{textAlign:"left"}} >{row.Analysis}</Button>):( <Button  variant="warning"  style={{textAlign:"left"}} > {'Wait'}</Button>)
               
        
        */ 
       
       
        row.Analysis=='select'?
        (<Button variant="link" style={{textAlign:"left"}}  onClick={(e)=>props.getAID(row.Analysisinfo)}>{row.Analysis}</Button>):
        ( row.Analysis[0]!='data processing')? 
        (<Button variant="link" style={{textAlign:"left"}}  onClick={(e)=>[props.getresultID(row.Analysis),props.decisionFin(1)]}>{"goDEP"}</Button>)
               :( <text    style={{textAlign:"left"}} > {row.Analysis[0]}</text>)
        
      )
    
    }
    
  ];

  const STORY_HEADERS_ongoing = [
    {
      prop: "id",
      title: "id",
      isSortable: true,
      
    },
    
    {
      prop: "Analysisinfo",
      title: "AnalysisName",
      isFilterable: true,
      cell: row => (
      
       
       
       <text>{row.Analysisinfo.split(';')[1]}</text>
      )
    },
    {
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
      prop: "Label(TMT/LFQ)",
      title: "Label(TMT/LFQ)"
    },
    
    {
      prop: "Filter",
      title: "Filter"
    },{
      prop: "Analysis",
      title: "Analysis",
      cell: row => (
       /*<a href={row.Analysis} target="_blank">
          
        </a>
         :  Object.keys(getstate).length>0?      (<Button variant="dark" style={{textAlign:"left"}} >{row.Analysis}</Button>):( <Button  variant="warning"  style={{textAlign:"left"}} > {'Wait'}</Button>)
               
        
        */ 
       
       
        row.Analysis=='select'?
        (<Button variant="link" style={{textAlign:"left"}}  onClick={(e)=>props.getAID(row.Analysisinfo)}>{row.Analysis}</Button>):
        ( row.Analysis[0]!='data processing')? 
        (<Button variant="link" style={{textAlign:"left"}}  onClick={(e)=>[props.getresultID(row.Analysis),props.decisionFin(0)]}>{"goDEP"}</Button>)
               :( <text    style={{textAlign:"left"}} > {row.Analysis[0]}</text>)
        
      )
    
    }
    
  ];



  useMemo(() => {
//    props.user != false    ?
    (
    
      fetch('http://127.0.0.1:5506/api/Ainfolist/')
      .then((res)=>res.json())
      .then((posts)=>{
        const explistfiluser=posts//.results
        //pvfc정보를 받아오는것이 필요하다.
         
        const tosexp= props.EXPID!=false?  explistfiluser.filter(id=>(id.proj==props.EXPID)).filter(id=>id.projecttitle==props.ProjectID[0]) :false
        const tosTable= props.EXPID!=false?tosexp.map((a,i)=>{

          const url= a.taskId !=''?  `http://127.0.0.1:5506/api/${'progress_'+a.taskId}/`:false
          const taskIdfin= a.taskIdfin!='fin'?      updateProgress(url) : 'fin'

          const falseck=Object.keys(getstate).length!=0

          const GETtaskvalue=  taskIdfin=='fin'? 'getvalues_'+a.taskId : 'data processing'
         // const GETtaskvalue=  a.taskId!=''&& taskIdfin=='fin'? a.taskId:'data preprocessing'

          //const GETtaskvalue=( url!=false && getstate[url]=='SUCCESS')? a.taskId : (url!=false &&  getstate[url]== 'PROGRESS')? 'data processing' :'Wait'
/*
     ,a.taskId3,   a.taskId3fin,   a.mergeb123,a.c1source,a.c2target,a.finGO
*/
          
          const taskid=a.taskId==''? 'select':[GETtaskvalue,a.indexinfo,a.compare,a.whole,a.Analysisinfo,a.proteincount,a.pvfc,a.taskId2,a.taskId3,   a.taskId3fin,   a.mergeb123,a.c1source,a.c2target,a.finGO] 


          return      {"Analysisinfo":a.Analysisinfo,"date":a.created_at,'User':a.username,'LabelTMTLFQ':a.LabelMethod,'Filter':a.FilterMethod,'Analysis':taskid}
              }):false
             const tosTable2= tosTable!=false?      tosTable.filter(id=> id.Analysis[0]!='pass')               :false
            
              setexpwhole(tosTable2)
              setnumexp(tosexp)








        setRefrash(true)  
      })
    
    
    
            )
        //:setexpwhole(false)        setRefrash(true)  
    
  }, [getRefresh])


  useMemo(() => {
    //    props.user != false    ?
        
          fetch('http://127.0.0.1:5506/api/projectlist/')
          .then((res)=>res.json())
          .then((posts)=>{
            const explistfiluser=posts.filter(id=>id.projectname==props.ProjectID[0]).map((a,i)=>{
             const ck= TFck([a.username,a.userlist] ).includes(props.user)
              return ck
            }
              
              )
            
            //  console.log(props)

              setuserlist(explistfiluser[0])
              
              
              const text0=JSON.stringify(explistfiluser[0])
              localStorage.setItem('userlist', text0)

              setRefrash(true)  
          })
           

          
          
        
      }, [getRefresh])


//usememo-> useeffect
/*
      useMemo(() => {
        //    props.user != false    ?
            
              fetch('http://127.0.0.1:5506/api/projectlist/')
              .then((res)=>res.json())
              .then((posts)=>{
                const explistfiluser=posts.filter(id=>id.projectname==props.ProjectID[0]).map((a,i)=>{
                 const ck= TFck([a.username,a.userlist] ).includes(props.user)
                  return ck
                }
                  
                  )
                
                  console.log(props)
    
                  setuserlist(explistfiluser[0])
                  
                  
                  const text0=JSON.stringify(explistfiluser[0])
                  localStorage.setItem('userlist', text0)
    
                  setRefrash(true)  
              })
               
    
              
              
            
          }, [getRefresh])
*/



useEffect(() => {
  //    props.user != false    ?
      
        fetch('http://127.0.0.1:5506/api/projectlist/')
        .then((res)=>res.json())
        .then((posts)=>{
          const explistfiluser=posts.filter(id=>id.projectname==props.ProjectID[0]).map((a,i)=>{
           const ck= TFck([a.username,a.userlist] ).includes(props.user)
            return ck
          }
            
            )
          

            setuserlist(explistfiluser[0])
            
            
            const text0=JSON.stringify(explistfiluser[0])
            localStorage.setItem('userlist', text0)

            setRefrash(true)  
        })
         

        
        
      
    }, [props.user])










  
  useEffect(()=>{
//    props.user != false   ?
    (
      
  fetch('http://127.0.0.1:5506/api/Ainfolist/')
  .then((res)=>res.json())
  .then((posts)=>{
    const explistfiluser=posts//.results
    const tosexp= props.EXPID!=false?  explistfiluser.filter(id=>(id.proj==props.EXPID) ).filter(id=>id.projecttitle==props.ProjectID[0]):false
    const tosTable=props.EXPID!=false? tosexp.map((a,i)=>{

      
      const url= a.taskId !='' ? `http://127.0.0.1:5506/api/${'progress_'+a.taskId}/`:false
      const taskIdfin= a.taskIdfin!='fin' && a.taskId!=''?      updateProgress(url) : 'fin'

//      PENDING


      const GETtaskvalue=  taskIdfin=='fin'? 'getvalues_'+a.taskId :  'data processing'
//      const GETtaskvalue=  a.taskId!=''&& taskIdfin=='fin'? a.taskId:'data preprocessing'

//      const GETtaskvalue=( url!=false && getstate[url]=='SUCCESS')? a.taskId : (url!=false &&  getstate[url]== 'PROGRESS')? 'data processing' :'Wait'

     const taskid=a.taskId==''? 'select':[GETtaskvalue,a.indexinfo,a.compare,a.whole,a.Analysisinfo,a.proteincount,a.pvfc,a.taskId2,a.taskId3,   a.taskId3fin,   a.mergeb123,a.c1source,a.c2target,a.finGO]

      return      {"Analysisinfo":a.Analysisinfo,"date":a.created_at,'User':a.username,'LabelTMTLFQ':a.LabelMethod,'Filter':a.FilterMethod,'Analysis':taskid}
          }):false
          const tosTable2= tosTable!=false?      tosTable.filter(id=> id.Analysis[0]!='pass')               :false
         
         
    setexpwhole(tosTable2)
    setnumexp(tosexp)
  })



        )
    //:setexpwhole(false)
 
},[props.user])
  useMemo(() => {
   // props.user != false?
    (
      
  fetch('http://127.0.0.1:5506/FileinfoAPI/')
  .then((res)=>res.json())
  .then((posts)=>{
    const explistfiluser=posts//.results
    const tosexp= props.EXPID!=false?  explistfiluser.filter(id=>id.proj==props.EXPID).filter(id=>id.projecttitle==props.ProjectID[0]):explistfiluser
const tcard=props.EXPID!=false?tosexp.map((a,i)=>({
  value: i, expname: a.proj ,condition:a.compare,projname:a.projecttitle,description:a.destxt
  ,username:a.username,LabelMethod:a.LabelMethod,FilterMethod:a.FilterMethod,whole:a.whole,Change2p:a.Change2p,NormMethod:a.NormMethod,Software:a.Software,ImputeMethod:a.ImputeMethod

})):false
 
    /*
    const tosTable= tosexp.map((a,i)=>{

return      {"Project Name":a.projecttitle,'ExperimentName':a.proj,'User':a.username,'Label(TMT/LFQ)':a.LabelMethod,'Filter':a.FilterMethod,'Analysis':'select'}
    })
*/
setTodoList(tcard)
setRefrash(true) 
  })



        )
//    :setTodoList(false)    setRefrash(true) 
  }, [getRefresh])


  useEffect(()=>{
//    props.user != false    ?
(
      
  fetch('http://127.0.0.1:5506/FileinfoAPI/')
  .then((res)=>res.json())
  .then((posts)=>{
    const explistfiluser=posts//.results
    
    const tosexp= props.EXPID!=false?  explistfiluser.filter(id=>id.proj==props.EXPID).filter(id=>id.projecttitle==props.ProjectID[0]):explistfiluser
const tcard=props.EXPID!=false? tosexp.map((a,i)=>({
  value: i, expname: a.proj ,condition:a.compare,projname:a.projecttitle,description:a.destxt
  ,username:a.username,LabelMethod:a.LabelMethod,FilterMethod:a.FilterMethod,whole:a.whole,Change2p:a.Change2p,NormMethod:a.NormMethod,Software:a.Software,ImputeMethod:a.ImputeMethod

})):false

    /*
    const tosTable= tosexp.map((a,i)=>{

return      {"Project Name":a.projecttitle,'ExperimentName':a.proj,'User':a.username,'Label(TMT/LFQ)':a.LabelMethod,'Filter':a.FilterMethod,'Analysis':'select'}
    })
*/
setTodoList(tcard)
  })



        )
//    :setTodoList(false)
//NormMethod Software ImputeMethod
 
},[props.user])



const [getshow, setShow_project] = useState(false);
const [getoption,setoption]=useState(false)
//props.EXPID!=false
//:

const ADDoption = (e) =>{
  
  setShow_project(e[0])
  setoption(e[1])
  

//  setProgress(false)
}


  //{'Number of Experiments' + '  ' + String( numexp.filter(id=>id.projecttitle==a.text).length)   } 

  function updateProgress (progressUrl) {

if(progressUrl!=false){ 
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
    })
  }


  } 





const CardExampleHeaderCard = () => {


  const Change2p=  TodoList!= false? TodoList[0]['Change2p']:false
const getusername=  TodoList!= false? TodoList[0]['username']:false
  const dicp2p= {'Private':'Public','Public':'Private'}
  const dicp2p2= {'Private':'Private','Public':'Public'}

  const push2p =    TodoList != false ? dicp2p2[Change2p] : false;


//change to public

/*

{TodoList!=false? //&& getexp!=false &&numexp!=false? 
TodoList.map((a,i)=>{
//value: i, text: a.projectname ,startdate:a.startdate,enddate:a.enddate,description:a.description,username:a.username
return(<>
<Card border="dark" style={{ width: '18rem' }}>
{props.EXPID !=false ? <Card.Header style={{"font-size": "15px" }} >  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
</svg> {a.expname}  

{push2p==false? <></> :push2p=='Private'? <span class="badge bg-secondary">  <GrLock/> <text style={{"font-size": "20px" ,'font-weight':'bold' }}>Private</text></span>


:  
<span class="badge bg-secondary">  <GrUnlock/> <text style={{"font-size": "20px" ,'font-weight':'bold' }}>Public</text></span>
}

</Card.Header>
: <Card.Header style={{"font-size": "15px" }} > 

{a.expname} 

{push2p==false? <></> :push2p=='Private'? <span class="badge bg-secondary">  <GrLock/> <text style={{"font-size": "20px" ,'font-weight':'bold' }}>Private</text></span>

:  
<span class="badge bg-secondary">  <GrUnlock/> <text style={{"font-size": "20px" ,'font-weight':'bold' }}>Public</text></span>
}

</Card.Header> }


<Card.Body>
<Card.Subtitle>{a.projname }</Card.Subtitle>
<Card.Subtitle>{a.condition }</Card.Subtitle>


<Card.Text>
{a.LabelMethod}
</Card.Text>

<Card.Text>
{a.FilterMethod}
</Card.Text>




<Card.Text>
{a.username}
</Card.Text>


</Card.Body>


<Card.Body>
<Card.Text>
  {a.description}
</Card.Text>

</Card.Body>
 </Card>
 <br/>
 </>)
})

:<Card border="dark" style={{ width: '18rem' }}> 
<Card.Header style={{"font-size": "15px" }} >{props.EXPID!=false? props.EXPID:'Experiment에서 선택해주세요'}</Card.Header>
</Card>
}


*/
  return(
    <>
    
    <Container>






<Row>


{TodoList!=false? //&& getexp!=false &&numexp!=false? 
TodoList.map((a,i)=>{
//value: i, text: a.projectname ,startdate:a.startdate,enddate:a.enddate,description:a.description,username:a.username
return(<>

<Row>
<br/>

    </Row>
<Row>
    <Col xs={4}
       sm={4}
       lg={4} className="d-flex flex-col justify-content-start align-items-center"><text style={{'font-weight':'bold'}}>Property</text></Col>

<Col xs={8}
       sm={8}
       lg={8} className="d-flex flex-col justify-content-start align-items-center">

{push2p==false? <></> :push2p=='Private'? <span class="badge bg-primary" style={{"padding":"5px"}}>  <GrLock/> <text style={{"font-size": "20px" ,'font-weight':'bold' }}>Private</text></span>

:  
<span class="badge bg-primary">  <GrUnlock/> <text style={{"font-size": "20px" ,'font-weight':'bold' }}>Public</text></span>
}
{getusername==props.user&&push2p==false?  <></> : push2p=='Private' 
? <Form onSubmit={uploadModule3} style={{"padding":"5px"}}>
       
<Button variant="secondary" type="submit">
Change to {dicp2p[Change2p]}
</Button>
</Form>
:false
}
</Col>
</Row>



<Row>
    <Col xs={4}
       sm={4}
       lg={4} className="d-flex flex-col justify-content-start align-items-center"><text style={{'font-weight':'bold'}}>Project Name</text></Col>

<Col xs={8}
       sm={8}
       lg={8} className="d-flex flex-col justify-content-start align-items-center">
<text style={{'font-weight':'bold'}}> {a.projname}</text>
</Col>
</Row>

<Row>
    <Col xs={4}
       sm={4}
       lg={4} className="d-flex flex-col justify-content-start align-items-center"><text style={{'font-weight':'bold'}}>Experiment Name</text></Col>

<Col xs={8}
       sm={8}
       lg={8} className="d-flex flex-col justify-content-start align-items-center">
<text style={{'font-weight':'bold'}}> {a.expname}</text>
</Col>
</Row>


<Row>
    <Col xs={4}
       sm={4}
       lg={4} className="d-flex flex-col justify-content-start align-items-center"><text style={{'font-weight':'bold'}}>Researcher</text></Col>

<Col xs={8}
       sm={8}
       lg={8} className="d-flex flex-col justify-content-start align-items-center">
<text style={{'font-weight':'bold'}}> {a.username}</text>
</Col>
</Row>


<Row>
    <Col xs={4}
       sm={4}
       lg={4} className="d-flex flex-col justify-content-start align-items-center">
      <text style={{'font-weight':'bold'}}>Software</text></Col>

<Col xs={8}
       sm={8}
       lg={8} className="d-flex flex-col justify-content-start align-items-center">
<text style={{'font-weight':'bold','word-break':'break-all'}}> {a.Software}</text>
</Col>
</Row>


<Row>
    <Col xs={4}
       sm={4}
       lg={4} className="d-flex flex-col justify-content-start align-items-center">
      <text style={{'font-weight':'bold'}}>Condition</text></Col>

<Col xs={8}
       sm={8}
       lg={8} className="d-flex flex-col justify-content-start align-items-center">
<text style={{'font-weight':'bold','word-break':'break-all'}}> {a.condition.split('.').join(' ')}</text>
</Col>
</Row>



<Row>
    <Col xs={4}
       sm={4}
       lg={4} className="d-flex flex-col justify-content-start align-items-center"><text style={{'font-weight':'bold'}}>LabelMethod</text></Col>

<Col xs={8}
       sm={8}
       lg={8} className="d-flex flex-col justify-content-start align-items-center">
<text style={{'font-weight':'bold'}}> {a.LabelMethod}</text>
</Col>
</Row>

<Row>
    <Col xs={4}
       sm={4}
       lg={4} className="d-flex flex-col justify-content-start align-items-center">
      <text style={{'font-weight':'bold'}}>NormMethod</text></Col>

<Col xs={8}
       sm={8}
       lg={8} className="d-flex flex-col justify-content-start align-items-center">
<text style={{'font-weight':'bold','word-break':'break-all'}}> {a.NormMethod}</text>
</Col>
</Row>

<Row>
    <Col xs={4}
       sm={4}
       lg={4} className="d-flex flex-col justify-content-start align-items-center"><text style={{'font-weight':'bold'}}>FilterMethod</text></Col>

<Col xs={8}
       sm={8}
       lg={8} className="d-flex flex-col justify-content-start align-items-center">
<text style={{'font-weight':'bold'}}> {a.FilterMethod}</text>
</Col>
</Row>


<Row>
    <Col xs={4}
       sm={4}
       lg={4} className="d-flex flex-col justify-content-start align-items-center">
      <text style={{'font-weight':'bold'}}>ImputeMethod</text></Col>

<Col xs={8}
       sm={8}
       lg={8} className="d-flex flex-col justify-content-start align-items-center">
<text style={{'font-weight':'bold','word-break':'break-all'}}> {a.ImputeMethod}</text>
</Col>
</Row>

 
 <Row>
    <Col xs={4}
       sm={4}
       lg={4} className="d-flex flex-col justify-content-start align-items-center"><text style={{'font-weight':'bold'}}>Description</text></Col>

<Col xs={8}
       sm={8}
       lg={8} className="d-flex flex-col justify-content-start align-items-center">
<text style={{'font-weight':'bold','word-break':'break-all'}}> {a.description}</text>
</Col>
</Row>

 <br/>


 </>)
})

:

<Row>
<Col className="d-flex flex-col justify-content-center align-items-center"><text style={{'font-weight':'bold'}}>{props.EXPID!=false? props.EXPID:'you must select Experiment'}</text>

</Col>
</Row>



}






</Row>


</Container>
</>
)}



/*

<Row>


<Col xs={4}
       sm={4}
       lg={4} className="d-flex flex-col justify-content-start align-items-center"><text style={{'font-weight':'bold'}}>Change Property</text></Col>

<Col xs={8}
       sm={8}
       lg={8} className="d-flex flex-col justify-content-start align-items-center">
{getusername==props.user
? <Form onSubmit={uploadModule3}>
       
<Button variant="secondary" type="submit">
Change to {dicp2p[Change2p]}
</Button>
</Form>
:false
}
</Col>




</Row>
*/

const uploadModule =async (e) =>{
  e.preventDefault();
  const tablelist=numexp
    const value=tablelist.map((a,i)=>{
     
      
      return     [a.Analysisinfo]}  )

      if(e.target[0].value==null){
        window.alert("You must write Analysis Name");
      
      
       } 
      const ainfo=props.EXPID+'_AnI;'+e.target[0].value
     
      const projtf=value.filter(id=>id[0]==ainfo).length>0
if(projtf==true){
  if (window.confirm('AnalysisName이 이미 사용중입니다. 다른 이름을 사용해주세요'))
  {
    
   




    
    
  }
  else
  {
   
  }



}
else
{


  

  const Analysisinfo=props.EXPID+'_AnI;'+e.target[0].value
  const AnalysisinfoTXT=e.target[1].value ==null?'':e.target[1].value
 const expname=  TodoList!= false? TodoList[0]['expname']:false
 const condition=  TodoList!= false? TodoList[0]['condition']:false
 const projname=  TodoList!= false? TodoList[0]['projname']:false
 const whole=  TodoList!= false? TodoList[0]['whole']:false
 const LabelMethod=  TodoList!= false? TodoList[0]['LabelMethod']:false
 const FilterMethod=  TodoList!= false? TodoList[0]['FilterMethod']:false
 const NormMethod =  TodoList!= false? TodoList[0]['NormMethod']:false
 const Software =  TodoList!= false? TodoList[0]['Software']:false
 const ImputeMethod =  TodoList!= false? TodoList[0]['ImputeMethod']:false


 const formData = new FormData();
 formData.append("Analysisinfo",Analysisinfo);
 formData.append("AnalysisinfoTXT",AnalysisinfoTXT); 
 formData.append("proj",expname);
 formData.append("compare",condition);
 formData.append("username",props.user)
 formData.append("whole",whole);
 formData.append("projecttitle",projname);
 formData.append("LabelMethod",LabelMethod);
 formData.append("FilterMethod",FilterMethod); 
 formData.append("NormMethod",NormMethod); 
 formData.append("Software",Software); 
 formData.append("ImputeMethod",ImputeMethod); 

 formData.append("enctype","multipart/form-data")
 
 fetch("http://127.0.0.1:5506/api/Ainfolist/", { 
  method : 'POST',
  headers: {
      Authorization : `JWT ${localStorage.getItem('token')}`,
    
  },
  body : formData
 }).then(res => {
   if (!res.ok) {
     throw Error("400/500 error");
     
   }
   return res.json();
 
 })
 .then(res => {
  setRefrash(false)
     setShow_project(false) 
     setoption(false)
     
  
   
 
 
  
 
 }
 )
 .catch(error => {
   if (window.confirm('The server is very busy. sorry'))
   {
     
     history('/')
 
 
 
 
     
     
   }
   else
   {
     history('/')
   }
 
 })



}






}
const Example =()=> {

  
/*
<Button variant="outline-info" size="sm" onClick={() => setShow3(true)}>
      what is TMT/LFQ?
    </Button>
    
<Button variant="outline-info" size="sm" onClick={() => setShow2(true)}>
      what is filter row?
    </Button>
    
    */
  return(<>
<br/>
<br/>
{props.EXPID!=false?
<Card style={{ width: '28rem' }}>

<Card.Body>
<Form onSubmit={uploadModule } >
  <Card.Title>Add Analysis</Card.Title>
 
   <Form.Group className="mb-3" controlId="formBasicPassword">
 
</Form.Group>
  <Card.Subtitle className="mb-2 text-muted"> 
  <Form.Group className="mb-3" controlId="formBasicPassword">
  <Form.Label>Analysis Name</Form.Label>
  <Form.Control placeholder="Analysis Name" />
 
</Form.Group>
  </Card.Subtitle>
  <Card.Text>
  Write the analysis name and description.
  </Card.Text>
  

<Form.Group className="mb-3" controlId="formBasicCheckbox">
<Form.Label>Analysis Description</Form.Label>
<Form.Text className="text-muted"  name="profile">

<Form.Control placeholder="Analysis Description" as="textarea" rows={5}  />

  
</Form.Text>

</Form.Group>
<Button variant="secondary"  type="submit">
  Submit
</Button>
 <Button  variant="light"  onClick={()=> ADDoption([false,false])} >
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>
</Button>
</Form>

  
</Card.Body>
</Card>
:<Alert color="secondary"> 
You should have chosen to experiment. <a href='/Twostep'> Experiment List</a> you have to press the link. </Alert>


}
</>
//<Form.Check type="checkbox" label="Check me out" />
//{testformdata!=false?       <AddData data2={testformdata} />   :false}
  )}

  /**/


const CardExampleHeaderCard2 = () => {

//  const filtergetexp=getexp!=false ? getexp.filter(id=>id.Analysis!='select').filter(id=>id.Analysis[9]=='FinAnalysis') :false
const filter1 = getexp!=false? getexp.filter(id=>id.Analysis=='select'):false
const filter2 = getexp!=false? getexp.filter(id=>id.Analysis!='select').filter(id=>id.Analysis[9]!='FinAnalysis'):false

  const filtergetexp_eve=getexp!=false ? filter1.concat(filter2).filter(id=>(id.User==props.user)):[]
  
  
  filtergetexp_eve.sort((a, b) => parseFloat(b.date.split('-').join('').split('T').join('').split(':').join('').split('.')[0]) - parseFloat(a.date.split('-').join('').split('T').join('').split(':').join('').split('.')[0]))

  const filtergetexp =filtergetexp_eve.map((a,i)=>{

    return      {"id":(i+1),"Analysisinfo":a.Analysisinfo,'date':a.date,'User':a.User,'Label(TMT/LFQ)':a.LabelTMTLFQ,'Filter':a.Filter,'Analysis':a.Analysis}
  })
  
  setongoingcount(filtergetexp_eve.length)
//&& (id.username==props.user))
  return(


<>
   {
   TodoList!=false && getexp!=false &&numexp!=false && filtergetexp.length>0? 
   <DatatableWrapper
   body={filtergetexp}
   headers={STORY_HEADERS_ongoing}
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
 props.user !=false? 
 <div>There is no 'ANALYSIS' in the selected experiment. Please select and add 'New ANALYSIS'
 </div>:
 <div> Login is required.</div>






 }
  
   
 </>

    
    


)}

const CardExampleHeaderCard22 = () => {

  //순서[GETtaskvalue,a.indexinfo,a.compare,a.whole,a.Analysisinfo,a.proteincount,a.pvfc,a.taskId2,a.taskId3,   a.taskId3fin,   a.mergeb123,a.c1source,a.c2target,a.finGO]
//TodoList

const filtergetexp_eve=getexp!=false ? getexp.filter(id=>id.Analysis!='select').filter(id=>id.Analysis[9]=='FinAnalysis') :[]
filtergetexp_eve.sort((a, b) => parseFloat(b.date.split('-').join('').split('T').join('').split(':').join('').split('.')[0]) - parseFloat(a.date.split('-').join('').split('T').join('').split(':').join('').split('.')[0]))

const filtergetexp =filtergetexp_eve.map((a,i)=>{

  return      {"id":(i+1),"Analysisinfo":a.Analysisinfo,"date":a.date,'User':a.User,'Label(TMT/LFQ)':a.LabelTMTLFQ,'Filter':a.Filter,'Analysis':a.Analysis}
}) 

const public_ck=  TodoList!= false? TodoList[0]['Change2p']:false



  return(

/* 
 {  props.user!=false &&ongoingcount<1 ?  
 <> <Button variant="outline-dark"  size="sm"   onClick={() => ADDoption([true,'New'])} >New Analysis</Button> </>
  :false}

  {  userlist!=false &&ongoingcount<1 ?  
 <> <Button variant="outline-dark"  size="sm"   onClick={() => ADDoption([true,'New'])} >New Analysis</Button> </>
  :false}

   {  userlist!=false &&ongoingcount<1 ?  
 <> <Button variant="outline-dark"  size="sm"   onClick={() => ADDoption([true,'New'])} >New Analysis</Button> </>
  :false}

*/

 
<>
   {
   TodoList!=false && getexp!=false &&numexp!=false && filtergetexp.length>0 ? 
   <DatatableWrapper
   body={filtergetexp}
   headers={STORY_HEADERS_finish}
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

   <Col     className="d-flex flex-col justify-content-end align-items-center"    >
  
 {(public_ck == 'Public' && ongoingcount < 1 && props.user!=false) || (userlist != false && public_ck !== 'Public' && ongoingcount < 1) ?  
  <>  <Button variant="outline-dark" size="sm" onClick={() => ADDoption([true, 'New'])}>New Analysis</Button>  </>
  : false
}

  
   </Col> 
   </Row>
  
   <br/>
   
 </DatatableWrapper>: <>

 <Row className="mb-4 p-2">

<Col        className="d-flex flex-col justify-content-start align-items-center">
 
   </Col> 
<Col        className="d-flex flex-col justify-content-center align-items-center">

 
   </Col> 

   <Col     className="d-flex flex-col justify-content-end align-items-center"    >
  
{(public_ck == 'Public' && ongoingcount < 1 && props.user!=false) || (userlist != false && public_ck !== 'Public' && ongoingcount < 1) ?  
  <>  <Button variant="outline-dark" size="sm" onClick={() => ADDoption([true, 'New'])}>New Analysis</Button>  </>
  : false
}
   </Col> 
   </Row>


  
 
 </>


 }
  
   
 </>

    
    


)}




    return(<>

    <Container  id='wholeT' >
     
    {props.user!=false && getoption!='New' ? 

     <Row > 

     { props.EXPID!=false?    <Col lg={6} sm={6} class='Headerstyle'  style={{"display": "flex", "align-items":"center","padding":"5px"}}>
      
     <text style={{'font-weight':'bold', "font-size": "25px" }}> &nbsp;Analysis List&nbsp;   </text>      
  
  <a  onClick={() => setShow(true)} style={{ 'backgroundColor':'white','border':0,"font-size": "25px"}}>
    <BsQuestionLg id="btncircle"/> 
      </a> 
       </Col>

  :<Col lg={6} sm={6} class='Headerstyle'  style={{"display": "flex", "align-items":"center","padding":"5px"}}>
    
    <text style={{'font-weight':'bold', "font-size": "25px" }}> &nbsp;Analysis List&nbsp;   </text>      
  
  <a  onClick={() => setShow(true)} style={{ 'backgroundColor':'white','border':0,"font-size": "25px"}}>
    <BsQuestionLg id="btncircle"/> 
      </a> </Col> }


 <Col style={{"display": "flex","justify-content": "end","align-items":"center"}}>  

       </Col>
       </Row>
       :false}
       

   
       <Row > 
       <Col lg={12} sm={12}  md={12}  style={{"display": "flex", "justify-content": "center","align-items":"center"}}>
       {       (getshow&& getoption=='New'&&props.user != false)==true? <Example /> : false  }
</Col>
       
      
 
      
       </Row>
       {getshow== false?
       <div  id='SCAFFOLD'  >
  <Row >
 
  <Col   >
  <text style={{"font-size": "20px",'font-weight':'bold' }}>Experiment information</text>
  <Divider/>

 <CardExampleHeaderCard/>
 </Col>
 </Row>
 <Divider/>

 <Row>
  
 <Col   >

 <text style={{"font-size": "20px",'font-weight':'bold' }}>Finished Analysis</text>
<br/>
<CardExampleHeaderCard22/></Col>
 </Row>

 <Divider/>
{// userlist!=false? 
 <Row> 
 <Col   >

 <text style={{"font-size": "20px",'font-weight':'bold' }}>Ongoing Analysis</text>
<br/>
<CardExampleHeaderCard2/> </Col>
 </Row>
//:false
}
 </div>
 :false}
 </Container>
 <Modal
 show={show}
 onHide={() => setShow(false)}
         dialogClassName="modal-90w"
         aria-labelledby="example-custom-modal-styling-title"
       >
         <Modal.Header closeButton>
           <Modal.Title id="example-custom-modal-styling-title">
           Analysis management
           </Modal.Title>
         </Modal.Header>
         <Modal.Body>
         <p>
You can analyze "experiments".</p> 
  
       <p>You can add "analysis" to the selected experiment by selecting New Analysis.</p> 

      <p>
For example, if you want to analyze experiment "B", you add Analysis information on this page. </p>
      <p>An Analysis name of B_1 is given, and you can select this analysis to check the results.  </p>
      <p>Afterwards, the researcher can access and check the results of B_1 Analysis. </p>
      <p>After checking up to "network", it will be added to "Finished Analysis" when completed.</p>
      <p>The same "B" experiment can be further analyzed.  </p>
      <p>You can do "analysis" written as B_2. </p>      
<p>"Experiment" can be switched from Private to Public. Other researchers can analyze this experiment.</p>
     
       
       
         </Modal.Body>
       </Modal>
      

      
 
       

    </>
      )

}
export default Scaffold3_1;

