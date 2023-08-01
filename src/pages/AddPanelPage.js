import React from "react";
import { useParams } from "react-router-dom";
import PanelCreate from "../components/PanelCreate";

function AddPanel() {
    const { teamId } = useParams();
    return (
        <div>
            <PanelCreate teamId={teamId}/>
        </div>
    )
}

export default AddPanel;