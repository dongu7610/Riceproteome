import React,{useState, useEffect,useMemo,Suspense,useReducer} from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router'
//import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';  // DatePicker 라는 컴포넌트도 가져오깅
import "react-datepicker/dist/react-datepicker.css"; 
import { Alert } from 'reactstrap';
import $ from 'jquery';
import {InputGroup, Container,Col,Row,Image,Modal,Button,Card,Form} from 'react-bootstrap';
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
//import Loader from './Loader/Loader';
import * as Loader from "react-loader-spinner";

import axios from "axios";
import Scharts from "../Sections/Scharts"
import Venndiagram from "../Sections/Venndiagram"
import jStat from "jstat";
import Chart from "react-google-charts";
import { CSVLink, CSVDownload } from "react-csv";
import Mplot from '../Sections/Mplot'
import Mplot2 from '../Sections/Mplot2'
import Navigator from "../Modal/Navigator";
import { BsQuestionLg } from 'react-icons/bs';
import { AiFillAccountBook } from 'react-icons/ai';




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
       
      if ((fc >= fchange) & (-pvalue >= getpvalue)) {
        parsedata.push( [[{v:fc,f:`log₂foldchange:${fc} \n proteinName:${majerprotein}`}, null, -pvalue,null,null],majerprotein]);
      } else if ((fc <= -fchange) & (-pvalue >= getpvalue)) {
        parsedata.push( [[{v:fc,f:`log₂foldchange:${fc}\n proteinName:${majerprotein}`}, -pvalue,null, null,null],majerprotein]);
      }else if ((fc > -fchange)&(fc < fchange)  & (-pvalue >= getpvalue)) {
        parsedata.push( [[{v:fc,f:`log₂foldchange:${fc}\n proteinName:${majerprotein}`},null, null, -pvalue,null],majerprotein]);
      } 
      else if(-pvalue<getpvalue) {
        parsedata.push( [[{v:fc,f:`log₂foldchange:${fc}\n proteinName:${majerprotein}`}, null, null, null,-pvalue],majerprotein]);
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
  
  const upfilter =    filterdata.filter(n=> (n[0]['v']>fchange) & (n[2]>getpvalue)  ).map(  (item,ix)=>{  return item  })
  const downfilter  = filterdata.filter(n=> (n[0]['v']<-fchange) & (n[1]>getpvalue)  ).map(  (item,ix)=>{  return item  })
  const similarfilter= filterdata.filter(n=> (n[0]['v']> -fchange& n[0]['v'] < fchange)   & (n[3]>getpvalue)  ).map(  (item,ix)=>{  return item  })
  
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
  


function Scaffold3_4(props){
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    
    const [show31, setShow31] = useState(false);
    const [show32, setShow32] = useState(false);
    const [show33, setShow33] = useState(false);
    const [show34, setShow34] = useState(false);
    const [show41, setShow41] = useState(false);
    const [showindex,setshowindex]= useState(false);
    const [showcomparelist,setshowcomparelist]= useState(false);

    const history = useNavigate()
    const [loading, setLoading] = useState(null)

    const [re,setre]=useState(false)
    const [re2,setre2]=useState(false)
    const [getproperty,setgetproperty]=useState(false)
    
   const [fc,setfc]=useState(1.5)
   const [pv,setpv]=useState(3)
   const [getvalues,setgetvalues]=useState(false)
   const [getvenn,setvennvalues]=useState(false)
   const [ids,setids]=useState(false)
   const [Progress,setProgress]= useState({});
   const [placeholder2,setplaceholder2]=useState('Selectproject')
   const [pushdata,setpushdata]= useState(false);
   const [push2data,setpush2data]= useState(false);
   const [interitem1,setinteritem1]= useState([]);
   const [interitem2,setinteritem2]= useState([]);
   const [images,setimages]= useState(false);
  
   /*
const [schartdata,setschartdata]=useState(null)
const [downmplot,setdownmplot]=useState(null)
const [upmplot,setupmplot]=useState(null)

const [venndata,setvenndata]=useState(null)
const [venninfodata,setvenninfodata]=useState(null)

const [tossdata,settossdata]=useState(null)
const [tosscomplist,settosscomplist]=useState(null)
const [tossmjproteininfo,settossmjproteininfo]=useState(null)
const [tossvennitems,settossvennitems]=useState(null)
*/


   const handleSubmitdrop= (event) =>{
     
     
         setplaceholder2(event.target.innerText)
         }

   
         function updateProgress (progressUrl) {
     fetch(progressUrl).then(function(response) {
      
           response.json().then(function(data) {
                  // update the appropriate UI components
                 
                  const dict = Progress;
                  

                  if(data=='process'){ 
                  
                  

                    if( Object.keys(dict).filter(n=> n==progressUrl).length>0)
                  { 
                    return(
                    
                      dict[progressUrl]='process',
                   
                      setProgress(dict),
   
                       setTimeout(updateProgress, 30000, progressUrl)
                       
                       )
                  
                  }  
      

                    


                  
                   
                    
                   

                   
      
                  }
                  else if(data=='fin'){
                   if( Object.keys(dict).filter(n=> n==progressUrl).length>0)
                  { 
                    return dict[progressUrl]=='process'? 
                    (    dict[progressUrl]='fin',
                        setProgress(dict),
                        
                        alert('GOEA is complete.'),
                        setoption(false)

                         )
                        : 
                        (dict[progressUrl]='fin',
                        setProgress(dict))            
                  }  
                  else if(Object.keys(dict).filter(n=> n==progressUrl).length==0)
                  {return ( dict[progressUrl]='fin',
                        setProgress(dict)

                     )
                  
                }
                    

                    
                    
      
        // setShow_project(false) ,setRefrash(false);
        }
      
        

                  //  
              });
        });
    
  
  }
  function updateProgress1_5 (progressUrl) {
    fetch(progressUrl).then(function(response) {
     
          response.json().then(function(data) {
                 // update the appropriate UI components
                
                 const dict = Progress;
                 

                 if(data=='process'){ 
                 
                 

                   if( Object.keys(dict).filter(n=> n==progressUrl).length>0)
                 { 
                   return(
                   
                     dict[progressUrl]='process',
                  
                     setProgress(dict)
  
                      
                      
                      )
                 
                 }  
     

                   


                 
                  
                   
                  

                  
     
                 }
                 else if(data=='fin'){
                 if(Object.keys(dict).filter(n=> n==progressUrl).length==0)
                 {return ( dict[progressUrl]='fin',
                       setProgress(dict)

                    )
                 
               }
                   

                   
                   
     
       // setShow_project(false) ,setRefrash(false);
       }
     
       

                 //  
             });
       });
   
 
 }

        function updateProgress2 (progressUrl) {
          fetch(progressUrl[0]).then(function(response) {
              response.json().then(function(data) {
                  // update the appropriate UI components
              
                  if(data=='process'){ 

                   alert('Not yet completed! goea study is in progress!(It takes about 6 minutes.)')



                  }
                  else if(data=='fin'){
        return       setTimeout(function() {
        
          
          props.getGOID(progressUrl[1])
         }, 500);   
        
        
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
    



    const c2target=  expitem[0][14]
    const c1source=expitem[0][13]
    const mergeb123=expitem[0][12]
    const taskId3fin=expitem[0][11]
    const taskId3=expitem[0][10]
    
    
    const getfindata=[taskId3,taskId3fin,mergeb123,c1source,c2target]



/*    const CaseVar = $('input[name=group1]:checked').val();
    if(CaseVar==undefined){
      window.alert("You must select type");
  
  
     } else{*/
     


      
    const tos_analysis=e.target[0].value.split(',')
    const Analinfo= e.target[1].value
const pvfc= pv+':'+fc

const projectid =  getproperty.proj//re2[0].proj

   const formData = new FormData();
   formData.append('project',projectid); //props.ProjectID[0]
   formData.append("Analysisinfo",Analinfo);
   
   formData.append("tos_MSUids",tos_analysis);
//   formData.append("case",CaseVar);  
   formData.append('pvfc',pvfc);
 
  
   
   //pvfc,proteincount
   formData.append('proteincount',tos_analysis.length);
//       formData.append("Search_option",placeholder);
//    formData.append("Search",select_option2);
   formData.append("username",props.user)
  
   fetch("http://127.0.0.1:5506/api/sn/", { 
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

}

)
.then((response) =>  
 
{// console.log(response)
  
  const progressUrl=`http://127.0.0.1:5506/api/${'progress_'+response[0]}/`
  //const url2=`http://127.0.0.1:5506/api/${'getvalues_'+response[0]}/`
//const awsom= [url,[url2,pushdata,push2data,Analinfo,interitem1,expitem,pvfc,projectid,getfindata,re2]]
  //updateProgress(awsom)

  alert('Run your GOEA!')

  const dict = Progress;
  dict[progressUrl]='process';
 setProgress(dict)


  setoption(false)
}


// 
)
.catch(err => {
  if (window.confirm('The server is very busy. sorry'))
  {
    
    
    history('/')




    
    
  }
  else
  {
    props.getresultID([props.resultID[0],props.resultID[1],props.resultID[2],props.resultID[3],props.resultID[4],props.resultID[5],props.resultID[6],props.resultID[7]])  }

} );



     //}



   
}
const [getoption,setoption]=useState(false)
const [expitem,setexpitem]=useState(false)
const [getoption2,setoption2]=useState(false)
const [getnumber,setnumber]=useState(0) 

const ADDoption = (e) =>{
  setpushdata(e[1])
  setpush2data(e[2])
  setTimeout(  setoption(e[0])  , 100)
  
  

//  setProgress(false)
}
const triggerDownload = (imgURI, fileName) => {
  const a = document.createElement("a");

  a.setAttribute("download", "image.svg");
  a.setAttribute("href", imgURI);
  a.setAttribute("target", "_blank");

  a.click();
};
const svgchangeoption = (e) => {
  const id = e.target.id;
  const qq = document.querySelector("." + id);
  const svg = qq.querySelector("svg");

  let data = new XMLSerializer().serializeToString(svg);
  let svgBlob = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
  let url = URL.createObjectURL(svgBlob);


  triggerDownload(url);

};


const changeoption = (e) =>{
  setoption2(e[0])
  setpv(e[1])
  setfc(e[2])
  setnumber(e[3])
  

//  setProgress(false) 
}


const changeoption2 = (e) =>{


  //  props.resultID[4]
  const url=`http://127.0.0.1:5506/api/${'getvalues_'+e[0]}/`

  
  const url2=`http://127.0.0.1:5506/api/${'progress_'+e[0]}/`
 //const url=`http://127.0.0.1:5506/api/${'progress_'+response[0]}/`
//  const url2=`http://127.0.0.1:5506/api/${'getvalues_'+response[0]}/`


//updateProgress2

const awsom= [url2,[url,e[1],e[2],e[3],e[4],expitem,e[5],e[6],e[7],e[8]]]

updateProgress2(awsom)
//  props.getGOID([url,e[1],e[2],e[3],e[4],expitem,e[5],e[6],e[7],e[8]])
  
//  setProgress(false) 
}

const ExcelDownload = () => {

      
// expitem[0][3].replaceAll("."," ")
//valuess    

const getcolumns=Object.keys(re2[0])
getcolumns[12]="Values("+String(expitem[0][3].replaceAll("."," "))+")"
  const getcol=[getcolumns]
   const getvalue=     re2.map((a,i)=>{
  
  
  
  
  const keys=Object.keys(re2[0]).map((key,i)=>{
  
  return a[key]
  })
  return keys
  
  })
  
  const totalcsv=getcol.concat(getvalue)
  
  
  
  
  
  
  
  
  
  
      return (
        <>
          <CSVLink 
          
            data={totalcsv} 
            filename={"identified_proteins.csv"}
            target="_blank"
          >
            <text style={{'font-weight':'bold', "font-size": "25px" }}>{'Download' }</text>
  
          </CSVLink>
      <text>(This is a normalized table of intensity values ​​used in the input file.)</text>
      </>
      );
    };  


/*

    "id": 102,
        "proj": "5proj_TMT0712",
         "username": "ppt",
        "projecttitle": "jmj",
        "LabelMethod": "TMT",
        "FilterMethod": "ALL23",
        "AnalysisinfoTXT": "a1",
        
        "taskIdfin": "fin",
        "taskId2": "ca4a64d3-0dd8-4868-8c91-371e20b4ae13",
        "taskId3": "",
        "taskId3fin": "",
        "mergeb123": "",
        "c1source": "",
        "c2target": "",
        "finGO": ""

pvfc indexof finGO- taskid2링크
,a.taskId3,a.taskId3fin,a.mergeb123,a.c1source,a.c2target,a.finGO
const taskid=[a.taskId,a.indexinfo,a.compare,a.whole,a.Analysisinfo,a.proteincount,a.pvfc,a.taskId2,a.FilterMethod,a.AnalysisinfoTXTa.taskId3,a.taskId3fin,a.mergeb123,a.c1source,a.c2target,a.finGO] 

*/




useMemo(() => {
  
 // props.user != false?
  (

    fetch('http://127.0.0.1:5506/api/Ainfolist/')
    .then((res)=>res.json())
    .then((posts)=>{
      const explistfiluser=posts//.results
      //pvfc정보를 받아오는것이 필요하다.
      
      const tosexp= props.resultID!=false?  explistfiluser.filter(id=>id.Analysisinfo==props.resultID[4]).filter(id=>id.projecttitle== props.ProjectID[0]):false
     
      const tosTable= props.resultID!=false?tosexp.map((a,i)=>{
       
a.taskId2.split(';').map((a,i)=>{ 
          
  if(a!=''){        const url=`http://127.0.0.1:5506/api/${'progress_'+a}/`
          updateProgress1_5(url)
        }
 else{
  
 }

})

        
        const taskid=[a.taskId,a.indexinfo,a.compare,a.whole,a.Analysisinfo,a.proteincount,a.pvfc,a.taskId2,a.FilterMethod,a.AnalysisinfoTXT,a.taskId3,a.taskId3fin,a.mergeb123,a.c1source,a.c2target,a.finGO,a.Software]//,takeget 
//a.finGO  setpv, setfc 진행 //SiOpencollective

a.finGO!='' ? setpv(a.finGO.split(':')[0]): setpv(pv)

a.finGO!='' ? setfc(a.finGO.split(':')[1]):setfc(fc)
        return     taskid
            }):false
          

//           







            setexpitem(tosTable)
    })
  
  
          )
//      :setexpitem(false)  

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
 

  //0task 1비교 2 header 3column,4ainfo,5counts,6pvfc,7taskid2
  
  /*
  0: "6a173cb5-1955-47ec-8e82-5a6a0adc14ce"
1: "Exp00;3,4,5,Exp01;6,7,8,Exp10;3,4,5,Exp11;0,1,2"
2: "LFQ intensity flg22,LFQ intensity control,LFQ intensity MSP1"
3: "LFQ intensity MSP1 rep1,LFQ intensity MSP1 rep2,LFQ intensity MSP1 rep3,LFQ intensity control rep1,LFQ intensity control rep2,LFQ intensity control rep3,LFQ intensity flg22 rep1,LFQ intensity flg22 rep2,LFQ intensity flg22 rep3"
4: "a111_AnI;E5"
5: ";623;623;623;517"
6: ";3:1.5;3:1.6;3:1.8;3.3:1.5"
7: "ebb94d2d-6da4-4732-9a5e-b7fe83ae7840,9ce0872d-c071-43fb-bfdb-b78dc927cfc8;3dc92811-1ee4-4e5e-bd09-2a833cd689cd;939d3d77-3507-4014-92dc-2b74f3dc1287;063aaf7c-7b5d-4632-a795-71e4d10e37e7"
8: "NA.omit"
    
[a.taskId,a.indexinfo,a.compare,a.whole,a.Analysisinfo,a.proteincount,a.pvfc,a.taskId2,a.FilterMethod,a.AnalysisinfoTXT,a.taskId3,a.taskId3fin,a.mergeb123,a.c1source,a.c2target,a.finGO] 


a.taskId3,a.taskId3fin,a.mergeb123,a.c1source,a.c2target,a.finGO
expitem
taskId3fin
   */


  const pvfc=pv+':'+fc
  const tosids=pro.data[0].map((a,i)=>{return          a.majorityproteinids.split(';')[0]    })
    return(<>

{expitem!=false&&expitem[0][6].includes(pvfc)==false  ?  false:
expitem[0][11]=='FinAnalysis'?
<>
<br/><text>Completed analysis!, Completed GO analysis is already there!</text>
      <br/><text>wait a few seconds</text></>:
<>
<br/>
<text>wait a few seconds</text>
     </>
}

{

  /*
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
  */
}
    {expitem!=false&&expitem[0][6].includes(pvfc)==false?                                                                                                                                                                                                                                                 

<div>
  <Card style={{ width: '28rem' }}>
  
  <Card.Body>
  <Form onSubmit={uploadModule3 } >
    <Card.Title>GOEA </Card.Title>
    
 
<Form.Group >
<Form.Label>counts protein {tosids.length} ({'-log p value >'+pv})</Form.Label>
<Form.Control  value={tosids} />

</Form.Group>

<Form.Group >
<Form.Label> Analysis information </Form.Label>
<Form.Control  value={props.resultID[4]} />

</Form.Group>


<Form.Group >
<Form.Label> foldchange and p value </Form.Label>
<Form.Control  value={pv+','+fc} />

</Form.Group>


  <Button variant="secondary"  type="submit">
    Submit
  </Button>
   <Button  variant="light"  onClick={()=> setoption(false)} >
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
  </svg>
  </Button>
  </Form>
  
    
  </Card.Body>
  </Card>
  </div>:
 expitem[0][7].split(';').map((a,i)=>{

//  const getprogress=expitem[0][16][i]
  
const fingo= expitem[0][15]

const c2target=  expitem[0][14]
const c1source=expitem[0][13]
const mergeb123=expitem[0][12]
const taskId3fin=expitem[0][11]
const taskId3=expitem[0][10]


const getfindata=[taskId3,taskId3fin,mergeb123,c1source,c2target]
   const pvval= expitem[0][6].split(';')[i].split(':')[0]
   const fcval= expitem[0][6].split(';')[i].split(':')[1]
   const counts=expitem[0][5].split(';')[i]
const pvfc2=expitem[0][6].split(';')[i].split(':')[0]+':'+expitem[0][6].split(';')[i].split(':')[1]
   
const ckfinanalysis= (fingo == pvfc2 )&& (taskId3fin=='FinAnalysis')



//taskId3fin
//FinAnalysis
//a = taskid2 ckfinanalysis==false && expitem[0][6].split(';')[i]!=pvfc? 
/*
 return(


      <>
      <br/>
      {ckfinanalysis==true ? <Button variant="info" onClick={()=> changeoption([true,pvval,fcval,i])}>{'FIN_Analysis('+fingo+')'}</Button>
  

:
    <Button variant="link" onClick={()=> changeoption([true,pvval,fcval,i])}>{'pvalue='+pvval+','+'fc='+fcval+','+'counts='+counts}</Button>}

<Button  variant="light"  onClick={()=>  setoption(false)} >
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
  </svg>
  </Button>
  
 
  <br/>
  
{getoption2!=false&&getoption!=false&&getnumber==i?   <Button variant="dark" onClick={()=> changeoption2([a,pro.data[0],pro.data[1],props.resultID[4],interitem1,pvval+':'+fcval,re2[0].proj,getfindata,re2])} >{'goGOEA'}</Button>



:false}
 <Button variant="info" onClick={()=> changeoption2([a,pro.data[0],pro.data[1],props.resultID[4],interitem1,pvval+':'+fcval,re2[0].proj,getfindata,re2])}>{'FIN_Analysis('+fingo+')'}</Button>

<Button  variant="light"  onClick={()=>  setoption(false)} >
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>
</Button>

<br/>
</>

    )

    <Button  variant="light"  onClick={()=>  setoption(false)} >
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>
</Button> x 버튼이 필요가 없음.
*/


const url=`http://127.0.0.1:5506/api/${'progress_'+a}/`

if (ckfinanalysis==true){
  return    changeoption2([a,pro.data[0],pro.data[1],props.resultID[4],interitem1,pvval+':'+fcval,getproperty.proj,getfindata,re2])



}
else if((taskId3fin!='FinAnalysis') && (Object.keys(Progress).filter(n=> n==url).length>0)   ){
 

updateProgress(url)
      
  

  return( <>
    <br/>
    
  <Button variant="link" style={{"padding":"5px"}} onClick={()=> changeoption([true,pvval,fcval,i])}>{'pvalue='+pvval+','+'fc='+fcval+','+'counts='+counts}</Button>


  {getoption!=false &&  Progress[url]=='process'   ?  getnumber==i? <span class="badge bg-secondary" style={{"padding":"5px"}}> <text style={{ 'font-weight':'bold' }}>process</text></span>: <span class="badge bg-secondary" style={{"padding":"5px"}}> <text style={{ 'font-weight':'bold' }}>process</text></span> 
 
    :false }
    



  {getoption2!=false&&getoption!=false && Progress[url]=='fin' ? getnumber==i     ? <Button variant="dark" style={{"padding":"5px"}} onClick={()=> changeoption2([a,pro.data[0],pro.data[1],props.resultID[4],interitem1,pvval+':'+fcval,getproperty.proj,getfindata,re2])} >{'goGOEA'}</Button>
// <br/><text>wait a few seconds</text></> 
:false : false }



<br/>
</> )
}
   
  })
 

  }
  </>

//1122,1104 line re2[0].proj <span class="badge bg-secondary" style={{"padding":"5px"}}>  <text style={{ ,'font-weight':'bold' }}>process</text></span>

/*
{getoption2!=false&&getoption!=false&&getnumber==i ? false  : Progress[url]=='fin' ?  <Button variant="dark" style={{"padding":"5px"}} onClick={()=> changeoption2([a,pro.data[0],pro.data[1],props.resultID[4],interitem1,pvval+':'+fcval,getproperty.proj,getfindata,re2])} >{'goGOEA'}</Button>



: <span class="badge bg-secondary" style={{"padding":"5px"}}>  <text style={{ 'font-weight':'bold' }}>process</text></span>   }

*/


    )}



  const tosdata= (e)=>{
    setvennvalues([e.values,e.sets])
           }


  useMemo(() => {
  
  props.reset1==1?  setinteritem1([]):setinteritem1(interitem1)

  
}, [props.reset1])
          

const uploadModule =async (e) =>{
    e.preventDefault();
    
    //expitem
   const fcval = e.target[0].value
   const pval = e.target[1].value
   setfc(fcval)
   setpv(pval)
   
  }
  useEffect(()=>{ 
    
//    console.log(props)

        async function get3() {  
          try { setLoading(true);
        const result =  await axios.get(`http://127.0.0.1:5506/api/${props.resultID[0]}/`).then((response) => {//,page:`${item2}`
        
       
        return response.data//.result
        
        }) 
//        chrinfo
//        console.log(result)
        setre2(result)
        setgetproperty(result[0])

     



/*

  

const listlist=props.resultID[2].split(',')
const wholelist=props.resultID[3].split(',')

const toss2 = Array.from( [props.resultID[1]])

const toss2val=  [...Array((toss2[0].split('Exp').splice(1).length/2))].map((a,i)=>{
    
    return     i
    
    
    })

    settossdata(toss2val)
const arraytoss=toss2[0].split('Exp').splice(1).map((a,i)=>{
return a

//00,01,10,11
//[1].split(',')[0]/3
//var mySet = Array.from(new Set( [Math.floor(0.1),Math.floor(0.2),Math.floor(0.3) ,Math.floor(1.3)  ]))

  
})


const getvaluesve=toss2val.map((item,index)=>{


 const tossindex=  arraytoss.filter(id=>String(id.split(';')[0][0])==String(index))
const conditionlist= tossindex.map((a,i)=>{

 const Ncounts=   parseInt((wholelist.length)/(listlist.length))

    
   const setlist= a.split(';')[1].split(':').map((aa,k)=>{
return Array.from(new Set(  aa.split(',').filter(id=>id!='').map((b,j)=>{

  return wholelist[b].split('.').slice(0,-1).join(' ')
}) 
))   

   }) 
   
//   .split(',').filter(id=>id!='').map((b,j)=>{       return wholelist[b]//.split('.').splice(0,3).join(' ')    })       //3,4,5

    var mySet = setlist

return mySet
 }).join('  vs  ') 



const jspvalue=  result.map((raw)=>{
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
    const sampleheader=Object.keys(result[0]).filter(n=>n!='valuess')
    const wholedata=result.map(val=>{return sampleheader.map(a=>{return val[a]})})
    const labeltag=['compare'+(parseInt(index)+1)+'up','compare'+(parseInt(index)+1)+'down','compare'+(parseInt(index)+1)+'similar']
    
    return [updownsimdiflist,labeltag,originparsedata,sampleheader,wholedata,conditionlist,newdataset,upmap,downmap,newdatanodeinfo]//,comparelabels




})

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
      const precomplist =       getvaluesve.map((item, i) => {
        const item2= item.length>0? item[5]:[]
      return item2
        })
        const prenewdataset2 =       getvaluesve.map((item, i) => {
          const item2= item.length>0? item[6]:[]
        return item2
          })


          const preupmapset2 =       getvaluesve.map((item, i) => {
            const item2= item.length>0? item[7]:[]
          return item2
            })

            const predownmapset2 =       getvaluesve.map((item, i) => {
              const item2= item.length>0? item[8]:[]
            return item2
              })
//          setdataset(newdataset)
const premjproteininfo =       getvaluesve.map((item, i) => {
  const item2= item.length>0? item[9]:[]
return item2
  })

const    vennvalabel=[venvalue,venlabel]

const combinationbefore=wholecomb(venlabel,venlabel.length,toss2val.length)
const combinations=combinationbefore[0]
const combinations_holl=combinationbefore[1]
const preoutcomb = setcombination(combinations,vennvalabel,combinations_holl)//.filter(n=>n.values.length>0)
const exportexcel= funcex2cel(preoutcomb,compareoriginparsedata,sampleheader_thr,wholedata_thr)


const preexdata=exportexcel[1]
const exheader=exportexcel[0]

const prevennitems=    preoutcomb.filter(id=>id.sets.length==1).map(a=>{return a.sets[0]})  

settosscomplist(precomplist)
setschartdata(prenewdataset2)
setdownmplot(predownmapset2)
setupmplot(preupmapset2)
setvenndata(preoutcomb)
setvenninfodata(preexdata)

settossmjproteininfo(premjproteininfo)
settossvennitems(prevennitems)
*/





























      }

      //proj
        
        catch (e) { 

          setre2(false)
          setgetproperty(false)
        
        }
      
      
      
        setTimeout(function() {
      
          setLoading(false);
      
         }, 2500); 
           }
           get3()
           
           
           



           
    },[props.resultID])



   
  


    useEffect(()=>{
//      props.user != false ?
(
        
    fetch('http://127.0.0.1:5506/Imgview/')
    .then((res)=>res.json())
    .then((posts)=>{
      const explistfiluser=posts//.results
      const tosexp= props.resultID!=false?   explistfiluser.filter(id=>(id.description==props.EXPID) ).filter(id=>(id.projecttitle==props.ProjectID[0]) ):false
      const imagefiles=props.resultID!=false?  tosexp.filter(ab=>ab.attr!="MissingValue").map((a,i)=>{
       return [ a.imagefiles      ,a.attr]
     
    
      }):false
        

      setimages(imagefiles)
    })
  
  
  
          )
//      :setimages(false)

















   
  },[props.resultID])

    
  



/*
  const newdataset2 = useMemo(() => schartdata, [pv,fc]);
const downmapset2 = useMemo(() => downmplot, [downmplot]);
const upmapset2 = useMemo(() => upmplot, [upmplot]);
const outcomb = useMemo(() => venndata, [venndata]);

const exdata = useMemo(() => venninfodata, [venninfodata]);
const toss2val = useMemo(() => tossdata, [tossdata]);
const complist = useMemo(() => tosscomplist, [tosscomplist]);
const mjproteininfo = useMemo(() => tossmjproteininfo, [tossmjproteininfo]);
const vennitems = useMemo(() => tossvennitems, [tossvennitems]);
*/
  const CreateList = () => {
    
    const [val,setval] = useState([])
   const [cutfc,setcutfc]=useState([])
   const [cutpi,setcutpi]=useState([])
 
const [combina,setcombina]=useState([])
const [sub,setsub]=useState('')
const [sub2,setsub2]=useState('')
const [dataset,setdataset]=useState('')
  
  

const listlist=props.resultID[2].split(',')
const wholelist=props.resultID[3].split(',')

const toss2 = Array.from( [props.resultID[1]])

const toss2val=  [...Array((toss2[0].split('Exp').splice(1).length/2))].map((a,i)=>{
    
    return     i
    
    
    })
const arraytoss=toss2[0].split('Exp').splice(1).map((a,i)=>{
return a

//00,01,10,11
//[1].split(',')[0]/3
//var mySet = Array.from(new Set( [Math.floor(0.1),Math.floor(0.2),Math.floor(0.3) ,Math.floor(1.3)  ]))

  
})


const getvaluesve=( re2!=false  &&loading==false)? 
toss2val.map((item,index)=>{


 const tossindex=  arraytoss.filter(id=>String(id.split(';')[0][0])==String(index))
const conditionlist= tossindex.map((a,i)=>{

 const Ncounts=   parseInt((wholelist.length)/(listlist.length))

    
   const setlist= a.split(';')[1].split(':').map((aa,k)=>{
return Array.from(new Set(  aa.split(',').filter(id=>id!='').map((b,j)=>{

  return wholelist[b].split('.').slice(0,-1).join(' ')
}) 
))   

   }) 
   
//   .split(',').filter(id=>id!='').map((b,j)=>{       return wholelist[b]//.split('.').splice(0,3).join(' ')    })       //3,4,5

    var mySet = setlist

return mySet
 }).join('  vs  ') 



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

const combinationbefore=wholecomb(venlabel,venlabel.length,toss2val.length)
const combinations=combinationbefore[0]
const combinations_holl=combinationbefore[1]
const outcomb = setcombination(combinations,vennvalabel,combinations_holl)//.filter(n=>n.values.length>0)
const exportexcel= funcex2cel(outcomb,compareoriginparsedata,sampleheader_thr,wholedata_thr)


const exdata=exportexcel[1]
const exheader=exportexcel[0]
/*
const [schartdata,setschartdata]=useState(prenewdataset2)
const [downmplot,setdownmplot]=useState(predownmapset2)
const [upmplot,setupmplot]=useState(preupmapset2)

const [venndata,setvenndata]=useState(preoutcomb)
const [venninfodata,setvenninfodata]=useState(preexdata)
*/

//schart
//newdataset2

//mplot
//upmapset2 
//downmapset2

//venn
//outcomb
//exdata


const vennitems=    outcomb.filter(id=>id.sets.length==1).map(a=>{return a.sets[0]})  
const venntos = (e) => {
       props.tosvennvalues([outcomb,exdata,exheader,pv,fc])
  
   //     history('/govisualization')
      }

      
      const palette2= ["blue","#E31A1C",  "#6A3D9A","black"
      , "green"
      ,"#CAB2D6"
      ,"#FDBF6F","#FFF0F5","#8B0000","#FF33CC"
    ,"darkturquoise",
      "#FFA500" ,'#A52A2A' ,'#B5B5B5'
    ]

   //raw 1919
   //toss2val.length>0  &&re2!=false &&loading==false? 
   //toss2val !=undefined
    return(
<>   


   
  <Suspense fallback={<h1>Loading posts...</h1>}>

  
    <Segment>
{ toss2val.length>0  &&re2!=false &&loading==false? 
 toss2val.map((item,index)=>{

  const stringvalue=  complist[index].replace(/ /g, '').replace('.', ' ');
return(
 <>     
    
   
    <div style={{"font-size": "25px",'font-weight':'bold' , "font-size": "25px" ,"word-break":"break-all"}}>Compare {index+1}&nbsp;
         <a  onClick={() => [setShow32(true),setshowindex(index),setshowcomparelist(complist[index])]} >
    <BsQuestionLg id="btncircle"/> 
      </a>  </div>



    <Col lg=    {8 }sm=  {8}   style={{textAlign: "left" }}>




<br/>


    
   <div className={stringvalue+'0'}>
<Scharts data={newdataset2[index]} mjproteininfo={mjproteininfo[index]}  getinterNodes={getinterNodes}  />
</div>
<div> <Button variant="link" id={stringvalue+'0'} onClick={(e) => svgchangeoption(e)}>
          {" "}
         Export svg(Vol)
        </Button></div>
      



</Col>

<Col lg=  {{ span: 11, offset: 0.1 }} sm=    {{ span: 12, offset: 0.1 }} >

        


<div className={stringvalue+'1'}>

<Mplot remap={upmapset2[index]} user={props.user} fc={fc} ck={'up'} getinterNodes={getinterNodes}  style={{
          "margin": "1%"
        }}/>
        </div>
        <div> <Button variant="link" id={stringvalue+'1'} onClick={(e) => svgchangeoption(e)}>
          {" "}
         Export svg(Manhattan+)
        </Button></div>
        

        <div className={stringvalue+'2'}>

<Mplot remap={downmapset2[index]}  user={props.user} fc={fc} ck={'down'} getinterNodes={getinterNodes} style={{
          "margin": "1%"
        }}/>
        </div>
        <div> <Button variant="link" id={stringvalue+'2'} onClick={(e) => svgchangeoption(e)}>
          {" "}
         Export svg(Manhattan-)
        </Button>
        </div>
</Col>
<Divider/>
</>
  )
  //history('/goselect')  
  //<Createscatterplot data={newdataset}/>
})


//expitem[0][11]
//expitem!=false&&expitem[0][11]
: false }




{expitem!=false&&expitem[0][11]=='FinAnalysis'? 

<> 

<text style={{"font-size": "25px" }}> Fin_Analysis(-log pvalue={pv},log <sub>2</sub>foldchange={fc} ) </text>



</>
:<>
<text style={{"font-size": "25px" }}> Change cutoff value</text>

<a  onClick={() => setShow33(true)} style={{ 'backgroundColor':'white','border':0,"font-size": "25px"}}>
    <BsQuestionLg id="btncircle"/> 
      </a> 
<Form onSubmit={uploadModule}>
      <Form.Group >
      <Form.Label>log₂foldchange value </Form.Label>
        <Form.Control style={{ width: '10rem' }}  fluid label='log₂foldchange value' placeholder={fc} defaultValue={fc} name='FC'/>
        <Form.Label>-log p value </Form.Label>

        <Form.Control style={{ width: '10rem' }} fluid label='- log pvalue' placeholder={pv} defaultValue={pv} name='PV' />
        
      </Form.Group>
      <Button style={{ width: '10rem' }} variant="outline-dark"   size="sm"  type="submit">Submit</Button>
     
    </Form>

</>


}




</Segment>

<Segment>

<Container>
  <Row>
  <div style={{"font-size": "25px" }}>VennDiagram</div>
  </Row>
  <Row>
    <div>
  <Button variant="link" id="Venn" onClick={(e) => svgchangeoption(e)}>
          {" "}
          Export svg(Venn)
        </Button>
        </div>
  </Row>
   <Row>

     <Col 
     className="d-flex flex-col justify-content-start align-items-center"
     > 
     

<div className='Venn' >
    <Venndiagram data={outcomb} tosdata={tosdata} exdata={exdata} />
    </div>
    </Col>
    
    </Row>
    </Container>

    </Segment>
    { getvenn!=false? 
<Segment>

<Container> 
  <Row>

<Col lg=  {{ span: 11, offset: 0.1 }} sm=    {{ span: 12, offset: 0.1 }}> 
  
<> 
 <div style={{"font-size": "25px"  }}>{getvenn[1].join(',')}</div>
 <p></p>
 <div className="Palette" style={{'font-weight':'bold' ,'color':'white','textAlign':'center'}}>

 {getvenn[1].map((c,i) =>  {
const indexOfvennarea=  vennitems.indexOf(c)
     return     <div style={{ backgroundColor: `${palette2[indexOfvennarea]}` }}>&nbsp;{c}&nbsp;</div>


        })}
        </div>
       
      
<div className='Manhattan0'>
    <Mplot2 remap={upmapset2} user={props.user} fc={fc} pv={pv}  ck={'up'} getvenn={getvenn} vennitems2={vennitems} getinterNodes={getinterNodes}  style={{
        }}/>

</div>


        
<div className='Manhattan1'>

<Mplot2 remap={downmapset2}  user={props.user} fc={fc} pv={pv} ck={'down'} getvenn={getvenn} vennitems2={vennitems} getinterNodes={getinterNodes} style={{
        }}/>


        </div>


        
        </>
       
        </Col>
    
    </Row>
    
   </Container>
   </Segment>
    :false}

<Divider/>
   {//<Navigator interitem1={interitem1} interitem2={interitem2} resetinterNodes={resetinterNodes} indexinfo={1}/>  
}
    
   <Divider/>

   <Segment>
   <Container> 
   <text style={{"font-size": "25px" }}> GO analysis&nbsp;  
   <a  onClick={() => setShow34(true)} style={{ 'backgroundColor':'white','border':0}}>
    <BsQuestionLg id="btncircle"/> 
      </a> 
   </text>
   <br/>

   <Button variant="outline-dark"    onClick={() => ADDoption([true,exdata,outcomb])} >go to GOEA</Button> 

  
 {getoption!=false && props.resultID!=false ?<Example data={[exdata,outcomb]}/>:false}
 <br/>

 </Container>
 </Segment>

</Suspense>


</>


       )}

//This analysis has ended.

    if (loading) return (<>
      <Container  id='wholeA' >        <Row></Row>
      <div  id='SCAFFOLD3'  >
    <Loader.Audio color="#00BFFF" height={600} width={600}/>
    </div>

    </Container></>)


props.getITEM1(interitem1)


    return(<>

    <Container  id='wholeA' >   
    
     <Row  > 

     <Col lg={6} sm={6} class='Headerstyle'  style={{"display": "flex", "align-items":"center",'padding':'5px'}}>
     <text style={{'font-weight':'bold', "font-size": "25px" }}>  &nbsp;VMV visualization&nbsp;  
     <a  onClick={() => setShow(true)} style={{ 'backgroundColor':'white','border':0,"font-size": "25px"}}>
    <BsQuestionLg id="btncircle"/> 
      </a> 
     
     
     <br/> (Volcano plot,manhattan plot,venndiagram)&nbsp;  </text>      
  

      
     </Col>

       </Row>
       
     <div  id='SCAFFOLD'  >
 
      
        <Row>
      <Col xs={4}
       sm={4}
       lg={4} >
      <text style={{'font-weight':'bold', "font-size": "25px" }}>{re2.length + '' + 'proteins were identified.' }</text>
      </Col>
      <Col style={{"display": "flex", "justify-content": "start","align-items":"center"}}>
{re2!=false&&expitem!=false?     

      <ExcelDownload   />

:false    }

      
      
      </Col>
    </Row>
    {images!=false?
    <Row>
    <Col xs={4}
       sm={4}
       lg={4} >
      </Col> 
  <Col style={{"display": "flex", "justify-content": "start","align-items":"center"}}>       
  
 <> <Button variant="link"   onClick={() => setShow2(true)}  style={{ "font-size": "15px"}}   >Normalization imgaes&nbsp;</Button>
  
  
  <a  onClick={() => setShow31(true)} style={{ 'backgroundColor':'white','border':0,"font-size": "15px"}}>
    <BsQuestionLg id="btncircle"/> 
      </a> </>
      
  
  </Col>
    

        </Row>

:false
}

 <CreateList/>
 
</div>
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
         <p> This is the first step in your analysis!</p>  

       <p>
This page provides information that appears after selecting CONDITION as Volcano plot, venndiagram, and manhattan plot.   </p> 
      <p>
       
The identified proteins can be downloaded in csv format. 
      </p>
      <p> Volcano plot, venndiagram, and manhattan plot can be downloaded as "export svg".</p>
      
      <p>
If you select a node for each area of ​​the plot, it is added to "Protein Basket's ProteinfromVMVPAGE" that can be utilized in network analysis. </p>
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
         {images!=false?  
     <Container>
   


 {images.map((a,i)=>{

return(
    <><Row>
        <text style={{ "font-size": "15px",'fontWeight': 'bold',textAlign: "left","display": "flex"}}>
         {a[1].includes('Clean')? a[1].replace('Clean','RAW') : a[1]}
         </text>
    
         <Image
          src={a[0]}
          className='img-thumbnail'
          alt='...'
          />
    </Row>
    </>
      )
  }) }

    
  
       
       
       </Container>:false}
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
            
       <p> The missing value figure according to the filter method, in the case of TMT study, shows the difference when the IRS scale is applied. </p>
      

       
       
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
          Volcano plot (compare{showindex+1})
          </p>
          <p>comparison group :{showcomparelist}</p>
            
       <p> 
After DEP analysis between the compared groups, values ​​below -log pvalue ({' < 3.0'}) are displayed in gray. </p>
       <p> 
        
Using the log<sub>2</sub> foldchange value (default value of 1.5), it is displayed as 1.5 or more (red), -1.5 to 1.5 (black), and -1.5 or less (blue).
         </p>
       <p> 
       The red, black, and blue regions are named compare{showindex+1}up,compare{showindex+1}similar,compare{showindex+1}down in this analysis.
</p>
       <p> For the proteins that cut off the -log pvalue value of the volcano plot, the genome location information and log<sub>2</sub>fold change value of the protein are displayed as a manhattan plot.</p>
       <p> 
"Genome locus info (up)"
indicates the positive region of the -log pvalue or higher protein in the volcano plot, and "Genome locus info (down)" indicates the negative region using the absolute value.  </p>
       

<p>

Chromosome information was confirmed through the Osativa_323_v7.0.gene.gff3.gz file of phytozome.</p>
      

       
       
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
          </p>
          <p>
          If you input different numbers for pvalue and foldchange, the result of applying the new cutoff is drawn.          </p>
  

      

       
       
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

          Go analysis is performed using goatools, a python library.          </p>
    

      

       
       
         </Modal.Body>
       </Modal>


       



    </>
      )

}
export default Scaffold3_4;









/*
  <Row style={{textAlign:"left"}}> 
       <Col lg={4} sm={6} >
{       expitem!=false&&expitem[0][11]=='FinAnalysis'?<> <text style={{ "font-size": "15px"}}> Finished Analysis</text>
<br/>
<Button variant="light" style={{ "font-size": "15px"}}  onClick={() => setShow41(true)}>  Network Metadata </Button></>
 :false  }
         </Col>
       <Col lg={1} sm={1}  style={{textAlign: "left"}}></Col>
       <Col  lg={7} sm={5} style={{textAlign: "left" ,"margin-top":'1%'}}> 
    

       </Col>
      
      
 
      
       </Row>
*/