import './App.css';
import React, {useState} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IdeasListAll from "./components/IdeasListAll"
import IdeasListOne from "./components/IdeasListOne"
import IdeasAdd from "./components/IdeasAdd"
import IdeasUpdate from "./components/IdeasUpdate"
import Profile from "./components/Profile"
import LogReg from "./views/LogReg"

function App() {

  // const [allIdeas, getAllIdeas] = useState[""];
  // const[user,setUser] = useState[""];

  return (
    <BrowserRouter>
    <div className="App">
<Routes>
    <Route element={<LogReg />} path="/" />
    <Route element={<Profile />} path="/profile" />
    <Route element={<IdeasListAll />} path="/home" />
    <Route element={<Profile />} path="/user/ideasbyuser/:userName" />


</Routes>
    </div>
    </BrowserRouter>
  
  
  
  );
}

export default App;
