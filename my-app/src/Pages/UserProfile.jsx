import React, { useState, useEffect, useContext } from 'react';
import "./UserProfile.css";
import Axios from 'axios';
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../Context/usercontext";

function UserProfile() {
    const { email } = useParams();
    const { userC } = useContext(UserContext);
    const [userData, setUserData] = useState(null);
    const [editMode, setEditMode] = useState(false); // State to manage edit mode
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await Axios.get(`http://localhost:3001/users/${email}`);
                setUserData(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [email]);

    const toggleEditMode = () => {
        setEditMode(prevMode => !prevMode);
    };

    const handleSave = () => {
        // Logic to save changes
        // Example: Axios.post('/api/save-profile', updatedData);
        // After saving changes, toggle edit mode
        toggleEditMode();
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {userData && (
                <div>
                    <h1>User Profile</h1>
                    <p>Email: {userData.email}</p>
                    <p>First Name: {userData.firstname}</p>
                    <p>Last Name: {userData.lastname}</p>
                    {/* Render other user details as needed */}
                    {(userC && userC.email === email) && (
                        <button onClick={editMode ? handleSave : toggleEditMode} className="edit-profile-button">
                            <div className="edit-profile">
                                {editMode ? "Save" : "Edit Profile Information"}
                            </div>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default UserProfile;
