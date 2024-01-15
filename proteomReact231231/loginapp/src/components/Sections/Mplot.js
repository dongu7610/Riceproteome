
import Chart from "react-google-charts";
import { View, StyleSheet, Text, } from 'react-native';
import {Segment,Divider, Container,Button ,Dropdown ,Grid,Message,Form,Header}  from 'semantic-ui-react';
import React,{useState, useEffect,Suspense,useCallback} from 'react';
import { BsQuestionLg } from 'react-icons/bs';



import jStat from "jstat";
//ref={componentRef}

 
function CalChr(go,getfc) {

  //getfc

  const chrinfo={'chr1':	43.27,'chr2':	35.94,'chr3':	36.41,'chr4':	35.5,'chr5':29.96,'chr6':	31.25
  ,'chr7':29.7,'chr8':	28.44,'chr9':	23.01,'chr10':	23.21,'chr11'	:29.02,'chr12'	:27.53}

  const chr1=0
  const chr2=chrinfo["chr1"]
  const chr3=chrinfo["chr1"]+chrinfo["chr2"]
  const chr4=chrinfo["chr1"]+chrinfo["chr2"]+chrinfo["chr3"]
  const chr5=chrinfo["chr1"]+chrinfo["chr2"]+chrinfo["chr3"]+chrinfo["chr4"]
  const chr6=chrinfo["chr1"]+chrinfo["chr2"]+chrinfo["chr3"]+chrinfo["chr4"]+chrinfo['chr5']
  const chr7=chrinfo["chr1"]+chrinfo["chr2"]+chrinfo["chr3"]+chrinfo["chr4"]+chrinfo['chr5']+chrinfo['chr6']
  const chr8=chrinfo["chr1"]+chrinfo["chr2"]+chrinfo["chr3"]+chrinfo["chr4"]+chrinfo['chr5']+chrinfo['chr6']+chrinfo['chr7']
  const chr9=chrinfo["chr1"]+chrinfo["chr2"]+chrinfo["chr3"]+chrinfo["chr4"]+chrinfo['chr5']+chrinfo['chr6']+chrinfo['chr7']+chrinfo['chr8']
  const chr10=chrinfo["chr1"]+chrinfo["chr2"]+chrinfo["chr3"]+chrinfo["chr4"]+chrinfo['chr5']+chrinfo['chr6']+chrinfo['chr7']+chrinfo['chr8']+chrinfo['chr9']
  const chr11=chrinfo["chr1"]+chrinfo["chr2"]+chrinfo["chr3"]+chrinfo["chr4"]+chrinfo['chr5']+chrinfo['chr6']+chrinfo['chr7']+chrinfo['chr8']+chrinfo['chr9']+chrinfo['chr10']
  const chr12=chrinfo["chr1"]+chrinfo["chr2"]+chrinfo["chr3"]+chrinfo["chr4"]+chrinfo['chr5']+chrinfo['chr6']+chrinfo['chr7']+chrinfo['chr8']+chrinfo['chr9']+chrinfo['chr10']+chrinfo['chr11']
  const chrend=chrinfo["chr1"]+chrinfo["chr2"]+chrinfo["chr3"]+chrinfo["chr4"]+chrinfo["chr5"]+chrinfo['chr6']+chrinfo['chr7']+chrinfo['chr8']+chrinfo['chr9']+chrinfo['chr10']+chrinfo['chr11']+chrinfo['chr12']
  
  
const conv={ 'Chr1':chr1,'Chr2':chr2,'Chr3':chr3, 'Chr4':chr4,'Chr5':chr5
,'Chr6':chr6,'Chr7':chr7,'Chr8':chr8, 'Chr9':chr9,'Chr10':chr10,'Chr11':chr11,'Chr12':chr12


}
const col=["blue", "#E31A1C",
"#6A3D9A", 
"black",
"green",
"#CAB2D6",
"#FDBF6F",
"gray",
"maroon","#FF33CC",
"darkturquoise",
"orange"]


//#E31A1C,#6A3D9A,black,palegreen2,#CAB2D6,#FDBF6F,gray70,maroon,deeppink1,darkturquoise,green1,yellow3,darkorange4
const colors={ 'Chr1':col[0],'Chr2':col[1],'Chr3':col[2], 'Chr4':col[3],'Chr5':col[4]
,'Chr6':col[5],'Chr7':col[6],'Chr8':col[7], 'Chr9':col[8],'Chr10':col[9],'Chr11':col[10],'Chr12':col[11]


}

   var dictObjecttest = {}
    const gomap=go.map((a,i)=>{
      
  const locinfos= [a[0].split('^^')[0]]
  const fcvalue = a[2]
  locinfos.map((b,j)=>{
        const msuid=locinfos[j].split(':')[0]
        const msuchr=locinfos[j].split(':')[1]
        const locinfo=locinfos[j].split(':')[2]
        const getfcvalue=fcvalue.toFixed(2)
        
        const getcolor= fcvalue>getfc&&colors[msuchr]!=undefined  ?        `fill-color: ${colors[msuchr] }; fill-opacity: 1`      :   `fill-color: ${colors[msuchr] }; fill-opacity: 0.5`
  
          dictObjecttest[msuid]=[{v:(parseInt(locinfo)/1000000)+parseInt(conv[msuchr]),f:`Protein Name:${msuid}`},{v:parseFloat(getfcvalue),f:  `chromosome number: ${msuchr} \n log₂foldchange:${getfcvalue} \n location on the chromosome:${(parseInt(locinfo)/1000000)} `},getcolor,null]//,msuid+';'+cdsinfos[k]
          //msuid+';'+cdsinfos[k]
         
          //f:  msuchr+':'+msuid+':'+getfcvalue +':'+(parseInt(locinfo)/1000000)
            //"\n"를 f 사이에 끼워넣어서 하면됨.
          ////ckhubline2의 mjprotein split고쳐줘야함
                  
  
      }) 
      })
  const  data3test=Object.keys(dictObjecttest).map((a)=>{
  
  return    dictObjecttest[a]
    })
    
    const beforedata3=[['Position(MB)','Chromosome infomation', {  type: "string", role: 'style' }, "fc"]]

  const afterdata=beforedata3.concat(data3test)
  
  
    afterdata.push([0,{v:getfc,f:null},null,getfc])

    afterdata.push([373.24,{v:getfc,f:null},null,getfc])



    
  return afterdata
  
  }


