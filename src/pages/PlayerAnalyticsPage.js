import NavBar from "../components/NavBar";
import PlayerAnalysis from "../components/PlayerAnalysis";
import { useParams } from "react-router-dom";

function PlayerAnalytics() {
    const { playerId } = useParams();
    const id = playerId
    console.log("id", id)
  return (
    <div>
      <NavBar></NavBar>
      <PlayerAnalysis id={id}></PlayerAnalysis>
    </div>
  );
}

export default PlayerAnalytics;
