import React, { useState, useEffect, useContext } from 'react';
import "./UserProfile.css";
import Axios from 'axios';
import { Link, useParams } from "react-router-dom";
import GamingPreferences from '../Components/GamingPreferences';
import GamingHistory from '../Components/GamingHistory';
import UserPreferences from '../Components/UserPreferences';


// Define UserList as a function component
function UserList() {
    // Fetch user list and return it as a promise
    return Axios.get('http://localhost:3001/users').then(response => response.data);
}

function UserProfile() {
    const { email } = useParams();
    const[error, setError] = useState(false);
    const [editMode, setEditMode] = useState(false); // Initialize editMode state to false
    const [user, setUser] = useState(null);
    const [birthday, setBirthday] = useState(null); // Initialize birthday state
    const [genres, setGenres] = useState(null); // Initialize genre preferences
    const [userID, setUserID] = useState(0);


    const [userData, setUserData] = useState([]);
    const [gamingPreferences, setGamingPreferences] = useState([]);
    const [gamingHistory, setGamingHistory] = useState([]);


    useEffect(() => {
        // Fetch user list and find the current user
        UserList().then(userList => {
            const foundUser = userList.find(u => u.email === email);
            setUser(foundUser);
            setBirthday(foundUser ? foundUser.birthday : null); // Set birthday if user is found
        }).catch(error => {
            console.error("Error fetching user list:", error);
        });
    }, [email]);

    useEffect(() => {
        // Fetch user list and find the current user
        UserList().then(userList => {
            const foundUser = userList.find(u => u.email === email);
            setUser(foundUser);
            setUserID(foundUser.userID);
            setBirthday(foundUser ? foundUser.birthday : null); // Set birthday if user is found
        }).catch(error => {
            console.error("Error fetching user list:", error);
        });
    }, []);

    const [newFirstName, setNewFirstName] = useState('First Name');
    const [newLastName, setNewLastName] = useState('Last Name');

    const toggleEditMode = () => {
        setEditMode(prevMode => !prevMode); // Toggle editMode state
    };

    const handleFirstNameChange = (e) => {
        setNewFirstName(e.target.value);
    };
    
    const handleLastNameChange = (e) => {
        setNewLastName(e.target.value);
    };

    // Function to handle the click event for saving changes
    const handleSave = () => {
        // Perform save logic here

        // check if the required fields are filled
        if (newFirstName === '' || newLastName === '') {
            setError(true);
            return; // Do not proceed with saving if there is an error
        }

        // Update the user's first name and last name
        setUser(prevUser => ({
            ...prevUser,
            firstname: newFirstName,
            lastname: newLastName
        }));

        // If the save logic is successful, you can reset the error state
        setError(false);
        // Toggle edit mode after saving (optional)
        toggleEditMode();
    };


    // PREFERENCES HANDLING BY GAVIN
    useEffect(() => {
      getHistory();
      getPreferences();
      getUserData();  
    }, [userID]);

    const getUserData = () => {
        Axios.get(`http://localhost:3001/userPreferences/${userID}`).then((response) => {
          setUserData(response.data[0]);
          console.log("working user data")
          console.log(response.data);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
      }

    const getHistory = () => {
    Axios.get(`http://localhost:3001/history/${userID}`).then((response) => {
        setGamingHistory(response.data);
        console.log("working hist");
        console.log(response.data);
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });
    }
    
    const getPreferences = () => {
    Axios.get(`http://localhost:3001/gamePreferences/${userID}`).then((response) => {
        setGamingPreferences(response.data);
        console.log("working pref")
        console.log(response.data);
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });
    }

    return (
        <div className="userProfileMain">
            <div className='profilePane'>
                <div className="profileImage">
                    <img
                        loading="lazy"
                        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/734ab845e17875a038275432e1c2502332f3743f3e3411b52e8f5b00c5163a32?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/734ab845e17875a038275432e1c2502332f3743f3e3411b52e8f5b00c5163a32?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/734ab845e17875a038275432e1c2502332f3743f3e3411b52e8f5b00c5163a32?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/734ab845e17875a038275432e1c2502332f3743f3e3411b52e8f5b00c5163a32?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/734ab845e17875a038275432e1c2502332f3743f3e3411b52e8f5b00c5163a32?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/734ab845e17875a038275432e1c2502332f3743f3e3411b52e8f5b00c5163a32?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/734ab845e17875a038275432e1c2502332f3743f3e3411b52e8f5b00c5163a32?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/734ab845e17875a038275432e1c2502332f3743f3e3411b52e8f5b00c5163a32?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&"
                        className="profileImageFile"
                        alt="Profile Image"
                    />
                </div>
                <div className='profileDetails'>
                {user ? (
                    <>
                        {editMode ? (
                            <>
                                <input type="profileText" value={newFirstName} onChange={handleFirstNameChange} />
                                <input type="profileText" value={newLastName} onChange={handleLastNameChange} />
                            </>
                        ) : (
                            <p className="profile-name">{user.firstname} {user.lastname}</p>
                        )}
                    </>
                ) : (
                    <p>Loading...</p>
                )}

                <div className='profile-email'>
                    <p>Email: {email}</p>
                </div>

                <div className='profile-birthday'>
                    <p>Birthday: {birthday}</p>
                </div>
                {(user && user.email === email) && (
                    <div className="edit-profile-container">
                        <button onClick={editMode ? handleSave : toggleEditMode} className="edit-profile-button">
                            <div className="edit-profile">
                                {editMode ? "Save" : "Edit Profile Information"}
                            </div>
                        </button>
                    </div>
                )}

                {/* Error message */}
                {error && (
                    <div className="error-message">
                    Names cannot be blank.
                    </div>
                )}
                </div>
            </div>
            
            

            <div className='preferencesMainPane'>
                <div className='userInfoDetailsMainPane'>
                    <div className="userPreferences">
                        <h3>User Preferred Rating Score: </h3>
                        {/* <UserPreferences userInfo={userData} setUserInfo={setUserData} /> */}
                        <UserPreferences userIDInfo={userID} />
                    </div>

                    <div className='userGaming'>
                        <div className="GamingHistory">
                            <h3>Gaming History</h3>
                            {/* <GamingHistory historyData={gamingHistory}/> */}
                            <GamingHistory historyData={gamingHistory} setHistoryData={setGamingHistory} userIDInfo={userID} />
                        </div>

                        <div className="GamingPreferences">
                            <h3>Gaming Preferences</h3>
                            <GamingPreferences preferences={gamingPreferences} />  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
