import { useContext, useEffect, useState } from "react";
import { getPlayerById } from "../api";
import CurrentMatchContext from "../context/CurrentMatchProvider";
import RecordPlayerList from "../components/RecordPlayerList";
import NavBar from "../components/NavBar";
import "../styles.css";
// import Footer from "../components/Footer";

function RecordStats() {
  // get the global match context and use it as currentMatch
  const [currentMatch] = useContext(CurrentMatchContext);
  // state for the loaded players used to populate screen
  const [loadedPlayers, setLoadedPlayers] = useState([]);

  // use playerId in match collection to find matching player from player collection
  // set loaded players based on this, ensuring we now have an array of players
  useEffect(() => {
    const getAllPlayers = async () => {
      try {
        const playerPromises = currentMatch.teams.players.map(
          async (player) => {
            const response = await getPlayerById(player.playerId);
            return response;
          }
        );

        // Promise.all ensures we await all playerPromises to complete before setting loadedPlayers
        const loadedPlayersData = await Promise.all(playerPromises);
        setLoadedPlayers(loadedPlayersData);
      } catch (error) {
        console.error("Error getting players:", error);
      }
    };
    getAllPlayers();
  }, [currentMatch]);

  return (
    <div>
      <NavBar />
      <div className="stats-container">
        <div className="player-section">
          <RecordPlayerList loadedPlayers={loadedPlayers} />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default RecordStats;
