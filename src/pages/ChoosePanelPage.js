import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { getMatchById } from "../api";
import CurrentMatchContext from "../context/CurrentMatchProvider";
import NavBar from "../components/NavBar";
import PlayerList from "../components/PlayerList";
// import Footer from "../components/Footer";

function ChoosePanel() {
  // get the match id from URL parameter
  const { matchId, teamId } = useParams();

  // for setting the context to the match we want to record stats for
  const [currentMatch, setCurrentMatch] = useContext(CurrentMatchContext);
  console.log(currentMatch)
  // for nav
  const navigate = useNavigate();
  //update match on click

  // on click set the context by getting the match by id from backend, then nav to recordStats
  const handleClick = async () => {
    // call to backend and getMatch(matchId)
    getMatchById(matchId)
      .then((response) => {
        // setCurrentMacth(match);
        setCurrentMatch(response);
        navigate("/recordStats");
      })
      .catch((error) => {
        console.error("Error getting match by id:", error);
      });
  };

  return (
    <div>
      <NavBar />
      <PlayerList teamId={teamId} matchId={matchId} />
      <Button
        onClick={handleClick}
        variant="outline-primary"
        className="mx-4 my-4"
      >
        Start recording stats
      </Button>
    </div>
  );
}

export default ChoosePanel;
