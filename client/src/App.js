import './App.css';
import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IdeasListAll from "./components/IdeasListAll"
import IdeasAdd from "./components/IdeasAdd"
import Profile from "./components/Profile"
import OneIdea from "./components/OneIdea"
import LogReg from "./views/LogReg"
import io from 'socket.io-client';

function App() {

  const [ideas, setIdeas] = useState([]);
  const [user, setUser] = useState([])
  const [socket, setSocket] = useState(() => io(":8000"))
  const [replyList, setReplyList] = useState([]);
  const [ideaLikes, setIdeaLikes] = useState([])


  useEffect(() => {
    socket.on("connect", () => {
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
            ideas={ideas}
            setIdeas={setIdeas}
            user={user}
            setUser={setUser}
            replyList={replyList}
            setReplyList={setReplyList}
            ideaLikes={ideaLikes}
            setIdeaLikes={setIdeaLikes}
            socket={socket}
          />} path="/home" />

          <Route element={<IdeasAdd
          />} path="/new" />
          <Route element={<Profile
          />} path="/user/profile/:userName"
          />
          <Route element={<OneIdea 
            socket={socket}
            ideas={ideas}
            setIdeas={setIdeas}
            replyList={replyList}
            setReplyList={setReplyList}
            ideaLikes={ideaLikes}
            setIdeaLikes={setIdeaLikes}
          />} path="/ideas/:id" />
        </Routes>
      </div>
    </BrowserRouter>



  );
}

export default App;
