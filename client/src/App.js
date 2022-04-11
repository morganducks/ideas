import './App.css';
import React, {useState} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IdeasListAll from "./components/IdeasListAll"
// import IdeasListOne from "./components/IdeasListOne"
import IdeasAdd from "./components/IdeasAdd"
// import IdeasUpdate from "./components/IdeasUpdate"
import Profile from "./components/Profile"
import LogReg from "./views/LogReg"

function App() {

  const [allIdeas, setAllIdeas] = useState([]);
  // const[user,setUser] = useState[""];

  return (
    <BrowserRouter>
    <div className="App">
<Routes>
    <Route element={<LogReg />} path="/" />
    <Route element={<IdeasListAll allIdeas={allIdeas} setAllIdeas={setAllIdeas}/>} path="/home" />
    <Route element={<IdeasAdd allIdeas={allIdeas} setAllIdeas={setAllIdeas}/>} path="/new" />
    <Route element={<Profile />} path="/user/profile/:userName" />


</Routes>
    </div>
    </BrowserRouter>
  
  
  
  );
}

export default App;
