import { useContext, useEffect, useState } from "react";
import CurrentMatchContext from "../context/CurrentMatchProvider";
import { getPlayerById } from "../api";
import RecordPlayerList from "../components/RecordPlayerList";

import NavBar from "../components/NavBar";
import Stat from "../components/Stat";
import { useDrop } from "react-dnd";
import "../styles.css";
import Stack from "react-bootstrap/Stack";

const statsToDisplay = [
  {
    id: 1,
    stat: "goal",
  },
  {
    id: 2,
    stat: "point",
  },
  {
    id: 3,
    stat: "wide",
  },
];

function RecordStats() {
  // get the global match context and use it as currentMatch
  const [currentMatch] = useContext(CurrentMatchContext);
  // state for the loaded players to populate screen
  const [loadedPlayers, setLoadedPlayers] = useState([]);

  // exploring drag and drop
  const [board, setBoard] = useState([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "button",
    drop: (item) => addStatToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addStatToBoard = (id) => {
    const statList = statsToDisplay.filter((item) => id === item.id);
    setBoard((board) => [...board, statList[0]]);
  };

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
      <div className="stats-container">
        {/* <div className="stats-section ">
          <Stack gap={3} className="Stats col-md-3 mx-auto">
            {" "}
            {statsToDisplay.map((item) => {
              return <Stat stat={item.stat} id={item.id} />;
            })}
          </Stack>
        </div> */}
        <div className="player-section">
          {/* <div className="PlayerCards">
            Render player cards
            {loadedPlayers.map((player) => (
              <PlayerCard
                key={player._id}
                player={player}
                statsToDisplay={statsToDisplay}
              />
            ))}
          </div> */}
          <RecordPlayerList loadedPlayers={loadedPlayers} match={match} />
        </div>
      </div>
      {/* <div className="stats-container">
        <RecordPlayerList
          className="player-section"
          loadedPlayers={loadedPlayers}
          match={match}
        />
        <div>
          <Stack gap={3} className="Stats col-md-1 mx-auto">
            {" "}
            {statsToDisplay.map((item) => {
              return <Stat stat={item.stat} id={item.id} />;
            })}
          </Stack>
        </div>
        <div className="Board" ref={drop}>
          {board.map((item) => {
            return <Stat stat={item.stat} id={item.id} />;
          })}
        </div>
      </div> */}
    </div>
  );
}

export default RecordStats;
