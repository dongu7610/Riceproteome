
import Chart from "react-google-charts";
import { View, StyleSheet, Text, } from 'react-native';
import {InputGroup, Container,Col,Row,Image,Modal,Button,Card,Form} from 'react-bootstrap';
import React,{useState, useEffect,Suspense,useCallback} from 'react';
import { BsQuestionLg } from 'react-icons/bs';



import jStat from "jstat";
//ref={componentRef}

 
function CalChr(go,getfc,getlength,vennitem,vennitems2) {

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
const palette2= ["blue","#E31A1C",  "#6A3D9A","black"
  , "green"
  ,"#CAB2D6"
  ,"#FDBF6F","#FFF0F5","#8B0000","#FF33CC"
,"darkturquoise",
  "#FFA500" ,'#A52A2A' ,'#B5B5B5'
]



   var dictObjecttest = {}
    const gomap=      go[0].map((a,i)=>{
      
   //     go[0][i]getlength>1?
const average = arr => arr.reduce((a,b) => a + b, 0) / arr.length;
//average([99, 45, 26, 7, 11, 122, 22]).toFixed(2); 
  //const beforeavfcvalue= go.map((c,k)=>{return go[k][i][2]})
 
  const beforeavfcvalue= go.map((c,k)=>{


    const ckvalue=    go[k].filter(id=>id[3]==a[3])[0]
    const push=     (ckvalue!=undefined&& ckvalue.length>0)? parseFloat(ckvalue[2].toFixed(3)):null  
    return push
      })
 
// vb      beforeavfcvalue
 
  const afteravvalue=average(beforeavfcvalue).toFixed(3)
 
  // majerprotein


  const locinfos= [a[0].split('^^')[0]]
  locinfos.map((b,j)=>{
        const msuid=locinfos[j].split(':')[0]
        const msuchr=locinfos[j].split(':')[1]
        const locinfo=locinfos[j].split(':')[2]
        beforeavfcvalue.map((venn,i)=>{
          const indexOfvennarea=        vennitems2.indexOf(vennitem[i])

          
const          vennmsuid= msuid+i 
          const getcolor= venn>getfc  ?        `fill-color: ${palette2[indexOfvennarea] }; fill-opacity: 1`      :   `fill-color: ${palette2[indexOfvennarea] }; fill-opacity: 0.5`
          const dictvalue=      [{v:(parseInt(locinfo)/1000000)+parseInt(conv[msuchr]),f:`Protein Name:${msuid}`},{v:parseFloat(venn),f: `chromosome number: ${msuchr} \n log₂foldchange:${venn} \n location on the chromosome:${(parseInt(locinfo)/1000000)} `},getcolor,null]
                                                                                                                                   
          
          //"\n"를 f 사이에 끼워넣어서 하면됨.

          ////ckhubline2의 mjprotein split고쳐줘야함
          
          //const getfcvalue= [venn,null]
          const afterdictvalue= dictvalue//.concat(getfcvalue)
        
         
                  dictObjecttest[vennmsuid]=afterdictvalue
          
        })

        //,msuid+';'+cdsinfos[k]
          //msuid+';'+cdsinfos[k]
           
                  
  
      }) 
      })/*:
      
      go[0].map((a,i)=>{
//        Math.max(...array1))

  const beforeavfcvalue= go.map((c,k)=>{


const ckvalue=    go[k].filter(id=>id[3]==a[3])[0]
const push=     (ckvalue!=undefined&& ckvalue.length>0)? ckvalue[2]:null  
return push
  })

const maxfc=  Math.max(beforeavfcvalue)


        const locinfos= a[0].split('^^')
        const fcvalue = a[2]
      
        locinfos.map((b,j)=>{
              const msuid=locinfos[j].split(':')[0]
              const msuchr=locinfos[j].split(':')[1]
              const locinfo=locinfos[j].split(':')[2]
              const getfcvalue=maxfc
          
              const getcolor= getfcvalue>getfc&&colors[msuchr]!=undefined  ?        `fill-color: ${colors[msuchr] }; fill-opacity: 1`      :   `fill-color: ${colors[msuchr] }; fill-opacity: 0.5`
        
                dictObjecttest[msuid]=[(parseInt(locinfo)/1000000)+parseInt(conv[msuchr]),{v:(getfcvalue),f:  msuchr+':'+msuid+':'+getfcvalue +':'+(parseInt(locinfo))},getcolor,getfcvalue,null]//,msuid+';'+cdsinfos[k]
                //msuid+';'+cdsinfos[k]
                 
                        
        
            }) 
            })


*/

      
  const  data3test=Object.keys(dictObjecttest).map((a)=>{
  
  return    dictObjecttest[a]
    })
    

    const beforedata3=['Position(MB)','Chromosome infomation', {  type: "string", role: 'style' } ]

//const appendvalue=    [{ id: `i0`, type: "number", role: "interval" }]

/*getlength>1? go.map((a,j)=>
    
    (    { id: `i${j}`, type: "number", role: "interval" })


    
    ) : [{ id: `i0`, type: "number", role: "interval" }]*/


//const header=    beforedata3.concat(appendvalue)
const header2= [beforedata3.concat(['fc'])]

  const afterdata=header2.concat(data3test)
  
  
//  getlength>1?
  const findata=   [getfc]
//   go.map((a,i)=>   null )
    // :     [null]
//const fin2data=    findata.concat(getfc)

    const throwlsvalue=[0,{v:getfc,f:null},null].concat(findata)
    const throwlevalue=[373.24,{v:getfc,f:null},null].concat(findata)

    afterdata.push(throwlsvalue)
    afterdata.push(throwlevalue)






const tf=    data3test.length>0?true:false

  return [afterdata,tf]
  
  }


