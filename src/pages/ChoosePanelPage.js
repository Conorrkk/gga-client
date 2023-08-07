import SelectPanel from "../components/SelectPanel";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

function ChoosePanel() {
    const { matchId, teamId } = useParams();

    return <div>
        <NavBar/>
        <SelectPanel matchId={matchId} teamId={teamId}/>
    </div>
}

export default ChoosePanel;