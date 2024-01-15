import React,{useState, useEffect,useMemo,Suspense} from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router'
//import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';  // DatePicker 라는 컴포넌트도 가져오깅
import "react-datepicker/dist/react-datepicker.css"; 
import { Alert } from 'reactstrap';
import { BsQuestionLg } from 'react-icons/bs';

import {InputGroup, Container,Col,Row,Image,Modal,Button,Form,Card} from 'react-bootstrap';
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
//import Loader from './Loader/Loader';
import * as Loader from "react-loader-spinner";

import { Dropdown, Grid,Divider} from 'semantic-ui-react'

 
function Scaffold3_2(props){
  const history = useNavigate()
  const [getRefresh,setRefrash]=useState(false)
  const [loading, setLoading] = useState(null)

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [getexp,setexpwhole]=useState(false)
const [TodoList,setTodoList]=useState(false)
const [numbervalue,setnumbervalue]=useState(1)
const [compid,setcompid]=useState(false)
const [getarrayvalue,setarrayvalue]=useState(false)
const [getthrowValue,setthrowValue]=useState(false)
const [getalert,setalert]=useState(false)
const [Progress,setProgress]= useState(false);
const [getstate,setstate]= useState(false);

const uploadModule =async (e) =>{
    e.preventDefault();
    
//    console.log(e.target[0].value)
    if(e.target[0].value>3)
    {
      window.alert('Please write 3 or less' )
    }
    else{
      setnumbervalue(e.target[0].value)


    }


 setarrayvalue(false)

}
//props.getEXPID(props.EXPID) 
/*
function updateProgress (progressUrl) {
  fetch(progressUrl[0]).then(function(response) {
      response.json().then(function(data) {
          // update the appropriate UI components
          setProgress([data.state, data.details]);

          if(data.state=='PENDING'){ 
            if (window.confirm('You have to go to the previous page because of a problem.'))
              {
                history(-1)
              }
              else
              {
                  // They clicked no
              }

          }
          else if (data.state!='PENDING' &&data.state!='SUCCESS'){setTimeout(updateProgress, 100, progressUrl);}
          else if(data.state=='SUCCESS'){
return       setTimeout(function() {

  setLoading(false);
  props.getSID(progressUrl[1])
 }, 2500);   


// setShow_project(false) ,setRefrash(false);
}
else{ 
  if (window.confirm('You have to go to the previous page because of a problem.'))
    {
      history(-1)
    }
    else
    {
        // They clicked no
    }

}
          //
      });
  });
}

*/


const throwValue =async (e) =>{
 
  setstate(false)
  setLoading(true)
 const filteritem= e[3].split(';')[1]=='NA.omit'? '3333': e[3].split(';')[1]=='ALL23'? '2323':'23na'
const proj_info=e[0]
const username=e[4]
const indexinfo=e[2]
const projidtitle=e[1]

const getcondition=e[5]
const Software=e[6]

const form_data = new FormData();
form_data.append('filteritem',filteritem);
form_data.append('username', username);
form_data.append('proj_info', proj_info)
form_data.append('indexinfo', indexinfo);
form_data.append('projidtitle',projidtitle)
form_data.append('Software',Software)
fetch("http://127.0.0.1:5506/api/getcompareinfo/", {
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
.then((response) =>  
 
{
  if (window.confirm('fin'))
  {
    
    props.getEXPID([props.EXPID,[projidtitle]]) 




    
    
  }
  else
  {
    props.getEXPID([props.EXPID,[projidtitle]]) 
  }
 
 /* 
  const url=`http://127.0.0.1:5506/api/${response[0]}/`
const analyinfo2=projidtitle+proj_info+indexinfo+filteritem
const awsom= [url,[analyinfo2,proj_info,getcondition,url]]
  updateProgress(awsom)
*/
}

// 
)
.catch(error => {
 console.log(error)
})



}


const uploadModule2 =async (e) =>{
  e.preventDefault();
//  console.log(e)
  const tosvalues357=document.querySelectorAll('.condition')
  
const includesa =TodoList[0].whole.split(',')

const toss2 = Array.from(tosvalues357)

const tos2Array = Array.from(new Set(
  toss2.map((a,i)=> { 
return a.id.split('condition')[0]
})))


const arrayvalue=tos2Array.map((item,index)=>{
  const findlabel=toss2.filter(n=>n.id.includes(item)).filter(n=>n.id.includes('condition1')).map((a,i)=>{
    return a.children
  })
  const arraylabel=Array.from(findlabel[0])

  const findlabel2=toss2.filter(n=>n.id.includes(item)).filter(n=>n.id.includes('condition2')).map((a,i)=>{
    return a.children
  })
  const arraylabel2=Array.from(findlabel2[0])
  
  const arraytoscondition1= arraylabel.filter(n=>n.className.includes('label')).map((it,i)=>{
  
    return it.text//.split(' ').join(' ')
  })
  
  
  
  const arraytoscondition2=arraylabel2.filter(n=>n.className.includes('label')).map((it,i)=>{
  
    return it.text//.split(' ').join(' ')
  })
return  [arraytoscondition1,arraytoscondition2]
})
setarrayvalue(arrayvalue)
const getindex= tos2Array.map((item,index)=>{
const findlabel=toss2.filter(n=>n.id.includes(item)).filter(n=>n.id.includes('condition1')).map((a,i)=>{
  return a.children
})

const arraylabel=Array.from(findlabel[0])
const findlabel2=toss2.filter(n=>n.id.includes(item)).filter(n=>n.id.includes('condition2')).map((a,i)=>{
  return a.children
})
const arraylabel2=Array.from(findlabel2[0])

const arraytoscondition1= arraylabel.filter(n=>n.className.includes('label')).map((it,i)=>{

  return it.text.split(' ').join('.')
})



const arraytoscondition2=arraylabel2.filter(n=>n.className.includes('label')).map((it,i)=>{

  return it.text.split(' ').join('.')
  })


  const comp1conditionrep123=  arraytoscondition1.map((condition,i)=>{
    const splcondition= condition.split(',')
    const parse=splcondition.map((conspl,i)=>
    { return includesa.filter(n=>n.includes(conspl)) }
    )
      return parse
  
  })
  
    const comp1index=  comp1conditionrep123.map((data) =>{
    const parsevalue = data.length>1? data.map((value, index) => {
      return value.map((childvalue,i)=>{
        return        includesa.indexOf(childvalue)
      })
    }):data[0].map((value, index) => {
      return includesa.indexOf(value)
    })
    return  parsevalue
    }
    )
    const comp2conditionrep123=  arraytoscondition2.map((condition,i)=>{
      const splcondition= condition.split(',')
      const parse=splcondition.map((conspl,i)=>
      { return includesa.filter(n=>n.includes(conspl)) }
      )
        return parse
      
      })
      
    const comp2index=  
    comp2conditionrep123.map((data) =>{
      const parsevalue = data.length>1? data.map((value, index) => {
        return value.map((childvalue,i)=>{
          return        includesa.indexOf(childvalue)
        })
      }):data[0].map((value, index) => {
        return includesa.indexOf(value)
      })
    return  parsevalue
      }
      )
      return      [comp1index,comp2index]

})

const stringindex=getindex.map((item2,i)=>{
  return item2.map((a,j)=>{
    return 'Exp'+String(i)+String(j)+';'+a.join(':')
  })
})

/*

const test=stringindex.map((a,i)=>
{const com1= a[0].split(';')[1].split(':').length
  const com2=a[1].split(';')[1].split(':').length

  
  return  [com1,com2]






})

*/

const alertck=arrayvalue.map((a,i)=>{ const com1 = a[0].length
  const com2 = a[1].length
  return [com1,com2]})

setstate(true)
setalert(  alertck.join(';')) //test.join(';')
//.includes('0')
setthrowValue([TodoList[0].Analysisinfo,TodoList[0].projecttitle,stringindex,TodoList[0].LabelMethod+';'+TodoList[0].FilterMethod, props.user,tosvalues357,TodoList[0].Software]
)

/*

//a.Analysisinfo==proj_info
//a.projecttitle ==projidtitle

//
//a.LabelMethod+';'+a.FilterMethod ==filteritem
//stringindex ==indexinfo
*/
}

  useEffect(()=>{
    props.user != false
    
    ?(
      
  fetch('http://127.0.0.1:5506/api/Ainfolist/')
  .then((res)=>res.json())
  .then((posts)=>{
      const getAinfo=posts.filter(id=>(id.projecttitle==props.ProjectID) && (id.Analysisinfo==props.AID) && (id.username==props.user))

const tcard=    getAinfo.map((a,i)=>
                 ({
            value: i, Analysisinfo: a.Analysisinfo ,AnalysisinfoTXT:a.AnalysisinfoTXT,FilterMethod:a.FilterMethod,LabelMethod:a.LabelMethod
            ,compare:a.compare,proj:a.proj,whole:a.whole,projecttitle:a.projecttitle,NormMethod:a.NormMethod, Software:a.Software,  ImputeMethod:a.ImputeMethod
          })
    
    )
    
    setTodoList(tcard)
    tcard.map((a)=>{
        const compid2= a.compare.split(',').map((item,index)=>{

        const outertext=item.split('.').join(' ')
            return ({key:item,text:outertext,value:item})
            
            })
            setcompid(compid2)
    })
        
  })



        )
    :setTodoList(false)
 
},[props.user])

//   value: i, Analysisinfo: a.Analysisinfo ,AnalysisinfoTXT:a.AnalysisinfoTXT,FilterMethod:a.FilterMethod,LabelMethod:a.LabelMethod
//,compare:a.compare,proj:a.proj,whole:a.whole
const CardExampleHeaderCard = () => {
    return(
      <div>
  
  
 {TodoList!=false?
 TodoList.map((a,i)=>{
     const comparevalue=a.compare.split(',')

  
     return (<>
<Card border="gray" style={{ width: '25rem' }}>
  <Card.Header >

  <Card.Title as="h5"><p>{' '}{a.Analysisinfo}{' '}  </p> </Card.Title>
  <footer className="blockquote-footer"> 
  Analysis information: <cite title="Source Title">{a.AnalysisinfoTXT}</cite>

  </footer>
  </Card.Header>
  <Card.Body>
  <Card.Subtitle className="mb-2 text-muted">Your experiment's condition</Card.Subtitle>


{comparevalue.map((a,i)=>{
    return (<>
    
    <Card.Text style={{ 'margin-left': '3%' }}>
    <p>
        {' '}
       {a.split('.').join(' ')}{' '}
      </p>    </Card.Text>

    
    
    </>)
})}
     <footer className="blockquote-footer"  style={{ 'margin-left': '3%' }}> 

        
Experiment Options <cite title="Source Title">{a.LabelMethod+';'+a.FilterMethod }</cite>
      </footer>
   
  
      <a  onClick={() => setShow2(true)} style={{ 'backgroundColor':'white','border':0}}>
    <BsQuestionLg id="btncircle"/> 
      </a> 
    
  <Form onSubmit={uploadModule }  >
 <Form.Group className="mb-3" controlId="formBasicPassword" style={{width: '80%'}}>
    <Form.Label>Number of Compare Group</Form.Label>
    <Form.Control  placeholder={numbervalue} defaultValue={numbervalue}/>
   
  </Form.Group>
    
    <Button type="submit" variant="outline-secondary" style={{width: '50%'}}>Apply</Button>

  </Form>
   
  </Card.Body>
  
</Card> 

<br/>
</>) }):false}
    </div>
  
  )}


  

/**/

  const Dropdownbb = (props) => {
    const list2= props.list223
    const listind=props.ind
  const [test,settest]=useState(list2)
  const testfilters = list2.filter((n) => [].includes(n.value) != true);
  const [test2, settest2] = useState(testfilters);
  
  const [aaa,setaaa]= useState([])
  const [bbb,setbbb]= useState([])
  
  
  const compcondition1 = (e, value) => {
    setaaa(value.value);
    const filter1 = list2.filter(
      (n) => value.value.includes(n.value) != true
    );
    settest2(filter1);
  };
  
  const compcondition2 = (e, value) => {
    setbbb(value.value);
    const filter1 = list2.filter(
      (n) => value.value.includes(n.value) != true
    );
    settest(filter1);
  };
  
  

  
      return (<>
      <Container>
<Row>
  <Col className="d-flex flex-col justify-content-start align-items-center">
      <Dropdown style={{ width: '25rem' ,"word-break":"break-all"}}  id={'append'+String(listind)+'condition1'} className={'condition'}
              name="condition"
              fluid
              selection
              search={true}
              multiple={true}
              options={test}
              value={aaa}
              placeholder="Condition1"
              onChange={(e, value) => compcondition1(e, value)} //input bar의 value가 바뀐다
              onSearchChange={null} //search value가 바뀐다.
              disabled={false}
              loading={false}
            />
            </Col>
          </Row>
          <br/>
          
          <Row>
          <Col className="d-flex flex-col justify-content-start align-items-center">
            <Dropdown style={{ width: '25rem' ,"word-break":"break-all"}}  id={'append'+String(listind)+'condition2'} className={'condition'}
              name="condition"
              fluid
              selection
              search={true}
              multiple={true}
              options={test2}
              value={bbb}
              placeholder="Condition2"
              onChange={(e, value) => compcondition2(e, value)} //input bar의 value가 바뀐다
              onSearchChange={null} //search value가 바뀐다.
              disabled={false}
              loading={false}
            />
            </Col>
            </Row>
       
</Container>

         </>
      );
    };
   
    if (loading) return  (<>
      <Container id='wholeT' >        <Row></Row>

      
      <div  id='SCAFFOLD3'  >
      <Loader.Audio color="#00BFFF" height={600} width={600}/>
    
    </div>

    </Container>
      
    </>)
    //<Loader type="spin" color="RGB 값" message={loading} />


    return(<>
     <Suspense fallback={<h1>Loading posts...</h1>}>

    <Container id='wholeT' >
   
 
     <Row > 
     <Col lg={6} sm={6} class='Headerstyle'  style={{"display": "flex", "align-items":"center",'padding':'5px'}}>

     <text style={{'font-weight':'bold', "font-size": "25px" }}>  &nbsp;Analysis(select) management&nbsp;   </text>      
  
  

     </Col>


       </Row>
       
     <div  id='SCAFFOLD'  >

   
  <Row >
  
  <Col lg={6} sm={6} style={{'display':'flex','justify-content':'center'}} > {props.AID!=false? <CardExampleHeaderCard/>:false}</Col>


  <Col  lg=      {6} sm=      {6} style={{textAlign: "left" }}>
     
    
   
     <Form onSubmit={uploadModule2 } >
   {TodoList!=false && compid!=false? [...(new Array(parseInt(numbervalue)))].map((a,i)=>{
        
       return(<>
   
   
       <Grid>
   <Grid.Column style={{ width: '6.5rem' }}>
   <div style={{'margin-top':'2.5rem'}}><img src="https://www.freeiconspng.com/uploads/compare-icon-0.png" width="40" alt="Compare Icon Download" />
   <p>Compare{i+1}</p>
   </div>  
   
   
   
                  </Grid.Column>
        
                 
         <Grid.Column style={{ width: '26rem' }}>
         <br/>
         <Dropdownbb list223={compid} ind={i}/> 
        
         </Grid.Column>
        
   
   
         <Grid.Row>
   
         <Grid.Column style={{ width: '15rem' }}>
   
         {i==([...(new Array(parseInt(numbervalue)))].length - 1) ?<Button variant="outline-secondary"  type="submit">
      Get significant
   </Button>  :false }
   </Grid.Column>
   
         </Grid.Row>
   
         <Grid.Row>
               <Grid.Column style={{ width: '35rem',"margin-left":'1em' }}>
           
   
   <br/>
   {getstate!=false&& getarrayvalue!=false && getalert.includes('0')==false? 
   <text style={{"word-break":"break-all",width: '15rem','font-weight':'bold'}}>{'Compare '+ getarrayvalue[i][0] +' With '} </text> 
   
   :false}
   
   {getstate!=false&& getarrayvalue!=false && getalert.includes('0')==false? 
   <text style={{"word-break":"break-all",width: '15rem' ,'font-weight':'bold' }}>{' '+ getarrayvalue[i][1] +' '} </text> 
   
   :false}
   {getstate!=false&& i==0 && getalert!=false && getalert.includes('0') !=false ? 
   
   < Alert color="secondary"> 
   you select any 'Condition'  </Alert> :false }
   <br/>
   
   {getstate!=false&& getarrayvalue!=false && getalert.includes('0')==false && i==parseInt(numbervalue)-1? 
   <p>{'go Analysis?'}
   <br/> <Button variant="link" onClick={(e)=> throwValue(getthrowValue)}>yes</Button></p> 
   
   :false}
   
         
         </Grid.Column>
         </Grid.Row>
         </Grid>
      
       </>)
   }) :false}
     
       
   </Form>
   
        </Col>


</Row>

<Divider/>



     </div>

  

 </Container>
 
       <Modal
 show={show2}
 onHide={() => setShow2(false)}
         dialogClassName="modal-90w"
         aria-labelledby="example-custom-modal-styling-title"
       >
         <Modal.Header closeButton>
           <Modal.Title id="example-custom-modal-styling-title">
           Number of Compare Group
           </Modal.Title>
         </Modal.Header>
         <Modal.Body>
    
       <p>This is the place to select the CONDITION to be compared and analyzed when comparing and analyzing by selecting the loaded "experiment".  </p> 
       <p>Write down the number of comparisons (default 1) in "Number of Compare Group" and press the Apply button at the bottom to display DROPDOWN.</p> 
       
       <p>If there are multiple experimental groups depending on the design of the proteome experiment, analyze by applying 2 or 3 compare groups. </p>
       <p>


       In the TMT proteome experiment design, if there are multiple controls, classify them into condition1 (control group) and condition2 (experimental group) through multi-selecting and analyze them.


       </p>
       
       
       <p>
Select a condition and press the "Get significant" button to proceed with the analysis.</p> 
     
  
         </Modal.Body>
       </Modal>

      
 
       </Suspense>


    </>
      )

}
export default Scaffold3_2;




/*<Modal
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
         <p> 단백실의 분석을 관리하는 곳입니다.</p> 
         <p>우선, 로그인이 필요합니다!</p> 
       <p> <a href='/Twostep'> Experiment Management</a> page의 New 버튼을 통해 experiment를 업로드해주세요.</p> 
      
       <p>이 페이지는 업로드한 "실험"을 선택해서 비교, 분석할때 비교 분석할 CONDITION을 선택하는 곳입니다.   </p> 
       <p>Number of Compare Group에 비교 갯수(기본값1)를 적고 밑의 APPLY버튼을 누르면 CONDITION을 선택하는 DROPDOWN이 나타납니다.</p> 
       <p>DROPDOWN에 비교 요소들 넣고, SUBMIT 버튼을 누르면 분석을 진행합니다.</p> 
     
       
       
         </Modal.Body>
       </Modal>
*/