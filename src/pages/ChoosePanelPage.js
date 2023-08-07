import SelectPanel from "../components/SelectPanel";
import { useParams } from "react-router-dom";

function ChoosePanel() {
    const { matchId, teamId } = useParams();

    return <div>
        <SelectPanel matchId={matchId} teamId={teamId}/>
    </div>
}

export default ChoosePanel;