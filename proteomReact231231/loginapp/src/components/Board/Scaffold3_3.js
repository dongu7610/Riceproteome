import React,{useState, useEffect,useMemo,Suspense} from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router'
//import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';  // DatePicker 라는 컴포넌트도 가져오깅
import "react-datepicker/dist/react-datepicker.css"; 
import { Alert } from 'reactstrap';
import $ from 'jquery';
import {InputGroup, Container,Col,Row,Image,Modal,Button,Card,Form} from 'react-bootstrap';
import Navigator from "../Modal/Navigator";
import { BsQuestionLg } from 'react-icons/bs';

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
import {Segment,Divider ,Dropdown ,Grid,Message,Header,Icon}  from 'semantic-ui-react';
import * as Loader from "react-loader-spinner";

//import Loader from './Loader/Loader';
import axios from "axios";
import Scharts from "../Sections/Scharts"
import Venndiagram from "../Sections/Venndiagram"
import jStat from "jstat";
import Chart from "react-google-charts";
import { CSVLink, CSVDownload } from "react-csv";
import Mplot from '../Sections/Mplot'
import Mplot2 from '../Sections/Mplot2'




function funcex2cel(outcomb,compareoriginparsedata,sampleheader_thr,wholedata_thr){

    const vennarea = outcomb.filter(n=>n.values.length>0)
    const logComwithpvalue=compareoriginparsedata
    const sampleheader=sampleheader_thr
  
    const wholedata=wholedata_thr
  
  const headers=  ['set','log2fc','minuslogpv'].concat(sampleheader[0])
  const csvheaders=headers.map(a=>({
    label:a,key:a
  })) 
  
  const concatcsvdata=[].concat.apply(
    [],vennarea.map((item,i)=>{
  
  const rows=[].concat.apply(
    [],item.values.map((mjprotein,ix)=>{
    
  const concatlog2fc=[].concat.apply(
                    [],logComwithpvalue.map(q=>{
  
      const log2fc=q.filter(n=>n!=undefined).filter((n,i)=>n[1]==mjprotein)
      
      
  const outlog2fc=log2fc.length>0? log2fc[0][0][0]:log2fc 
      return outlog2fc })
  )
  
  
  const concatlog2pv=[].concat.apply(
    [],logComwithpvalue.map(q=>{
  const log2pv=q.filter(n=>n!=undefined).filter((n,i)=>n[1]==mjprotein)
  
  const outlogpv=log2pv.length>0? log2pv[0][0].filter(n=>n!=null)[1]:log2pv 
  return outlogpv })
  )
  
  const indexofmjprotein=sampleheader[0].indexOf('majorityproteinids')
  const getwholedata=wholedata[0].filter(n=> n[indexofmjprotein]==mjprotein).map(dataon=>{
   
  
    
  return sampleheader[0].map((headers,i)=>{
  
    return dataon[i]})
  })
  const itemconcatfc= [item.sets].concat([concatlog2fc])
  const itemtopv =itemconcatfc.concat([concatlog2pv])
  const itemtodata=itemtopv.concat(getwholedata[0])
  
  
  const data = {};
  headers.forEach((key, i) => data[key] = itemtodata[i]);
  return data
  
  })
  )
  
  return rows
  //=>한줄.
  
    }))
  
  return [csvheaders,concatcsvdata]
  
  }
  function allCombination2(arr, m) {
    const combinations = [];
    const picked = [];
    const used = [];
    for (const item of arr) used.push(0);
  
    function find(picked) {
      if (picked.length === m) {
        const rst = [];
        for (let i of picked) {
          rst.push(arr[i]);
        }
        combinations.push(rst);
        return;
      } else {
        let start = picked.length ? picked[picked.length - 1] + 1 : 0;
        for (let i = start; i < arr.length; i++) {
          if (i === 0 || arr[i] !== arr[i - 1] || used[i - 1]) {
            picked.push(i);
            used[i] = 1;
            find(picked);
            picked.pop();
            used[i] = 0;
          }
        }
      }
    }
    find(picked);
    return combinations;
  }
  
  
  
  function getWholeCombinations(arr, m,r) {
    const length2 = r
    const combinations = [];
    const picked = [];
    const used = [];
    const lenixlabel = [...Array(length2)].map((a,index)=>{
      const label='compare'+(parseInt(index)+1)
  
      return label
    })
    for (const item of arr) used.push(0);
  
    function find(picked) {
      if (picked.length === m) {
        const rst = [];
        for (let i of picked) {
          rst.push(arr[i]);
        }
          
  
        combinations.push(rst);
        return;
      } else {
        let start = picked.length ? picked[picked.length-1] + 1 : 0;
        for (let i = start; i < arr.length; i++) {
          if (i === 0 || arr[i] !== arr[i-1] || used[i-1]) {
            picked.push(i);
            used[i] = 1;
            find(picked);
            picked.pop();
            used[i] = 0;
          }
        }
      }
    }
    find(picked);
    return combinations;
  }
  
  
  function getAllCombinations(arr, m,r) {
    const length2 = r
    const combinations = [];
    const picked = [];
    const used = [];
    const lenixlabel = [...Array(length2)].map((a,index)=>{
      const label='compare'+(parseInt(index)+1)
  
      return label
    })
    for (const item of arr) used.push(0);
  
    function find(picked) {
      if (picked.length === m) {
        const rst = [];
        for (let i of picked) {
          rst.push(arr[i]);
        }
            const labelt = lenixlabel.map((item,i)=>{
  
              const filter1=rst.filter(n=>n.includes(item)).length<2? rst.filter(n=>n.includes(item)):[]
  
          return    filter1[0]
            })
          const  filterrst=  labelt.filter(n=>n!=undefined)
  
        combinations.push(filterrst);
        return;
      } else {
        let start = picked.length ? picked[picked.length-1] + 1 : 0;
        for (let i = start; i < arr.length; i++) {
          if (i === 0 || arr[i] !== arr[i-1] || used[i-1]) {
            picked.push(i);
            used[i] = 1;
            find(picked);
            picked.pop();
            used[i] = 0;
          }
        }
      }
    }
    find(picked);
    return combinations;
  }
  
  function wholecomb(arr, m,r) {
      const wholedata= [].concat.apply(
        [],[...Array(m)].map((item,ix)=>
        
        {
  
      return    getAllCombinations(arr,ix+1,r)
  
        })
  
      )
      const wholedata2= [].concat.apply(
        [],[...Array(m)].map((item,ix)=>
        
        {
  
      return    getWholeCombinations(arr,ix+1,r)
  
        })
  
      )
    const holl=wholedata2.filter((n,i)=>wholedata[i].join()!=n.join())
  const setnlength=    Array.from(new Set(wholedata.map((a,i)=>{
  
        return a.length 
      })))
    
      const combination_set=  setnlength.map((iitem, i)=>{
       
       
        const getcombinations=Array.from(new Set(wholedata.filter(n=> n.length==iitem).map(a=>
          {
          const conditiontest= a.length==1? a[0] :a.length>1?a :undefined  
          return conditiontest
          
                })))
        const getcombinationsnotfilter=        getcombinations.filter(n=>n!=undefined)
        return getcombinationsnotfilter
  
  
      })
  
                const compset=     [].concat.apply(
                    [],[...Array(combination_set.length)].map((a,i)=>{
                const concatinnervalue=  combination_set[i].map((item,i)=>{
                    
                    if(typeof(item)===typeof('a')){
                      return [item]
  
                    }
                    else if(typeof(item)===typeof([])){
                      return item
                    }
                    else{
                      return undefined
                    }
                  })
  
                  return concatinnervalue
  
                }))
  
  
      return [compset,holl]
  
    
  
  
  
  }
  
  
  
          function Intersectionby2(arr) {
            const array1=arr[0]
            const array2=arr[1]
            const interarray=array1.filter(x=>array2.includes(x)) //교집합
            return interarray
          
  
  
          }
  
          function Intersectionby3(arr) {
            if (arr!=undefined& arr.length<2){
            const array1=arr
            
            const interarray=array1[0]
            return interarray}
            else if (arr!=undefined& arr.length>1){
              const array1=arr.slice(0,1)
              const array2=arr.slice(1,arr.length)
    
              const concatarray=[].concat.apply(
                [],array2.map((a,j)=>{
                 
              return       a      
                
              })
              )
    
              const interarray=array1[0].filter(x=>concatarray.includes(x)) //교집합
              return interarray
              
              
            }
          }
  
  
  
  function diagramdata(dictvalues,arr){
  
  const values= dictvalues[0]
  const labels= dictvalues[1]
  const arrix = arr!=undefined? arr.map((a,i)=>{
    return labels.indexOf(a)
  }): [undefined]
  const setarrayix=arrix.filter(n=>n!=undefined).length==1? arrix.map((q,i)=>{
   return values[q].map((p,i)=>{
  
      return p
    })
  }):undefined
  
  const thatC2=(arr!=undefined )&( arrix.length>1)? allCombination2(arrix,2):undefined
  const combinationvalues=thatC2!=undefined? Intersectionby3([...Array(thatC2.length)].map((a,i)=>{
  
  
  return Intersectionby2(thatC2[i].map((item,i)=>{
  const intitem=parseInt(item)
                      
  
  return  values[intitem].map((p,i)=>{
      return p
    })
  }))
  
  
  })):undefined 
  
  const getcombinationsvalue= (thatC2==undefined ) & (arrix.filter(n=>n!=undefined).length==1)?setarrayix[0]:combinationvalues
  return getcombinationsvalue
  
  //A와 겹치는 AB,AC,AD중 row1개인 AB에 대한 교집합. AB, ABC...여도 적용되게 구현
  
  }
  
  function setcombination(arr,dictvalues,arr3) { //,dictvalues
    
  const arrfilter= arr.map((A)=>{
     //A가 한줄?
  //   A.filter((n,i)=> n[i] )
  const combin1=diagramdata(dictvalues,A)
  const arrg=arr.filter(n=>n.length==A.length+1).map((itemfilter,ix)=>{
    const getitem=  itemfilter.filter(n=>A.includes(n))
    
    const passitem=getitem.length>0? itemfilter :undefined
    const combin2=diagramdata(dictvalues,passitem)
    return combin2
    
    })
  
  
    const concatcombin2=[].concat.apply(
      [],arrg.map((a,j)=>{
    return       a      
    
    })
    )
  const concatfilter= concatcombin2.filter(n=>n!=undefined)
    const interarray=combin1.filter(x=>!concatfilter.includes(x))
    
  const venndiagramsets=({size:interarray.length,
  sets:A,
  values:interarray})
  
  return venndiagramsets
  
  
    return //.filter((nf,i)=>A.includes(nf))
     
  /*  .map((item,i)=>{'A'를 포함하고 A보다 한개 더 많은 element를 갖는 array    item.filter((n,i)=>n)})
  const sets=    A.map((item2 )=>
  
  ({  size: typeof( item2)!=typeof([])? diagramdata([item2],dictvalues,arr):diagramdata(item2,dictvalues,arr)[0] ,
    sets:  typeof( item2)!=typeof([])? [item2]:item2,
    values:  typeof( item2)!=typeof([])? diagramdata([item2],dictvalues,arr):diagramdata(item2,dictvalues,arr)[1] 
  
      })   )
  
  
  
  
  */
  
  
  })
  
  const holl_combination=arr3.map((A)=>{
    const venndiagramsets=({size:0,
      sets:A,
      values:[]})
    return venndiagramsets
  })
  const returnarrfilter=arrfilter.concat(holl_combination)
  
  return returnarrfilter
  
  }
  
  
  
  function setdiagram(dataon) {
    const setdata=dataon.map((data,i)=>{
  
      const uplist = data[0]
      const downlist = data[1]
      const simlist = data[2]
  const sets=[{size:uplist.length,
  sets:['uplist'+i]},
  {size:downlist.length,
      sets:['downlist'+i]},
      {size:simlist.length,
          sets:['simlist'+i]}
  ]
  return sets
  })
  return setdata
  
  
  }
  
  
    
  Array.prototype.Aggregate = function (fn) {
    var current,
      length = this.length;
  
    if (length == 0) throw "Reduce of empty array with no initial value";
  
    current = this[0];
  
    for (var i = 1; i < length; ++i) {
      current = fn(current, this[i]);
    }
  
    return current;
  };
  
  function sumarray(a) {
    return a.Aggregate(function (a, b) {
      return a + b;
    });
  }
  
  
    
  
  function newDistribution(Arrays,fchange,getpvalue) { 
    const findata = [[{label: 'log2FC', type: 'number'} , {label: 'down', type: 'number'},{label: 'up', type: 'number'},{label: 'similar', type: 'number'},{label: 'cutoff(pvalue)', type: 'number'}]];
    const parsedata =[]  
    const upperdata=[]
    const lowerdata=[]
    
  
   Arrays.forEach((item, i) => {
     
      const fc = item[0];
      const pvalue = item[1];
      const majerprotein = item[2];
      const chrinfo=item[3]
      if (((Math.abs(fc) ==Infinity) |  isNaN(fc) ==true  )!=true){
       
      if ((fc > fchange) & (-pvalue > getpvalue)) {
        parsedata.push( [[fc, null, -pvalue, null,null],majerprotein]);
      } else if ((fc < -fchange) & (-pvalue > getpvalue)) {
        parsedata.push( [[fc, -pvalue, null, null,null],majerprotein]);
      }else if ((fc > -fchange)&(fc < fchange)  & (-pvalue > getpvalue)) {
        parsedata.push( [[fc,null, null,  -pvalue,null],majerprotein]);
      } 
      else if(-pvalue<getpvalue) {
        parsedata.push( [[fc, null, null, null,-pvalue],majerprotein]);
      }
      else{
  
        parsedata.push( [[null,null,null,null,null],null])
      }
    }

    
    if (((Math.abs(fc) ==Infinity) |  isNaN(fc) ==true  )!=true){
      
      if ((Math.sign(fc) ==1) & (-pvalue > getpvalue)) {
        upperdata.push( [chrinfo,-pvalue,fc,majerprotein]);
      } else if ((Math.sign(fc) ==-1) & (-pvalue > getpvalue)) {
        lowerdata.push( [chrinfo,-pvalue,-fc,majerprotein]);
      }
    }






    })
  const filterdata= parsedata.filter(n=>n!=undefined).map((a,i)=>{
    return a[0]
  })
  
  const filterprotein= parsedata.filter(n=>n!=undefined).map((a,i)=>{
    return a[1]
  })
  
  const upfilter =    filterdata.filter(n=> (n[0]>fchange) & (n[2]>getpvalue)  ).map(  (item,ix)=>{  return item  })
  const downfilter  = filterdata.filter(n=> (n[0]<-fchange) & (n[1]>getpvalue)  ).map(  (item,ix)=>{  return item  })
  const similarfilter= filterdata.filter(n=> (n[0]> -fchange& n[0] < fchange)   & (n[3]>getpvalue)  ).map(  (item,ix)=>{  return item  })
  
  const upix    = upfilter.map((data,ix)=>{ return filterdata.indexOf(data)})
  const downix  = downfilter.map((data,ix)=>{ return filterdata.indexOf(data)})
  const simix   = similarfilter.map((data,ix)=>{ return filterdata.indexOf(data)})
  
  
  
  const upprotein=filterprotein.filter( (n,i)=> upix.includes(i)            )
  const downprotein=  filterprotein.filter( (n,i)=> downix.includes(i)            )
  const similarprotein= filterprotein.filter( (n,i)=> simix.includes(i)            )
  
  
  
  const updownsimdiflist= [upprotein,downprotein,similarprotein]
  
  const outdata = findata.concat(filterdata)
    return [outdata,filterprotein,updownsimdiflist,parsedata,upperdata,lowerdata];
  }
  
    

  const ExcelDownload = ({ data, headers }) => {
    return (
      <Button>
        <CSVLink 
          headers={headers} 
          data={data} 
          filename="eachArea.csv" 
          target="_blank"
        >
         
        </CSVLink>
        Export Excel
      </Button>
    );
  };
