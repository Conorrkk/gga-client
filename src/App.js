import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage";
import Registration from "./pages/RegistrationPage";
import Teams from "./pages/TeamsPage";
import CreateTeam from "./pages/CreateTeamPage";
import AddPanel from "./pages/AddPanelPage";
import Dashboard from "./pages/Dashboard";
import CreateMatchPage from "./pages/CreateMatchPage";
import ChoosePanel from "./pages/ChoosePanelPage";
import RecordStats from "./pages/RecordStatsPage";
import LandingPage from "./pages/LandingPage";
import MatchOverview from "./pages/MatchOverviewPage";
import MatchHistory from "./pages/MatchHistoryPage";
import ViewPlayers from "./pages/ViewPlayersPage";
import PlayerAnalytics from "./pages/PlayerAnalyticsPage";
import MatchAnalytics from "./pages/MatchAnalytics";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="/register" element={<Registration/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/teams" element={<Teams/>}></Route>
      <Route path="/createTeam" element={<CreateTeam/>}></Route>
      <Route path="/addPanel/:teamId" element={<AddPanel/>}></Route>
      <Route path="/createMatch" element={<CreateMatchPage/>}></Route>
      <Route path="/match/:matchId/team/:teamId" element={<ChoosePanel />}></Route>
      <Route path="/recordStats" element={<RecordStats />}></Route>
      <Route path="/matchOverview/:id" element={<MatchOverview />}></Route>
      <Route path="/matchHistory" element={<MatchHistory />}></Route>
      <Route path="/viewPlayers/:teamId" element={<ViewPlayers />}></Route>
      <Route path ="/player/analytics/:playerId" element={<PlayerAnalytics />}></Route>
      <Route path ="/match/analytics/:matchId" element={<MatchAnalytics />}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App;