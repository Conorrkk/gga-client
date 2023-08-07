import React, { useContext, useEffect } from "react";
import PlayerList from "./PlayerList";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { getMatchById } from "../api";
import CurrentMatchContext from "../context/CurrentMatchProvider";

function SelectPanel({ matchId, teamId }) {
  // for setting the context to the match we want to record stats for
  const [currentMatch, setCurrentMatch] = useContext(CurrentMatchContext);

  //update match on click
  // call to backend and getMatch(matchId)
  // setCurrentMacth(match);
  const handleClick = async () => {
    getMatchById(matchId)
    .then((response) => {
      console.log(response)
    setCurrentMatch(response)
    })
    .catch((error) => {
      console.error("Error getting match by id:", error)
    })
  };

  useEffect(() => {
    console.log("tha current ,aytch",currentMatch);
  }, [currentMatch]);

  return (
    <div>
      <PlayerList teamId={teamId} matchId={matchId} />
      <Link to="/recordStats">
        <Button onClick={handleClick}>Start recording stats</Button>
      </Link>
    </div>
  );
}

export default SelectPanel;
