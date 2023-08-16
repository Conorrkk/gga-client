import RecordPlayerShow from "./RecordPlayerShow";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import { getTeamById, getTotalGoals, getTotalPoints } from "../api";
import { Link } from "react-router-dom";
import "../styles.css";
import ScoreCounter from "./ScoreCounter";
import Stack from "react-bootstrap/Stack";
import Stat from "../components/Stat";
import CurrentMatchContext from "../context/CurrentMatchProvider";

// array of the different stats we want to record
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

// function RecordPlayerList({ loadedPlayers, match }) {
function RecordPlayerList({ loadedPlayers }) {
  // get the global match context and use it as currentMatch
  const [currentMatch] = useContext(CurrentMatchContext);
  // state to store the user's team name
  const [teamName, setTeamName] = useState("");
  // state to store user team's goals
  const [goalsFor, setGoalsFor] = useState(0);
  // state to store user team's points
  const [pointsFor, setPointsFor] = useState(0);

  // to drill the matchId when loading match overview page - currentMatch would be null upon 'finish' so context prov wouldn't work
  const id = currentMatch._id;

  // sets the users teamName at the top of the screen by fetching it from the database
  useEffect(() => {
    const getTeamName = async () => {
      try {
        const teamId = currentMatch.teams.teamId;
        const response = await getTeamById(teamId);
        setTeamName(response);
      } catch (error) {
        console.error("Error getting team name:", error);
      }
    };
    getTeamName();
  }, [currentMatch]);

  // when a user records a player this method will also trigger and update the teams total goals
  const handleGoalScored = async () => {
    try {
      const matchId = currentMatch._id;
      const res = await getTotalGoals(matchId);
      if (res != null) {
        setGoalsFor(res.totalGoals);
      } else {
        let value = 0;
        setGoalsFor(value);
      }
    } catch (error) {
      console.error("Error getting total goals scored:", error);
    }
  };

  // when a user records a player this method will also trigger and update the teams total goals
  const handlePointScored = async () => {
    try {
      const matchId = currentMatch._id;
      const res = await getTotalPoints(matchId);
      if (res != null) {
        setPointsFor(res.totalPoints);
      } else {
        let value = 0;
        setPointsFor(value);
      }
    } catch (error) {
      console.error("Error getting total goals scored:", error);
    }
  };

  // maps through the loaded player cards, rendering the recordPlayerShow component for each player
  const playerCards = loadedPlayers?.map((player) => (
    <Col key={player._id} sm={4} md={4} lg={4}>
      <RecordPlayerShow player={player} onGoalScored={handleGoalScored} onPointScored={handlePointScored}/>
    </Col>
  ));

  return (
    <div>
      <Container fluid>
        <Card className="match-title">
          {teamName} vs {currentMatch.teams.oppositionTeam}
        </Card>
        <Row>
          <Col sm={6} md={6} lg={6}>
            <div className="scoreline-for">
              {" "}
              {goalsFor}:{pointsFor} &nbsp;&nbsp;&nbsp;&nbsp;-
            </div>
          </Col>
          <Col sm={6} md={6} lg={6}>
            <ScoreCounter />
          </Col>
        </Row>
        <div className="stats-section ">
          <Stack gap={3} className="Stats col-md-3 mx-auto">
            {" "}
            {statsToDisplay.map((item) => {
              return <Stat stat={item.stat} id={item.id} />;
            })}
          </Stack>
        </div>
        <Row>{playerCards}</Row>
        <Link to={`/matchOverview/${id}`}>
          <Button variant="outline-primary">Finish</Button>
        </Link>
      </Container>
    </div>
  );
}

export default RecordPlayerList;
