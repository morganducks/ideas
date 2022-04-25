import './App.css';
import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IdeasListAll from "./components/IdeasListAll"
import IdeasAdd from "./components/IdeasAdd"
import Profile from "./components/Profile"
import LogReg from "./views/LogReg"
import io from 'socket.io-client';

function App() {

  const [ideas, setIdeas] = useState([]);
  const [user, setUser] = useState([])
  const [socket, setSocket] = useState(()=> io(":8000"))


  useEffect(()=>{
    socket.on("connect", ()=>{
      console.log("socket in the client: ", socket.id)
    })

    return () => socket.disconnect(true);

  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route element={<LogReg />} path="/" />
          <Route element={<IdeasListAll
          />} path="/home" />

          <Route element={<IdeasAdd
          />} path="/new" />
          <Route element={<Profile
            />} path="/user/profile/:userName"
          />
          <Route element={<OneIdea socket={socket}/>} path="/ideas/:id" />
        </Routes>
      </div>
    </BrowserRouter>



  );
}

export default App;
