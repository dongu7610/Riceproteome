import React,{useState,useRef, useEffect,useMemo,Suspense,useCallback} from 'react';
//import * as React from "react";

import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router'
//import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';  // DatePicker 라는 컴포넌트도 가져오깅
import "react-datepicker/dist/react-datepicker.css"; 
import { Alert } from 'reactstrap';
import $ from 'jquery';
import {InputGroup, Container,Col,Row,Image,Modal,Button,Card,Form,Table,Accordion} from 'react-bootstrap'; 
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
import Navigator2 from "../Modal/Navigator2";
import { BsQuestionLg } from 'react-icons/bs';


import {
  ForceGraph2D,
    ForceGraph3D,
  ForceGraphVR,
  ForceGraphAR
} from "react-force-graph";

import {
//  forceCenter,
  //forceLink,
  // forceManyBody,
 // forceSimulation,
  forceCollide,
  // forceX,
  // forceY,
} from "d3-force";
import { AiFillPropertySafety } from 'react-icons/ai';

import Tablejs from '../Sections/Tablejs'
/*
export const useContainerDimensions = myRef => {
  const getDimensions = (box) => ({
    width: box.clientWidth,//myRef.current.offsetWidth,
    height: box.clientHeight//myRef.current.offsetHeight
  })


//  let box = document.querySelector('#Network');
//let width = box.clientWidth;
//let height = box.clientHeight;

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    let box = document.querySelector('#Network');

    console.log(box.clientWidth)
    
    console.log(box.clientHeight)
    const handleResize = () => {
      setDimensions(getDimensions(box))
    }

    if (myRef.current) {
      setDimensions(getDimensions(box))
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [myRef])

  return dimensions;
};

//Analysisname,GOID,ProteinName,Chrinfo,ProteinDescription,log2FC,-logPV,Vennarea

const STORY_HEADERS = [
  {
    prop: "Analysisname",
    title: "Analysisname",
    isFilterable: true
  },
  
  {
    prop: "GOID",
    title: "GOID",
    isFilterable: true
  },
  {
    prop: "ProteinName",
    title: "ProteinName",
    isFilterable: true
  },
  
  {
    prop: "Chrinfo",
    title: "Chrinfo",
    isFilterable: true
  },{
    prop: "ProteinDescription",
    title: "ProteinDescription",
    isFilterable: true
    
  
  },{
    prop: "log2FC",
    title: "log2FC"
    
  
  },{
    prop: "-logPV",
    title: "-logPV"
    
  
  },{
    prop: "Vennarea",
    title: "Vennarea",
    isFilterable: true
    
  
  }
  
];*/
    
