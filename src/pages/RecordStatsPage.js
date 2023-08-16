import { useContext, useEffect, useState } from "react";
import { getPlayerById } from "../api";
import CurrentMatchContext from "../context/CurrentMatchProvider";
import RecordPlayerList from "../components/RecordPlayerList";
import NavBar from "../components/NavBar";
import "../styles.css";

function RecordStats() {
  // get the global match context and use it as currentMatch
  const [currentMatch] = useContext(CurrentMatchContext);
  // state for the loaded players used to populate screen
  const [loadedPlayers, setLoadedPlayers] = useState([]);

  // turning currentMatch context into a prop which can be drilled into RecordPlayerList component
  // const match = currentMatch;

  // checking what the current match is set as
  useEffect(() => {
    console.log(currentMatch);
  }, [currentMatch]);

  // use playerId in match collection to find the matching player from player collection
  // set the loaded players based on this, ensuring we now have an array of loaded players
  useEffect(() => {
    const getAllPlayers = async () => {
      try {
        const playerPromises = currentMatch.teams.players.map(
          async (player) => {
            const response = await getPlayerById(player.playerId);
            return response;
          }
        );

        // Promise.all ensures we await all playerPromises to complete before setting the loadedPlayers
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
          {/* <RecordPlayerList loadedPlayers={loadedPlayers} match={match} /> */}
          <RecordPlayerList loadedPlayers={loadedPlayers} />
        </div>
      </div>
    </div>
  );
}

export default RecordStats;
