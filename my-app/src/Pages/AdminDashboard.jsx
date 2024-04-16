import React from "react";
import { Link } from "react-router-dom";

const Dashboard = ({ email }) => {
    return (
        <div className="adminDashboard">
            <div className="dashboard-item">
                <h2>Add Games</h2>
            </div>
            <div className="dashboard-item">
                <h2>Add Publishers</h2>
            </div>
            <div className="dashboard-item">
                <h2>Add Developers</h2>
            </div>
            <div className="dashboard-item">
                <h2>Add Genres</h2>
            </div>
        </div>
    );
}

export default Dashboard;
