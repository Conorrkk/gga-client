import { Link } from "react-router-dom";
function TeamShow({ team, onDelete }) {

  return (
    <tr>
        <td>{team.teamName}</td>
        <td>{team.teamLevel}</td>
        <td><Link to={`/addPanel/${team._id}`}> Add players icon</Link></td>
    </tr>
  );
}
export default TeamShow;
