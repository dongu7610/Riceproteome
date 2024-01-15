
import React, {useState, useEffect} from 'react';
import Navi from './components/Modal/Navi'
import Navi_bot from './components/Modal/Navigator_bot'
import Navi_bot2 from './components/Modal/Navigator_bot2'

import LoginModal from './components/Modal/LoginModal';
import { Route, Routes ,Link } from 'react-router-dom';
import './App.css';

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
  const [ProjectID, setProjectID] = useState(false)
  const [EXPID, setEXPID] = useState(false)
  const [AID, setAID] = useState(false)
  const [SID, setSID] = useState(false)
  
  const [GOID, setGOID] = useState(false)
  const [NETID, setNETID] = useState(false)
  const [resultID, setresultID] = useState(false)
  const [getitem1, setgetitem1] = useState(false)
  const [reset1, setreset1] = useState(false)
  const [getitem2, setgetitem2] = useState(false)

  const [reset2, setreset2] = useState(false)  


  const [interitem3,setinteritem3]= useState([]);

  

  
  
  let [isAuthenticated, setisAuthenticated] = useState(localStorage.getItem('token') ? true : false)
  
  const userHasAuthenticated = (authenticated, username, token) => { 
    setisAuthenticated(authenticated)
    setUser(username)
    localStorage.setItem('token', token);
  }//회원가입이나 로그인이 성공했을 때 토큰을 저장

  const handleLogout = (e) => {
    e.preventDefault();
          setisAuthenticated(false)
      setUser("")
      localStorage.removeItem('token');
      setModal(false)
  }//로그아웃

  //회원가입이나 로그인이 성공했을 때 modal을 변경해 로그인 버튼을 없애고 글쓰기 버튼과 정보버튼을 나오게하는 setModal
  //useEffect의 두번째 인자는 모든 렌더링 후 두번째 인자가 변경될때에만 실행되라는 내용 
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
      fetch('http://203.255.24.98:5506/validate/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
      .then(res => {
        fetch('http://203.255.24.98:5506/user/current/', {
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
          fetch('http://203.255.24.98:5506/refresh/', {
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
     console.log(e)

setvenntos(e)
   }
   const getProjectID = (text) => {
    
    setProjectID(text)
    history('/Twostep')
  }

  const getEXPID = (text) => {
    console.log(text)
    
    setEXPID(text[0])
    setProjectID(text[1])
    history('/threestep')
  }


  const getAID= (text) => {
    
    setAID(text)
    history('/Analysis')
  }

  
  const getSID= (text) => {
    
    setSID(text)
    history('/Selected')
  }

  const getresultID= (text) => {
    
    setresultID(text)
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
  console.log(text)
    
  setgetitem1(text)
  setreset1(2)
}

const getITEM2= (text) => {
  console.log(text)

  setgetitem2(text)
  setreset2(2)
}





const resetinterNodes= (text) => {
 

 setreset1(text) 
  
    
}

const resetinterNodes2= (text) => {
  
 setreset2(text) 
  
    
}


const getinterNodes2= (e) => {

const text=   document.querySelectorAll('.textareaitem')[0].value
  
  const textsplit = text.split(',')

const setitem=new Set(textsplit)
const arrayitem=[...setitem]
setinteritem3([])
 setinteritem3(arrayitem)
    


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

              
              
              <Route path = "/threestep" element={[  <Navi modal={modal} user={user} handleLogout={handleLogout}/>,<Scaffold3_1 user={user} ProjectID={ProjectID} getEXPID={getEXPID} EXPID={EXPID} getAID={getAID} getresultID={getresultID} /> ,        <Navi_bot2 modal={modal }  user={user} handleLogout={handleLogout}/>
]}/>
              <Route path = "/Analysis" element={[  <Navi modal={modal} user={user} handleLogout={handleLogout}/>,<Scaffold3_2 user={user} ProjectID={ProjectID} EXPID={EXPID} AID={AID}  getSID={getSID} getEXPID={getEXPID}/>,        <Navi_bot2 modal={modal }  user={user} handleLogout={handleLogout}/>
]}/>
              <Route path = "/Selected" element={[  <Navi modal={modal} user={user} handleLogout={handleLogout}/>,<Scaffold3_3 user={user} ProjectID={ProjectID} EXPID={EXPID} AID={AID} SID={SID} tosvennvalues={tosvennvalues } getGOID={getGOID} reset1={reset1}/> ,        <Navi_bot modal={modal }  user={user} handleLogout={handleLogout} getitem1={getitem1} getitem2={getitem2} interitem3={interitem3} getinterNodes2={getinterNodes2} indexinfo={1} resetinterNodes={resetinterNodes} resetinterNodes2={resetinterNodes2}/>
 ]}/>
              <Route path = "/results" element={[  <Navi modal={modal} user={user} handleLogout={handleLogout}/>,<Scaffold3_4 user={user} ProjectID={ProjectID} EXPID={EXPID} AID={AID}  SID={SID} resultID={resultID} getGOID={getGOID} getresultID={getresultID} getITEM1={getITEM1} reset1={reset1} />,        <Navi_bot modal={modal }  user={user} handleLogout={handleLogout} getitem1={getitem1} getitem2={getitem2} interitem3={interitem3} getinterNodes2={getinterNodes2} resetinterNodes={resetinterNodes} indexinfo={1} resetinterNodes2={resetinterNodes2}/>
 ]}/>
              <Route path = "/GOEA" element={[  <Navi modal={modal} user={user} handleLogout={handleLogout}/>,<Scaffold3_5 user={user}  GOID={GOID} getNETID ={getNETID } getITEM2={getITEM2} interitem3={interitem3} reset2={reset2} />,        <Navi_bot modal={modal }  user={user} handleLogout={handleLogout} getitem1={getitem1}  getitem2={getitem2} interitem3={interitem3} getinterNodes2={getinterNodes2} indexinfo={2}  resetinterNodes={resetinterNodes} resetinterNodes2={resetinterNodes2}/>
 ]}/>
              <Route path = "/NET" element={[  <Navi modal={modal} user={user} handleLogout={handleLogout}/>,<Scaffold3_6 user={user} getEXPID={getEXPID} NETID={NETID} getGOID={getGOID} /> ,        <Navi_bot modal={modal }  user={user} handleLogout={handleLogout} getitem1={getitem1}  getitem2={getitem2} interitem3={interitem3} getinterNodes2={getinterNodes2} indexinfo={3}  resetinterNodes={resetinterNodes} resetinterNodes2={resetinterNodes2}/>
 ]}/>
              

          

            </Routes> 



          
    </div>
    
    </>
  );
}

export default App;
