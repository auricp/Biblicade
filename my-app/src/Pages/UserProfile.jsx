import React,{useState,useContext} from 'react';
import "./UserProfile.css";
import Axios from 'axios'
import {Link,useNavigate} from "react-router-dom";
import { UserContext } from "../Context/usercontext";
import { useParams } from 'react-router-dom';
import userList from '../Components/userList';

function UserProfile(){
    const { email } = useParams();
    const user = userList.find((u)=>u.email === email);
    const { userC } = useContext(UserContext);
    const cemail = userC?.email;

    const firstName = user?.firstName;
    const lastName = user?.lastName;
    let myprofile;

    if(cemail === email){
        myprofile  = true;
    }else{
        myprofile = false;
    }

    // State variable to manage overall edit mode
    const [editMode, setEditMode] = useState(false);

    const[error, setError] = useState(false);
    const [newFirstName, setNewFirstName] = useState(firstName);
    const [newLastName, setNewLastName] = useState(lastName);
    const [newAge, setNewAge] = useState("21");
    const [ageLabel] = useState("years old");

    const handleFirstNameChange = (e) => {
        setNewFirstName(e.target.value);
    };
      
    const handleLastNameChange = (e) => {
    setNewLastName(e.target.value);
    };

    const handleAgeChange = (e) => {
        const enteredAge = e.target.value;
    
        // Check if entered age is greater than 13
        if (!isNaN(enteredAge) && enteredAge > 13) {
          setNewAge(enteredAge.toString());
        } else {
          // Optionally, you can provide feedback to the user about the age requirement
          setError("Age must be greater than 13");
        }
    };
   
    // Function to handle the click event for saving changes
    const handleSave = () => {
        // check if the required fields are filled
        if (newFirstName === '' || newLastName === '') {
        setError(true); // names can't be blank
        return; 
        }

        // Reset error state
        setError(false);
        // Toggle edit mode after saving
        toggleEditMode();
    };

    // Function to toggle overall edit mode
    const toggleEditMode = () => {
        // Only allow edit mode if the current user matches the profile owner
        if (cemail === email) {
        setEditMode(!editMode);
        } else {
        setError("You are not authorized to edit this profile.");
        }
    };

    return(
        <div>
            <div className="profile-card">
                <div className="profile-image">
                <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/734ab845e17875a038275432e1c2502332f3743f3e3411b52e8f5b00c5163a32?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&"
                    className="profile-img"
                    alt="Profile Image"
                />
                </div>
                <div className="profile-details">
                {/* Editable first name */}
                {editMode ? (
                    <input
                    type="text"
                    value={newFirstName}
                    onChange={handleFirstNameChange}
                    className="first-name-input"
                    />
                ) : (
                    <h2 className="profile-name">{`${newFirstName} ${newLastName}`}</h2>
                )}
                {/* Editable last name */}
                {editMode ? (
                    <input
                    type="text"
                    value={newLastName}
                    onChange={handleLastNameChange}
                    className="last-name-input"
                    />
                ) : null}
                {editMode ? (
                    <div className="profile-age">
                    <input
                        type="number"
                        value={newAge}
                        onChange={handleAgeChange}
                        className="profile-age-input"
                    />
                    </div>
                ) : (
                    <div className="profile-age">{`${newAge} ${ageLabel}`}</div>
                )}
                <p className="profile-email">{`${email || ""}`}</p>
                {/* Button to toggle the overall edit mode or save changes */}
                {myprofile? (
                <button onClick={editMode ? handleSave : toggleEditMode} className="edit-profile-button">
                    <div className="edit-profile">
                    {editMode ? "Save" : "Edit Profile Information"}
                    </div>
                </button> ) : (null) }

                {/* Error message */}
                {error && (
                    <div className="error-message">
                    Please fill in all required fields.
                    </div>
                )}
                </div>
            </div>
      </div>
    );
}
export default UserProfile;