import RecordPlayerShow from "./RecordPlayerShow";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getTeamById } from "../api";
import { Link } from "react-router-dom";
import "../styles.css";
import ScoreCounter from "./ScoreCounter";
import Stack from "react-bootstrap/Stack";
import Stat from "../components/Stat";
import { useDrop } from "react-dnd";

function RecordPlayerList({ loadedPlayers, match }) {
  const [teamName, setTeamName] = useState("");

  const [board, setBoard] = useState([]);

  // for loading the match overview still with the id of the current match as currentmatchstate should be
  // set to nothing when finish is clicked
  const id = match._id;

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

  const playerCards = loadedPlayers?.map((player) => (
      <Col key={player._id} sm={4} md={4} lg={4}>
      <RecordPlayerShow player={player} />
    </Col>
  ));

  useEffect(() => {
    const getTeamName = async () => {
      try {
        const teamId = match.teams.teamId;
        const response = await getTeamById(teamId);
        setTeamName(response);
      } catch (error) {
        console.error("Error getting team name:", error);
      }
    };
    getTeamName();
  }, [match]);

  return (
    <div>
      <Container fluid>
        <Card className="match-title">
          {teamName} vs {match.teams.oppositionTeam}
        </Card>
        <Row>
          <Col sm={6} md={6} lg={6}>
            <div className="scoreline-for">
              {" "}
              Score for &nbsp;&nbsp;&nbsp;&nbsp;:
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
