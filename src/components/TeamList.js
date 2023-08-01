import TeamShow from "./TeamShow";
import Table from "react-bootstrap/Table";

function TeamList({ teams, onDelete }) {
  const loadedTeams = teams?.map((team) => {
    return <TeamShow key={team._id} team={team} />;
  });
  return (
    <div>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Clubname</th>
            <th>Level</th>
            <th>Add Players</th>
            <th>Stats</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{loadedTeams}</tbody>
      </Table>
    </div>
  );
}

export default TeamList;
