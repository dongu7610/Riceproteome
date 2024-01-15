import * as d3 from "d3";
import * as venn from "venn.js";
import { select } from "d3";
import { useEffect,useRef,useState } from "react";
import { BsQuestionLg } from 'react-icons/bs';
import {InputGroup, Container,Col,Row,Image,Modal,Button,Form,Card,Table} from 'react-bootstrap';





  //global variable
  var datesPresent = [];
  
  //component
  function Venndiagram(props) {
//    console.log(props)
    const [show, setShow] = useState(false);

    const svgRef = useRef();
//    const svgRef2 = useRef();
    const [data, setdata] = useState(props.data);
    useEffect(() => {
const getlength=props.exdata.map((a,i)=>{return          a.majorityproteinids.split(';')[0]    }).length
      const abc = data.map(
        (a, i) => {
          if (a.sets.length > 1) {

            if(a.size ==0 ){
              return { size: (a.size/getlength)*100 , sets: a.sets, values: a.values };

            }
            if(a.size ){
              const nanugi=   (a.size/getlength)*100 >10? (a.size/getlength*2)*100: (a.size*2/getlength)*100
              return { size: nanugi, sets: a.sets, values: a.values };


            }



          }
          if (a.sets.length == 1) {
            if(a.size ==0 ){
              return { size: (a.size/getlength)*100 , sets: a.sets, values: a.values };

            }
            if(a.size ){
              const nanugi=   (a.size/getlength)*100 >15? (a.size/getlength*3)*100: (a.size*5/getlength)*100
              return { size: nanugi , sets: a.sets, values: a.values };

            }
            
          }
        }
        //
      );
      var Tooltip = d3
      .select(svgRef.current)
      .append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "white")
  .style("border", "solid")
  .style("border-width", "2px")
  .style("border-radius", "5px")
//  .style("padding", "5px")
      const svg = select(svgRef.current);
      svg.datum(abc).call(venn.VennDiagram());
     
  
      //interaction to venn diagram
      //mouse events

      var mouseover = function(d,i) {
        Tooltip
          .style("opacity", 1)
        d3.select(this)
          .style("stroke", "black")
          .style("opacity", 1)
      }
      var mousemove = function(d,i) {
        
       
        Tooltip
          .html("The exact value of<br>this cell has: " +i.sets+';'+ i.values.length)
          .style("right", (d3.pointer(d,this)[0]+5) + "px")
          .style("top", (d3.pointer(d,this)[1]+5) + "px")
      }
      var mouseleave = function(d) {
        Tooltip
          .style("opacity", 0.5)
        d3.select(this)
          .style("stroke", "none")
          .style("opacity", 0.8)
      }
    
      svg
        .selectAll("g")
        .on("click",function (d, i) {
          d3.select(this).attr("opacity", 1);
          props.tosdata(i)
        })
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
       
        ;  
        


    }, [props.data]);
  
    //  const chart = .width(400).height(450);
  // <Button variant="link" onClick={() => setShow(true)}>  <BsQuestionLg/> </Button>
  
  //
    return (
      <>
         

          <div ref={svgRef} id='venn'  ></div>
         

  
  
<Modal
show={show}
onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            VennDiagram입니다.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p> DEP분석 결과를 바탕으로 compare1(down,up,similar),compare2(down,up,similar)...와 같은 영역을 얻을 수 있습니다.</p> 
        <p> 영역과 영역의 비교를 venndiagram으로 제공합니다.</p> 
        <p> venndiagram의 영역을 선택하면 선택한 영역에 속하는 단백질을 manhattan plot으로 그립니다. </p>
        <p> manhattan plot의 단백질을 선택해서 추가할 수 있습니다.</p> 
        </Modal.Body>
      </Modal>



      </>
    );
  }
  
  export default Venndiagram;
  
  /*
    const [data, setData] = useState([24, 30, 45, 70, 26]);
    
  
    useEffect(() => {
      const svg = select(svgRef.current); // selection 객체
  
      svg
        .selectAll("circle")
        .data(data)
        .join(
          (enter) => enter.append("circle"),
          (update) => update.attr("class", "updated"),
          (exit) => exit.remove()
        )
        .attr("r", (value) => value)
        .attr("cx", (value) => value * 2)
        .attr("cy", (value) => value * 2)
        .attr("stroke", "red");
    }, [data]);
  
    return (
      <>
        <svg ref={svgRef}></svg>
        <button onClick={() => {setData(data.map(el => el + 5))}}>increase + 5</button>
        <button onClick={() => {setData(data.filter(el => el > 35))}}>filter circle r should gt 35</button>
      </>
    );
  }
  
  
  */
  