function Scaffold3_3(props){
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    
    const [show31, setShow31] = useState(false);
    const [show32, setShow32] = useState(false);
    const [show33, setShow33] = useState(false);
    const [show34, setShow34] = useState(false);
    const [showindex,setshowindex]= useState(false);
    
    const history = useNavigate()
    const [loading, setLoading] = useState(null)

    const [re,setre]=useState(false)
    const [re2,setre2]=useState(false)
    
   const [fc,setfc]=useState(1.5)
   const [pv,setpv]=useState(3)
   const [getvalues,setgetvalues]=useState(false)
   const [getvenn,setvennvalues]=useState(false)
   
   const [pushdata,setpushdata]= useState(false);
   const [push2data,setpush2data]= useState(false);
   const [interitem1,setinteritem1]= useState([]);
   const [interitem2,setinteritem2]= useState([]);
   const [images,setimages]= useState(false);



  const tosdata= (e)=>{
    setvennvalues([e.values,e.sets])
           }




  function updateProgress (progressUrl) {
    fetch(progressUrl[0]).then(function(response) {
        response.json().then(function(data) {
            // update the appropriate UI components
            setLoading(true);
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
    props.getGOID(progressUrl[1])
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
  
  const uploadModule3 =async (e) =>{
    e.preventDefault();
    
    
//    
    const CaseVar = $('input[name=group1]:checked').val();
    const tos_analysis=e.target[1].value.split(',')
    const Analinfo= e.target[2].value
const pvfc= pv+':'+fc

   const formData = new FormData();
   formData.append("Analysisinfo",Analinfo);
   formData.append("tos_MSUids",tos_analysis);
   formData.append("case",CaseVar);  
   formData.append('pvfc',pvfc);
   
   formData.append('project',props.ProjectID[0]);
   formData.append('proteincount',tos_analysis.length);
//       formData.append("Search_option",placeholder);
//    formData.append("Search",select_option2);
// #data['pvfc'] not in gettest.pvfc.split(';') pvfc전달전에 이미 있으면 해당 결과가 있습니다-> 확인해주세요.

   formData.append("username",props.user)
  
   fetch("http://127.0.0.1:5506/api/sn/", { 
    method : 'POST',
    headers: {
        Authorization : `JWT ${localStorage.getItem('token')}`,
      
    },
    body : formData
}).then(res => 
  {
    if (!res.ok) {
      throw Error("400/500 error");
      
    }
    return res.json();
  
  }
  )
.then((response) =>  
 
{
  
  const url=`http://127.0.0.1:5506/api/${response[0]}/`
const awsom= [url,[url,pushdata,push2data,Analinfo,interitem1,expitem,pvfc]]
  updateProgress(awsom)
}

// 
)
.catch(error =>{
  if (window.confirm('The server is very busy. sorry'))
  {
    
    history('/')




    
    
  }
  else
  {
    history('/') 
   }

});


   
}
const [getoption,setoption]=useState(false)
const [expitem,setexpitem]=useState(false)
const [getoption2,setoption2]=useState(false)
const [getnumber,setnumber]=useState(0)


const ADDoption = (e) =>{
  setoption(e[0])
  setpushdata(e[1])
  setpush2data(e[2])
  

//  setProgress(false)
}

const changeoption = (e) =>{
  setoption2(e[0])
  setpv(e[1])
  setfc(e[2])
  setnumber(e[3])

//  setProgress(false) 
}
const changeoption2 = (e) =>{
const url=`http://127.0.0.1:5506/api/${e[0]}/`

 
props.getGOID([url,e[1],e[2],e[3],e[4],expitem,e[5],e[6]])

}

useMemo(() => {
  props.user != false
  ?(
  
    fetch('http://127.0.0.1:5506/api/Ainfolist/')
    .then((res)=>res.json())
    .then((posts)=>{
      const explistfiluser=posts//.results
      //pvfc정보를 받아오는것이 필요하다.
      
      const tosexp= props.resultID!=false?  explistfiluser.filter(id=>id.Analysisinfo==props.AID):false

      const tosTable= props.resultID!=false?tosexp.map((a,i)=>{
        const taskid=[a.taskId,a.indexinfo,a.compare,a.whole,a.Analysisinfo,a.proteincount,a.pvfc,a.taskId2,a.FilterMethod,a.AnalysisinfoTXT] 


        return     taskid
            }):false
          


        
            setexpitem(tosTable)
    })
  
  
  
          )
      :setexpitem(false)  
  
}, [getoption])



const getinterNodes= (text) => {

  const interitem = interitem1
const pushitem=   interitem1.length >0?   interitem.push(text) : [text]

const setitem=new Set(interitem)
const arrayitem=[...setitem]
setinteritem1([])
interitem1.length >0?  setinteritem1(arrayitem): setinteritem1(pushitem)
    


}

const resetinterNodes= (text) => {

  setinteritem1([])
    
}






const Example =(pro)=> {
  
  const pvfc=pv+':'+fc

  const tosids=pro.data[0].map((a,i)=>{return          a.majorityproteinids.split(';')[0]    })
    return(<>
    {expitem!=false&&expitem[0][6].includes(pvfc)==false? false:
<>
<br/><text>선택한 FoldChange,Pvalue값으로 분석한 GO분석이 이미 있습니다!</text>
      <br/><text>Link클릭시 GO분석으로 이동합니다.</text></>
}
     {expitem!=false&&expitem[0][6].includes(pvfc)==false?
<div>
  <Card style={{ width: '28rem' }}>
  
  <Card.Body>
  <Form onSubmit={uploadModule3 } >
    <Card.Title>GOEA </Card.Title>
    <Form.Group>
  <Form.Label>Select RICE type</Form.Label>
  {[ 'radio'].map((type) => (
    <div key={`inline-${type}`} className="mb-3">
      <Form.Check
        inline
        label="Japonica"
        name="group1"
        type={type}
        value="Japonica"
        id={`inline-${type}-1`}
      />
      
      
     
    </div>
    
  
  ))}
</Form.Group>
 
<Form.Group >
<Form.Label>Cutoff pass protein {tosids.length} counts</Form.Label>
<Form.Control  value={tosids} />

</Form.Group>

<Form.Group >
<Form.Label> Analysis information </Form.Label>
<Form.Control  value={props.AID} />

</Form.Group>

<Form.Group >
<Form.Label> FoldChange and pvalue </Form.Label>
<Form.Control  value={pv+','+fc} />

</Form.Group>





  <Button variant="secondary"  type="submit">
    Submit
  </Button>
   <Button  variant="light"  onClick={()=>  setoption(false)} >
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
  </svg>
  </Button>
  </Form>
  
    
  </Card.Body>
  </Card>
  </div>
  
  :  expitem[0][7].split(';').map((a,i)=>{
    const pvval= expitem[0][6].split(';')[i].split(':')[0]
    const fcval= expitem[0][6].split(';')[i].split(':')[1]

    const counts=expitem[0][5].split(';')[i]


    return(
    <><br/>
    
    <br/>
      {expitem[0][6].split(';')[i]!=pvfc?  <Button variant="info" onClick={()=> changeoption([true,pvval,fcval,i])}>{'pvalue='+pvval+','+'fc='+fcval+','+'counts='+counts}</Button>:
    <Button variant="link" onClick={()=> changeoption([true,pvval,fcval,i])}>{'pvalue='+pvval+','+'fc='+fcval+','+'counts='+counts}</Button>}
    <Button  variant="light"  onClick={()=>  setoption(false)} >
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
  </svg>
  </Button>
  {getoption2!=false&&getoption!=false&&getnumber==i?   <Button variant="info"  onClick={()=> changeoption2([a,pro.data[0],pro.data[1],props.AID,interitem1,pvval+':'+fcval,props.ProjectID])}>{'goGOEA'}</Button>
:false}


</>
    )

  })
 
  

  
  }
  </>
    )}

    const uploadModule =async (e) =>{
      e.preventDefault();
      
     const fcval = e.target[0].value
     const pval = e.target[1].value
     setfc(fcval)
     setpv(pval)
    
    
    }
    useEffect(()=>{ 

        async function get3() {  
          try { setLoading(true);
        const projectname=props.SID[1]
        const analyinfojoin=props.SID[0]
        const result =  await axios.get(props.SID[3]).then((response) => {//,page:`${item2}`
       
        return response.data.result
        
        })
//        chrinfo

        setre2(result)

      }

        
        
        catch (e) { 

          setre2(false)
        }
      
      
      
        setTimeout(function() {
      
          setLoading(false);
   
         }, 2500); 
           }
           get3()
           
           
           



           
    },[props.SID[1]])

    

    
  useEffect(()=>{
    props.user != false
    
    ?(
      
  fetch('http://127.0.0.1:5506/Imgview/')
  .then((res)=>res.json())
  .then((posts)=>{
    const explistfiluser=posts//.results
    const tosexp= props.resultID!=false?   explistfiluser.filter(id=>(id.description==props.EXPID) ):false
    const imagefiles=props.resultID!=false?  tosexp.map((a,i)=>{
     return [ a.imagefiles      ,a.attr]
  
  
    }):false
      
    setimages(imagefiles)
  })



        )
    :setimages(false)
 
},[props.SID[1]])



  const CreateList = () => {
    
    const [val,setval] = useState([])
   const [cutfc,setcutfc]=useState([])
   const [cutpi,setcutpi]=useState([])
 
const [combina,setcombina]=useState([])
const [sub,setsub]=useState('')
const [sub2,setsub2]=useState('')
const [dataset,setdataset]=useState('')
  
  


const toss2 = Array.from( props.SID[2])
const tos2Array = Array.from(new Set(
  toss2.map((a,i)=> { 
   
return a.id.split('condition')[0]
})))
const getvaluesve=( re2!=false  &&loading==false)? 
tos2Array.map((item,index)=>{



  const findlabel=toss2.filter(n=>n.id.includes(item)).filter(n=>n.id.includes('condition1')).map((a,i)=>{
    return a.children
  })


  const arraylabel=Array.from(findlabel[0])
  const findlabel2=toss2.filter(n=>n.id.includes(item)).filter(n=>n.id.includes('condition2')).map((a,i)=>{
    return a.children
  })
  const arraylabel2=Array.from(findlabel2[0])

  const arraytoscondition1= arraylabel.filter(n=>n.className.includes('label')).map((it,i)=>{
    return it.text
  })
  const arraytoscondition2=arraylabel2.filter(n=>n.className.includes('label')).map((it,i)=>{
    return it.text  })
const conditionlist=  arraytoscondition1.map((item,i)=>{
  const compareAB=arraytoscondition1[i] +'  vs  '+arraytoscondition2[i]
    return compareAB
  }).join(',') 





const jspvalue=  re2.map((raw)=>{
const chrinfo=raw.chrinfo
const mjprotein=    raw.majorityproteinids
  const logpvalue=  Math.log(parseFloat(raw.pvalue.split(',')[index].trim()))
    
    const log2fc=parseFloat(raw.foldchange.split(',')[index].trim())
  return  [log2fc, logpvalue,mjprotein,chrinfo]
  })
 

//  const comparelabels=[arraytoscondition1,arraytoscondition2]
const getFuncionDis=newDistribution(jspvalue,fc,pv)
const newdataset = getFuncionDis[0]
const newdatanodeinfo = getFuncionDis[1]

    const updownsimdiflist = getFuncionDis[2]
    const originparsedata = getFuncionDis[3]
    const upmap = getFuncionDis[4]  
    const downmap = getFuncionDis[5]  
    const sampleheader=Object.keys(re2[0]).filter(n=>n!='valuess')
    const wholedata=re2.map(val=>{return sampleheader.map(a=>{return val[a]})})
    const labeltag=['compare'+(parseInt(index)+1)+'up','compare'+(parseInt(index)+1)+'down','compare'+(parseInt(index)+1)+'similar']
    
    return [updownsimdiflist,labeltag,originparsedata,sampleheader,wholedata,conditionlist,newdataset,upmap,downmap,newdatanodeinfo]//,comparelabels




})
:[]

//tag2




const venvalue = [].concat.apply(
  [],getvaluesve.map((item, i) => {
   const item0= item.length>0? item[0]:[]
return item0
})
);
const venlabel = [].concat.apply(
  [],getvaluesve.map((item, i) => {
    const item1= item.length>0? item[1]:[]
  return item1
    }));
   
        const compareoriginparsedata =       getvaluesve.map((item, i) => {
          const item2= item.length>0? item[2]:[]
        return item2
          })

          const sampleheader_thr =       getvaluesve.map((item, i) => {
            const item2= item.length>0? item[3]:[]
          return item2
            })
            const wholedata_thr =       getvaluesve.map((item, i) => {
              const item2= item.length>0? item[4]:[]
            return item2
              })
      const complist =       getvaluesve.map((item, i) => {
        const item2= item.length>0? item[5]:[]
      return item2
        })
        const newdataset2 =       getvaluesve.map((item, i) => {
          const item2= item.length>0? item[6]:[]
        return item2
          })


          const upmapset2 =       getvaluesve.map((item, i) => {
            const item2= item.length>0? item[7]:[]
          return item2
            })

            const downmapset2 =       getvaluesve.map((item, i) => {
              const item2= item.length>0? item[8]:[]
            return item2
              })
//          setdataset(newdataset)
const mjproteininfo =       getvaluesve.map((item, i) => {
  const item2= item.length>0? item[9]:[]
return item2
  })

const    vennvalabel=[venvalue,venlabel]

const combinationbefore=wholecomb(venlabel,venlabel.length,tos2Array.length)
const combinations=combinationbefore[0]
const combinations_holl=combinationbefore[1]
const outcomb = setcombination(combinations,vennvalabel,combinations_holl)//.filter(n=>n.values.length>0)
const exportexcel= funcex2cel(outcomb,compareoriginparsedata,sampleheader_thr,wholedata_thr)


const exdata=exportexcel[1]
const exheader=exportexcel[0]




const venntos = (e) => {
       props.tosvennvalues([outcomb,exdata,exheader,pv,fc])
  
   //     history('/govisualization')
      }


    return(
<>  

   
  <Suspense fallback={<h1>Loading posts...</h1>}>

  
    <Segment>
{toss2.length>0  &&re2!=false &&loading==false? 
 tos2Array.map((item,index)=>{

return(
 <>     
    

    <div style={{"margin-left":'1%' }}>
     <text style={{"font-size": "25px" ,"font-size": "25px" ,"word-break":"break-all" }}>  {complist[index]} </text>
       </div>



    <Col lg=    {5 }sm=  {6}   style={{textAlign :"left" ,"margin-left":'1%'}}>

    <Button variant="light" onClick={() => [setShow32(true),setshowindex(index)]}>  <BsQuestionLg/> </Button>




   
<Scharts data={newdataset2[index]} mjproteininfo={mjproteininfo[index]}  getinterNodes={getinterNodes}  />
   
  
</Col>

<Col lg=  {{ span: 11, offset: 0.1 }} sm=    {{ span: 12, offset: 0.1 }} >
<Mplot remap={upmapset2[index]} user={props.user} fc={fc} ck={'up'} getinterNodes={getinterNodes} style={{
          "margin": "1%"
        }}/>
<Mplot remap={downmapset2[index]}  user={props.user} fc={fc} ck={'down'} getinterNodes={getinterNodes} style={{
          "margin": "1%"
        }}/>
</Col>
<Divider/>
</>
  )
  //history('/goselect')  
  //<Createscatterplot data={newdataset}/>
})


: false }
<Button variant="light" onClick={() => setShow33(true)}>  <BsQuestionLg/> </Button>

<Form onSubmit={uploadModule}>
<Form.Group >
      <Form.Label>Log Scaled FoldChange value </Form.Label>
        <Form.Control style={{ width: '10rem' }}  fluid label='Log Scaled FoldChange value' placeholder={fc} defaultValue={fc} name='FC'/>
        <Form.Label>- Log Scaled pvalue </Form.Label>

        <Form.Control style={{ width: '10rem' }} fluid label='- Log Scaled pvalue' placeholder={pv} defaultValue={pv} name='PV' />
        
      </Form.Group>
      <Button style={{ width: '10rem' }} variant="outline-dark"   size="sm"  type="submit">Submit</Button>
     
    </Form>


</Segment>

<Segment>

<Container>
   <Row>

     <Col lg=  {{ span: 11, offset: 0.1 }} sm=    {{ span: 12, offset: 0.1 }}> 
     <div style={{"font-size": "25px" ,"margin-left":'1%' }}>VennDiagram</div>

    <Venndiagram data={outcomb} tosdata={tosdata} />
    </Col>
    
    </Row>
    </Container>

    </Segment>
    {getvenn!=false? 
<Segment>

<Container> 
  <Row>

<Col lg=  {{ span: 11, offset: 0.1 }} sm=    {{ span: 12, offset: 0.1 }}> 
  
<> 
 <div style={{"font-size": "25px" ,"margin-left":'1%' }}>{getvenn[1].join(',')}</div>

    <Mplot2 remap={upmapset2} user={props.user} fc={fc} pv={pv}  ck={'up'} getvenn={getvenn} getinterNodes={getinterNodes}  style={{
          "margin": "1%"
        }}/>
<Mplot2 remap={downmapset2}  user={props.user} fc={fc} pv={pv} ck={'down'} getvenn={getvenn} getinterNodes={getinterNodes} style={{
          "margin": "1%"
        }}/>
        
        </>
    
        </Col>
    
    </Row>

    </Container>
</Segment>
    :false}
    <Divider/>
    <Navigator interitem1={interitem1} interitem2={interitem2} resetinterNodes={resetinterNodes} indexinfo={1}/>  
    <Divider/>

   <Button variant="outline-dark"    onClick={() => ADDoption([true,exdata,outcomb])} >GO 분석으로</Button> 
   <Button variant="light" onClick={() => setShow34(true)}>  <BsQuestionLg/> </Button>

{getoption!=false ?<Example data={[exdata,outcomb]}/>:false}
<br/>

</Suspense>

</>


       )}

    if (loading) return  (<>
      <Container  style={{"height":'none'  }}  id='SCAFFOLD2' >        <Row></Row>
</Container>
      <Container  id='SCAFFOLD3'  >
    <Loader.TailSpin height={400} width={400}/>
    
    </Container></>)
    //<Loader type="spin" color="RGB 값" message={loading} />

    return(<>

    <Container  style={{"height":'none'  }}  id='SCAFFOLD2' >   
     <Row  > 
     <Col lg={10} sm={10} class='Headerstyle' style={{'font-weight':'bold', "font-size": "35px" }}>&nbsp;VMV visualization<br/> (Volcano plot,manhattan plot,venndiagram)&nbsp;</Col>


 <Col style={{"display": "flex","justify-content": "end","align-items":"end"}}>  
 <Button variant="info" size="sm" onClick={() => setShow(true)}>
         Page information
       </Button>
 
       </Col>
       </Row>
       
 </Container>
     <Container  id='SCAFFOLD'  >
 
       <Row style={{"margin-left":'5%'}}> 
  <Col>        
   <Button id="STARTbt"  variant="link"   onClick={() => setShow2(true)}  style={{ "font-size": "25px"}}   >Normailzation imgaes</Button>

    <Button variant="light" style={{ "font-size": "25px"}} onClick={() => setShow31(true)}>  <BsQuestionLg/> </Button>
    </Col>
      

        </Row>

       <Row style={{"margin-left":'3%',textAlign:"left"}}> 
       <Col lg={4} sm={6} > </Col>
       <Col lg={1} sm={1}  style={{textAlign: "left"}}></Col>
       <Col  lg={7} sm={5} style={{textAlign: "left" ,"margin-top":'1%'}}> 
    

       </Col>
      
      
 
      
       </Row>
  <Row style={{"margin-left":'3%'}}>
  
  <Col lg={4} sm={5}  > </Col>

     <Col  lg=      {{ span: 7, offset: 0.1 }} sm=      {{ span: 6, offset: 0.1 }} style={{textAlign: "left" ,"margin-top":'1%'}}>
     
    
   
    

     </Col>

  

 </Row>
 <CreateList/>
 </Container>

 <Modal
 show={show}
 onHide={() => setShow(false)}
         dialogClassName="modal-90w"
         aria-labelledby="example-custom-modal-styling-title"
       >
         <Modal.Header closeButton>
           <Modal.Title id="example-custom-modal-styling-title">
           Visualization
           </Modal.Title>
         </Modal.Header>
         <Modal.Body>
            
       <p>이 페이지는 CONDITION을 선택하는 후 나타나는 정보를 Volcano plot,venndiagram, manhattan plot으로 제공합니다.   </p> 
      <p> 선택한 Condition간 T-test를 통해 log2foldchange, -logpvalue 값을 얻습니다. </p>
      <p> 비교 영역마다 위 값을 바탕으로 Volcano plot을 그립니다. 특정 -log pvalue값을 통과하지 못한 유전자들은 회색으로 표시되고   </p>
      <p> log2foldchange 값의 영역에 따라 similar(black),  down(blue), up(red)로 표시됩니다.   </p>
      <p> Volcano plot에서 -log pvalue (cutoff)를 통과한 유전자를 genome locus 위치정보와, log2FC값을 활용해 manhattan plot으로 그립니다. </p>
      <p> manhattan plot은 log2foldchange가 plus값인지 minus 값인지에 따라서 분리되서 그려집니다. </p>
      <p> minus영역은 절대값을 취해 그립니다.</p>
      <p>venndiagram은 compare group마다 volcano plot의 영역을 라벨해서 두비교 사이에 유전자들이 어떻게 위치하고 있는지 보여줍니다.  </p>
      <p>venndiagram의 영역을 선택하면, 영역에 포함되는 유전자들을 manhattan plot으로 표현합니다/   </p>
      <p>그림의 각 영역별로 노드를 선택하면 네트워크분석에서 활용할 수 있는 interestingItem1에 추가됩니다  </p>

       
       
         </Modal.Body>
       </Modal>
      
 
       <Modal
 show={show2}
 onHide={() => setShow2(false)}
         dialogClassName="modal-90w"
         aria-labelledby="example-custom-modal-styling-title"
       >
         <Modal.Header closeButton>
           <Modal.Title id="example-custom-modal-styling-title">
          Normailzation
           </Modal.Title>
         </Modal.Header>
         <Modal.Body>
     

        {images!=false ? 

images.map((a,i)=>{


  return(
<>
    <text style={{ "font-size": "15px",'fontWeight': 'bold',textAlign: "left","display": "flex"}}>
     {a[1]}
     <br/>
    (related Venndiagram,Manhattan plot)
     </text>

     <Image
      src={a[0]}
      className='img-thumbnail'
      alt='...'
      />

</>
  )





})      //  userlist
        :false  }
       
       
       
         </Modal.Body>
       </Modal>
      
      
      
             <Modal
 show={show31}
 onHide={() => setShow31(false)}
         dialogClassName="modal-90w"
         aria-labelledby="example-custom-modal-styling-title"
       >
         <Modal.Header closeButton>
           <Modal.Title id="example-custom-modal-styling-title">
           Normalization image
           </Modal.Title>
         </Modal.Header>
         <Modal.Body>
            
       <p> filter 방식에따른 missing value figure , TMT STUDY의 경우 IRS scale이 적용될 때의 차이를 보여줍니다. </p>
      

       
       
         </Modal.Body>
       </Modal>


       <Modal
 show={show32}
 onHide={() => setShow32(false)}
         dialogClassName="modal-90w"
         aria-labelledby="example-custom-modal-styling-title"
       >
         <Modal.Header closeButton>
           <Modal.Title id="example-custom-modal-styling-title">
        Volcano plot , manhattan plot
           </Modal.Title>
         </Modal.Header>
         <Modal.Body>
          <p>
          Volcano plot
          </p>
            
       <p> 비교한 group간 DEP 분석을 진행한 후,  -log scale pvalue값(기본값3) 이하인 값은 회색으로 표시됩니다. </p>
       <p> log2foldchange값(기본값1.5)을 활용해 1.5이상(red),-1.5~1.5(black), -1.5이하(blue)로 표시됩니다. </p>
       <p> -log scale pvalue값, log2foldchange값을 바탕으로 나뉜 red,black,blue영역을 차후 study에서 compare{showindex+1}up,compare{showindex+1}similar,compare{showindex+1}down으로 다룹니다.</p>
       <p>  volcano plot의 -log scale pvalue 값 이상인 단백질을 대상으로 그 단백질의 genome에서 위치정보와 log2foldchange값을 manhattan plot으로 나타냅니다 </p>
       <p>  up은 volcano plot에서 -log scale pvalue 값 이상인 단백질중 양수인 영역을 나타내고,  
        
        down은 음수의 영역을 절대값을 사용해 나타냅니다.  </p>
        <p>
          노드 정보는 chr정보:단백질 이름:log2foldchange값:그 chr에서의 위치를 나타냅니다.
        </p>

<p>
  chr 정보는 phytozome의Osativa_323_v7.0.gene.gff3.gz file을 통해 확인했습니다.
</p>
      

       
       
         </Modal.Body>
       </Modal>


    
       <Modal
 show={show33}
 onHide={() => setShow33(false)}
         dialogClassName="modal-90w"
         aria-labelledby="example-custom-modal-styling-title"
       >
         <Modal.Header closeButton>
           <Modal.Title id="example-custom-modal-styling-title">
        Volcano plot Cutoff
           </Modal.Title>
         </Modal.Header>
         <Modal.Body>
          <p>
          Cutoff를 정할수 있습니다.
          </p>
          <p>
            pvalue와 foldchange의 숫자를 다르게 입력하면 새로운 cutoff를 적용한 결과가 그려집니다.
          </p>
  

      

       
       
         </Modal.Body>
       </Modal>


       <Modal
 show={show34}
 onHide={() => setShow34(false)}
         dialogClassName="modal-90w"
         aria-labelledby="example-custom-modal-styling-title"
       >
         <Modal.Header closeButton>
           <Modal.Title id="example-custom-modal-styling-title">
       gene ontology analysis
           </Modal.Title>
         </Modal.Header>
         <Modal.Body>
          <p>
python library인 goatools를 활용해서 go분석을 수행합니다.
          </p>
          <p>
현재 Japonica type만 지원합니다.
          </p>
  

      

       
       
         </Modal.Body>
       </Modal>



    </>
      )

}
export default Scaffold3_3;






