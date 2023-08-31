import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import { getMatchById, getPlayers } from "../api";
import CurrentMatchContext from "../context/CurrentMatchProvider";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import PlayerShow from "../components/PlayerShow";

function ChoosePanel() {
  // get the match id from URL parameter
  const { matchId, teamId } = useParams();
  // state to store all loaded players
  const [loadedPlayers, setLoadedPlayers] = useState(null);
  // state to keep track of how many players are in the match already
  const [matchPanelCount, setMatchPanelCount] = useState(0);
  // const for max players in one match
  const maxPanelSize = 15;
  const minPanelSize = 5;

  // for setting the context to the match we want to record stats for
  const [currentMatch, setCurrentMatch] = useContext(CurrentMatchContext);
  console.log(currentMatch);
  // for nav
  const navigate = useNavigate();

  // gets all players based on team associated with this match & sets them as loaded players
  useEffect(() => {
    const getAvailablePlayers = async () => {
      try {
        const response = await getPlayers(teamId);
        setLoadedPlayers(response);
      } catch (error) {
        console.error("Error getting available players:", error);
      }
    };
    getAvailablePlayers();
  }, [teamId]);

  // when a player is selected remove them from list of players displayed for selection
  const handleSelect = (playerId) => {
    const updatedPlayers = loadedPlayers.filter(
      (item) => item._id !== playerId
    );
    setLoadedPlayers(updatedPlayers);
    setMatchPanelCount(matchPanelCount + 1);
  };

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

  // for checking if start recording stats button should be disabled
  const isButtonDisabled = matchPanelCount < minPanelSize;

  // give time to set loaded players state
  if (loadedPlayers === null) {
    return <div> Buffer to load players... </div>;
  }

  return (
    <div>
      <NavBar />
      <Container fluid className="main-container">
        <Row>
          <Col
            className="mx-4 my-4"
            sm={{ span: 6 }}
            md={{ span: 6 }}
            lg={{ span: 6 }}
            xl={{ span: 6 }}
          >
            <Card className="styled-card">
              <Card.Header as="h5">Create your match panel</Card.Header>
              <Card.Body>
                <Card.Title>Add players...</Card.Title>
                <Card.Text>
                  Add from 5 to 15 players to make up your match day panel
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mx-2">
          {loadedPlayers.map((player) => (
            <Col
              className="mx-2 my-2"
              sm={{ span: 2 }}
              md={{ span: 2 }}
              lg={{ span: 2 }}
              xl={{ span: 2 }}
              key={player._id}
            >
              <PlayerShow
                player={player}
                matchId={matchId}
                onSelect={handleSelect}
                matchPanelCount={matchPanelCount}
                maxPanelSize={maxPanelSize}
              />
            </Col>
          ))}
        </Row>
        <Col
          sm={{ span: 6 }}
          md={{ span: 6 }}
          lg={{ span: 6 }}
          xl={{ span: 6 }}
        >
          <Button
            onClick={handleClick}
            variant="outline-primary"
            className="mx-4 my-4 styled-button"
            disabled={isButtonDisabled}
          >
            Start recording stats
          </Button>
        </Col>
      </Container>
      <Footer />
    </div>
  );
}

export default ChoosePanel;
