import React, { useState, useEffect, useContext } from 'react';
import "./UserProfile.css";
import Axios from 'axios';
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../Context/usercontext";

// Define UserList as a function component
function UserList() {
    // Fetch user list and return it as a promise
    return Axios.get('http://localhost:3001/users').then(response => response.data);
}

function UserProfile() {
    const { email } = useParams();
    const [editMode, setEditMode] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user list and find the current user
        UserList().then(userList => {
            const foundUser = userList.find(u => u.email === email);
            setUser(foundUser);
        }).catch(error => {
            console.error("Error fetching user list:", error);
        });
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

    return (
        <div>
            <div className="profile-image">
                <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/734ab845e17875a038275432e1c2502332f3743f3e3411b52e8f5b00c5163a32?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/734ab845e17875a038275432e1c2502332f3743f3e3411b52e8f5b00c5163a32?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/734ab845e17875a038275432e1c2502332f3743f3e3411b52e8f5b00c5163a32?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/734ab845e17875a038275432e1c2502332f3743f3e3411b52e8f5b00c5163a32?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/734ab845e17875a038275432e1c2502332f3743f3e3411b52e8f5b00c5163a32?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/734ab845e17875a038275432e1c2502332f3743f3e3411b52e8f5b00c5163a32?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/734ab845e17875a038275432e1c2502332f3743f3e3411b52e8f5b00c5163a32?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/734ab845e17875a038275432e1c2502332f3743f3e3411b52e8f5b00c5163a32?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&"
                    className="profile-img"
                    alt="Profile Image"
                />
            </div>
            <h1>User Profile</h1>
            <p>Email: {email}</p>
            {user ? (
                <>
                    <p>First Name: {user.firstname}</p>
                    <p>Last Name: {user.lastname}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
            {(user && user.email === email) && (
                <button onClick={editMode ? handleSave : toggleEditMode} className="edit-profile-button">
                    <div className="edit-profile">
                        {editMode ? "Save" : "Edit Profile Information"}
                    </div>
                </button>
            )}
        </div>
    );
}

export default UserProfile;