function Mplot2(props ){
   
  const    ckhubline2=useCallback((index)=>{
    //ckhubline2의 mjprotein split고쳐줘야함
  //  index.preventdefault();
//  index.preventdefault();
    const mjprotein = index[0]['f'].split(':')[1].split(';')[0]

    props.getinterNodes(mjprotein)
        },[])
  


    const [chritems,setchritems]=useState(false)
    const [tf,settf]=useState(false)
    
    useEffect(()=>{
        // props.user&&props.getvenn!=false?
        const indexid=     props.getvenn!=false?        props.getvenn[1].map((a,i)=>{

          const  userindex=parseInt(a.split('compare')[1][0])-1
           const getvalue=props.remap[userindex].filter(id=>id[1]>props.pv).filter(id=>props.getvenn[0].includes(id[3]))
          
         
           
          return getvalue
        }):false
       
  
        const indexid2=     props.getvenn!=false?        props.remap.map((a,i)=>{

           const getvalue=props.remap[i].filter(id=>id[1]>props.pv).filter(id=>props.getvenn[0].includes(id[3])).map((a,i)=>{

            return a[3]
           })
          
         
           
          return getvalue
        }).filter(id=>id.length>0):false
        
       
const getitem= indexid!=false?  CalChr(indexid,parseFloat(props.fc),props.getvenn[1].length ,props.getvenn[1],props.vennitems2)  :[false,false]

//props.ck
setchritems(getitem[0])
settf(getitem[1])

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
 const foldchange= props.ck!='down'?  "log₂foldchange": "-log₂foldchange"

  const options3 = {
    
   title: `Genome locus info (${props.ck})` ,
   
   seriesType: "scatter",
   series: {
     1: {
       color: "red",
       type: "line"
     },
     
   },
//      intervals: { size: 1 },

 //  colors: ['red'],
   pointSize :2  ,
   vAxis: {
     ticks: [
       { v: 1, f: '1' },
       { v: props.fc,f: `${props.fc}`},
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


return(


<>
{tf!=false&&chritems!=false&&props.getvenn!=false  ? 
<Chart 
chartType="ComboChart"
width="1000px"
height="200px"
data={      chritems}
options={options3}
chartEvents={[
  {
    eventName: 'select',
    callback: ({ chartWrapper }) => {
      const chart = chartWrapper.getChart()
      const selection = chart.getSelection()
      if (selection.length === 1) {
        const [selectedItem] = selection
        ckhubline2(chritems[selectedItem.row+1])
        
      }
    },
  },
]}

/>:false
}
{tf!=false  && props.ck=='down'?
<div>
        <Button variant="link" id="Manhattan1" onClick={(e) => svgchangeoption(e)}>
          {" "}
          Export svg(Venn,Manhattan(-))
        </Button>
        </div>
        : 
        tf!=false  && props.ck=='up'?

        <div>
        <Button variant="link" id="Manhattan0" onClick={(e) => svgchangeoption(e)}>
          {" "}
          Export svg(Venn,Manhattan(+))
        </Button>
        </div>:false
}




  </>)


    }

export default Mplot2

/*
<Chart 
chartType="ComboChart"
width="100%"
height="120%"
data={      CalChr(map2,mapfc)  }
options={options3}

/>*/