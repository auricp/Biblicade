import React, { useEffect, useState } from 'react';
import "./UserPreferences.css";
import Axios from 'axios';

// export default function UserPreferences({userInfo, setUserInfo}) {
    export default function UserPreferences({userIDInfo}) {
    // const userData = props.userInfo;
    // const [userData, setUserData] = useState(userInfo);
    const [editing, setEditing] = useState(false);
    const [userData, setUserData] = useState([]);
    const [newPrefScore, setNewPrefScore] = useState(0);

    useEffect(() => {
    //   setUserData(userInfo);
        setNewPrefScore(userData.prefScore);    
        // get
    }, []);

    useEffect(() => {
        getUserData();  
        // setNewPrefScore(userData.prefScore);
      }, [userIDInfo]);

    const handleEdit = () => {
        setNewPrefScore(userData.prefScore);    
        setEditing(true);
    };

    const handleCancel = () => {
        setNewPrefScore(userData.prefScore);
        setEditing(false);
    };

    const handleSubmit = () => {
        // Perform API call to update user preferences with newPrefScore
        updateUserPreferenceScore(userIDInfo, newPrefScore)
        setNewPrefScore(newPrefScore);
        // After successful update, setEditing(false);
        setEditing(false);
    };

    const handleChange = (event) => {
        setNewPrefScore(event.target.value);
    };

    const getUserData = () => {
        Axios.get(`http://localhost:3001/userPreferences/${userIDInfo}`).then((response) => {
          setUserData(response.data[0]);
          console.log("working user data")
          console.log(response.data);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
      }

    const updateUserPreferenceScore = (userID, newScore) => {
      Axios.post(`http://localhost:3001/userPreferences/${userID}`, { prefScore: newScore })
          .then((response) => {
              console.log('User preference score updated successfully:', response);
              // Optionally, update state or perform any other actions upon successful update
              setUserData({userID: userIDInfo, prefScore: newPrefScore});
            
          })
          .catch((error) => {
              console.error('Error updating user preference score:', error);
          });
  };
  

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className='userPrefPane'>      
            {editing ? (
                <div className='prefColumn'>
                    <input 
                        type="number" 
                        value={newPrefScore} 
                        onChange={handleChange} 
                        className="editInput" 
                    />
                    <button onClick={handleSubmit} className="userPrefButton">Submit</button>
                    <button onClick={handleCancel} className="userPrefButton">Cancel</button>
                </div>
            ) : (
                <div>
                    <p className='userPrefScore'>{userData.prefScore}</p>
                    <button className='userPrefButton' onClick={handleEdit}>Edit</button>
                </div>
            )}
        </div>
    );
}