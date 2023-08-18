import SelectPanel from "../components/SelectPanel";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer"

function ChoosePanel() {
    const { matchId, teamId } = useParams();

    return <div>
        <NavBar/>
        <SelectPanel matchId={matchId} teamId={teamId}/>
        <Footer />
    </div>
}

export default ChoosePanel;