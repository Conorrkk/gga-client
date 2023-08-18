import NavBar from "../components/NavBar";
import PlayerAnalysis from "../components/PlayerAnalysis";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";

function PlayerAnalytics() {
    const { playerId } = useParams();
    const id = playerId
  return (
    <div>
      <NavBar></NavBar>
      <PlayerAnalysis id={id}></PlayerAnalysis>
      <Footer />
    </div>
  );
}

export default PlayerAnalytics;
