import React,{useState, useEffect,useMemo,Suspense} from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router'
//import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';  // DatePicker 라는 컴포넌트도 가져오깅
import "react-datepicker/dist/react-datepicker.css"; 
import { Alert } from 'reactstrap';
import $ from 'jquery';
import {InputGroup, Container,Col,Row,Image,Modal,Button,Card,Form,Table} from 'react-bootstrap'; 
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
import Navigator from "../Modal/Navigator";
import { BsQuestionLg } from 'react-icons/bs';


//Analysisname,GOID,ProteinName,Chrinfo,ProteinDescription,log2FC,-logPV,Vennarea

function calgetgo(rere3) { 

const rere4=  rere3.filter(id=>id.counts>0).filter(id=>id.pv<=0.05)
  const bp=     rere4.filter(id=>id.go_cluster=="BP")
  const cc=      rere4.filter(id=>id.go_cluster=="CC")  
  const mf=      rere4.filter(id=>id.go_cluster=="MF")  
  const valbp=bp.map((a,i)=>{
    
    return {Golist:a.Golist,NOD:a.counts,go_description:a.go_description,items:a.items,idconvert:a.idconvert,fdr:a.fdr,type:'bp'}
  })
const valcc=cc.map((a,i)=>{

    return {Golist:a.Golist,NOD:a.counts,go_description:a.go_description,items:a.items,idconvert:a.idconvert,fdr:a.fdr,type:'cc'}
  })
const valmf=  mf.map((a,i)=>{

    return {Golist:a.Golist,NOD:a.counts,go_description:a.go_description,items:a.items,idconvert:a.idconvert,fdr:a.fdr,type:'mf'}
  })

  valbp.sort(function(a, b)  {
    return b.NOD - a.NOD;
  });
  valcc.sort(function(a, b)  {
    return b.NOD - a.NOD;
  });
  valmf.sort(function(a, b)  {
    return b.NOD - a.NOD;
  });

  const top10mf=valmf//.splice(0,20)
  const top10cc=valcc//.splice(0,20)
  const top10bp=valbp//.splice(0,20)
 
const data2= [[
    "Element",
    { role: "style" }
    , {label: 'Molecular Function', type: 'number'}, {label: 'Cellular Component', type: 'number'} 
    , {label: 'Biological Process', type: 'number'} 
  
  ]
  ]

const mfdata=  top10mf.map((a,i)=>{

 return   [a.go_description,'red',{v:parseInt(a.NOD),f:a.Golist},null,null]//a.Golist+';'+
  })
const ccdata=top10cc.map((a,i)=>{

    return   [a.go_description,'blue',null,{v:parseInt(a.NOD),f:a.Golist},null]//a.Golist+';'+
     })
   
  const bpdata=   top10bp.map((a,i)=>{

        return   [a.go_description,'gray',null,null,{v:parseInt(a.NOD),f:a.Golist}]//a.Golist+';'+
         })

const condata2=data2.concat(mfdata)
const concatdata=condata2.concat(ccdata)
const concatdata2=concatdata.concat(bpdata)



  return concatdata2
}
    
