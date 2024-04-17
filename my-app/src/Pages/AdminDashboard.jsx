import React, { useState } from "react";
import { Link } from "react-router-dom";
import GamesForm from "../Components/GamesForm";
import PublishersForm from "../Components/PublishersForm";
import DevelopersForm from "../Components/DevelopersForm";

const Dashboard = () => {
    const [showAddGamesModal, setShowAddGamesModal] = useState(false);
    const [showAddPublishersModal, setShowAddPublishersModal] = useState(false);
    const [showAddDevelopersModal, setShowAddDevelopersModal] = useState(false);

    const toggleAddGamesModal = () => {
        setShowAddGamesModal(!showAddGamesModal);
    };

    const toggleAddPublishers = () => {
        setShowAddPublishersModal(!showAddPublishersModal);
    }

    const toggleAddDevelopers = () => {
        setShowAddDevelopersModal(!showAddDevelopersModal);
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
                <h2 onClick={toggleAddDevelopers}>Add Developers</h2>
                {showAddDevelopersModal && <DevelopersForm onClose={toggleAddDevelopers} />}
            </div>
        </div>
    );
}

export default Dashboard;
