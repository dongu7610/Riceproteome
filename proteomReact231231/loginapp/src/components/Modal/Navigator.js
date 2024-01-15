
import { Accordion, Card,Form,Button,Modal } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import 'bootstrap/dist/css/bootstrap.min.css';
import React,{useState, useEffect,Suspense} from 'react';
import { BsQuestionLg } from 'react-icons/bs';


export default function Navigator(props)  {
  const [show, setShow] = useState(false);


  const [item1, setitem1] = useState(false);
  const [viewpoint1, setviewpoint1] = useState(false);


  const uploadModule3 =async (e) =>{
   
//    console.log(e)
   
    
   
  }




 




    return (
      <div>
        <text style={{ "font-size": "25px","margin-left":'1%'}} >CHECKED PROTEIN</text>
  <Button variant="light" onClick={() => setShow(true)}>  <BsQuestionLg/> </Button>

<Form onSubmit={uploadModule3 } >

<Accordion defaultActiveKey={["0"]} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header style={{color:'red'}}>ProteinfromVMVPAGE</Accordion.Header>
          <Accordion.Body>
          <FloatingLabel controlId="floatingTextarea2" label="add from vmv ">
    <Form.Control
     
     as="textarea"
placeholder={props.interitem1} defaultValue={props.interitem1}
      style={{ height: '100px' }}
    />


  </FloatingLabel>
  {props.indexinfo == 1?   <Button variant="outline-dark"    onClick={() => props.resetinterNodes()} > reset item1</Button> 

:false
}

          </Accordion.Body>


        </Accordion.Item>

        {props.indexinfo == 2? 
        <Accordion.Item eventKey="1">
          <Accordion.Header style={{color:'green'}}>ProteinfromGO</Accordion.Header>
         
<Accordion.Body>
<FloatingLabel controlId="floatingTextarea2" label="add from GO">
<Form.Control

as="textarea"
placeholder={props.interitem2} defaultValue={props.interitem2}
 style={{ height: '100px' }}
/>
</FloatingLabel>
  <Button variant="outline-dark"    onClick={() => props.resetinterNodes()} > reset item2</Button> 


</Accordion.Body>


        </Accordion.Item>

        :false
      }



        {props.indexinfo == 2?
        <Accordion.Item eventKey="2">
          <Accordion.Header style={{color:'blue'}}>bulkprotein</Accordion.Header>
          <Accordion.Body>
          <FloatingLabel controlId="floatingTextarea2" label="add bulk">
     <Form.Control
className={'textareaitem'}
id={'textareaitem'}
as="textarea"
placeholder={props.interitem3}
style={{ height: '100px' }}
/>

  </FloatingLabel>
     
    <Button variant="outline-dark"    onClick={(e) => props.getinterNodes2(e)} > apply items</Button>
  


 
          </Accordion.Body>
        </Accordion.Item>
:false
}




      </Accordion>
      
  

    


 

</Form>


<Modal
show={show}
onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
          이후 Network analysis에 활용할 단백질을 추가할 수 있습니다.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
<p>Volcano plot이나 manhattan plot의 node를 선택하면 단백질이  ProteinfromVMVPAGE영역에 추가됩니다. </p>

{props.indexinfo == 2?
<>
<p>go분석 결과Table에서 protein name을 선택하면  ProteinfromGO영역에 추가됩니다. </p>
<p>이미 있는 유전자 리스트나 앞선 분석에서 얻은 결과를 활용하고 싶은경우 bulkprotein에 A,B,C,D,E 와 같은 형식으로 추가해주세요. </p>
</>:false}
      
        </Modal.Body>
      </Modal>
      </div>

      
    );
  
}




