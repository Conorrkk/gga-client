import { useState, useEffect } from "react";
import { getTeams, deleteTeam } from "../api";
import { Container } from "react-bootstrap";
import NavBar from "../components/NavBar";
import TeamList from "../components/TeamList";
import Footer from "../components/Footer";

function Teams() {
  // users teams
  const [teams, setTeams] = useState([])

  // get users teams and set as state
  useEffect(() => {
    getTeams()
      .then((response) => {
        setTeams(response.teams)})
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  
  // delete the corresponding team
  const handleDeleteTeam = (id) => {
    deleteTeam(id)
    .then(() => {
      setTeams(teams.filter((team) => team._id !== id))
    })
    .catch((error) => console.error("Error deleting team:", error))
  };

  return (
    <div>
      <NavBar />
      <Container fluid className="main-container">
      <TeamList teams={teams} onDelete={handleDeleteTeam}/>
      </Container>
      <Footer />
    </div>
  );
}

export default Teams;
