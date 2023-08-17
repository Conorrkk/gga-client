import { useEffect, useState } from "react";
import { getPlayers } from "../api";
import { useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import NavBar from "../components/NavBar";
import PlayerCard from "../components/PlayerCard";

function ViewPlayers() {
  // state to store an array of players
  const [players, setPlayers] = useState([]);
  // get the team id from url params
  const { teamId } = useParams();

  useEffect(() => {
    const getPanel = async () => {
      try {
        const response = await getPlayers(teamId);
        setPlayers(response);
        console.log(response);
      } catch (error) {
        console.error("Error getting players:", error);
      }
    };
    getPanel();
  }, [teamId]);

  return <div>
    <NavBar></NavBar>
    <Row>
        {players.map((player) => (
          <Col className="mx-2 my-2" key={player._id} sm={3} md={3} lg={3} xl={3}>
            <PlayerCard player={player}/>
          </Col>
        ))}
      </Row>
  </div>;
}

export default ViewPlayers;
