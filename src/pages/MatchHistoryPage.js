import { getMatches, deleteMatch } from "../api";

function MatchHistory() {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        getMatches()
          .then((response) => setMatches(response.data))
          .catch((error) => console.error("Error fetching data:", error));
      }, []);

      const handleDeleteMatch = (id) => {
        deleteMatch(id)
          .then(() => { 
            setMatches(matches.filter((match) =>  match._id !== id)
            );
          })
          .catch((error) => console.error('Error deleting data:', error));
      };
    return (
        <MatchList matches={matches} onDelete={handleDeleteMatch}/>
    )
}

export default MatchHistory;