function Mplot(props ){   
  
  const    ckhubline2=useCallback((index)=>{
    //index.preventdefault();
    //index.preventdefault();
    const mjprotein = index[0]['f'].split(':')[1].split(';')[0]

    props.getinterNodes(mjprotein)
    //
        },[])
  


    const [map2,setmapdata]=useState([])
    const [mapfc,setmapfc]=useState(1.5)
    
    useEffect(()=>{
   
        setmapdata(props.remap)
        setmapfc(parseFloat(props.fc))


 },[props])



 const chrinfo={'chr1':	43.27,'chr2':	35.94,'chr3':	36.41,'chr4':	35.5,'chr5':29.96,'chr6':	31.25
 ,'chr7':29.7,'chr8':	28.44,'chr9':	23.01,'chr10':	23.21,'chr11'	:29.02,'chr12'	:27.53}

 const chr1=0
 const chr2=chrinfo["chr1"]
 const chr3=chrinfo["chr1"]+chrinfo["chr2"]
 const chr4=chrinfo["chr1"]+chrinfo["chr2"]+chrinfo["chr3"]
 const chr5=chrinfo["chr1"]+chrinfo["chr2"]+chrinfo["chr3"]+chrinfo["chr4"]
 const chr6=chrinfo["chr1"]+chrinfo["chr2"]+chrinfo["chr3"]+chrinfo["chr4"]+chrinfo['chr5']
 const chr7=chrinfo["chr1"]+chrinfo["chr2"]+chrinfo["chr3"]+chrinfo["chr4"]+chrinfo['chr5']+chrinfo['chr6']
 const chr8=chrinfo["chr1"]+chrinfo["chr2"]+chrinfo["chr3"]+chrinfo["chr4"]+chrinfo['chr5']+chrinfo['chr6']+chrinfo['chr7']
 const chr9=chrinfo["chr1"]+chrinfo["chr2"]+chrinfo["chr3"]+chrinfo["chr4"]+chrinfo['chr5']+chrinfo['chr6']+chrinfo['chr7']+chrinfo['chr8']
 const chr10=chrinfo["chr1"]+chrinfo["chr2"]+chrinfo["chr3"]+chrinfo["chr4"]+chrinfo['chr5']+chrinfo['chr6']+chrinfo['chr7']+chrinfo['chr8']+chrinfo['chr9']
 const chr11=chrinfo["chr1"]+chrinfo["chr2"]+chrinfo["chr3"]+chrinfo["chr4"]+chrinfo['chr5']+chrinfo['chr6']+chrinfo['chr7']+chrinfo['chr8']+chrinfo['chr9']+chrinfo['chr10']
 const chr12=chrinfo["chr1"]+chrinfo["chr2"]+chrinfo["chr3"]+chrinfo["chr4"]+chrinfo['chr5']+chrinfo['chr6']+chrinfo['chr7']+chrinfo['chr8']+chrinfo['chr9']+chrinfo['chr10']+chrinfo['chr11']
 const chrend=chrinfo["chr1"]+chrinfo["chr2"]+chrinfo["chr3"]+chrinfo["chr4"]+chrinfo["chr5"]+chrinfo['chr6']+chrinfo['chr7']+chrinfo['chr8']+chrinfo['chr9']+chrinfo['chr10']+chrinfo['chr11']+chrinfo['chr12']
 
 

 var ticksX2 = [0,chr1,chr2,chr3,chr4, chr5,chr6, chr7,chr8, chr9,chr10, chr11,chr12];
const foldchange= props.ck!='down'?  "Foldchange(Log 2)": "- Foldchange(Log 2)"
  const options3 = {
    
   title: `Genome locus info (${props.ck})` ,
   
   seriesType: "scatter",
   series: {
     1: {
       color: "red",
       type: "line"
     },
     
   },
 //  colors: ['red'],
   pointSize :2  ,
   vAxis: {
     ticks: [
       { v: 1, f: '1' },
       { v: mapfc,f: `${mapfc}`},
       { v: 2, f: '2' },
       { v: 3, f: '3' },
     ],
     textStyle: {
      fontSize : 7,
      fontName: 'Arial',
      bold: true,
      italic: true
       
     },
     title: foldchange
   },
   hAxis: {
     ticks: [{v:chr1,f:'Chr1'},{v:chr1+10,f:''},{v:chr1+20,f:''},{v:chr1+30,f:''},{v:chr1+40,f:''},
     {v:chr2,f:'Chr2'},{v:chr2+10,f:''},{v:chr2+20,f:''},{v:chr2+30,f:''},
     {v:chr3,f:'Chr3'},{v:chr3+10,f:''},{v:chr3+20,f:''},{v:chr3+30,f:''},
     {v:chr4,f:'Chr4'},{v:chr4+10,f:''},{v:chr4+20,f:''},{v:chr4+30,f:''},
     {v:chr5,f:'Chr5'},{v:chr5+10,f:''},{v:chr5+20,f:''},
     {v:chr6,f:'Chr6'},{v:chr6+10,f:''},{v:chr6+20,f:''},{v:chr6+30,f:''},
     {v:chr7,f:'Chr7'},{v:chr7+10,f:''},{v:chr7+20,f:''},
     {v:chr8,f:'Chr8'},{v:chr8+10,f:''},{v:chr8+20,f:''},
     {v:chr9,f:'Chr9'},{v:chr9+10,f:''},{v:chr9+20,f:''},
     {v:chr10,f:'Chr10'},{v:chr10+10,f:''},{v:chr10+20,f:''},
     {v:chr11,f:'Chr11'},{v:chr11+10,f:''},{v:chr11+20,f:''},
     {v:chr12,f:'Chr12'},{v:chr12+10,f:''},{v:chr12+20,f:''},
     
    
    ]

  
     ,textStyle: {
      fontSize : 7,
      fontName: 'Arial',
      bold: true,
      italic: true
       
     },
     title: 'Chromosome position(MB)'
   },
   legend: { position: "none" },
 };






return(


<>

  <Chart 
    chartType="ComboChart"
    width="100%"
    height="120%"
    data={      CalChr(map2,mapfc)  }
    options={options3}
    chartEvents={[
      {
        eventName: 'select',
        callback: ({ chartWrapper }) => {
          const chart = chartWrapper.getChart()
          const selection = chart.getSelection()
          if (selection.length === 1) {
            const [selectedItem] = selection
            
            ckhubline2(CalChr(map2,mapfc)[selectedItem.row+1])
            
          }
        },
      },
    ]}

  />


  </>)


    }

