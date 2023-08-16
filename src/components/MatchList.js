import MatchShow from "./MatchShow";

function MatchList({ matches, onDelete }) {
  const loadedMatches = matches.map((match) => {
    return <MatchShow onDelete={onDelete} key={match._id} match={match} />;
  });

  return <div>{loadedMatches}</div>;
}

export default MatchList;
