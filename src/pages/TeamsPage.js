import { useState, useEffect } from "react";
import { getTeams, deleteTeam } from "../api";
import NavBar from "../components/NavBar";
import TeamList from "../components/TeamList";
// import Footer from "../components/Footer";

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
      <TeamList teams={teams} onDelete={handleDeleteTeam}/>
      {/* <Footer /> */}
    </div>
  );
}

export default Teams;
