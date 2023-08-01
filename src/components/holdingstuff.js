const [opponent, setOpponent] = useState("");

  const handleChangeOpponent = (event) => {
    setOpponent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const match = {
      opponent,
    };

    onCreate(match);

    postMatch(match)
      .then((response) => {
        setOpponent("");
      })
      .catch((error) => console.error("Error posting data:", error));
  };

  return (
    <div className="login d-flex justify-content-center align-items-center vh-100 bg-white">
    <div className="form_container p-5 rounded bg-white border border-dark border-2">
      <Form onSubmit={handleSubmit}>
       {/* <h3 className="text-center">Create Match</h3>
        <Form.Group className="mb-3" controlId="createMatchForm.ControlSelect1">
          <Form.Label>Your team</Form.Label>
          <Form.Select>
            // these options will need to be dynamic
            <option value="seniorclubname">seniorclubname</option>
            <option value="u20clubname">u20clubname</option>
            <option value="minorclubnamae">minorclubname</option>
          </Form.Select>
        </Form.Group> */}
        <Form.Group className="mb-3" controlId="createMatchForm.ControlInput1">
          <Form.Label>Opponent name</Form.Label>
          <Form.Control type="text" placeholder="Opponent name" value={opponent} onChange={handleChangeOpponent}/>
        </Form.Group>
        <div className="d-grid mb-3">
          <Button variant="success" type="submit">
             Select Panel
          </Button>
        </div>
      </Form>
    </div>
  </div>

//import { useNavigate } from "react-router-dom";
// function TeamShow({ team, onDelete }) {
//     const navigate = useNavigate();

//     const hndlAddPlyrsClck = () => {
//       navigate('/addPanel', {state: {teamId: team._id}});
//     }

//   return (
//     <tr>
//         <td>{team.teamName}</td>
//         <td>{team.teamLevel}</td>
//         <td>onClick={hndlAddPlyrsClck}</td>
//     </tr>
//   );
// }
// export default TeamShow;

// import React from "react";
// import { useLocation } from "react-router-dom";
// import PanelCreate from "../components/PanelCreate";

// function AddPanel() {
//     const location = useLocation();
//     const { teamId } = location.state.teamId;
//     return (
//         <div>
//             <PanelCreate teamId={teamId}/>
//         </div>
//     )
// }

// export default AddPanel;