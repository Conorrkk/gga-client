import RecordPlayerShow from "./RecordPlayerShow";
import { Container, Row, Col, Card, Button, Stack } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import {
  addOpponentGoals,
  addOpponentPoints,
  getTeamById,
  getTotalGoals,
  getTotalPoints,
} from "../api";
import "../styles.css";
import { useNavigate } from "react-router-dom";
import ScoreCounter from "./ScoreCounter";
import Stat from "../components/Stat";
import CurrentMatchContext from "../context/CurrentMatchProvider";

// array of the different stats we want to record
const statsToDisplay = [
  {
    id: 1,
    stat: "goal(play)",
  },
  {
    id: 2,
    stat: "point(play)",
  },
  {
    id: 3,
    stat: "wide",
  },
  {
    id: 4,
    stat: "goal(dead)",
  },
  {
    id: 5,
    stat: "point(dead)",
  },
  {
    id: 6,
    stat: "block",
  },
  {
    id: 7,
    stat: "catch",
  },
  {
    id: 8,
    stat: "drop",
  },
];

// function RecordPlayerList({ loadedPlayers, match }) {
function RecordPlayerList({ loadedPlayers }) {
  // get the global match context and use it as currentMatch
  const [currentMatch] = useContext(CurrentMatchContext);
  // state to store the user's team name
  const [team, setTeam] = useState("");
  // state to store user team's goals
  const [goalsFor, setGoalsFor] = useState(0);
  // state to store user team's points
  const [pointsFor, setPointsFor] = useState(0);
  // state to store the opposing teams goals
  const [goalsAgainst, setGoalsAgainst] = useState(0);
  // state to store the opposing teams points
  const [pointsAgainst, setPointsAgainst] = useState(0);

  // for nav
  const navigate = useNavigate();

  // sets the users teamName at the top of the screen by fetching it from the database
  useEffect(() => {
    const getTeam = async () => {
      try {
        const teamId = currentMatch.teams.teamId;
        const response = await getTeamById(teamId);
        setTeam(response);
      } catch (error) {
        console.error("Error getting team name:", error);
      }
    };
    getTeam();
  }, [currentMatch]);

  // when a user records a player this method will also trigger and update the teams total goals
  const handleGoalScored = async () => {
    try {
      const matchId = currentMatch._id;
      const res = await getTotalGoals(matchId);
      setGoalsFor((prevGoals) => (res != null ? res.totalGoals : 0));
    } catch (error) {
      console.error("Error getting total goals scored:", error);
    }
  };

  // when a user records a player this method will also trigger and update the teams total goals
  const handlePointScored = async () => {
    try {
      const matchId = currentMatch._id;
      const res = await getTotalPoints(matchId);
      setPointsFor((prevPoints) => (res != null ? res.totalPoints : 0));
    } catch (error) {
      console.error("Error getting total goals scored:", error);
    }
  };

  // function to inc or dec the other team's goals
  const handleUpdateGoalAgainst = (goalUpdate) => {
    setGoalsAgainst(goalUpdate);
  };

  // function to inc or dec the other team's points
  const handleUpdatePointAgainst = (pointUpdate) => {
    setPointsAgainst(pointUpdate);
  };

  // maps through the loaded player cards, rendering the recordPlayerShow component for each player
  const playerCards = loadedPlayers?.map((player) => (
    <Col key={player._id} sm={4} md={4} lg={4}>
      <RecordPlayerShow
        player={player}
        onGoalScored={handleGoalScored}
        onPointScored={handlePointScored}
      />
    </Col>
  ));

  // when finish clicked add opponents score to  db & navigate to matchOverview with id
  const handleFinish = async () => {
    try {
      const matchId = currentMatch._id;
      await addOpponentPoints(matchId, pointsAgainst);
      await addOpponentGoals(matchId, goalsAgainst);
      navigate(`/matchOverview/${matchId}`);
    } catch (error) {
      console.error("Error sending score to api:", error);
    }
  };

  return (
    <div>
      <Container fluid>
        <Card className="match-title">
          {team.teamName} {team.teamLevel} vs{" "}
          {currentMatch.teams.oppositionTeam}
        </Card>
        <Row>
          <Col sm={6} md={6} lg={6}>
            <div className="scoreline-for">
              {goalsFor}:{pointsFor} &nbsp;&nbsp;&nbsp;&nbsp;-
            </div>
          </Col>
          <Col sm={6} md={6} lg={6}>
            <ScoreCounter
              onUpdateGoalAgainst={handleUpdateGoalAgainst}
              onUpdatePointAgainst={handleUpdatePointAgainst}
            />
          </Col>
        </Row>
        <div className="stats-section ">
          <Stack gap={3} className="Stats mx-auto">
            {statsToDisplay.map((item) => {
              return (
                <Col
                  sm={{ span: 4, offset: 1 }}
                  md={{ span: 4, offset: 1 }}
                  lg={{ span: 4, offset: 1 }}
                  xl={{ span: 4, offset: 1 }}
                >
                  <Stat key={item.id} stat={item.stat} id={item.id} />
                </Col>
              );
            })}
          </Stack>
        </div>
        <Row>
          <Row>{playerCards}</Row>
          <Row>
            <Col sm={12} className="text-center">
              <Col sm={{ span: 3, offset: 10 }}>
                <Button
                  className="styled-button mb-4"
                  variant="outline-primary"
                  onClick={() => handleFinish()}
                >
                  Finish
                </Button>
              </Col>
            </Col>
          </Row>
        </Row>
      </Container>
    </div>
  );
}

export default RecordPlayerList;
