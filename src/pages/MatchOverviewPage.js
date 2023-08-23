import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMatchById, getPlayerById } from "../api";
import ShowOverview from "../components/ShowOverview";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function MatchOverview() {
  // current match
  const [match, setMatch] = useState({});
  // boolean - returns false if match is loaded and renders page
  const [isLoading, setLoading] = useState(true);
  // get the match id from url paramaters
  const { id } = useParams();
  // array to store the players
  const [loadedPlayers, setLoadedPlayers] = useState([]);

  // gets the current match and sets as state - when successful will set loading to false
  useEffect(() => {
    const getMatch = async () => {
      const response = await getMatchById(id);
      setMatch(response);
      setLoading(false);
    };
    getMatch();
  }, [id]);

  // gets all players for this match
  useEffect(() => {
    const getAllPlayers = async () => {
      try {
        // need to exit function if the match data isn't available yet
        if (!match || !match.teams || !match.teams.players) {
          return;
        }
        const playerPromises = match.teams.players.map(async (player) => {
          const response = await getPlayerById(player.playerId);
          return response;
        });
        // promise.all ensures we await all playerPromises to complete before setting the loadedPlayers
        const loadedPlayersData = await Promise.all(playerPromises);
        setLoadedPlayers(loadedPlayersData);
      } catch (error) {
        console.error("Error getting players:", error);
      }
    };
    getAllPlayers();
  }, [match]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <NavBar />
      
      <ShowOverview match={match} loadedPlayers={loadedPlayers} />
      <Footer />
    </div>
  );
}

export default MatchOverview;
