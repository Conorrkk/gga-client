import MatchShow from "./MatchShow";
import { Container } from "react-bootstrap";

function MatchList({ matches, onDelete }) {
  const loadedMatches = matches.map((match) => {
    return <MatchShow onDelete={onDelete} key={match._id} match={match} />;
  });

  return <Container fluid >{loadedMatches}</Container>;
}

export default MatchList;
