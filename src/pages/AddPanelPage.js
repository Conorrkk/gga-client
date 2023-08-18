import React from "react";
import { useParams } from "react-router-dom";
import PanelCreate from "../components/PanelCreate";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function AddPanel() {
    const { teamId } = useParams();
    return (
        <div>
            <NavBar />
            <PanelCreate teamId={teamId}/>
            <Footer />
        </div>
    )
}

export default AddPanel;