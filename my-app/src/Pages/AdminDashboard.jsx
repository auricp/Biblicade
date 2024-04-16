import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddGames from "../Components/AddGames";

const Dashboard = ({ email }) => {
    const [showAddGamesModal, setShowAddGamesModal] = useState(false);

    const toggleAddGamesModal = () => {
        setShowAddGamesModal(!showAddGamesModal);
    };

    return (
        <div className="adminDashboard">
            <div className="dashboard-item">
                <h2 onClick={toggleAddGamesModal}>Add Games</h2>
                {showAddGamesModal && <AddGames onClose={toggleAddGamesModal} />}
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
