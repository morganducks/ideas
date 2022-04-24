import './App.css';
import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IdeasListAll from "./components/IdeasListAll"
import IdeasAdd from "./components/IdeasAdd"
import Profile from "./components/Profile"
import LogReg from "./views/LogReg"

function App() {

  const [allIdeas, setAllIdeas] = useState([]);
  const [users, setUsers] = useState([])
  const [liked, setLiked] = useState([])

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route element={<LogReg />} path="/" />
          <Route element={<IdeasListAll
            allIdeas={allIdeas}
            setAllIdeas={setAllIdeas}
            users={users}
            setUsers={setUsers}
            likedPosts={liked}
            setLikedPosts={setLiked}
          />} path="/home" />

          <Route element={<IdeasAdd
            allIdeas={allIdeas}
            setAllIdeas={setAllIdeas}
          />} path="/new" />
          <Route element={<Profile
            allIdeas={allIdeas}
            setAllIdeas={setAllIdeas}
            users={users}
            setUsers={setUsers}
            likedPosts={liked}
            setLikedPosts={setLiked} 
            />} path="/user/profile/:userName"
          />
        </Routes>
      </div>
    </BrowserRouter>



  );
}

export default App;
