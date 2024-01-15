
import React, {useState, useEffect} from 'react';
import Navi from './components/Modal/Navi'
import Navi_bot from './components/Modal/Navigator_bot'
import Navi_bot2 from './components/Modal/Navigator_bot2'

import LoginModal from './components/Modal/LoginModal';
import { Route, Routes ,Link } from 'react-router-dom';
import './App.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import Scaffold from './components/Board/Scaffold'
import Scaffold2 from './components/Board/Scaffold2'
import Scaffold3 from './components/Board/Scaffold3'
import Scaffold3_1 from './components/Board/Scaffold3_1'
import Scaffold3_2 from './components/Board/Scaffold3_2'
import Scaffold3_3 from './components/Board/Scaffold3_3'
import Scaffold3_4 from './components/Board/Scaffold3_4'
import Scaffold3_5 from './components/Board/Scaffold3_5'
import Scaffold3_6 from './components/Board/Scaffold3_6'
import Scaffold3_0_1 from './components/Board/Scaffold3_0_1'


import { useNavigate } from 'react-router'



function App() {
  const history = useNavigate()

  const [modal, setModal] = useState(false);
  const [user, setUser] = useState(false)
  const [tos, settos] = useState([])
  const [venntos, setvenntos] = useState([])
  const [ProjectID, setProjectID] = useState(localStorage.getItem('ProjectID')==undefined ? false : JSON.parse(localStorage.getItem('ProjectID'))) 
  const [ProjectID2, setProjectID2] = useState(localStorage.getItem('ProjectID2')==undefined ? false : JSON.parse(localStorage.getItem('ProjectID2'))) 
  const [EXPID, setEXPID] = useState(localStorage.getItem('EXPID')==undefined ? false : JSON.parse(localStorage.getItem('EXPID'))) 
  const [AID, setAID] =  useState(localStorage.getItem('AID')==undefined ? false : JSON.parse(localStorage.getItem('AID'))) 
  const [SID, setSID] = useState(localStorage.getItem('SID')==undefined ? false : JSON.parse(localStorage.getItem('SID'))) 
  
  const [GOID, setGOID] = useState(false) 
  //localStorage.getItem('GOID')==undefined ? false : JSON.parse(localStorage.getItem('GOID'))
  const [NETID, setNETID] = useState(false) 
//localStorage.getItem('NETID')==undefined ? false : JSON.parse(localStorage.getItem('NETID'))
  const [resultID, setresultID] = useState(localStorage.getItem('resultID')==undefined ? false : JSON.parse(localStorage.getItem('resultID'))) 
  const [getitem1, setgetitem1] = useState(localStorage.getItem('getitem1')==undefined ? false : localStorage.getItem('getitem1'))  
  const [reset1, setreset1] = useState(localStorage.getItem('reset1')==undefined ? false : localStorage.getItem('reset1'))  
  const [getitem2, setgetitem2] = useState(localStorage.getItem('getitem2')==undefined ? false : localStorage.getItem('getitem2')) 
  const [decision, setdecision] = useState(localStorage.getItem('decision')==undefined ? 0 : localStorage.getItem('decision'))
  
  const [reset2, setreset2] = useState(localStorage.getItem('reset2')==undefined ? false : localStorage.getItem('reset2'))  


  const [interitem3,setinteritem3]= useState(localStorage.getItem('interitem3')==undefined ? [] : localStorage.getItem('interitem3'))  

  
  

  let [isAuthenticated, setisAuthenticated] = useState(localStorage.getItem('token') ? true : false)
  
//  let [isGO, setisGO] = useState(localStorage.getItem('GOID')=='goGO' ? true : false)
  //let [isNET, setisNET] = useState(localStorage.getItem('NETID')=='goNETWORK' ? true : false)



  const userHasAuthenticated = (authenticated, username, token) => { 
    setisAuthenticated(authenticated)
    setUser(username)
    localStorage.setItem('token', token);
  }

  const handleLogout = (e) => {
    e.preventDefault();
          setisAuthenticated(false)
      setUser("")
      localStorage.removeItem('token');
      setModal(false)
      history('/');
  }
  
  useEffect(()=>{
    if(isAuthenticated){
      setModal(true)
    }
    else{
      setModal(false)
    }
  },[isAuthenticated])
  
  
  useEffect(() => {
    // 토큰(access token)이 이미 존재하는 상황이라면 서버에 GET /validate 요청하여 해당 access token이 유효한지 확인
    if (isAuthenticated) {
      // 현재 JWT 토큰 값이 타당한지 GET /validate 요청을 통해 확인하고
      // 상태 코드가 200이라면 현재 GET /user/current 요청을 통해 user정보를 받아옴
      fetch('http://127.0.0.1:5506/validate/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
      .then(res => {
        fetch('http://127.0.0.1:5506/user/current/', {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
          }
        })
        .then(res => res.json())
        .then(json => {
          // 현재 유저 정보 받아왔다면, 로그인 상태로 state 업데이트 하고
          if (json.username) {
            setUser(json.username);
          }else{
            //유저가 undefined라면 로그인버튼이 나오도록 modal을 false로 항상 맞춰줌
            setModal(false)
            setisAuthenticated(false)
          }
          // Refresh Token 발급 받아 token의 만료 시간 연장
          fetch('http://127.0.0.1:5506/refresh/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              token: localStorage.getItem('token')
            })
          })
          .then(res => res.json())
          .then((json)=>{
            userHasAuthenticated(true, json.user.username, json.token);
          })
          .catch(error => {
            console.log(error);
          });;
        })
        .catch(error => {
          handleLogout();
          console.log(error)
        });
      })
      .catch(error => {
        handleLogout();
        console.log(error)
      });
    }
  },[isAuthenticated])

  const tosvalues = (e) => {
    settos(e)
   }
  
   const tosvennvalues= (e)=>{
     //console.log(e)

setvenntos(e)
   }
   const getProjectID = (text) => {
    
    setProjectID(text)
    const text0=JSON.stringify(text)
    localStorage.setItem('ProjectID', text0)
    history('/Twostep')
    
  }

  const getEXPID = (text) => {
   // console.log(text)
    
    setEXPID(text[0])
    setProjectID2(text[1])
    const text0=JSON.stringify(text[0])
    const text1=JSON.stringify(text[1])
   
    localStorage.setItem('EXPID',text0 )
    localStorage.setItem('ProjectID2', text1)
    history('/threestep')
  }


  const getAID= (text) => {
    
    setAID(text)
    const text0=JSON.stringify(text)
    localStorage.setItem('AID', text0)
    history('/Analysis')
  }

   
  const getSID= (text) => {
    
    setSID(text)
    const text0=JSON.stringify(text)
    localStorage.setItem('SID', text0)
    history('/Selected')
  }

  const getresultID= (text) => {
    
    setresultID(text)
    const text0=JSON.stringify(text)
    localStorage.setItem('resultID', text0)
   

    localStorage.removeItem('getitem1')
    localStorage.removeItem('getitem2')
    localStorage.removeItem('interitem3')
    localStorage.removeItem('reset1')
    localStorage.removeItem('reset2')
    
    history('/results')
  }
 
    
  const getGOID= (text) => {
    
    setGOID(text)
    history('/GOEA')
  }