export default Mplot




/*const chrinfo={'chr1':	43.27,'chr2':	35.94,'chr3':	36.41,'chr4':	35.5,'chr5':29.96,'chr6':	31.25
,'chr7':29.7,'chr8':	28.44,'chr9':	23.01,'chr10':	23.21,'chr11'	:29.02,'chr12'	:27.53}

const re= testmap['result']

const map2=re.map((a,i)=>{

  return [a.chrinfo,a.pvalue,a.foldchange]})
 console.log(map2)




 
function CalChr(go) {

  const chrinfo={'chr1':	43.27,'chr2':	35.94,'chr3':	36.41,'chr4':	35.5,'chr5':29.96,'chr6':	31.25
  ,'chr7':29.7,'chr8':	28.44,'chr9':	23.01,'chr10':	23.21,'chr11'	:29.02,'chr12'	:27.53}

const chr1=0
const chr2=chrinfo["chr2"]
const chr3=chrinfo["chr2"]+chrinfo["chr3"]
const chr4=chrinfo["chr2"]+chrinfo["chr3"]+chrinfo["chr4"]
const chr5=chrinfo["chr2"]+chrinfo["chr3"]+chrinfo["chr4"]+chrinfo["chr5"]
const chr6=chrinfo["chr2"]+chrinfo["chr3"]+chrinfo["chr4"]+chrinfo["chr5"]+chrinfo['chr6']
const chr7=chrinfo["chr2"]+chrinfo["chr3"]+chrinfo["chr4"]+chrinfo["chr5"]+chrinfo['chr6']+chrinfo['chr7']
const chr8=chrinfo["chr2"]+chrinfo["chr3"]+chrinfo["chr4"]+chrinfo["chr5"]+chrinfo['chr6']+chrinfo['chr7']+chrinfo['chr8']
const chr9=chrinfo["chr2"]+chrinfo["chr3"]+chrinfo["chr4"]+chrinfo["chr5"]+chrinfo['chr6']+chrinfo['chr7']+chrinfo['chr8']+chrinfo['chr9']
const chr10=chrinfo["chr2"]+chrinfo["chr3"]+chrinfo["chr4"]+chrinfo["chr5"]+chrinfo['chr6']+chrinfo['chr7']+chrinfo['chr8']+chrinfo['chr9']+chrinfo['chr10']
const chr11=chrinfo["chr2"]+chrinfo["chr3"]+chrinfo["chr4"]+chrinfo["chr5"]+chrinfo['chr6']+chrinfo['chr7']+chrinfo['chr8']+chrinfo['chr9']+chrinfo['chr10']+chrinfo['chr11']
const chr12=chrinfo["chr2"]+chrinfo["chr3"]+chrinfo["chr4"]+chrinfo["chr5"]+chrinfo['chr6']+chrinfo['chr7']+chrinfo['chr8']+chrinfo['chr9']+chrinfo['chr10']+chrinfo['chr11']+chrinfo['chr12']
const chrend=chrinfo["chr1"]+chrinfo["chr2"]+chrinfo["chr3"]+chrinfo["chr4"]+chrinfo["chr5"]+chrinfo['chr6']+chrinfo['chr7']+chrinfo['chr8']+chrinfo['chr9']+chrinfo['chr10']+chrinfo['chr11']+chrinfo['chr12']


const conv={ 'Chr1':chr1,'Chr2':chr2,'Chr3':chr3, 'Chr4':chr4,'Chr5':chr5
,'Chr6':chr6,'Chr7':chr7,'Chr8':chr8, 'Chr9':chr9,'Chr10':chr10,'Chr11':chr11,'Chr12':chr12


}
const col=["dodgerblue2", "#E31A1C",
"green4",
"#6A3D9A", 
"#FF7F00",
"black", "gold1",
"skyblue2", "#FB9A99",
"palegreen2",
"#CAB2D6",
"#FDBF6F",
"gray70", "khaki2",
"maroon", "orchid1", "deeppink1", "blue1", "steelblue4",
"darkturquoise", "green1", "yellow4", "yellow3",
"darkorange4", "brown"]

const colors={ 'Chr1':col[0],'Chr2':col[1],'Chr3':col[2], 'Chr4':col[3],'Chr5':col[4]
,'Chr6':col[5],'Chr7':col[6],'Chr8':col[7], 'Chr9':col[8],'Chr10':col[9],'Chr11':col[10],'Chr12':col[11]


}

   var dictObjecttest = {}
    const gomap=go.map((a,i)=>{
      
  const locinfos= a[0].split('^^')
  locinfos.map((b,j)=>{
        const msuid=locinfos[j].split(':')[0]
        const msuchr=locinfos[j].split(':')[1]
        const locinfo=locinfos[j].split(':')[2]
    
  
    
    
          
  
          dictObjecttest[msuid]=[(parseInt(locinfo)/1000000)+parseInt(conv[msuchr]),{v:(a[2][j]),f:  msuchr+':'+msuid},colors[msuchr],null,null]//,msuid+';'+cdsinfos[k]
          //msuid+';'+cdsinfos[k]
           
                  
  
      }) 
      })
  const  data3test=Object.keys(dictObjecttest).map((a)=>{
  
  return    dictObjecttest[a]
    })
    
    const beforedata3=[['Position(MB)','Chrinfo', {  type: "string", role: 'style' },"pv", "fc"],[0,{v:0,f:null},null,null,null]]

  const afterdata=beforedata3.concat(data3test)
  
  
    afterdata.push([0,{v:15,f:null},null,5,null])

    afterdata.push([373.24,{v:15,f:null},null,5,null])
    afterdata.push([0,{v:15,f:null},null,null,10])

    afterdata.push([373.24,{v:15,f:null},null,null,10])

    
  return afterdata
  
  }






  var ticksX2 = [0,chr1,chr2,chr3,chr4, chr5,chr6, chr7,chr8, chr9,chr10, chr11,chr12];
  
  
  export const options3 = {
    title: "Genome locus info",
    
    seriesType: "scatter",
    series: {
      1: {
        color: "gray",
        type: "line"
      },
      2: {
        color: "gray",
        type: "line"
      }
    },
  //  colors: ['red'],
    pointSize :2  ,
    vAxis: {
      ticks: [
        { v: 5, f: "pv" },
        { v: 10, f: "fc" },
        
      ],
      textStyle: {
        fontSize : 10
      },
      title: 'Chr Number'
    },
    hAxis: {
      ticks: ticksX2
      ,textStyle: {
        fontSize : 10
      },
      title: 'Chr position(MB)'
    },
    legend: { position: "none" },
  };

export default function App() {
  
  return (


    <div className="App">
      
      <Chart
    chartType="ComboChart"
    width="100%"
    height="100%"
    data={      CalChr(map2)  }
    options={options3}

  />
    </div>
  );
}

*/