import RecordPlayerShow from "./RecordPlayerShow";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function RecordPlayerList({ loadedPlayers }) {
  const playerCards = loadedPlayers?.map((player) => (
    <Col key={player._id} sm={4} md={4} lg={4}>
      <RecordPlayerShow player={player} />
    </Col>
  ));

  return (
    <div>
      <Container fluid>
        <div className="title-holder">
          <h2>Your dashboard</h2>
        </div>
        <div className="subtitle">this is a subtitle</div>
        <Row>{playerCards}</Row>
      </Container>
    </div>
  );
}

export default RecordPlayerList;