function Scaffold3_5(props){
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [selectvalue, setselectvalue] = useState(false);
    const [re3,setre3]=useState(false)
    const [re4,setre4]=useState(false)
    const history = useNavigate()
    const [loading, setLoading] = useState(null)
    const [exdata,setexdata]=useState(false)
    const [ex2data,setex2data]=useState(false)
    const [pie,setpie]=useState(false)
    const [pie2,setpie2]=useState(false)
    const [getexp,setgetexp]=useState(false)
    const [compid,setcompid]=useState(false)
    const [getarrayvalue,setarrayvalue]=useState(false)
    const [getarrayvalue2,setarrayvalue2]=useState(false)
    const [gettf,settf]=useState(false)
    const [interitem1,setinteritem1]= useState([]);
    const [interitem2,setinteritem2]= useState([]);
    const [interitem3,setinteritem3]= useState([]);
    const [getGO,setgetGO]=useState([]);
    const [mergeitem,setmergeitem]= useState([]);

    const renderLabel = (label) => ({
  
      color: label.label.color,
     content: `${label.text}`+ `(${label.label.comment})`  ,
      
      icon: 'check',
    })

    const goDEP = (e) => {


      localStorage.removeItem('getitem1')
      localStorage.removeItem('getitem2')
      localStorage.removeItem('interitem3')
      localStorage.removeItem('reset1')
      localStorage.removeItem('reset2')
      alert("Now that we hit refresh, we're back to the DEP analysis process.")
      history('/results')
      };
//concatdata2

//exdata(whole),ex2data(venn) ,mergeitem (interesting) ,getGO(go item)



useEffect(()=>{
 const url=props.GOID[0]
 setexdata(props.GOID[1])
 setex2data(props.GOID[2])







 setinteritem1(props.GOID[4])

 async function get4() {  
        try { setLoading(true);
      
            const result = await axios.get(`${url}`).then((response) => {//,page:`${item2}`
       
        return response.data//.result
        
        })
//console.log(result)
        setre3(result)
        setgetGO([calgetgo(result),result])
        
    }
        catch (e) { 
            setre3(false)
        }
  
    
        setTimeout(function() {
      
            setLoading(false);
          
           }, 2500); 
        }
        get4()
     
    
 


    },[])

    
const getinterNodes= (text) => {

  

  const interitem = interitem2
const pushitem=   interitem2.length >0?   interitem.push(text) : [text]

const setitem=new Set(interitem)
const arrayitem=[...setitem]
setinteritem2([])
interitem2.length >0?  setinteritem2(arrayitem): setinteritem2(pushitem)
    
setpushck(false)

}

const getinterNodes2= (e) => {

const text=   document.querySelectorAll('.textareaitem')[0].value
  
  const textsplit = text.split(',')

const setitem=new Set(textsplit)
const arrayitem=[...setitem]
setinteritem3([])
 setinteritem3(arrayitem)
    


}


    const resetinterNodes= (text) => {

      setinteritem2([])
        
    }


    const STORY_HEADERS = [
      //{        prop: "Analysisname",        title: "Analysisname",        isFilterable: true      },
      
      {
        prop: "GOID",
        title: "GOID",
        isFilterable: true
      },
      
      {
        prop: "GO_fdr",
        title: "GO_fdr",
      },
      {
        prop: "GO_pv",
        title: "GO_pv",
      },
      {
        prop: "ProteinName",
        title: "ProteinName",
        isFilterable: true,
        
          cell: row => (
           
           /*<a href={row.Analysis} target="_blank">
              
            </a>*/ 
           
           
            (<a onClick={(e)=>getinterNodes(row.ProteinName)}>{row.ProteinName}</a>)
            
            
          )
        
        
    
      },
      
      {
        prop: "Chrinfo",
        title: "Chrinfo",
        isFilterable: true
      },{
        prop: "ProteinDescription",
        title: "ProteinDescription",
        isFilterable: true
        
      
      }
      
     // ,{        prop: "log2FC",        title: "log2FC"     },{        prop: "-logPV",        title: "-logPV"        }
      
      ,{
        prop: "Vennarea",
        title: "Vennarea",
        isFilterable: true,
        
        cell: row => (
         
         /*<a href={row.Analysis} target="_blank">
            
          </a>*/ 
         
         
          (<text style={{'word-wrap':'break-word'}}>{row.Vennarea}</text>)
          
          
        )
      
        
      
      }
      
    ];
    



    const CreateList = () => {
     
        const options = {
            title: "GOEA",
            width: "105%",  
            height: "95%",
            bar: { groupWidth: "105%" },
            //tooltip: { trigger: "selection" },
    //        legend: { position: "none" },
    
            vAxis: {
              baselineColor: '#fff',
              gridlineColor: '#fff',
              textPosition: 'none',
              title: 'GO Description'
          },
            hAxis: {
             
              textStyle: {
                fontSize : 12
              },
              title: 'Number of Item(protein)'
          },
        }
        const rere4=  re3.filter(id=>id.counts>0).filter(id=>id.pv<=0.05)

  const bp=     rere4.filter(id=>id.go_cluster=="BP")
  const cc=      rere4.filter(id=>id.go_cluster=="CC")  
  const mf=      rere4.filter(id=>id.go_cluster=="MF")  
  const valbp=bp.map((a,i)=>{
    
    return {Golist:a.Golist,NOD:a.counts,go_description:a.go_description,items:a.items,idconvert:a.idconvert,fdr:a.fdr,type:'bp'}
  })
const valcc=cc.map((a,i)=>{

    return {Golist:a.Golist,NOD:a.counts,go_description:a.go_description,items:a.items,idconvert:a.idconvert,fdr:a.fdr,type:'cc'}
  })
const valmf=  mf.map((a,i)=>{

    return {Golist:a.Golist,NOD:a.counts,go_description:a.go_description,items:a.items,idconvert:a.idconvert,fdr:a.fdr,type:'mf'}
  })

  valbp.sort(function(a, b)  {
    return b.NOD - a.NOD;
  });
  valcc.sort(function(a, b)  {
    return b.NOD - a.NOD;
  });
  valmf.sort(function(a, b)  {
    return b.NOD - a.NOD;
  });

  const top10mf=valmf//.splice(0,15)
  const top10cc=valcc//.splice(0,15)
  const top10bp=valbp//.splice(0,15)
 
const data2= [[
    "Element",
    { role: "style" }
    , {label: 'Molecular Function', type: 'number'}, {label: 'Cellular Component', type: 'number'} 
    , {label: 'Biological Process', type: 'number'} 
  
  ]
  ]

const mfdata=  top10mf.map((a,i)=>{

 return   [a.go_description,'red',{v:parseInt(a.NOD),f:a.Golist},null,null]//a.Golist+';'+
  })
const ccdata=top10cc.map((a,i)=>{

    return   [a.go_description,'blue',null,{v:parseInt(a.NOD),f:a.Golist},null]//a.Golist+';'+
     })
   
  const bpdata=   top10bp.map((a,i)=>{

        return   [a.go_description,'gray',null,null,{v:parseInt(a.NOD),f:a.Golist}]//a.Golist+';'+
         })

const condata2=data2.concat(mfdata)
const concatdata=condata2.concat(ccdata)
const concatdata2=concatdata.concat(bpdata)

const mfanoddata=top10mf.map((a,i)=>{

  return   parseInt(a.NOD)//a.Golist+';'+
   })
const ccanoddata=top10cc.map((a,i)=>{

  return   parseInt(a.NOD)//a.Golist+';'+
   })
const bpanoddata=top10bp.map((a,i)=>{

  return   parseInt(a.NOD)//a.Golist+';'+
   })

   const noddata= mfanoddata.concat(ccanoddata)
   const mfccbpnoddata=noddata.concat(bpanoddata)
  const max_nod = Math.max(...mfccbpnoddata)
 const maxnodindex= mfccbpnoddata.indexOf(max_nod)

//console.log(concatdata2)

//
return ( <>

  
        <div className='GO'>
        <Button variant="link" id="GO" onClick={(e) => svgchangeoption(e)}>
          {" "}
          Export svg(GOEA)
        </Button>
<Chart
      chartType="BarChart"
      width="1000px"
      height="800px"
      data={concatdata2}
      options={options}
      chartEvents={[
        {
          eventName: 'select',
          callback: ({ chartWrapper }) => {
            const chart = chartWrapper.getChart()
           // chart.setSelection([{row:maxnodindex, column:1}]);
            const selection = chart.getSelection()
            
            if (selection.length === 1) {
              const [selectedItem] = selection
              ckhubline2(concatdata2[selectedItem.row+1],exdata,re3,concatdata2)
             
            }
/*            else{
              ckhubline2(concatdata2[maxnodindex+1],exdata,re3,concatdata2)

             
            }*/
          },
        },
      ]
    
    
    }
    />
    </div>
   

</>
)


    }

const CreateDiv=()=>{
  const piedata=[["Venn Area Name", "Counts"]]
  pie.map(
    (a,i)=>{
      piedata.push(a)
    }
  )
  const pieOptions = {
 
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
      }
     
    ],
    backgroundColor: {
      fill: "none",
    },
/*
*/

    legend: {
      position: "bottom",
      alignment: "center",
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
      width:'95%',
    },
    fontName: "Roboto",
    
  };
