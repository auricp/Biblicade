import React, { useState } from "react";
import { Link } from "react-router-dom";
import GamesForm from "../Components/GamesForm";

const Dashboard = () => {
    const [showAddGamesModal, setShowAddGamesModal] = useState(false);

    const toggleAddGamesModal = () => {
        setShowAddGamesModal(!showAddGamesModal);
    };

    return (
        <div className="adminDashboard">
            <div className="dashboard-item">
                <h2 onClick={toggleAddGamesModal}>Add Games</h2>
                {showAddGamesModal && <GamesForm onClose={toggleAddGamesModal} />}
            </div>
            <div className="dashboard-item">
                <h2>Add Publishers</h2>
            </div>
            <div className="dashboard-item">
                <h2>Add Developers</h2>
            </div>
        </div>
    );
}

export default Dashboard;
