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
import RouteProtection from "./components/RouteProtection";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/register" element={<Registration />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/dashboard/*"
          element={<RouteProtection><Dashboard/></RouteProtection>}
        />
        <Route path="/teams" element={<RouteProtection><Teams/></RouteProtection>} />
        <Route
          path="/createTeam/*"
          element={<RouteProtection><CreateTeam/></RouteProtection>}
        />
        <Route
          path="/addPanel/:teamId"
          element={<RouteProtection><AddPanel/></RouteProtection>}
        />
        <Route
          path="/createMatch"
          element={<RouteProtection><CreateMatchPage/></RouteProtection>}
        />
        <Route
          path="/match/:matchId/team/:teamId"
          element={<RouteProtection><ChoosePanel/></RouteProtection>}
        />
        <Route
          path="/recordStats"
          element={<RouteProtection><RecordStats/></RouteProtection>}
        />
        <Route
          path="/matchOverview/:id"
          element={<RouteProtection><MatchOverview/></RouteProtection>}
        />
        <Route
          path="/matchHistory/*"
          element={<RouteProtection><MatchHistory/></RouteProtection>}
        />
        <Route
          path="/viewPlayers/:teamId"
          element={<RouteProtection><ViewPlayers/></RouteProtection>}
        />
        <Route
          path="/player/analytics/:playerId"
          element={<RouteProtection><PlayerAnalytics/></RouteProtection>}
        />
        <Route
          path="/match/analytics/:matchId"
          element={<RouteProtection><MatchAnalytics/></RouteProtection>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
