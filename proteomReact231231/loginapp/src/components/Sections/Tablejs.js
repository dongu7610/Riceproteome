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
import Scharts from "./Scharts"
import Venndiagram from "./Venndiagram"
import jStat from "jstat";
import Chart from "react-google-charts";
import { CSVLink, CSVDownload } from "react-csv";
import Mplot from './Mplot'
import Mplot2 from './Mplot2'
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



function Tablejs(props ){
  
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);

    const [re3,setre3]=useState(props.re3  )
    const [gethover,setgethover]=useState(props.hover3  )
const Tablediv=()=>{

  
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
const ProteinDescription= props.NETID[11].filter(id=>id.proteinids.includes(nodename)).length!=0 ? 
props.NETID[11].filter(id=>id.proteinids.includes(nodename)).map((a,i)=>{return a.fastaheaders.split(';')[0].split('>')[1].split('|')[1] }).join()

:'NaN'

const identified= props.NETID[11].filter(id=>id.proteinids.includes(nodename)).length!=0 ? 'identified':'NaN'

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
      const identified = props.NETID[11].filter(id=>id.proteinids.includes(nodename)).length!=0 ? 'identified':'NaN'
      
     // const getgoid= goid!=''?goid : 'NaN'
      //const getgofilter= gofilter!=''?gofilter : 'NaN'
      const getitemindex=itemindex!=''?labelindex[itemindex]+';'+labelindex2[GroupAB] : labelindex2[GroupAB]
      //itemindex
      
      const ProteinDescription= props.NETID[11].filter(id=>id.proteinids.includes(nodename)).length!=0 ? 
props.NETID[11].filter(id=>id.proteinids.includes(nodename)).map((a,i)=>{return a.fastaheaders.split(';')[0].split('>')[1].split('|')[1] }).join()

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
            const identified= props.NETID[11].filter(id=>id.proteinids.includes(name)).length!=0 ? 'identified':'NaN'
      
      
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
    
   






  return(
  <>


  
    <Tablediv/>
  
    </>)
  
  
      }
  
  export default Tablejs