import RecordPlayerShow from "./RecordPlayerShow";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getTeamById } from "../api";
import { Link } from "react-router-dom";

function RecordPlayerList({ loadedPlayers, match }) {
  const [teamName, setTeamName] = useState("");

  // for loading the match overview still with the id of the current match as currentmatchstate should be
  // set to nothing when finish is clicked
  const id = match._id;

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
        <div className="match-title">
          <h2>
            {teamName} vs {match.teams.oppositionTeam}
          </h2>
        </div>
        <div className="match-scoreline">score - line</div>
        <Row>{playerCards}</Row>
        <Link to={`/matchOverview/${id}`}>
          <Button className="outline-primary">Finish</Button>
        </Link>
      </Container>
    </div>
  );
}

export default RecordPlayerList;
