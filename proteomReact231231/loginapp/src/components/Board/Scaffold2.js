import React,{useState, useEffect,useMemo,Suspense,useCallback,useRef} from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router'
//import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';  // DatePicker 라는 컴포넌트도 가져오깅
import "react-datepicker/dist/react-datepicker.css"; 
import { BsQuestionLg,BsPlusLg } from 'react-icons/bs';
import {Segment,Divider ,Dropdown ,Grid,Message,Header,Icon,Input}  from 'semantic-ui-react';
import $ from 'jquery';

import { AiOutlineSetting } from 'react-icons/ai';
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

function Scaffold2(props){
  const history = useNavigate()
    const [show, setShow] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);
    const [Project, setProject] = useState([]);
    const [Experiments, setExperiments] = useState([]);
    const [user, setuser] = useState([]);
    const [getshow, setShow_project] = useState(false);
    //getshow
    //getshow2
    const [getshow2, setShow_project2] = useState(false);
    const [whole, setwhole] = useState([]);
    const [TodoList, setTodoList] = useState(false);
    const [getTable, setTable] = useState(false);
    const [getoption,setoption]=useState(false)
    const [getoption2,setoption2]=useState(false)
    const [editattr,setattr]=useState(false)
    const [getRefresh,setRefrash]=useState(false)

    const [getexp,setexpwhole]=useState(false)
    const [userlist,setuserlist]=useState(false)
    const [userlist2,setuserlist2]=useState(false)
//    const [userck,setuserck]=useState(false)
//    const [show2, setShow2] = useState(false);
    const [projname,setprojname]= useState("Project Name");
    const [projdes,setprojdes]= useState("Project Description");
    const ref1 = useRef(null);
      const ref2 = useRef(null);
    //setprojname()    <Form.Control placeholder={'Project Name'} value={projname} onChange={onChange}/>


    const TextInput = useCallback(({ ref, text, onChange,ph }) => {
      return <Form.Control placeholder={ph} ref={ref} defaultValue={text} onChange={onChange} />;
    }, []);

  


    
    const TFck = (text) => {
     
      
    const set_userlist=  Array.from(new Set((text[0]+','+text[1]).split(',')))
     
      
    return set_userlist
    }
    


    useMemo(() => {
      props.user != false
      
      ?(
          fetch('http://127.0.0.1:5506/api/projectlist/')
          .then((res)=>res.json())
          .then((posts)=>{
            const explistfiluser=posts.filter(id=>TFck([id.username,id.userlist] ).includes(props.user))
            const projlistfiluser= explistfiluser.map( (a,i)=>({//posts였음
              value: i, text: a.projectname ,startdate:a.startdate,enddate:a.enddate,description:a.description
      ,username:a.username,userlist:a.userlist
            }))

            projlistfiluser.sort((a, b) => parseInt([b.startdate.split('/')[2],b.startdate.split('/')[0],b.startdate.split('/')[1]].join('')) - parseInt([a.startdate.split('/')[2],a.startdate.split('/')[0],a.startdate.split('/')[1]].join('')));

            const tosTable= projlistfiluser.map((a,i)=>{

              return      {"id":(i+1),"text":a.text,'username':a.username,'startdate':a.startdate,'enddate':a.enddate,'NumberofExperiment':a.text,'Adduser':[a.userlist,a.text,a.username],'Experimentmanage':'select'}
            })
        
//console.log(tosTable)
                  setTable(tosTable)

            setwhole(explistfiluser)
              setTodoList(projlistfiluser)
              setRefrash(true)  
          })
           

          
          )
      :setTodoList(false)
      setwhole(false)
      setTable(false)
      setRefrash(true)  
    }, [getRefresh])
    useMemo(() => {
      props.user != false
      ?(
      
        fetch('http://127.0.0.1:5506/api/uplist/')
        .then((res)=>res.json())
        .then((posts)=>{
          const explistfiluser=posts//.results
//         console.log(explistfiluser)
          setexpwhole(explistfiluser)
          setRefrash(true)  
        })
      
      
      
              )
          :setexpwhole(false)
          setRefrash(true)  
      
    }, [getRefresh])


    useEffect(()=>{
      props.user != false
      
      ?(
          fetch('http://127.0.0.1:5506/api/projectlist/')
          .then((res)=>res.json())
          .then((posts)=>{
            const explistfiluser=posts.filter(id=>TFck([id.username,id.userlist] ).includes(props.user))
            const projlistfiluser= explistfiluser.map( (a,i)=>({//posts 였음
              value: (i+1), text: a.projectname ,startdate:a.startdate,enddate:a.enddate,description:a.description
      ,username:a.username,userlist:a.userlist
            }))
            setwhole(explistfiluser)
              setTodoList(projlistfiluser)

              projlistfiluser.sort((a, b) => parseInt([b.startdate.split('/')[2],b.startdate.split('/')[0],b.startdate.split('/')[1]].join('')) - parseInt([a.startdate.split('/')[2],a.startdate.split('/')[0],a.startdate.split('/')[1]].join('')));

              const tosTable= projlistfiluser.map((a,i)=>{

                return      {"id":(i+1),"text":a.text,'username':a.username,'startdate':a.startdate,'enddate':a.enddate,'NumberofExperiment':a.text,'Adduser':[a.userlist,a.text,a.username],'Experimentmanage':'select'}
                    })
                    tosTable.sort((a, b) => parseInt([b.startdate.split('/')[2],b.startdate.split('/')[0],b.startdate.split('/')[1]].join('')) - parseInt([a.startdate.split('/')[2],a.startdate.split('/')[0],a.startdate.split('/')[1]].join('')));

//console.log(tosTable)
                    setTable(tosTable)
              
          })
           

          
          )
      :setTodoList(false)
      setwhole(false)
      setTable(false)
  },[props.user])

  
  useEffect(()=>{
    props.user != false
    
    ?(
      
  fetch('http://127.0.0.1:5506/api/uplist/')
  .then((res)=>res.json())
  .then((posts)=>{
    const explistfiluser=posts//.results
//   console.log(explistfiluser)
    setexpwhole(explistfiluser)
    
  })



        )
    :setexpwhole(false)
 
},[props.user])


