import React, { useState } from "react";
import { Link } from "react-router-dom";
import GamesForm from "../Components/GamesForm";
import PublishersForm from "../Components/PublishersForm";

const Dashboard = () => {
    const [showAddGamesModal, setShowAddGamesModal] = useState(false);
    const [showAddPublishersModal, setShowAddPublishersModal] = useState(false);

    const toggleAddGamesModal = () => {
        setShowAddGamesModal(!showAddGamesModal);
    };

    const toggleAddPublishers = () => {
        setShowAddPublishersModal(!showAddPublishersModal);
    }

    return (
        <div className="adminDashboard">
            <div className="dashboard-item">
                <h2 onClick={toggleAddGamesModal}>Add Games</h2>
                {showAddGamesModal && <GamesForm onClose={toggleAddGamesModal} />}
            </div>
            <div className="dashboard-item">
                <h2 onClick={toggleAddPublishers}>Add Publishers</h2>
                {showAddPublishersModal && <PublishersForm onClose={toggleAddPublishers} />}
            </div>
            <div className="dashboard-item">
                <h2>Add Developers</h2>
            </div>
        </div>
    );
}

export default Dashboard;