const getNETID= (text) => {
    
  setNETID(text)
  history('/NET')

}

const getITEM1= (text) => {
  //console.log(text)
    
  setgetitem1(text)
  setreset1(2)
  
  localStorage.setItem('getitem1', text)
  localStorage.setItem('reset1', 2)
}

const getITEM2= (text) => {
 // console.log(text)

  setgetitem2(text)
  
  setreset2(2)
  localStorage.setItem('getitem2', text)
  localStorage.setItem('reset2', 2)
}



const decisionFin= (text) => {
  // console.log(text)
 
   setdecision(text)
   localStorage.setItem('decision', text)
 }
 
 


const resetinterNodes= (text) => {
 

 setreset1(text) 
 localStorage.setItem('reset1', text)
    
}

const resetinterNodes2= (text) => {
  
 setreset2(text) 
 localStorage.setItem('reset2', text)
    
}


const getinterNodes2= (e) => {

const text=   document.querySelectorAll('.textareaitem')[0].value
  
  const textsplit = text.split(',')

const setitem=new Set(textsplit)
const arrayitem=[...setitem]
setinteritem3([])
 setinteritem3(arrayitem)
 localStorage.setItem('interitem3', arrayitem)


}




  return (
    <>
      <div className="App">
   

        <Routes>
              
              
              
              <Route path = "/login" element={[  <Navi modal={modal }  user={user} handleLogout={handleLogout}/>,<LoginModal setModal={setModal} userHasAuthenticated={userHasAuthenticated}/>,        <Navi_bot2 modal={modal }  user={user} handleLogout={handleLogout}/>
]}/>
              
              
              
              <Route path = "/" element={[  <Navi modal={modal }  user={user} handleLogout={handleLogout}/>,<Scaffold />,        <Navi_bot2 modal={modal }  user={user} handleLogout={handleLogout}/>
]}/>
              <Route path = "/home" element={[  <Navi modal={modal }  user={user} handleLogout={handleLogout}/>,<Scaffold />,        <Navi_bot2 modal={modal }  user={user} handleLogout={handleLogout}/>
]}/>
              <Route path = "/Onestep" element={[  <Navi modal={modal} user={user} handleLogout={handleLogout}/>,<Scaffold2 user={user} getProjectID={getProjectID} />,        <Navi_bot2 modal={modal }  user={user} handleLogout={handleLogout}/>
]}/>
              <Route path = "/Twostep" element={[  <Navi modal={modal} user={user} handleLogout={handleLogout}/>,<Scaffold3 user={user} ProjectID={ProjectID} getEXPID={getEXPID}/>,        <Navi_bot2 modal={modal }  user={user} handleLogout={handleLogout}/>
]}/>
               <Route path = "/Public" element={[  <Navi modal={modal} user={user} handleLogout={handleLogout}/>,<Scaffold3_0_1 user={user} ProjectID={ProjectID} getEXPID={getEXPID}/>,        <Navi_bot2 modal={modal }  user={user} handleLogout={handleLogout}/>
]}/>

              
              
              <Route path = "/threestep" element={[  <Navi modal={modal} user={user} handleLogout={handleLogout}/>,<Scaffold3_1 user={user} ProjectID={ProjectID2} getEXPID={getEXPID} EXPID={EXPID} getAID={getAID} getresultID={getresultID} decisionFin={decisionFin} /> ,        <Navi_bot2 modal={modal }  user={user} handleLogout={handleLogout}/>
]}/>
              <Route path = "/Analysis" element={[  <Navi modal={modal} user={user} handleLogout={handleLogout}/>,<Scaffold3_2 user={user} ProjectID={ProjectID2} EXPID={EXPID} AID={AID}  getSID={getSID} getEXPID={getEXPID}/>,        <Navi_bot2 modal={modal }  user={user} handleLogout={handleLogout}/>
]}/>
              <Route path = "/Selected" element={[  <Navi modal={modal} user={user} handleLogout={handleLogout}/>,<Scaffold3_3 user={user} ProjectID={ProjectID2} EXPID={EXPID} AID={AID} SID={SID} tosvennvalues={tosvennvalues } getGOID={getGOID} reset1={reset1}/> ,        <Navi_bot modal={modal }  user={user} handleLogout={handleLogout} getitem1={getitem1} getitem2={getitem2} interitem3={interitem3} getinterNodes2={getinterNodes2} indexinfo={1} resetinterNodes={resetinterNodes} resetinterNodes2={resetinterNodes2}/>
 ]}/>
              <Route path = "/results" element={[  <Navi modal={modal} user={user} handleLogout={handleLogout}/>,<Scaffold3_4 user={user} ProjectID={ProjectID2} EXPID={EXPID} AID={AID}  SID={SID} resultID={resultID} getGOID={getGOID} getresultID={getresultID} getITEM1={getITEM1} reset1={reset1} />,        <Navi_bot modal={modal } decision={decision} user={user} handleLogout={handleLogout} getitem1={getitem1} getitem2={getitem2} interitem3={interitem3} getinterNodes2={getinterNodes2} resetinterNodes={resetinterNodes} indexinfo={1} resetinterNodes2={resetinterNodes2}/>
 ]}/>
              <Route path = "/GOEA" element={[  <Navi modal={modal} user={user} handleLogout={handleLogout}/>,<Scaffold3_5 user={user} ProjectID={ProjectID2} GOID={GOID} getNETID ={getNETID } getITEM2={getITEM2} interitem3={interitem3} reset2={reset2} />,        <Navi_bot modal={modal } decision={decision}  user={user} handleLogout={handleLogout} getitem1={getitem1}  getitem2={getitem2} interitem3={interitem3} getinterNodes2={getinterNodes2} indexinfo={2}  resetinterNodes={resetinterNodes} resetinterNodes2={resetinterNodes2}/>
 ]}/>
              <Route path = "/NET" element={[  <Navi modal={modal} user={user} handleLogout={handleLogout}/>,<Scaffold3_6 user={user} ProjectID={ProjectID2} getEXPID={getEXPID} NETID={NETID} getGOID={getGOID} /> ,        <Navi_bot modal={modal } decision={decision} user={user} handleLogout={handleLogout} getitem1={getitem1}  getitem2={getitem2} interitem3={interitem3} getinterNodes2={getinterNodes2} indexinfo={3}  resetinterNodes={resetinterNodes} resetinterNodes2={resetinterNodes2}/>
 ]}/>
              

          

            </Routes> 



          
    </div>
    
    </>
  );
}

export default App;
