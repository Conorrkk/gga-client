import TeamList from "../components/TeamList";
import { useState, useEffect } from "react";
import { getTeams } from "../api";
import NavBar from "../components/NavBar";

function Teams() {
  const [teams, setTeams] = useState([])

  useEffect(() => {
    getTeams()
      .then((response) => {
        console.log(response)
        setTeams(response.teams)})
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  
  return (
    <div>
      <NavBar />
      <TeamList teams={teams} />
    </div>
  );
}

export default Teams;