return(
  <Chart
  chartType="PieChart"
  data={piedata}
  options={pieOptions}
  graph_id="PieChart2"
  width={"400px"}
  height={"450px"}
  legend_toggle={true}
/>
)

 }

 
const CreateDiv2=()=>{
  const piedata3=[["chr Name", "Counts"]]
  pie2.map(
    (a,i)=>{
      piedata3.push(a)
    }
  )
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
      }
    ],
    backgroundColor: {
      fill: "none",
    },
/*
*/

    legend: {
      position: "bottom",
      alignment: "center",
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
      width:'95%',
    },
    fontName: "Roboto",
    title: "test",
   
  };
return(
  <Chart
  chartType="PieChart"
  data={piedata3}
  options={pieOptions2}
  graph_id="PieChart"
  width={"400px"}
  height={"450px"}
  legend_toggle={true}
/>
)

 } 

 const Tablediv=()=>{

  return(
  <DatatableWrapper
  body={getexp}
  headers={STORY_HEADERS}
  paginationOptionsProps={{
    initialState: {
      rowsPerPage: 20,
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
</DatatableWrapper>
)


 }
    
 const [getoption,setoption]=useState(false)
 const [findck,setfindck]=useState([])
 const [pushck,setpushck]=useState(false)

 const ADDoption = (e) =>{
   setoption(e[0])
   
 
 //  setProgress(false)
 }
 //onSubmit={uploadModule3 }


 const uploadModule2 =async (e) =>{
  e.preventDefault();
//  console.log(e)


/*
  const tosvalues357=document.querySelectorAll('.condition')
 

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
  

  const arraytoscondition1= arraylabel.filter(n=>n.className.includes('label')).map((it,i)=>{
  
    return it.text
  })
  
  
  
return  [arraytoscondition1]
})




const sourcegetnodes=arrayvalue[0][0].length!=0? [].concat.apply(
  [],arrayvalue[0][0].map((a,i)=>{


const filtercolumns=  getexp.filter(id=>id.Chrinfo==a).length>0?
getexp.filter(id=>id.Chrinfo==a).map((a,i)=>{return ({key:a.ProteinName,text:a.ProteinName+a.Chrinfo+a.Vennarea,value:a.ProteinName})}):  getexp.filter(id=>id.Vennarea==a).map((a,i)=>{return ({key:a.ProteinName,text:a.ProteinName+a.Chrinfo+a.Vennarea,value:a.ProteinName})})
  
return filtercolumns

})):false



*/


const arrayvalue= [
  [
      [
          "iterestingitems1",
          "iterestingitems2",
          "iterestingitems3"
      ]
  ]
]




const interitems=[interitem1,interitem2,interitem3]

setmergeitem(interitems)

//exdata


                                                                                                  
const colordic={ 'true,false,false':'red' ,
'false,true,false':'yellow' ,
'false,false,true':'blue' ,
'true,true,false':'orange' ,
'false,true,true':'green' ,
'true,false,true':'purple' ,
'true,true,true':'black' ,


}

const colordic_get={ 'true,false,false':'V' ,
'false,true,false':'G' ,
'false,false,true':'B' ,
'true,true,false':'VG' ,
'false,true,true':'GB' ,
'true,false,true':'VB' ,
'true,true,true':'VGB' ,


}

//interitems
const sourcegetnodes1=arrayvalue[0][0].length!=0? [].concat.apply(
  [],arrayvalue[0][0].map((a,i)=>{
    
    
const bb=   a.includes('items')==true?  interitems[parseInt(a.substr(-1))-1  ] : false
const cc= bb!=false? [].concat.apply(
  [], bb.map((itemtrim,index)=>{
    const item=itemtrim.trim().split('.')[0]

  const outdata= exdata.filter(id=>id.majorityproteinids.split('.')[0] ==item).length>0?
  exdata.filter(id=>id.majorityproteinids.split('.')[0] ==item).map((aaa,i)=>{ 
    
    return({key:aaa.majorityproteinids.split(';')[0],text: aaa.majorityproteinids.split(';')[0],value:aaa.majorityproteinids.split(';')[0],label: { color: colordic[interitems.map((id,index)=> id.includes(aaa.majorityproteinids.split(';')[0]))], empty: true, circular: true ,comment:colordic_get[interitems.map((id,index)=> id.includes(aaa.majorityproteinids.split(';')[0]))] }})
  }): [({ key:item , text:item,value:item,label: { color: colordic[interitems.map((id,index)=> id.includes(item))], empty: true, circular: true ,comment:colordic_get[interitems.map((id,index)=> id.includes(item))]  } })]  //+':outitem'+a
return outdata

})) :false


return cc

})).filter(id=>id !=false):false
/*
const outertargets=arrayvalue[0][1].length!=0? 

[].concat.apply(
  [],arrayvalue[0][1].map((a,i)=>{

  const filtercolumns=  getexp.filter(id=>id.Chrinfo==a).length>0?
  getexp.filter(id=>id.Chrinfo==a).map((a,i)=>{return ({key:a.ProteinName,text:a.ProteinName+a.Chrinfo+a.Vennarea,value:a.ProteinName})}):  getexp.filter(id=>id.Vennarea==a).map((a,i)=>{return ({key:a.ProteinName,text:a.ProteinName+a.Chrinfo+a.Vennarea,value:a.ProteinName})})
    
  return filtercolumns
  const mergenode12=sourcegetnodes1.concat(sourcegetnodes)
  })):false




  
const sourcegetnodes1=arrayvalue[0][0].length!=0? [].concat.apply(
  [],arrayvalue[0][0].map((a,i)=>{
    
  
const bb=   a.includes('items')==true?  interitems[parseInt(a.substr(-1))-1  ] : false
const cc= bb!=false? [].concat.apply(
  [], bb.map((itemtrim,index)=>{
    const item=itemtrim.trim().split('.')[0]

  const outdata= exdata.filter(id=>id.majorityproteinids.split('.')[0] ==item).length>0?
  exdata.filter(id=>id.majorityproteinids.split('.')[0] ==item).map((aaa,i)=>{

    return({key:aaa.majorityproteinids.split(';')[0],text: aaa.majorityproteinids.split(';')[0]+aaa.chrinfo.split(':')[1]+aaa.set+a ,value:aaa.majorityproteinids.split(';')[0]})
  }): [({ key:item , text:item+':outitem'+a,value:item})]  
return outdata

})) :false


return cc

})).filter(id=>id !=false):false






*/

const mergenode12=sourcegetnodes1//.concat(sourcegetnodes)
const nodesarray=[...(mergenode12.map((a,i)=>{return a.key}))]

const setnodes=mergenode12.filter((v, i) => nodesarray.indexOf(v.key)==i);



setarrayvalue(setnodes)
setarrayvalue2(false)


setpushck(true)
setnodes.length>0? setfindck(true):setfindck(false)

//setstate(true)
//setalert(  test.join(';'))
//.includes('0')
//setthrowValue([TodoList[0].Analysisinfo,TodoList[0].projecttitle,stringindex,TodoList[0].LabelMethod+';'+TodoList[0].FilterMethod, props.user,tosvalues357])

/*

//a.Analysisinfo==proj_info
//a.projecttitle ==projidtitle

//
//a.LabelMethod+';'+a.FilterMethod ==filteritem
//stringindex ==indexinfo
*/
}




useMemo(() => {
  
 
 setinteritem3(props.interitem3)
 setpushck(false)
}, [props.interitem3])


useMemo(() => {
  
  props.reset2==1?  setinteritem2([]):setinteritem2(interitem2)
  
  
}, [props.reset2])




const uploadModule3 =async (e) =>{
  e.preventDefault();
//  console.log(e)
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


  const findlabel2=toss2.filter(n=>n.id.includes(item)).filter(n=>n.id.includes('condition22')).map((a,i)=>{
    return a.children
  })
  const arraylabel2=Array.from(findlabel2[0])
  

  const arraytoscondition2= arraylabel2.filter(n=>n.className.includes('label')).map((it,i)=>{
  
    return it.text
  })
  
  
  
return  [arraytoscondition1,arraytoscondition2]
})

setarrayvalue2(arrayvalue)


const ckvalue=[(arrayvalue[0][1].length <= 2 ) , (arrayvalue[0][0].length >= 2 && arrayvalue[0][0].length <= 10)]  
settf(ckvalue)

}


function updateProgress (progressUrl) {
  fetch(progressUrl[0]).then(function(response) {
      response.json().then(function(data) {
          // update the appropriate UI components
          if(data=='process'){ setTimeout(updateProgress, 100, progressUrl);

          }
           else if(data=='fin'){
return       setTimeout(function() {

  setLoading(false);
  props.getNETID(progressUrl[1])
 }, 2500);   


// setShow_project(false) ,setRefrash(false);
}
else{ 
  if (window.confirm('You have to go to the previous page because of a problem.'))
    {
     console.log(2)
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

const throwValue =async (e) =>{
const username= props.user;
const Analysisinfo=props.GOID[3]
const source=e[0][0].join(';')
const target=e[0][1].join(';')
 setLoading(true)


const form_data = new FormData();
form_data.append('source',source);
form_data.append('project',props.GOID[7]);
form_data.append('username', username);
form_data.append('target', target)
form_data.append('Analysisinfo', Analysisinfo);
fetch("http://127.0.0.1:5506/api/snSn2/", {
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

}
)
.then((response) =>  
 
{ 
  
  const url=`http://127.0.0.1:5506/api/${'progress_'+response[0]}/`
  const url2=`http://127.0.0.1:5506/api/${'getvalues_'+response[0]}/`
const awsom= [url,[url2,exdata,ex2data,mergeitem,getGO,props.GOID[0],Analysisinfo,props.GOID[5],props.GOID[6],props.GOID[7],props.GOID[8],props.GOID[9]]]
  updateProgress(awsom)
}

//  Analysisinfo pvfc project
)
.catch(error => {
  if (window.confirm('The server is very busy. sorry'))
  {
    
    history('/')




    
    
  }
  else
  {
    props.getGOID([props.GOID[0],props.GOID[1],props.GOID[2],props.GOID[3],props.GOID[4],props.GOID[5],props.GOID[6],props.GOID[7],props.GOID[8],props.GOID[9]]) // They clicked no
  }

})

}


const finthrowValue =async (e) =>{
  const Analysisinfo=props.GOID[3]
  

const mergeitems=[  props.GOID[8][2].split('VMV:')[1].split(';')[0].split(','),
  props.GOID[8][2].split('GO:')[1].split(';')[0].split(','),
  props.GOID[8][2].split('Bulk:')[1].split(';')[0].split(',')]
  
    const url=`http://127.0.0.1:5506/api/${'getvalues_'+props.GOID[8][0]}/`


  props.getNETID([url,exdata,ex2data,mergeitems,getGO,props.GOID[0],Analysisinfo,props.GOID[5],props.GOID[6],props.GOID[7],props.GOID[8],props.GOID[9]])



  }
  

  
  







 const Example =(props)=> {

  

const [ccc,setccc]= useState([])
const [ddd,setddd]= useState([])

const list22= getarrayvalue

const [test11,settest11]=useState(list22)
const testfilters2 = list22!=false?list22.filter((n) => [].includes(n.value) != true): []
const [test22, settest22] = useState(testfilters2);


const compcondition11 = (e, value) => {
  setccc(value.value);
 const filter1 = list22.filter(
    (n) => value.value.includes(n.value) != true
  );
  settest22(filter1);
};



const compcondition22 = (e, value) => {
  setddd(value.value);
 
 const filter1 = list22.filter(
    (n) => value.value.includes(n.value) != true
  );
  settest11(filter1);
  
};


/*

const list1= props.list223
  const interitem=props.interitem

  const dropdown_item=['iterestingitems1','iterestingitems2','iterestingitems3'].map((a)=>{

    const ids= a
      
        return ({key:ids,text:ids,value:ids})
        
       
  })
const list2=list1.concat(dropdown_item)


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

<Dropdown style={{ width: '35rem' }}  id={'append'+'condition1'} className={'condition'}
name="condition"
fluid
selection
search={true}
multiple={true}
options={test}
value={aaa}
placeholder="Search Network source"
onChange={(e, value) => compcondition1(e, value)} //input bar의 value가 바뀐다
onSearchChange={null} //search value가 바뀐다.
disabled={false}
loading={false}
/>
  <hr
        style={{ width: '35rem' ,
            backgroundColor: 'black',
            height: 2
        }}
    />
*/


//props.GOID[8],[taskId3,taskId3fin,mergeb123,c1source,c2target]

//

















    return(<>
<Container  style={{ "width":'1800px'   }}>
           

<Row>    
{props.data[1]=='FinAnalysis'?

<Col><Button variant="primary" onClick={(e)=> finthrowValue(props.data) }>END NETWORK Analysis</Button></Col>

:
<Form onSubmit={uploadModule2} >


            <br/>
         
      
    <Button variant="outline-secondary"  type="submit">
   Find nodes
</Button>

</Form>}
  </Row>

  {(pushck==true) &&(findck!=false)?  
  <>
  <Row>
  <Col lg={6} sm={6}  md={6}  style={{"display": "flex", "justify-content": "left","align-items":"center"}}>
    <text>

   
    'Group A from Protein Basket,Group B from Protein Basket' uses the protein added to the Protein Basket during the analysis process.   
   
Proteins selected from Group A draw a NETWORK (Group A; node, edge) as a two-step neighborhood.</text>

</Col>
  
  </Row>
  <Row>
  <Col lg={6} sm={6}  md={6}  style={{"display": "flex", "justify-content": "left","align-items":"center"}}>
  <text>

Select the protein you want to know about the relationship with'Group A'drawn with Source from Protein Basket in Group B to get Network (Result).
</text>


</Col>
  </Row>
  <Row>
  <Col lg={6} sm={6}  md={6}  style={{"display": "flex", "justify-content": "left","align-items":"center"}}>
  <text style={{'word-wrap':'break-word'}}>
VMV,GOEA,Bulk is represented by the colors red (V), yellow (G), and blue (B). If the selected protein possesses both VMV and GOEA properties, it is indicated by the color orange (VG).</text>


</Col>
  </Row>
  </>
 :false}


 <Row>
 {  (pushck==true) &&(findck==false)?<Alert color="secondary"> 
you must add protein from VMV Page,GOEA visualization PAGE,bulk item
 </Alert>:false}

 </Row>

    
  
   <Row>
 { props.data[1]!='FinAnalysis' &&(pushck==true) &&(findck!=false)?  
    <div style={{ 'border-style': 'solid' ,'border-color' : '#000080',width: '45rem'}}>
  <Form onSubmit={uploadModule3} >


  {getarrayvalue!=false?
  <text>Group A from Protein Basket</text>:false
  
  }
 {getarrayvalue!=false? 
  <Dropdown style={{ width: '35rem' }}  id={'append'+'condition11'} className={'condition3'}
  name="condition3"
  fluid
  selection
  search={true}
  multiple={true}
  options={test11}
  value={ccc}
  placeholder="Search Group A"
  onChange={(e, value) => compcondition11(e, value)} //input bar의 value가 바뀐다
  onSearchChange={null} //search value가 바뀐다.
  disabled={false}
  loading={false}
  renderLabel={renderLabel}
/>:false}


 <br/>
 {getarrayvalue!=false?
<text>Group B from Protein Basket(optional)</text>:false}
 {getarrayvalue!=false? <>  <Dropdown style={{ width: '35rem' }}  id={'append'+'condition22'} className={'condition3'}
              name="condition3"
              fluid
              selection
              search={true}
              multiple={true}
              options={test22}  
             value={ddd}
              placeholder="Search Group B"
              onChange={(e, value) => compcondition22(e, value)} //input bar의 value가 바뀐다
              onSearchChange={null} //search value가 바뀐다.
              disabled={false}
              loading={false}
              renderLabel={renderLabel}
            />
        
    </>:false}
    <br/>
    {getarrayvalue!=false? (gettf[0] && gettf[1])? false: 
    <Button variant="primary"  type="submit">
    Submit
  </Button>
//
  :false}
  
<p/>
{getarrayvalue2!=false&&getarrayvalue!=false?
//(getarrayvalue2[0][1].length >= 3 )  (getarrayvalue2[0][0].length >= 2 && getarrayvalue2[0][0].length <= 10)  
    (getarrayvalue2[0][0].length >= 2 && getarrayvalue2[0][0].length <= 10)   ? <text style={{ width: '35rem',"word-break":"break-all" }} >Select protein list {':'}
    {getarrayvalue2[0][0].join(',')}
    &nbsp;  Draw a network (GROUP A) within the TWO STEP neighbor of the selected protein.</text>:<Alert color="secondary" style={{ width: '35rem' }} > 

    There should be at least 2 and no more than 10 selected proteins.( Search for less than 10 proteins to avoid a situation where too many proteins are drawn as network nodes.
 )
<br/>
 </Alert>


:false
}

<p/>
    {getarrayvalue!=false&&getarrayvalue2!=false?
    (getarrayvalue2[0][1].length >= 3 ) ? 
    <Alert color="secondary" style={{ width: '35rem' }} > 
If the number of selected external proteins is 3 or more, please adjust it to 2 or less.
( Please search for no more than 2 proteins to avoid situations where too many proteins are drawn as network nodes.
 )
.</Alert>
:  (getarrayvalue2[0][1].length !=0)?

<text style={{ width: '35rem' }} >Check the relationship with the external target protein {getarrayvalue2[0][1].join(',')} &nbsp; to check the relationship with the checked NETWORK( GROUP A ).
 It is displayed as Network(result).</text>
 :false

:false
}




<p/>
{gettf !=false && getarrayvalue2!=false  ?
(gettf[0] && gettf[1])?
<p>{'Do you want to proceed??'}
<Button variant="primary"  onClick={(e)=> throwValue(getarrayvalue2) }>yes</Button> </p>
 :false:false

//throwValue(getarrayvalue2) => finnetwork상태면, network 결과 api와 나머지 결과들을 throwvalue에 넣어서 쏘면될듯?
}
<br/>
  </Form>
  </div>
  :false
}



  </Row>
  </Container>
  </>




    )}
    
//onClick={(e)=> throwValue(getthrowValue)}

    const    ckhubline2=(index,hi3,re4,concatdata2)=>{

      const filter_go=[]
      const Goid=[]
      if(index[1]=='red'){

        const filterGO= re4.filter(id=>id.Golist==index[2]['f'])[0].idconvert.split(';')
       const items= filterGO.map((a,i)=>{

          const filterprotein=hi3.filter(id=>id.majorityproteinids.split(';')[0].split('.')[0] ==a )[0]
          return filterprotein
        })
 filter_go.push(items)
 Goid.push(index[2]['f'])

      }
      else if(index[1]=='blue'){
        const filterGO= re4.filter(id=>id.Golist==index[3]['f'])[0].idconvert.split(';')
        const items=filterGO.map((a,i)=>{

          const filterprotein=hi3.filter(id=>id.majorityproteinids.split(';')[0].split('.')[0] ==a )[0]
          return filterprotein
        })
       filter_go.push(items)
       Goid.push(index[3]['f'])
      } 
      else if(index[1]=='gray'){
       const filterGO= re4.filter(id=>id.Golist==index[4]['f'])[0].idconvert.split(';')
        
        // majorityproteinids
        const items=  filterGO.map((a,i)=>{

          const filterprotein=hi3.filter(id=>id.majorityproteinids.split(';')[0].split('.')[0] ==a )[0]
          return filterprotein
        })
       filter_go.push(items)
       Goid.push(index[4]['f'])
      } 
   //exdata 
              //red mf, blue cc, gray bp
      
      const filtergoitem =filter_go[0].filter(id=>id!==undefined)
     const filterupper0= ex2data.filter(id=>id.size>0).map((a,i)=>{return a.sets.join()})

     const filterchr= ['Chr1','Chr2','Chr3','Chr4','Chr5','Chr6'
      ,'Chr7','Chr8','Chr9','Chr10','Chr11','Chr12'	]


    const upperfilter= filterupper0.map((a,i)=>{
      const filterPie=filtergoitem.filter(id=> id.set.join()== a).length
    

      return [a,filterPie]

     })
const chrfilter=filterchr.map((a,i)=>{
  const filterchr=filtergoitem.filter(id=> id.chrinfo.split('^^')[0].split(':')[1]== a).length
  return [a,filterchr]

})


     const upper2filter=upperfilter.filter(id=>id[1]>0)
     const chr2filter=chrfilter.filter(id=>id[1]>0)

    const gettable= filtergoitem.map((a,i)=>{
      
      
      
     const GO_fdrgg= re3.filter(id=>id.Golist==Goid[0]).map((a,i)=>{return parseFloat(a.fdr)})[0]
     const GO_pv= re3.filter(id=>id.Golist==Goid[0]).map((a,i)=>{return parseFloat(a.pv)})[0]

     
/*
 return      {"Analysisname":a.experiment,'GOID': Goid[0],'GO_fdr':GO_fdrgg, 'GO_pv':GO_pv,'ProteinName':a.chrinfo.split('^^')[0].split(':')[0],
      
      'Chrinfo':a.chrinfo.split('^^')[0].split(':')[1],'ProteinDescription':a.fastaheaders.split(';')[0],
      
      'log2FC':  a.log2fc.map((a,i)=>{return parseFloat(a).toFixed(4)}).join(), '-logPV': a.minuslogpv.map((a,i)=>{return parseFloat(a).toFixed(4)}).join(),'Vennarea': a.set.join()}

*/
      return      {'GOID': Goid[0],'GO_fdr':GO_fdrgg, 'GO_pv':GO_pv,'ProteinName':a.chrinfo.split('^^')[0].split(':')[0],
      
      'Chrinfo':a.chrinfo.split('^^')[0].split(':')[1],'ProteinDescription':a.fastaheaders.split(';')[0].split('>')[1],
      
      'Vennarea': a.set.join()}
          })  


     setpie(upper2filter)
     setpie2(chr2filter)
     setgetexp(gettable)
//     setgetGO([concatdata2,re4])

//      filter_go[0].filter(id=>id)
const concatvalues=upper2filter.concat(chr2filter)


const compid2=concatvalues.map((a)=>{

  const ids= a[0]
    
      return ({key:ids,text:ids,value:ids})
      
     
})
setcompid(compid2)

          }
/*
{getoption!=false ? <Example list223={compid} getexp={getexp} interitem={[interitem1,interitem2,interitem3]} />:false }
 
{re3!=false&&getexp!=false? <Button variant="outline-dark"    onClick={() => ADDoption([true,'fin','out'])} >Network Analysis</Button> 
:false}

<Button  variant="light"  onClick={()=> setoption(false)} >
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
  </svg>
  </Button>
*/ 

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








const Tablediv2=()=>{
 
       

         
                 
        const GOProteinscol=            [Object.keys(getGO[1][0])]

       
        const filterGOitems=getGO[1].filter(id=>id.items!='set()')
          const GOProteinsval= filterGOitems.map((a,i)=>{


            
const keys=Object.keys(getGO[1][0]).map((key,i)=>{

  return a[key]
})
return keys

          })
          
const GOcsv=          GOProteinscol.concat(GOProteinsval)
        

      
      









  
  return(<>

  <Container>
    <Row>  <Col>
    <text style={{"font-size": "20px" ,'font-weight':'bold'}}> Export GO
  
  </text>
  </Col>
    </Row>
  

         
  <Row><Col>
  <text style={{"font-size": "12px" ,'font-weight':'bold'}}> .csv format</text>
  </Col> 
      
      </Row>
   


<Row>

<Col>
<CSVLink data={GOcsv} filename={"WholeGOitems.csv"} >● GO</CSVLink>

</Col>
</Row>



  </Container>
 


      
     


</>)
 }























if (loading) return  (<>
  <Container   id='wholeA' >        <Row></Row>
  <div  id='SCAFFOLD3'  >
<Loader.Audio color="#00BFFF" height={600} width={600}/>

</div>

</Container>


</>)
//<Loader type="spin" color="RGB 값" message={loading} />


props.getITEM2(interitem2)







    return(<>
    {props.GOID!=false?
<Container  id='wholeA' >   
     <Row> 
     <Col lg={6} sm={6} class='Headerstyle'  style={{"display": "flex", "align-items":"center" ,'padding':'5px'}}>

     <text style={{'font-weight':'bold', "font-size": "25px" }}>      &nbsp;GOEA visualization &nbsp;  <a  onClick={() => setShow(true)} style={{ 'backgroundColor':'white','border':0,"font-size": "25px"}}>
    <BsQuestionLg id="btncircle"/> 
      </a> 
      
      <br/> (GO barplot  &nbsp;
      <a  onClick={() => setShow1(true)} >
    <BsQuestionLg id="btncircle"/> 
      </a>
      
      
      ,pie chart,Table)&nbsp;
  </text>      
  

      
      </Col>

 
       </Row>
       
<div  id='SCAFFOLD'    >
 
 <Row > 

  </Row>
  
 <Row > 
 <Col lg={4} sm={6} > </Col>
 <Col lg={1} sm={1}  style={{textAlign: "left"}}></Col>
 <Col  lg={7} sm={5} > 


 </Col>




 </Row>
 <Segment>
<Row >


    
<Col lg={12} sm={12} className="d-flex flex-col justify-content-center align-items-center"  > 

{re3!=false? <CreateList/>
   
   :false}
</Col>



</Row>

<Row>
<Col
className="d-flex flex-col justify-content-lg-center align-items-center"
>
{re3!=false && pie!=false &&pie2!=false?

<text style={{"font-size": "20px",'font-weight':'bold' }}>Pie Chart by Venndiagram</text>:false}
</Col>
<Col
className="d-flex flex-col justify-content-lg-center align-items-center"
>

{re3!=false && pie!=false &&pie2!=false?

<text style={{"font-size": "20px",'font-weight':'bold' }}>Pie Chart by Chromosome </text>:false}
</Col>
</Row>



<Row>
<Col
className="d-flex flex-col justify-content-lg-center align-items-center"
>
{re3!=false && pie!=false &&pie2!=false?

<div>
<Button variant="link" id="pie1" onClick={(e) => svgchangeoption(e)}>
  {" "}
  Export svg(Pie Chart by Venndiagram)
</Button>
</div>

:false}
</Col>
<Col
className="d-flex flex-col justify-content-lg-center align-items-center"
>

{re3!=false && pie!=false &&pie2!=false?

<div>
<Button variant="link" id="pie2" onClick={(e) => svgchangeoption(e)}>
  {" "}
  Export svg(Pie Chart by Chromosome)
</Button>
</div>:false}
</Col>
</Row>



<Row>

<Col
className="d-flex flex-col justify-content-lg-center align-items-center"
>



{re3!=false && pie!=false &&pie2!=false?

<div className='pie1' style={{ margin:10,padding: 30, backgroundColor: "#eee",'justify-content': 'center'}}>
<text  style={{textAlign: "center" }}>The sum of the pie chart components is {pie.length}</text>  
  <CreateDiv/>

  </div>:false}
</Col>

<Col 
className="d-flex flex-col justify-content-lg-center align-items-center">



{re3!=false && pie!=false &&pie2!=false?
    <div  className='pie2' style={{  margin:10,padding: 30, backgroundColor: "#eee",'justify-content': 'center' }}>

<text style={{textAlign: "center"  }}>The sum of the pie chart components is {pie2.length}</text>  
<CreateDiv2/>
  </div>:false}
</Col>

</Row>
</Segment>

<Segment id='Tableseg'>
<text style={{"font-size": "20px",'font-weight':'bold' }}>GO Table</text>
<br/>
<text style={{"font-size": "12px" }}>You can click ProteinName in the table.</text>


{re3!=false&&getexp!=false?
   <Tablediv/>
 :false}



</Segment>


<Segment>
{re3!=false?
   <Tablediv2/>
 :false}
</Segment>
<Segment>
<Row>
<Col>
<text style={{"font-size": "25px" }}>Network Analysis</text>
<a  onClick={() => setShow3(true)} style={{ 'backgroundColor':'white','border':0,"font-size": "25px"}}>
    <BsQuestionLg id="btncircle"/> 
      </a> 
</Col>
<Col>
</Col>
</Row>

<Row>
<Col        className="d-flex flex-col justify-content-lg-center align-items-center">


<Example data={props.GOID[8]}/>
</Col>
</Row>
</Segment>
</div>
</Container>
:goDEP()
}


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
         <p> 
These are the results of GO analysis of proteins that passed the cut-off.</p> 
      
       <p>Draw a GOEA Barchart based on the GO analysis results. </p> 
       <p>
       Click the protein name in "Go Table" to use it for network analysis.
It can be added to "Protein Basket's ProteinfromGO".

       </p>
       <p>

       Well-known proteins can be added to "Protein Basket's bulkprotein" in the form of A, B, C, D... and used for network analysis.

       </p>
<p>You can start NETWORK analysis by selecting "FIND NODES".</p>
         </Modal.Body>
       </Modal>
      
 
       
<Modal
 show={show1}
 onHide={() => setShow1(false)}
         dialogClassName="modal-90w"
         aria-labelledby="example-custom-modal-styling-title"
       >
         <Modal.Header closeButton>
           <Modal.Title id="example-custom-modal-styling-title">
          GOEA bar chartEvents
           </Modal.Title>
         </Modal.Header>
         <Modal.Body>
       
      
       <p>
Draw a GOEA Barchart based on the GO analysis results.(p value({"<0.05"})) </p> 
      <p> 
They are shown in blue, orange, and yellow by BP, CC, and MF, which are large categories.
</p>
<p>  The go description of each area is the y-axis </p>
      <p> The number of go items belonging to the go description is the x-axis.  </p>
      <p> If you click the go description, you can check the information of items belonging to the go description.
 </p>
 <p>If you click go description, you can check the information of items belonging to go description through GO Table and pie chart.

 </p>
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
          GOEA Related Table
           </Modal.Title>
         </Modal.Header>
         <Modal.Body>
    
      <p> Based on this information, it can be helpful to find a protein to use for NETWORK analysis.</p>
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
         Network analysis
           </Modal.Title>
         </Modal.Header>
         <Modal.Body>
       
       <p>
       NETWORK aims to identify intermediate proteins between "important proteins" and "important proteins" through two step Neighborhood.

       </p>
       <p> 
        
Click Find Nodes
          </p>
<p></p>
         </Modal.Body>
       </Modal>
  
    </>
      )

}
export default Scaffold3_5;





/*
    tcard.map((a)=>{
        const compid2= a.compare.split(',').map((item,index)=>{
            return ({key:item,text:item,value:item})
            
            })
            setcompid(compid2)
    })
getexp
compid

          <Dropdownbb list223={compid} getexp={getexp}/> 






  <p> 크게 BP,CC,MF영역으로 나누고, 각 영역의 go description이 y축입니다 </p>
      <p> go description에 속하는 go items의 개수가 x축입니다.  </p>
      <p> go description을 선택하면 go description에 속하는 item들의 정보를 확인할수있습니다   </p>
      <p> 이 정보를 바탕으로 NETWORK분석에 활용할 단백질을 찾는데 도움이 될 수 있습니다.</p>
      <p> go description을 선택할때, 나오는 table의 protein name을 좌클릭할 시 Network분석에 활용할 수 있는 ProteinfromGO에 추가됩니다. </p>
      <p> 이미 알고 있는 단백질의 경우 bulkprotein A,B,C,D... 형태로 집어 넣어서 네트워크 분석에 활용할 수 있습니다.</p>
      <p> 원하는 go description을 선택하고 network Analysis를 누르게되면 go description에 속하는 단백질의 정보와 interesting items를 활용해 network를 분석할 단백질을 선택할 수 있습니다</p>
      <p> 단백질 분석을 위해 영역을 선택하게 되면 , Source, outertarget을 선택하라는 문구가 나옵니다   </p>
      <p> Source는 너무 많은 단백질을 네트워크분석에 사용하면 너무 많은 노드를 불러오기때문에 10개 이하의 단백질을 선택해야합니다  </p>
      <p> source는 검색한 각각의 source 사이의 2 step neighbor에 해당하는 network를 그립니다   </p>
      <p> outertarget의경우 특별히 확인하고싶은 단백질을 넣으면 source를 바탕으로 그린 network에서 outertarget 단백질의 최단경로를 찾습니다  </p>
    



          */



