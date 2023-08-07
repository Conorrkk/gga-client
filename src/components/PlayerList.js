import PlayerShow from "./PlayerShow";
import { getPlayers } from "../api";
import { useEffect, useState } from "react";

function PlayerList({ teamId, matchId }) {
  const [loadedPlayers, setLoadedPlayers] = useState(null);

  useEffect(() => {
    const getAvailablePlayers = async () => {
      try {
        const response = await getPlayers(teamId);
        console.log(response);
        setLoadedPlayers(response);
      } catch (error) {
        console.error("Error getting available players:", error);
      }
    };

    getAvailablePlayers();
  }, [teamId]);

  if (loadedPlayers === null) {
    return <div> trying to load players</div>;
  }

  return (
    <div>
      {loadedPlayers.map((player) => (
        <PlayerShow key={player._id} player={player} matchId={matchId} />
      ))}
    </div>
  );
}

export default PlayerList;
