
import Chart from "react-google-charts";
import React,{useCallback} from 'react';
import { View, StyleSheet, Text, } from 'react-native';
import {Segment,Divider, Container,Button ,Dropdown ,Grid,Message,Form,Header}  from 'semantic-ui-react';
import { BsQuestionLg } from 'react-icons/bs';


import jStat from "jstat";
//ref={componentRef}


/*
  <Col xs={12}
       sm={6}
       lg={6}
       className="d-flex flex-col justify-content-lg-left align-items-center justify-content-sm-start mb-2 mb-sm-0">
    <Button variant="link" onClick={() => setShow(true)}>  <BsQuestionLg/> </Button>
    </Col>
*/





function Scharts(props ){
  const data1=props.data
  const mjprotein =props.mjproteininfo

//data를 만져서 v:~ f:~ 형태로 바꿔야함
  const    ckhubline2=useCallback((index)=>{
//    index.preventdefault();
    //index.preventdefault();
    const mjprotein = index.split(';')[0]

    props.getinterNodes(mjprotein)
        },[])
  


const CCChart=()=>{

    return (

      <>        
        <Chart 
        width={800}
        height={600}
        chartType="ScatterChart"
        loader={<div>Loading Chart</div>}
        data={data1}
        options={{
          title: `Volcano plot` ,
          pointSize :3  ,
          colors: ["blue", "red", "#222222", "gray",'#1e1e1e'],
          chart: {
            title: "Differential Expression Analysis",
            subtitle: "Volcano plot"
          },
          hAxis: { title: "log₂foldchange value" },
          vAxis: { title: "-log p value" }
        }}
        chartEvents={[
          {
            eventName: 'select',
            callback: ({ chartWrapper }) => {
              const chart = chartWrapper.getChart()
              const selection = chart.getSelection()
              if (selection.length === 1) {
                const [selectedItem] = selection

                ckhubline2(mjprotein[selectedItem.row])
                
              }
            },
          },
        ]}
      />
    
</>
      );

    }
return(
<>

  <CCChart/>

  </>)


    }

export default Scharts