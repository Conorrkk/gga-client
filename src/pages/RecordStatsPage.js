import { useContext, useEffect, useState } from "react";
import CurrentMatchContext from "../context/CurrentMatchProvider";
import { getPlayerById } from "../api";
import RecordPlayerList from "../components/RecordPlayerList";
import NavBar from "../components/NavBar";

function RecordStats() {
  // get the global match context and use it as currentMatch
  const [currentMatch] = useContext(CurrentMatchContext);
  // state for the loaded players to populate screen
  const [loadedPlayers, setLoadedPlayers] = useState([]);

  // checking what the current match is set as
  useEffect(() => {
    console.log(currentMatch);
  }, [currentMatch]);

  // turning currentMatch context into a prop which can be drilled into RecordPlayerList component
  const match = currentMatch;

  useEffect(() => {
    const getAllPlayers = async () => {
      try {
        const playerPromises = currentMatch.teams.players.map(
          async (player) => {
            const response = await getPlayerById(player.playerId);
            return response;
          }
        );

        // promise.all ensures we await all playerPromises to complete before setting the loadedPlayers
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
      <RecordPlayerList loadedPlayers={loadedPlayers} match={match} />
    </div>
  );
}

export default RecordStats;
