import { useState, useEffect } from "react";
import { getMatches, deleteMatch } from "../api";
import MatchList from "../components/MatchList";
import NavBar from "../components/NavBar";

function MatchHistory() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    getMatches()
      .then((response) => {
        setMatches(response.matches);
        console.log("response:", response);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  console.log("matches:", matches);

  const handleDeleteMatch = (id) => {
    deleteMatch(id)
      .then(() => {
        setMatches(matches.filter((match) => match._id !== id));
      })
      .catch((error) => console.error("Error deleting data:", error));
  };

  return (
    <div>
      <NavBar />
      <MatchList matches={matches} onDelete={handleDeleteMatch} />
    </div>
  );
}

export default MatchHistory;