useEffect(()=>{
  props.user != false
  
  ?(
    
fetch('http://127.0.0.1:5506/user/userlist/')
.then((res)=>res.json())
.then((posts)=>{
  const explistfiluser=posts.map((a,i)=>{

    return     a.username})
  setuserlist(explistfiluser)
  
})



      )
  :setuserlist(false)

},[props.user])


  const [startDate,setStartDate]=useState(new Date());
  const [endDate,setendDate]=useState(new Date());
  
  const onDatefunction = (e) => {

    setStartDate(e)
if(document.getElementById('ProjectID').placeholder!='Project Name'  ){
  setprojname(  document.getElementById('ProjectID').placeholder)

 }
 else if(document.getElementById('ProjectID').placeholder=='Project Name')
 {

  setprojname(  document.getElementById('ProjectID').value)

 }

//     ProjectID
 if(document.getElementById('Textarea2').placeholder!="Project Description" ){
  setprojdes(  document.getElementById('Textarea2').placeholder)

 }
 else if(document.getElementById('Textarea2').placeholder=="Project Description")
 {

  setprojdes(  document.getElementById('Textarea2').value)

 }

 

  }
  const onDatefunction2 = (e) => {
    
    setendDate(e)

    setprojname(  document.getElementById('ProjectID').value)

    setprojdes(  document.getElementById('Textarea2').value)

    
    
    
    
    }


    useEffect(()=>{
      
if( document.querySelector("#ProjectID")!=null){
   document.querySelector("#ProjectID").value=projname
}
if( document.querySelector("#Textarea2")!=null){
   document.querySelector("#Textarea2").value=projdes
}
      //!=null&&projname!="Project Name"?
      //document.querySelector("#ProjectID").value=projname:false
      //document.querySelector("#Textarea2")!=null?
    //  document.querySelector("#Textarea2").value=projdes:false

    },[startDate])

      
       

    useEffect(()=>{
      if( document.querySelector("#ProjectID")!=null){
         document.querySelector("#ProjectID").value=projname
      }
      if( document.querySelector("#Textarea2")!=null){
         document.querySelector("#Textarea2").value=projdes
      }
    },[endDate])
        
  const uploadModule =async (e) =>{
    e.preventDefault();


    const tablelist=TodoList
    const value=tablelist.map((a,i)=>{
     

      return     [a.text,a.username]}  )
const projtf=value.filter(id=>id[0]==e.target[0].value).length>0

if(projtf==true){
  if (window.confirm('projectname이 이미있습니다. 다른 이름을 사용해주세요'))
  {
    
   




    
    
  }
  else
  {
   
  }



}
else
{

  const projectname =e.target[0].value
  const startdate = e.target[1].value
  const enddate = e.target[2].value
const description=e.target[3].value==null?'':e.target[3].value
if(projectname==null){
  window.alert("You must write project name");


 }
 
const userlist33 =''
const formData = new FormData();
formData.append("projectname",projectname); 
formData.append("startdate",startdate);  
formData.append("enddate",enddate);
formData.append("description",description);
formData.append("username",props.user)  
formData.append("enctype","multipart/form-data")

fetch("http://127.0.0.1:5506/api/projectlist/", {  
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
.then(response => {
  setRefrash(false)
  
setShow_project(false)
setoption(false)



})
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
//<Card.Link href="#">Card Link</Card.Link>
//<Card.Link href="#">Another Link</Card.Link>
//href="/Twostep"
/*
const addusers = (text) => {
  setRefrash(false)

  setShow2(true)
  

  
const set_userlistjoin=  Array.from(new Set((props.user+','+text[0]).split(',')))

const set_userlist=  set_userlistjoin.join()
  
userlist!=false? setuserlist2( userlist.filter(id=> set_userlistjoin.includes(id)!=true )) : setuserlist2(false)


setuserck(set_userlist)
setprojname(text[1])
setadname(text[2])

}*/ 




const uploadModule2 =async (e) =>{

  
  e.preventDefault();
  const tosvalues357=document.querySelectorAll('.condition3')
 
  const toss2 = Array.from(tosvalues357)
  
  const tos2Array = Array.from(new Set(
    toss2.map((a,i)=> { 
  return a.id.split('condition')[0]
  })))
  
  const arrayvalue=tos2Array.map((item,index)=>{
    const findlabel=toss2.filter(n=>n.id.includes(item)).filter(n=>n.id.includes('condition11')).map((a,i)=>{
      return a.children
    })
    const arraylabel=Array.from(findlabel[0])
    
  
    const arraytoscondition1= arraylabel.filter(n=>n.className.includes('label')).map((it,i)=>{
    
      return it.text
    })
    
return  arraytoscondition1
})

 //userlist


  
const form_data = new FormData();
form_data.append('projectname',Project);
form_data.append('userlist', arrayvalue.join())
form_data.append('username', props.user)
form_data.append('description',e.target[1].value)
fetch("http://127.0.0.1:5506/api/adduser/", {
    method : 'POST',
    headers: {
        Authorization : `JWT ${localStorage.getItem('token')}`,
    },
    body : form_data
})
.then((res) => {
  if (!res.ok) {
    throw Error("400/500 error");
    
  }
  return res.json();

})
.then(response => {
  
  if (window.confirm('Successful joining/changing!'))
  {
    
//    const set_userlist=  Array.from(new Set((props.user+','+response).split(','))).join()
  //setuserck(set_userlist)
  setRefrash(false)
  setShow_project2(false)
  setoption2(false)
  setattr(false)
    
    
  }
  else
  {   //const set_userlist=  Array.from(new Set((props.user+','+response).split(','))).join()
//  setuserck(set_userlist)
if(getshow==true|getshow2==true){

}
else{
  setRefrash(true)
  setRefrash(false)
}
setShow_project2(false)
setoption2(false)
setattr(false)
  

  }

})
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














const CardExampleHeaderCard = () => {



  const STORY_HEADERS = getexp!=false ? 
   [{
    prop: "id",
    title: "id",
   
    isSortable: true,
    
  },

    {
      prop: "text",
      title: "Project Name",
      isFilterable: true
      
    },
   
    {
      prop: "username",
      title: "Administer",
      isFilterable: true
    },
    {
      prop: "startdate",
      title: "startdate",
      isSortable: true,

    },
    
    {
      prop: "enddate",
      title: "enddate"
      ,    isSortable: true
,
    }, {
      prop: "Experimentslist",
      title: "Experiments list"
      ,
      cell:row=>(        
       <a   onClick={() => [setShow4(true),setProject(row.text),setExperiments(getexp.filter(id=>id.projecttitle== row.text).filter(id=>([id.username+','+id.userlist]).join().split(',').indexOf(props.user)!=-1).map(obj=>{return obj.description }).join())]}   > {"There are " + getexp.filter(id=>id.projecttitle== row.text).filter(id=>([id.username+','+id.userlist]).join().split(',').indexOf(props.user)!=-1).map(obj=>{return obj.description }).length  + " experiments"} </a>

      
       // String( getexp.filter(id=>id.projecttitle== row.text).length)   
             )
    }
    ,{
      prop: "Adduser",
      title: "user list",
      cell: row => (
        
       <a   onClick={() => [setShow3(true),setProject(row.text),setuser(row.Adduser[0])]}   > {row.Adduser[0]}</a>

        //setProject
       /*<a href={row.Analysis} target="_blank">
          
        </a>
  
       <a style={{textAlign:"left","display": "flex"}} onClick={(e)=> addusers(row.Adduser)}>
        
        <text>ADD user</text></a> */ 
        
      )
    
    }
    ,{
      prop: "Experimentmanage",
      title: "Experiment manage",
      cell: row => (
  
  
       /*<a href={row.Analysis} target="_blank">
          http://127.0.0.1:5506/user/
          
        </a>*/ 
  
       <a style={{textAlign:"left","display": "flex"}} onClick={(e)=> props.getProjectID([row.text,[row.Adduser[0],row.Adduser[2]].join(),[false,false]])}>
       
       <text>select this project</text> </a>
        
      )
    
    }
    ,
    {
      prop: "Settings",
      title: "Settings",
      cell: row => (
        
  
       /*<a href={row.Analysis} target="_blank">
          http://127.0.0.1:5506/user/
          
        </a>*/ 
  
       <a onClick={() => [ADDoption2([true,'Setting',row.text]),setProject(row.text),setExperiments(getexp.filter(id=>id.projecttitle== row.text).map(obj=>{return obj.description }).join())]} style={{"border": 0}} >
       
       <AiOutlineSetting/></a>
        
      )
    
    }
    
  ]: 

  [{
    prop: "id",
    title: "id",
   
    isSortable: true,
    
  },

    {
      prop: "text",
      title: "Project Name",
      isFilterable: true
      
    },
   
    {
      prop: "username",
      title: "Administer",
      isFilterable: true
    },
    {
      prop: "startdate",
      title: "startdate",
      isSortable: true,

    },
    
    {
      prop: "enddate",
      title: "enddate"
      ,    isSortable: true
,
    }, {
      prop: "Experimentslist",
      title: "Experiments list"
      ,
      cell:row=>(        
       <text > 
       There is not. </text>

      
       // String( getexp.filter(id=>id.projecttitle== row.text).length)   
             )
    }
    ,{
      prop: "Adduser",
      title: "user list",
      cell: row => (
        
       <a   onClick={() => [setShow3(true),setProject(row.text),setuser(row.Adduser[0])]}   > {row.Adduser[0]}</a>

        //setProject
       /*<a href={row.Analysis} target="_blank">
          
        </a>
  
       <a style={{textAlign:"left","display": "flex"}} onClick={(e)=> addusers(row.Adduser)}>
        
        <text>ADD user</text></a> */ 
        
      )
    
    }
    ,{
      prop: "Experimentmanage",
      title: "Experiment manage",
      cell: row => (
  
  
       /*<a href={row.Analysis} target="_blank">
          http://127.0.0.1:5506/user/
          
        </a>*/ 
  
       <a style={{textAlign:"left","display": "flex"}} onClick={(e)=> props.getProjectID([row.text,[row.Adduser[0],row.Adduser[2]].join(),[false,false]])}>
       
       <text>select this project</text> </a>
        
      )
    
    }
    ,
    {
      prop: "Settings",
      title: "Settings",
      cell: row => (
        
  
       /*<a href={row.Analysis} target="_blank">
          http://127.0.0.1:5506/user/
          
        </a>*/ 
  
       <a onClick={() => [ADDoption2([true,'Setting',row.text]),setProject(row.text),setExperiments('There is not.')]} style={{"border": 0}} >
       
       <AiOutlineSetting/></a>
        
      )
    
    }
    
  ]




  return(
    <div>




  
<>
   {
   TodoList!=false && getTable!=false ? //&&getexp !=false
   <DatatableWrapper 

   
   body={getTable}
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

   <Col     className="d-flex flex-col justify-content-end align-items-center"   >
   {props.user!=false && getoption!='New' &&getoption2!='Setting'? 


<Col style={{"display": "flex","justify-content": "end","align-items":"center"}}>  
<Button variant="outline-dark" size="sm"    onClick={() => ADDoption([true,'New'])} > NEW PROJECT</Button> 
 

   
      </Col>
      
  :false
      
      
      
}
   </Col> 
   </Row>
  

 </DatatableWrapper>:

props.user !=false? <>
 <text>There is no project. Select the 'NEW PROJECT' button to create a project.
</text>

{props.user!=false && getoption!='New' &&getoption2!='Setting'? 


<Col style={{"display": "flex","justify-content": "end","align-items":"center"}}>  
<Button variant="outline-dark" size="sm"    onClick={() => ADDoption([true,'New'])} > NEW PROJECT</Button> 
 

   
      </Col>
      
  :false
      
      
      
}
</>
: <text> Login is required.</text>


 }
  
   
 </>
    

  </div>

)}

const ADDoption = (e) =>{
  setShow_project(e[0])
  setoption(e[1])
  setprojname("Project Name")
  setprojdes("Project Description")
}
const ADDoption2 = (e) =>{
  setShow_project2(e[0])
  setoption2(e[1])
  setattr(e[2])
  setprojname("Project Name")
  setprojdes("Project Description")
}
//  placeholder={fc}/
/*
  <Form.Text className="text-muted">
      projectname
    </Form.Text>        
              <TextInput ref={ref1} text={proname} onChange={onChange} ph={'Project Name'} />

       <TextInput ref={ref2} text={prodes} onChange={onChange2} ph={'Project Description'} />

    */ 

  const Example =()=> {
    return(<>

<br/>
<br/>

<Card style={{ width: '48rem' }}>
  <Card.Body>
  <Form onSubmit={uploadModule } >
    <Card.Title>New project</Card.Title>
    <Card.Subtitle className="mb-2 text-muted"> 
    <Form.Group controlId="pn" className="mb-3"  style={{ width: '15rem' }}>
    <Form.Label>Project Name</Form.Label>
    
    <Form.Control id="ProjectID" placeholder={projname}   />
    
 
  </Form.Group>
    

    </Card.Subtitle>
    <Card.Text>
    Enter information that can describe the project (name, start date, end date, project purpose) and click the summit button.

    </Card.Text>

    
  <Form.Group className="mb-3" >
    <Form.Label>Start Date</Form.Label>
    

    <Form.Text className="text-muted">
     <DatePicker selected={startDate} onChange={date=>onDatefunction(date)}/>

    </Form.Text>
  </Form.Group>
  <Form.Group className="mb-3" >
    <Form.Label>End Date</Form.Label>
    <Form.Text className="text-muted">
    <DatePicker selected={endDate}  onChange={date=>onDatefunction2(date)}/>
    </Form.Text>
  </Form.Group>
  
  <Form.Group controlId="pd" className="mb-3" >
  <Form.Label>Project Description</Form.Label>
  <Form.Text className="text-muted"  name="profile">
 

  <Form.Control placeholder={projdes} id="Textarea2"  as="textarea" rows={5} />

    
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

</>
//        console.log(document.getElementById('formBasicPassword') )

//<Form.Check type="checkbox" label="Check me out" />
//&&TodoList!=false 설명#example
    )}
    const Example2 =()=> {
const getprojattr=TodoList.filter(id=>id.text==editattr).map(id=>
  {    return [id.startdate,id.enddate,id.description,id.userlist,id.username]})[0]
//      userlist

//getprojattr[0]
//getprojattr[1]


/*

  handleAddition = (e, { value }) => {
    this.setState((prevState) => ({
      options: [{ text: value, value }, ...prevState.options],
    }))
  }

  handleChange = (e, { value }) => this.setState({ currentValues: value })

  
  const mySpectialFunction = () => {
  	console.log('you clicked the button!');
  }

  const onClickHandler=(e) => {
  	mySpecialFunction();
  }

const [count,setCount] = useState(0);
  	const onClickHandler = e => {
    	setCount(count+1);
    }

  state = { options }

  handleAddition = (e, { value }) => {
    this.setState((prevState) => ({
      options: [{ text: value, value }, ...prevState.options],
    }))
  }

  handleChange = (e, { value }) => this.setState({ currentValues: value })

  render() {
    const { currentValues } = this.state

    return (
      <Dropdown
        options={this.state.options}
        placeholder='Choose Languages'
        search
        selection
        fluid
        multiple
        allowAdditions
        value={currentValues}
        onAddItem={this.handleAddition}
        onChange={this.handleChange}
      />
    )

*/



      const [ccc,setccc]= useState(getprojattr[3].split(',').map(id=>{return id}))
          const list22= getprojattr[3].split(',').map(id=>{return id}).map(id=>{return {key:id,text:id,value:id}})
//      const list22= userlist.filter(id=>id!=getprojattr[4]).map(id=>{return {key:id,text:id,value:id}})

//{ key:item , text:item,value:item}
      const [test11,settest11]=useState(list22)
      //filter.projectname==projectName
      const compcondition11 = (e, value) => {
         setccc(value.value);
     
      };

      
      const compcondition12 = (e, value) => {
       const id= value.value
       if(id==getprojattr[4]){
        window.alert("You cannot add yourself.");


       }
       else if(userlist.includes(id)!=true       ){
        window.alert("The added id is incorrect. Please check the id.");


       }
       else{

        const listfromaddid=        {key:id,text:id,value:id}
        const adddata=test11.concat(listfromaddid)
            settest11(adddata);
            
       }

      };


      return(<>

<br/>
<br/>

        <Card style={{ width: '48rem' }}>
          <Card.Body>
          <Form onSubmit={uploadModule2 } >
            <Card.Title>Edit project</Card.Title>
            <Card.Subtitle className="mb-2 text-muted"> 
             {'ProjectName:'+Project}
            
            </Card.Subtitle>
            <br/>
            <Card.Subtitle className="mb-2 text-muted"> 
Project User management
            </Card.Subtitle>
            <br/>
                        <Dropdown style={{ width: '25rem' }}  id={'append'+'condition11'} className={'condition3'}
  name="condition3"
  fluid
  selection
  search={true}
  multiple={true}
  options={test11}
  value={ccc}
  onChange={(e, value) => compcondition11(e, value)} //input bar의 value가 바뀐다
  onSearchChange={null} //search value가 바뀐다.
  disabled={false}
  loading={false}
  allowAdditions
  onAddItem={(e, value) => compcondition12(e, value)}
/>
           
<br/>
<Card.Subtitle className="mb-2 text-muted"> 
Period in {Project}
            </Card.Subtitle>
            <Card.Text>
            {getprojattr[0] +'~'+ getprojattr[1]}
            </Card.Text>
<br/>
<Card.Subtitle className="mb-2 text-muted"> 
Experiments in {Project}
            </Card.Subtitle>
            <Card.Text>
            {Experiments}
            </Card.Text>


 <Card.Text>Add Experiment?   </Card.Text>

<a style={{textAlign:"left","display": "flex"}} onClick={(e)=> props.getProjectID([Project,[getprojattr[3],getprojattr[4]].join(),[true,'New']])}>
<Card.Text>Upload link </Card.Text>
</a>

<br/>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
      
          <Card.Subtitle className="mb-2 text-muted"> 
          Project Description
            </Card.Subtitle>
          <Form.Text className="text-muted"  name="profile">
        
          <Form.Control placeholder={getprojattr[2]} as="textarea" rows={5} />
        
            
          </Form.Text>
        
          </Form.Group>
          <Button variant="secondary"  type="submit">
            Submit
          </Button>
           <Button  variant="light"  onClick={()=> ADDoption2([false,false,false])} >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
        </Button>
        </Form>
        
            
          </Card.Body>
        </Card>
        
        </>
      )}


//Page infomation TodoList!=false && getTable!=false &&getexp!=false&&
    return(<>


<Container   id='wholeT'>

<Row > 

{props.user!=false ? 

<Col lg={6} sm={6} class='Headerstyle'  style={{"display": "flex", "align-items":"center","padding":"5px"}}>
  <text style={{'font-weight':'bold', "font-size": "25px" }}> &nbsp; Project List &nbsp;   </text>      
  
  <a  onClick={() => setShow(true)} style={{ 'backgroundColor':'white','border':0,"font-size": "25px"}}>
    <BsQuestionLg id="btncircle"/> 
      </a> 

  </Col>

  :<Col lg={6} sm={6} class='Headerstyle'  style={{"display": "flex", "align-items":"center","padding":"5px"}}>
  <text style={{'font-weight':'bold', "font-size": "25px" }}> &nbsp; Project List &nbsp;   </text>      
  
   

  </Col>
      
      
      
    }



      
      
      </Row>

      
      <Row  > 
      <Col lg={12} sm={12}  md={12}  style={{"display": "flex", "justify-content": "center","align-items":"center"}}>      {       (getshow&& getoption=='New'&&props.user != false)==true  ?
      
      <Example/> : false  }
  {       (getshow2&& getoption2=='Setting'&&props.user != false)==true  ?
      
      <Example2/> : false  }
 </Col>
     
      

     
     
      </Row>

      {getshow== false && getshow2 ==false ? 

      <div id='SCAFFOLD'> 
 <Row >
  <Col>
 <text style={{"font-size": "20px" ,'font-weight':'bold' }}>Table</text>
<br/>
<CardExampleHeaderCard/>

</Col>
</Row>
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
            Project List Page 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p> Researchers can create "projects" to manage data according to research objectives.</p> 
        <p>You can add researchers to participate in the project.</p>
      <p>You can create a new project through the "New project" button.</p> 
      <p> Go to the page to manage the experiment through the 'select this project' button.</p> 
      <p> You can add researchers through the 'settings' button. </p> 

      
        </Modal.Body>
      </Modal>

  


      <Modal
show={show3}
onHide={() => setShow3(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
          Userlist in {Project} 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <text style={{'word-wrap':'break-word'}}>{user} </text> 

        
        </Modal.Body>
      </Modal>

      <Modal
show={show4}
onHide={() => setShow4(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Experiments in {Project} 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <text style={{'word-wrap':'break-word'}}>{Experiments} </text> 
      
      
        </Modal.Body>
      </Modal>


    </>


      )

}
export default Scaffold2;

    /*
<Modal
show={show2}
onHide={() => setShow2(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Join researcher (Administer: {adname} )
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>You can add researchers to participate in the project.</p> 
        
        <text style={{'font-weight':'bold'}} > joined </text> 

        {userck!=false ? 

 userck.replace(props.user+',','').split(',').map((a,i)=>{return (<><p/><text>{a}</text></>)}) 
      //  userlist
        :false  }
        <br/>
           <text style={{'font-weight':'bold'}}> Experiments can be added by researchers joining the project.</text>
 
     
        {userck!=false  && userlist!=false && adname==props.user &&setuserlist2!=false ?
         userlist2.map((a,i)=>{

return (<>
<p/><Button variant="link" style={{textAlign:"left"}}  onClick={(e)=>throwValue([a,projname])}>{a}</Button>
</>)

         }):false}
     
      
        </Modal.Body>
      </Modal>*/