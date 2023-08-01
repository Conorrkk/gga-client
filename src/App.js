import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage";
import Registration from "./pages/RegistrationPage";
import Teams from "./pages/TeamsPage";
import CreateTeam from "./pages/CreateTeamPage";
import AddPanel from "./pages/AddPanelPage";
import MatchCreate from "./components/MatchCreate";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Registration/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/teams" element={<Teams/>}></Route>
      <Route path="/createTeam" element={<CreateTeam/>}></Route>
      <Route path="/addPanel/:teamId" element={<AddPanel/>}></Route>
      <Route path="/createMatch" element={<MatchCreate/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App;