function Scaffold3_6(props){
  const [re3,setre3]=useState(false)
  const [loading, setLoading] = useState(null)
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [show41, setShow41] = useState(false);
  const [vennitem, setvennitem] = useState(false);
  const [data, setData] = useState(null);
//  const [hover, sethover] = useState('');

   const [getnode, setgetnode] = useState(new Set());
   const [hover3, sethover3] = useState('');
 
   function handleClick() {
     // localStorage.clear()
     //sethover2(text);
     
     //console.log(getnode)
     const getnodename=[...getnode].map((a,i)=>{return a.name})

     sethover3([...getnodename].join());

   }
 
   function handleRightClick() {
     // localStorage.clear()
     //sethover2(text);
    
//     console.log(getnode)
     const getnodename=[...getnode].map((a,i)=>{return a.name})

     sethover3([...getnodename].join());

    }
 
   const addFoo = (addnode) => {
     setgetnode((prev) => new Set(prev.add(addnode)));
   };
 
   const removeFoo = (delnode) => {
     setgetnode((prev) => new Set((prev.delete(delnode), prev)));
   };

  /*
  useEffect(() => {
    const localStoragedata = Object.assign({}, localStorage)
    const keylocalstorage=Object.keys(localStoragedata).filter(id=>id.includes('Nodename')).map((a,i)=>{return a.split('Nodename')[1]})
    
    const nodenames=keylocalstorage.join()
  sethover(nodenames)
  
  }, [Object.entries(localStorage)]);

  */
  const [NETinfo, setNETinfo] = useState('Main');
  const history = useNavigate()

  const goDEP = (e) => {
    
    
    localStorage.removeItem('getitem1')
    localStorage.removeItem('getitem2')
    localStorage.removeItem('interitem3')
    localStorage.removeItem('reset1')
    localStorage.removeItem('reset2')
    alert("Now that we hit refresh, we're back to the DEP analysis process.")
    history('/results')
    };

  const ee = async (e) => {
    e.preventDefault();
     //props.NETID[9]
     
const projectid =props.ProjectID 
const ainfoid=props.NETID[7][0][4]
const finGO=props.NETID[8]
const b1=props.NETID[3][0]
const b2=props.NETID[3][1]
const b3=props.NETID[3][2]
const mergeb123="VMV:"+b1.join()+';GO:'+b2.join()+';Bulk:'+b3.join()

 const c1source= re3[2].filter(id=>id[2]==true).map(id=>{return id[1]}).join()
const c2target= re3[2].filter(id=>id[3]==true).map(id=>{return id[1]}).join()

 
 
  if (window.confirm('Fin' ))
  {
   
   const formData = new FormData();
   formData.append("ainfoid",ainfoid);
   formData.append("mergeb123",mergeb123); 
   formData.append("c1source",c1source);
   formData.append("c2target",c2target);
   formData.append("finGO",finGO);
   formData.append("getprojectid",projectid);

     
   //http://127.0.0.1:5506/api/private2publish/
   fetch("http://127.0.0.1:5506/api/FinNet/", { 
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
   props.getEXPID([props.NETID[6].split('_AnI;')[0],[props.NETID[9]]])
   
   
   }
   )
 
 
 
    
    
  }
  else
  {
 



 
    
  }
 
   }
   const eee = async (e) => {
    e.preventDefault();
     
 
   }








  

  const getNETinfo= (text) => {
   
    setNETinfo(text)
  
  }

  
    
/*
  const dd = (e) => {
    if (window.confirm('If the network node does not appear, you can analyze it again'))
    {
      
      props.getGOID([props.NETID[5],props.NETID[1], props.NETID[2], props.NETID[6]  ,props.NETID[3][0],props.NETID[7] ,props.NETID[8],props.NETID[9],props.NETID[10],props.NETID[11]] )

 



      
      
    }
    else
    {
        // They clicked no
    }


  };
  */
  



    useEffect(()=>{
//      localStorage.clear();

const url=props.NETID[0]
async function get4() {  
      try { setLoading(true);
    
          const result = await axios.get(`${url}`).then((response) => {//,page:`${item2}`
     
      return response.data//.result
      

    })
      setre3(result)
      setvennitem(props.NETID[2].filter(id=>id.sets.length==1))


      const nodes= result[0]
      const links= result[1] 
      const nodeinfo = result[2]
      const testnodes = new Set();
      const testlinks = [].concat.apply(
        [],
        links.map((r) => {
          const r2ck = r[2] != null ? String(r[2]).split(",") : [];
          const links = [r].map((a, i) => {
            let source = String(a[0]);
            let target = String(a[1]);
            testnodes.add(source);
            testnodes.add(target);
            return { source, target };
          });
  
          return links;
        })
      );
      const testnodes2 = Array.from(testnodes).map((name2, i) => {
        const getnodesinfo = nodeinfo
          .filter((id3) => id3[0] == parseInt(name2))
          .map((a, i) => {
            return [a[0], a[1], a[4], a[2], a[3],a[5],a[6],a[8]];
          });
  
        const id = String(getnodesinfo[0][0]);
        const name = getnodesinfo[0][1];
        const size = getnodesinfo[0][2];
        const search = getnodesinfo[0][3];
        const targetout = getnodesinfo[0][4];
        const chrinfomation = getnodesinfo[0][5];
        const nodegotype = getnodesinfo[0][6];
        const fromAB = getnodesinfo[0][7];
        return { name, id, size, search, targetout,chrinfomation ,nodegotype,fromAB};
      });
      
  setData({ nodes:testnodes2, links: testlinks })


  }
      catch (e) { 
        
     if(props.NETID != false){
        localStorage.removeItem('getitem1')
        localStorage.removeItem('getitem2')
        localStorage.removeItem('interitem3')
        localStorage.removeItem('reset1')
        localStorage.removeItem('reset2')
        
        alert("A network cannot be created under your condition. \n We return to the DEP analysis process.")
        history('/results')
      }
      else{
        localStorage.removeItem('getitem1')
        localStorage.removeItem('getitem2')
        localStorage.removeItem('interitem3')
        localStorage.removeItem('reset1')
        localStorage.removeItem('reset2')
        history('/results')

      }

      }

  
      setTimeout(function() {
    
          setLoading(false);
           
         }, 2500); 
      }
      get4()
   
  
     

  },[])





 /* 

 const nodes= re3[0]
    const links= re3[1] 
    const nodeinfo = re3[2]
    const testnodes = new Set();
    const testlinks = [].concat.apply(
      [],
      links.map((r) => {
        const r2ck = r[2] != null ? String(r[2]).split(",") : [];
        const links = [r].map((a, i) => {
          let source = String(a[0]);
          let target = String(a[1]);
          testnodes.add(source);
          testnodes.add(target);
          return { source, target };
        });

        return links;
      })
    );
    const testnodes2 = Array.from(testnodes).map((name2, i) => {
      const getnodesinfo = nodeinfo
        .filter((id3) => id3[0] == parseInt(name2))
        .map((a, i) => {
          return [a[0], a[1], a[4], a[2], a[3],a[5],a[6],a[8]];
        });

      const id = String(getnodesinfo[0][0]);
      const name = getnodesinfo[0][1];
      const size = getnodesinfo[0][2];
      const search = getnodesinfo[0][3];
      const targetout = getnodesinfo[0][4];
      const chrinfomation = getnodesinfo[0][5];
      const nodegotype = getnodesinfo[0][6];
      const fromAB = getnodesinfo[0][7];
      return { name, id, size, search, targetout,chrinfomation ,nodegotype,fromAB};
    });
    
setData({ nodes:testnodes2, links: testlinks })
*/
//    const     data2=({ nodes: testnodes2, links: testlinks });

    
    const data2 = useMemo(() => data, [data]);
/*
  const CreateList = () => { 
    
    //530 const graphRef ~ 
    //909   graphRef.current.d3ReheatSimulation()};
    
    
    return (<>

<ForceGraph2D
        ref={graphRef}
        graphData={data2}
        width={1230}
        nodeId="id"
        nodeLabel=""
        nodeRelSize={10}
       
        onNodeDragEnd={(node) => {
          node.fx = node.x;
          node.fy = node.y;
          node.fz = node.z;
        }}
        nodeCanvasObject={(node, ctx) => nodePaint(node, getColor(node), ctx)}
        nodePointerAreaPaint={nodePaint}

        
        onNodeClick={(node, event) => {
          if (event) {
            addFoo(node);
            handleClick();
          }
         
        }}
        onNodeRightClick={(node, event) => {
          if (event) {
            removeFoo(node);
            handleRightClick();
          }
          
        }}
      
      />
  
 
    </>
    )
    
    
    }
    */
    
//    let box = document.querySelector('#Network');

    const graphRef = useRef(null);

  //  React.useRef(null)



    const chrcolor=["#50bcdf","#E31A1C",  "#6A3D9A","black"
      , "green"
      ,"#CAB2D6"
      ,"#FDBF6F","gray","maroon","#FF33CC"
   ,"darkturquoise",
      "orange"
    ]
    const colorindex= {'30': 'white'
    ,'0':'#CCCCFF'
    ,'1':'#000033'
    ,'2':'darkturquoise'
    ,'1,2':'maroon',
    '0,2':'#808080',
    '1,2':'#FDBF6F',
    '0,1,2':'#FF3366',
    '100':'#6A3D9A',
    '40':'#50bcdf'
    }
    const colorscale=["#50bcdf","#E31A1C",  "#6A3D9A","black"
, "green"
,"#CAB2D6"
,"#FDBF6F","#FFF0F5","#8B0000","#FF33CC"
,"darkturquoise",
"#FFA500",'#A52A2A' ,'#B5B5B5'
]
const labelindex= {
  '0':'VMV'
  ,'1':'GO'
  ,'2':'BULK'
  ,'1,2':'VMV&GO',
  '0,2':'VMV&BULK',
  '1,2':'GO&BULK',
  '0,1,2':'VMV&GO&BULK',
  '40':'With GroupB',
  '100':'With GroupA&B',
  '30':''
  }
  
//    const   notinmergest=re3[3]

   
/*  test.filter(id=>id.values.find(element => element.includes('name'))) [] or  [0].sets*/
//test.filter(id=>id.sets.length==1).length
//go ..  test2.filter(id=>id.idconvert.includes('name'))
//const sett=test.filter(id=>id.sets.length==1).map(a=>{return a.sets[0]})
//props.NETID[2] venn
    //props.NETID[3] items
    //props.NETID[4] GO
    const netid_venn=    props.NETID[2].filter(id=>id.sets.length==1)// .length  
    //netid_venn

    //
const   testv=props.NETID[3]
  
const netid_venn_length=netid_venn.length
const netid_sets_items=netid_venn.map(a=>{return a.sets[0]})
/*
function handleClick(node){
  //node.preventdefault();
//  console.log(node)
//node.preventdefault();
  const pushdata=hover.length>0? [hover,node.name].join():node.name
  sethover(pushdata);

//  




  
}
function handleClick2(node){
//  node.preventdefault();
//node.preventdefault();
  const pushdata= ( hover.split(',').length>1)? hover.replace(','+node.name,''):  hover.replace(node.name,'')
  sethover(pushdata);
//  node.preventdefault()
};
function handleClick3(node){
  
  
};
*/


// Nav Bar전달이 있을 때 hover.split(',')
function chosencolor(node) {

  const nodename=node.name
  
  const testv2=props.NETID[3].filter(id=>id.find(element => element.includes(nodename)))
  const itemindex=testv2.map((a,i)=>{return testv.indexOf(a)  }).join() 

//100,30 A, 40 B 

const itemindex2=itemindex==''? String(node.fromAB): itemindex


const chosencolorvalue =  colorindex[itemindex2]
 
//selectedNodes.has(node) ?
//hover.includes(node.name)?'#FFA500': colorindex[itemindex2]
return chosencolorvalue
    



  
  
  }
  


function circle(ctx, x, y, r,node) {

const nodename=node.name
const nodechr=node.chrinfomation
const nodegotype=node.nodegotype


//
  if (NETinfo =='Main'){   
    ctx.strokeStyle = '#B5B5B5' ;
    ctx.beginPath();
    ctx.arc(x, y, r, 0,Math.PI * 2 );
    ctx.stroke();
  

  }
  else if (NETinfo=='GO'){
/*
const gofilter=    props.NETID[4][1].filter(id=>id.idconvert.includes(nodename))

gofilter.length>0? [...Array(gofilter.length)].map((a,i)=>{
  
  const f1= 1/gofilter.length
  const ggtype=gofilter[i].go_cluster
  const ixtest=    ['BP','MF','CC'].indexOf(ggtype)
  
  const startpo=i
  const endpo=i+1
  const startcalcul= startpo*Math.PI * f1 * 2 
  const endcalcul= endpo===gofilter.length?  Math.PI * 2 :endpo*Math.PI * f1 * 2 

const color=     colorscale[ixtest] 
  ctx.strokeStyle = color;
ctx.beginPath();
ctx.arc(x, y, r, startcalcul, endcalcul);
ctx.stroke();

})
:
[...Array(1)].map((a,i)=>{


  ctx.strokeStyle ='#B5B5B5' 
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2 )
  ctx.stroke()

})
//#B5B5B5


*/    

nodegotype.length!=0? nodegotype.split(',').map((a,i)=>{
  
  const f1 = 1/nodegotype.split(',').length
  const ggtype= a //P (biological process), F (molecular function) or C (cellular component).

  const ixtest=    ['P','F','C'].indexOf(ggtype)
  
  const startpo=i
  const endpo=i+1
  const startcalcul= startpo*Math.PI * f1 * 2 
  const endcalcul= endpo===nodegotype.split(',').length?  Math.PI * 2 :endpo*Math.PI * f1 * 2 

const color=     colorscale[ixtest] 
  ctx.strokeStyle = color;
ctx.beginPath();
ctx.arc(x, y, r, startcalcul, endcalcul);
ctx.stroke();

})
:
[...Array(1)].map((a,i)=>{


  ctx.strokeStyle ='#5e5e5e' 
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2 )
  ctx.stroke()

})
//#B5B5B5

  }
  else if(NETinfo=='Chr'){
const gtcolors=    nodechr.includes('Chr')?colorscale[parseInt(nodechr.split('Chr')[1]-1)]: '#5e5e5e' 


ctx.strokeStyle = gtcolors
    ctx.beginPath();
    ctx.arc(x, y, r, 0,Math.PI * 2 );
    ctx.stroke();

  }
  else if(NETinfo=='Venn'){
const vennarea    =props.NETID[2].filter(id=>id.values.find(element => element.includes(nodename)))[0]
    


  const start = 0;
//vennarea.sets.length
  (vennarea!=undefined&& vennarea.sets.length>0)?  [...Array(vennarea.sets.length)].map((a,index)=>{
    const f1= 1/vennarea.sets.length;
    const ixtest=    netid_sets_items.indexOf(vennarea.sets[index])
    
    const startpo=index
    const endpo=index+1
    const startcalcul= startpo * (Math.PI * f1 * 2 )
    const endcalcul= endpo===vennarea.sets.length ?  Math.PI * 2 : endpo * (Math.PI * f1 * 2 )

const color=     colorscale[ixtest] 
    ctx.strokeStyle = color
  ctx.beginPath();
  ctx.arc(x, y, r, startcalcul, endcalcul);
  ctx.stroke();
  })
:
[...Array(1)].map((a,i)=>{

  if(props.NETID[11].filter(id=>id.majorityproteinids.includes(nodename)).length!=0) {
    
    ctx.strokeStyle ='#5e5e5e' 
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2 )
  ctx.stroke()
  } 
else{

ctx.strokeStyle ='#B5B5B5' 
ctx.beginPath()
ctx.arc(x, y, r, 0, Math.PI * 2 )
ctx.stroke()
}



})







  }
  
  
  

  

  
  


}


  function circle2(ctx, x, y, r,node,color) {


    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);

    ctx.fillStyle = color
    
    const label = node.name;
      const fontSize = 12 / 3;
      ctx.font = `${fontSize}px Sans-Serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

    const filtervenn=props.NETID[3].filter(id=>id.find(element => element.includes(node.name)))
    const itemindex=filtervenn.map((a,i)=>{
      
      
      return testv.indexOf(a)  }).join() 

    if(node.search==true){

      
      ctx.fillText(label, x, y + r+5);
      

    }
    else if(node.targetout==true){

     
      ctx.fillText(label, x, y + r+5);
      
    }
    else if(getnode.has(node)){
      ctx.fillText(label, x, y + r+5);
      
    }
    else if(filtervenn.length>0){
      const label2= labelindex[itemindex]
      ctx.fillText(label, x, y + r+5);
      
      
    }
    else{

    }

    
    
    ctx.fill();
    }
//useCallback
    const  nodePaint=useCallback((node, color, ctx)=> {
      const name= node.name
      const x = node.x
      const y = node.y
      const size= node.size
      
      //ctx.fillStyle = color;
      ctx.strokeStyle='#B5B5B5'; 
      ctx.lineWidth = 3
      
      const size2 =  size <=50 ? 2 : size>=250  ?    10: 2*(size/50)

      
     
      //    ctx.arc(x,y, node.size/30, 0, 0.8 * Math.PI, false);
      circle(ctx, x, y,size2,node)
      circle2(ctx, x, y,size2,node,color)
      
      ctx.fill();
      
      
     
      
  //circle
    },[NETinfo])
    const getColor = (n) =>
    getnode.has(n) ?'#FFA500':      n.search == true ? "brown" : n.targetout == true ? "#FF33CC" : chosencolor(n) ; //node.color;
   
    

    //Normal
    //GO
    if (graphRef.current) {
    graphRef.current
    .d3Force("link")
    .iterations(1)
    .distance(100);

  //$FlowIssue
  graphRef.current
    .d3Force("charge")
    .strength(-85)
  graphRef.current.d3Force(
    "collide",
    forceCollide(15)
      .strength(0.3)
      .iterations(1)
  );
  graphRef.current.d3ReheatSimulation();
    }
    



const Tablediv=({hover3})=>{

  const gethover=hover3
  const STORY_HEADERS = [
    {
      prop: "NodeName",
      title: "NodeName",
      isFilterable: true,
      isSortable: true,
      cell: row => (
        
         
        gethover.includes(row.NodeName)? 
        <text style={{color: "#FFA500" }}>{row.NodeName}</text> :
        <text style={{color: "black" }}>{row.NodeName}</text>
  
       )
      
     
  
      
    },
    {
      prop: "Select",
      title: "Select",
      
      isSortable: true,
      cell: row => (
        
         
        row.Select=='YourProtein'? 
        <text style={{color: "#FFA500" }}>{'✔'}</text> :
        <text style={{color: "black" }}>{' '}</text>
  
       )
      
     
  
      
    },
    
   {prop:"Description",title:"Description"},
    
    {
      prop: "GO",
      title: "GO",
     // isSortable: true,
    }
    ,{
      prop: "GOtype",
      title: "GOtype",
      isSortable: true,
    }
    ,
    {
      prop: "Chr",
      title: "Chr",
      isFilterable: true,
      isSortable: true,
    },{
      prop: "Venn",
      title: "Venn",
      isFilterable: true,isSortable: true,
      
    
    },{
      prop: "Nodeproperty",
      title: "Nodeproperty"
      ,isSortable: true,
      
    
    }
    ,{
      prop: "searchoption",
      title: "searchoption"
      ,isSortable: true,
      
    
    }
    ,{
      prop: "identified",
      title: "identified"
      ,isSortable: true,
      
    
    }
  
  ];



  


  


  const pv=props.NETID[8].split(':')[0]
  const fc= props.NETID[8].split(':')[1]
  const getafileinfo= props.NETID[7][0]
const wholedata=getafileinfo[3].split(',')
const comparecolumns= getafileinfo[1].split('Exp').splice(1).map((a,i)=>{
 

  const compare=a.split(';')[1].split(',').splice(0,3).map((a,i)=>{


    return wholedata[parseInt(a)]
  }).join()
  return compare
})
 
const getcompareobjects=[...Array(getafileinfo[1].split('Exp').splice(1).length/2)].map((a,i)=>{
  const merge=comparecolumns[i*2]+'VS'+comparecolumns[(i*2)+1]
return merge
}).join(';')



const linkscsv=[['sourceNode','targetNode']]
re3[1].map((a,i)=>{

 
const sourcenode=  re3[2].filter(id=>id[0]==a[0])[0][1]
const targetnode=  re3[2].filter(id=>id[0]==a[1])[0][1]
linkscsv.push([sourcenode,targetnode])
})





  
const labelindex= {
  '0':'VMV'
  ,'1':'GO'
  ,'2':'BULK'
  ,'1,2':'VMV&GO',
  '0,2':'VMV&BULK',
  '1,2':'GO&BULK',
  '0,1,2':'VMV&GO&BULK',

  
  }
  const labelindex2= {

  '40':'With GroupB',
  '100':'With GroupA&B',
  '30':'With GroupA'
  }


  const exportcsv=[['NodeName','Select','Description','GO','GOtype','Chr','Venn','Nodeproperty','searchoption','identified']]
  const specificcsv=[['SpecificNodeName','footprint','compare' ,'FilterMethod','AnalysisinfoTXT','pv','fc']]

 //hover.length>0? Array.from(new Set(hover.split(',')))
 const getexp_eve= re3[2].map((getnodename,i)=>{
  const nodename= getnodename[1]
          const filtervenn=props.NETID[2].filter(id=>id.values.find(element => element.includes(nodename)))[0]
      const venndata=filtervenn!=undefined&& filtervenn.sets.length>0?  filtervenn.sets.join(): 'NaN'
  const    filternode=re3[2].filter(id=>id[1]==nodename)[0]

const nodechr = filternode[5]
const nodesource= filternode[2]
const nodesourcetarget= filternode[3]
const GO_category = filternode[6]
const GOids = filternode[7]
const GroupAB = String(filternode[8])
const gofilter=  props.NETID[4][1].filter(id=>id.idconvert.includes(nodename)).map((a,i)=>{
return  a.go_cluster
}).join()
const goid=  props.NETID[4][1].filter(id=>id.idconvert.includes(nodename)).map((a,i)=>{
  return  a.Golist+';'+a.go_description
  }).join()
  
const   testv=props.NETID[3]
        const testv2=props.NETID[3].filter(id=>id.find(element => element.includes(nodename)))
  const itemindex=testv2.map((a,i)=>{return testv.indexOf(a)  }).join() 
const searchoption = nodesource == true ? 'GroupA' : nodesourcetarget == true ? 'GroupB' : 'NaN'
     
/*
const getgoid= goid!=''?goid : 'NaN'
const getgofilter= gofilter!=''?gofilter : 'NaN'
*/

const nodeproperty=itemindex!=''?labelindex[itemindex]+';'+labelindex2[GroupAB] : labelindex2[GroupAB]
//itemindex
//a.fastaheaders.split(';')[0].split('>')[1].split('|')[1]

const ProteinDescription= props.NETID[11].filter(id=>id.majorityproteinids.includes(nodename)).length!=0 ? 
props.NETID[11].filter(id=>id.majorityproteinids.includes(nodename)).map((a,i)=>{
//  return a.fastaheaders.split(';')[0].split('>')[1].split('|')[1] 

  if (props.NETID[7][0][16] === 'FragPipe') {
    return a.description.split(';')[0].split('>')[1].split('|')[1];
} else {
    return a.fastaheaders.split(';')[0].split('>')[1].split('|')[1];
}

}).join()

:'NaN'

const identified= props.NETID[11].filter(id=>id.majorityproteinids.includes(nodename)).length!=0 ? 'identified':'NaN'

const Select=gethover.includes(nodename)? 'YourProtein':'Common'
      return      {"NodeName":nodename,'Select':Select,"Description":ProteinDescription,'GO': GOids,'GOtype':GO_category,'Chr':nodechr,
      
      'Venn':venndata,'Nodeproperty':nodeproperty,
      
      'searchoption':  searchoption ,'identified':identified}
          }) 
          getexp_eve.sort((a,b) => {
            const name1 = a.Select.toLowerCase(), name2 = b.Select.toLowerCase();
            
            return name1 === name2 ? 0 : name1 < name2 ? 1 : -1;
          });
          //:[]
const getexp=          getexp_eve.map((a,i)=>{

            return      {"NodeName":a.NodeName,'Select':a.Select,"Description":a.Description,'GO': a.GO,'GOtype':a.GOtype,'Chr':a.Chr,
      
            'Venn':a.Venn,'Nodeproperty':a.Nodeproperty,
            
            'searchoption':  a.searchoption ,'identified':a.identified}
          }) 
          



          const significantProteinscol=            [Object.keys(props.NETID[1][0])]
          const significantProteinsval= props.NETID[1].map((a,i)=>{

     


const keys=Object.keys(props.NETID[1][0]).map((key,i)=>{

  return a[key]
})
return keys

          })
          const pushspecific= gethover.length>0? Array.from(new Set(gethover.split(','))).map((nodename,i)=>{
            return nodename
          }).join():[]
         
           specificcsv.push([pushspecific,props.NETID[6],getcompareobjects,getafileinfo[8],getafileinfo[9],pv,  fc])
           
           
           
           
         
          
const sigcsv=          significantProteinscol.concat(significantProteinsval)
          re3[2].map((node,i)=>{
            const nodename= node[1]
            const filtervenn=props.NETID[2].filter(id=>id.values.find(element => element.includes(nodename)))[0]
            const venndata=filtervenn!=undefined&& filtervenn.sets.length>0?  filtervenn.sets.join(): 'NaN'
        const    filternode=re3[2].filter(id=>id[1]==nodename)[0]
      const nodechr = filternode[5]
      const nodesource= filternode[2]
      const nodesourcetarget= filternode[3]
      const GO_category = filternode[6]
      const GOids = filternode[7]
      const GroupAB = String(filternode[8])

      /*
      const gofilter=  props.NETID[4][1].filter(id=>id.idconvert.includes(nodename)).map((a,i)=>{
      return  a.go_cluster
      }).join()
      const goid=  props.NETID[4][1].filter(id=>id.idconvert.includes(nodename)).map((a,i)=>{
        return  a.Golist+';'+a.go_description
        }).join()
        */
      const   testv=props.NETID[3]
              const testv2=props.NETID[3].filter(id=>id.find(element => element.includes(nodename)))
        const itemindex=testv2.map((a,i)=>{return testv.indexOf(a)  }).join() 
    

      const searchoption = nodesource == true ? 'source' : nodesourcetarget == true ? 'outertarget' : 'NaN'
      const identified = props.NETID[11].filter(id=>id.majorityproteinids.includes(nodename)).length!=0 ? 'identified':'NaN'
      
     // const getgoid= goid!=''?goid : 'NaN'
      //const getgofilter= gofilter!=''?gofilter : 'NaN'
      const getitemindex=itemindex!=''?labelindex[itemindex]+';'+labelindex2[GroupAB] : labelindex2[GroupAB]
      //itemindex
      
      const ProteinDescription= props.NETID[11].filter(id=>id.majorityproteinids.includes(nodename)).length!=0 ? 
props.NETID[11].filter(id=>id.majorityproteinids.includes(nodename)).map((a,i)=>{
  //return a.fastaheaders.split(';')[0].split('>')[1].split('|')[1]
  if (props.NETID[7][0][16] === 'FragPipe') {
    return a.description.split(';')[0].split('>')[1].split('|')[1];
} else {
    return a.fastaheaders.split(';')[0].split('>')[1].split('|')[1];
}


}).join()

:'NaN'
const Select=gethover.includes(nodename)? 'YourProtein':'Common'
      exportcsv.push([nodename,Select,ProteinDescription,GOids,GO_category,nodechr,venndata,getitemindex,searchoption,identified])




            
          })
       

         
                 
        const GOProteinscol=            [Object.keys(props.NETID[4][1][0])]

       
        const filterGOitems=props.NETID[4][1].filter(id=>id.items!='set()').filter(id=>id.pv<=0.05)
          const GOProteinsval= filterGOitems.map((a,i)=>{


            
const keys=Object.keys(props.NETID[4][1][0]).map((key,i)=>{

  return a[key]
})
return keys

          })
          
const GOcsv=          GOProteinscol.concat(GOProteinsval)
         /*
 let triggerDownload = (imgURI, fileName) => {
    let a = document.createElement("a");

    a.setAttribute("download", "image.svg");
    a.setAttribute("href", imgURI);
    a.setAttribute("target", "_blank");

    a.click();
  };


  const changeoption = (e) => {
//   let data = new XMLSerializer().serializeToString(svg);
   let svgBlob = new Blob([ re3[4]], { type: "image/svg+xml;charset=utf-8" });
   let url = URL.createObjectURL(svgBlob);
   
   triggerDownload(url);
  };
  */


  const exportData = () => {


    const edges= re3[1].map((a,i)=>{
  
      return   {"data":{
      
        "source": String(a[0]),
        "target": String(a[1]),
        "name": re3[2].filter(id=>id[0]==a[0])[0][1] +" RICENET "+ re3[2].filter(id=>id[0]==a[1])[0][1],
        
         "interaction" : "RICENET"
      }}
      
      
      })
      
      const nodes= re3[2].map((a,i)=>{
        const name=a[1]
        const id= a[0]
        const size= a[4]
        const chr = a[5]
        const gotype=a[6]
        const goid=a[7]
        const GroupAB = a[8]

        const   testv=props.NETID[3]
      
      const searchoption=  a[2] == true ? 'GroupA' : a[3] == true ? 'groupB' : 'NaN'
      const testv2=props.NETID[3].filter(id=>id.find(element => element.includes(name)))
      const itemindex=testv2.map((a,i)=>{return testv.indexOf(a)  }).join() 
      const getitemindex=itemindex!=''?itemindex : 'NaN'
      
      const filtervenn=props.NETID[2].filter(id=>id.values.find(element => element.includes(name)))[0]
            const venndata=filtervenn!=undefined&& filtervenn.sets.length>0?  filtervenn.sets.join(): 'NaN'
            const identified= props.NETID[11].filter(id=>id.majorityproteinids.includes(name)).length!=0 ? 'identified':'NaN'
      
      
      return   {"data":{
          "id":String(id),
          "name": name,
          "GO": goid,
          "GOtype": gotype,
          "Chr": chr,
          "Venn": venndata,
          "items": getitemindex,
        "searchoption": searchoption,
        "identified": identified,
        "size":size,
      'Nodeproperty':GroupAB
        
        }}
        
        
        })
      
      
        const cyjs={
      
          "format_version": "1.0",
          
          "generated_by": "cytoscape-3.9.1",
          
          "target_cytoscapejs_version": "~2.1",
          
          "data": {},
          
          "elements": {   nodes,
          edges }
        
        
        
        
        }
     

    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
     JSON.stringify(cyjs)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "Network.cyjs";

    link.click();
  };







  
  return(<>

  <Container>
    <Row>  <Col>
    <text style={{"font-size": "20px" ,'font-weight':'bold'}}> Export results
  <a  onClick={() => setShow3(true)} style={{ 'backgroundColor':'white','border':0 ,"font-size": "20px"}}>
    <BsQuestionLg onLg id="btncircle"/> 
      </a>
  
  </text>
  </Col>
    </Row>
    <Row>
      <Col>
    <text style={{"font-size": "12px" ,'font-weight':'bold'}}> .cyjs format</text>
    </Col>
    </Row>
    <Row> 
    <Col><Button variant="link"  onClick={exportData}>
          {" "}
          ● Network (Cytoscapejs format (Chr,go type,search))
        </Button> </Col>  </Row>
         
    <Divider/>
  <Row><Col>
  <text style={{"font-size": "12px" ,'font-weight':'bold'}}> .csv format</text>
  </Col> 
      
      </Row>
      <Row>

      <Col>

      <CSVLink  data={specificcsv} filename={"specific.csv"} >● Network node(specific)</CSVLink>

      </Col>
      </Row>



      <Row>

<Col>
<CSVLink data={exportcsv} filename={"wholenode.csv"} >● Network node(whole)</CSVLink>

</Col>
</Row>

<Row>

<Col>
<CSVLink  data={linkscsv} filename={"WholeLinks"} >● source,target</CSVLink>

</Col>
</Row>

<Row>

<Col>
<CSVLink data={GOcsv} filename={"GOitems.csv"} >● GO{('pv<0.05')}</CSVLink>

</Col>
</Row>
<Row>

<Col>
<CSVLink  data={sigcsv} filename={"significants.csv"} >● Significants</CSVLink>

</Col>
</Row>


<Divider/>
<Row>

<Col>
<text style={{"font-size": "20px" }}> Chosen Node information    
<a  onClick={() => setShow4(true)} style={{ 'backgroundColor':'white','border':0 ,"font-size": "20px"}}>
    <BsQuestionLg id="btncircle"/> 
      </a> </text>

</Col>
</Row>

<Row>

<Col>

 
{
  <DatatableWrapper
  body={getexp}
  headers={STORY_HEADERS}

  paginationOptionsProps={{
    initialState: {
      rowsPerPage: 30,
      options: [30, 60, 90, 120]
    }
  }}
>

<Row>


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
}
</Col>
</Row>
  </Container>
 


      
     


</>)
 }
    
 const Tablediv2=({hover3})=>{

  
  
  
  
  
  
    
  return(<>


      
<div>
    <h1>Selected Node:</h1>
    <p style={{'font-weight':'bold','word-wrap':'break-word'}}>{hover3}</p>
  </div>


</>)
 }


    if (loading) return  (<>
      <Container   id='wholeA'>
        <Row></Row>
      <div  id='SCAFFOLD3'  >
    <Loader.Audio color="#00BFFF" height={600} width={600}/>
    </div>
    </Container></>)
    
    //<Loader type="spin" color="RGB 값" message={loading} />

    return(<>


  
  
  
{props.NETID!=false?

<Container    id='wholeA' >   
     <Row > 
     <Col lg={6} sm={6} class='Headerstyle'  style={{"display": "flex", "align-items":"center",'padding':'5px'}}>
     <text style={{'font-weight':'bold', "font-size": "25px" }}>   &nbsp;Network analysis&nbsp;
     <a  onClick={() => setShow(true)} >
    <BsQuestionLg id="btncircle"/> 
      </a> 
     <br/> (Network <a  onClick={() => setShow2(true)} >
    <BsQuestionLg id="btncircle"/> 
      </a> ,Table,CSVDownload)&nbsp;   </text>      
  
  
 
   </Col>


       </Row>
       
<div  id='SCAFFOLD'  >
 
 
{re3!=false &&re3[2].length>0 ?
<>
<Segment>
<Row >

    <Navigator2 getNETinfo={getNETinfo} vennitem={vennitem}/>
    </Row>
    </Segment>
    <Segment>

<Row>
<Col className="d-flex flex-col justify-content-start align-items-center" > 

<text style={{"font-size": "20px" ,'font-weight':'bold'}} > Network </text>
</Col>

</Row>
    <Row >

<Col id='Network' className="d-flex flex-col justify-content-center align-items-center" > 
  
  
  
 
<ForceGraph2D
        ref={graphRef}
        graphData={data2}
        width={1230}
//        height={height}
        nodeId="id"
        nodeLabel=""
        nodeRelSize={10}
       
        onNodeDragEnd={(node) => {
          node.fx = node.x;
          node.fy = node.y;
          node.fz = node.z;
        }}
        nodeCanvasObject={(node, ctx) => nodePaint(node, getColor(node), ctx)}
        nodePointerAreaPaint={nodePaint}

        //onNodeClick={handleClick}
        //onNodeRightClick={hover.length>0? handleClick2: handleClick3 }
        
        onNodeClick={(node, event) => {
          if (event) {
            //            localStorage.setItem('getitem2', node)
            addFoo(node);
            handleClick();
            // console.log(node.id)
            //localStorage.setItem('Nodename'+node.name, node.name);
          }
          /*else { // single-selection
            const untoggle = selectedNodes.has(node) && selectedNodes.size === 1;
            selectedNodes.clear();
            !untoggle && selectedNodes.add(node);
          }*/

          // Graph.nodeColor(Graph.nodeColor()); // update color of selected nodes
        }}
        onNodeRightClick={(node, event) => {
          if (event) {
            removeFoo(node);
            handleRightClick();
            //localStorage.removeItem('Nodename'+node.name, node.name);
          }
          /*else { // single-selection
            const untoggle = selectedNodes.has(node) && selectedNodes.size === 1;
            selectedNodes.clear();
            !untoggle && selectedNodes.add(node);
          }*/

          // Graph.nodeColor(Graph.nodeColor()); // update color of selected nodes
        }}
        //autopauseRedraw={false}
        //onNodeClick={handleClick}
        
       // linkDirectionalArrowRelPos={1}
        //linkDirectionalArrowLength={2}
      />
   

</Col>

</Row>
</Segment>
</>
:false}



{re3!=false  &&re3[2].length>0  ?
// <Tablediv hover3={hover3}/>
//<Tablejs re3={re3} NETID={props.NETID} hover3={hover3}/>
<>
<Segment>

<Row>

<Col lg={12} sm={12} id='Tableseg'  > 
<Tablediv2 hover3={hover3}/>
<>

</>  
</Col>
</Row>
<Row>
<Col lg={12} sm={12} id='Tableseg'  > 
<Tablediv hover3={hover3}/>
<>

</>  
</Col>

<Col  lg=      {{ span: 5, offset: 0.1 }} sm=      {{ span: 4, offset: 0.1 }} style={{textAlign: "left" ,"margin-top":'1%'}}>




</Col>


</Row>
</Segment>
</>
   :false}

<Segment>



<Row>



<Col lg={12} sm={12}  > 
{re3!=false  && re3[2].length>0 &&props.NETID[10][1]!='FinAnalysis' ?
 <Col lg={6} sm={5}  > 
<p>Are you sure you want to finalize?</p>
<Button variant="link"  onClick={(e)=> ee(e)   }>save the Analysis</Button>
</Col>
   
   :false}
</Col>
</Row>

<Row>



<Col lg={12} sm={12}  > 
{re3!=false  && re3[2].length>0 &&props.NETID[10][1]=='FinAnalysis' ?
 <Col lg={6} sm={5}  > 
<text  style={{ "font-size": "15px",'fontWeight': 'bold',textAlign: "left","display": "flex"}}>completed analysis</text>
</Col>
   
   :false}
</Col>
</Row>

<Row>



<Col lg={12} sm={12}  > 
{       props.NETID[7]!=false&&props.NETID[7][0][11]=='FinAnalysis'?<> 
<br/>
<Button variant="primary" style={{ "font-size": "15px"}}  onClick={() => setShow41(true)}>  Network Metadata </Button></>
 :false  }
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
          Network Visualization,(download csv,cyjs)
           </Modal.Title>
         </Modal.Header>
         <Modal.Body>
       
         <p>
          
When the network analysis is successfully completed, you can check the black navigation bar and network diagram, and download the result table. 
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
          Network+NETWORK NODE Navigator
           </Modal.Title>
         </Modal.Header>
         <Modal.Body>
         <p> If you click Venn, the outline is drawn based on the part corresponding to the area of ​​the venn diagram in the previous analysis.</p> 
         <p>
If a protein is included in two regions (1down,2down), it is expressed in two colors.</p>  
         <p>
If you click Chr, chromosome information of each node in the network is used to express different colors from chr1 to chr12.</p> 
         <p> In the case of GO, it is expressed as BP, CC, and MF, which are large classifications.</p> 
         <p> If you left-click a node, it turns orange and you can get a list of important genes, which is released when you right-click.</p> 
         <p> The gene used in the search is included in the important gene when clicked, but does not change the node color.
</p>
       
         <p> Use RICENET data.</p> 
         <p> 
Use networkx, a python library.</p> 
         <p> Implemented in page with react-forced-graph.
</p> 
         <p>When left-clicking, it turns orange and is added to the Chosen Node information below.
</p> 
      

       
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
           (download csv,cyjs)
           </Modal.Title>
         </Modal.Header>
         <Modal.Body>
         <p>
Download the cyjs format that can be drawn in cytoscape and analyze the results of the experiment.
You can also check it in cytoscape.</p>
         <p> The research results can be downloaded in csv format.
</p> 
         <p> The network node (specific) can receive the protein added to the chosen node in bulk format and use it in other analyses.
 </p> 
         <p>In addition, information used for analysis such as experiment name and cutoff value is provided.
</p> 
         <p> 
Network node (whole) Provides node information. Provides information such as node information (go description, go type, chr information, venn information, (VMV, GO, BULK), searchoption) and identified. </p> 
         <p>In addition, it provides edge information composed of source and target.

</p> 
         <p> In the case of GO, the table used in the GO page is provided.
</p> 
         <p> For significants, it provides information on the proteins that passed the pvalue.
</p> 
       
       
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
          Chosen Node
           </Modal.Title>
         </Modal.Header>
         <Modal.Body>
         <p> Left-click on Network to add it here.
</p> 
        
       
       
         </Modal.Body>
       </Modal>
    
  
       <Modal
 show={show41}
 onHide={() => setShow41(false)}
         dialogClassName="modal-90w"
         aria-labelledby="example-custom-modal-styling-title"
       >
         <Modal.Header closeButton>
           <Modal.Title id="example-custom-modal-styling-title">
           Metadata information
           </Modal.Title>
         </Modal.Header>
         <Modal.Body>
        
          { props.NETID!=false ?  <>
       <p style={{'font-weight':'bold'  ,'word-wrap':'break-word'}}>Group A from Protein Basket </p>
      <br/>
      <p style={{'word-wrap':'break-word'}}>  {props.NETID[7][0][13]}  </p>
     <br/>
     <p style={{'font-weight':'bold','word-wrap':'break-word'}}>  Group B from Protein Basket(optional)  </p>
      <br/>
      <p style={{'word-wrap':'break-word'}} >  {props.NETID[7][0][14]}  </p>
     <br/>
     <p style={{'font-weight':'bold' ,'word-wrap':'break-word'}}>  VMV: </p>
      <br/>
      <p style={{'word-wrap':'break-word'}} >  {props.NETID[7][0][12]!=''? props.NETID[7][0][12].split('VMV:')[1].split(';')[0] :false}  </p>
     <br/>
     <p style={{'font-weight':'bold','word-wrap':'break-word'}}>  GO: </p>
      <br/>
      <p style={{'word-wrap':'break-word'}}>  {props.NETID[7][0][12]!=''? props.NETID[7][0][12].split('GO:')[1].split(';')[0]:false}  </p>
     <br/>
     <p style={{'font-weight':'bold','word-wrap':'break-word'}}>  Bulk: </p>
      <br/>
      <p style={{'word-wrap':'break-word'}}>  {props.NETID[7][0][12]!=''? props.NETID[7][0][12].split('Bulk:')[1].split(';')[0]:false}  </p>
     <br/>
     

     </>:false

}

         </Modal.Body>
       </Modal>
    
  
    </>
      )

}
export default Scaffold3_6;


/*

<Row>

<Col lg={12} sm={12}  > 
{re3!=false  && re3[2].length==0 &&props.NETID[10][1]!='FinAnalysis' ?
 <Col lg={6} sm={5}  > 
<p>reanalyze</p>
<Button variant="link"  onClick={(e)=> dd(e)   }>re Analysis</Button>
</Col>
   
   :false}
</Col>
</Row>


*/