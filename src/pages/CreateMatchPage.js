import React from "react";
import { useEffect, useState } from "react";
import MatchCreate from "../components/MatchCreate";
import MatchList from "../components/MatchList";
import { getMatches, deleteMatch } from "./api";


function CreateMatchPage() {
  const [matches, setMatches] = useState([]);

  const handleDeleteMatch = (id) => {
    deleteMatch(id)
      .then(() => { 
        setMatches(matches.filter((match) =>  match._id !== id)
        );
      })
      .catch((error) => console.error('Error deleting data:', error));
  };

  useEffect(() => {
    getMatches()
      .then((response) => setMatches(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const createMatch = (opponent) => {
    const updatedMatches = [
      ...matches,
      {
        opponent
      },
    ];
    
    setMatches(updatedMatches);
  };

  return (
    <div>
      <MatchList matches={matches} onDelete={handleDeleteMatch}/>
      <MatchCreate onCreate={createMatch} />
    </div>
  );
}

export default CreateMatchPage;
