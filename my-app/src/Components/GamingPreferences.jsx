import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Axios from 'axios';
import "./GamingPreferences.css";



// export default function GamingPreferences(props) {
//     // const [preferenceData, setPreferenceData] = useState(preference);
//     const preferenceData = props.preferences;
export default function GamingPreferences({ preferences, updatePrefData }) {
  const [preferenceData, setPreferenceData] = useState(preferences);
    const [gamesList, setGamesList] = useState([]);
    
    // API Call to get user preferences
    const getGames = () => {
        Axios.get('http://localhost:3001/games').then((response) => {
            setGamesList(response.data);
            
            // console.log("working");
            // console.log(response.data);
          });
    }

    useEffect(() => {
        getGames();
        setPreferenceData(preferences);
    }, [preferences]);


    
    // handle delete logic
    // table is named gaming_preferences with attributes (userID, gameID, opinion) userID is from table userID 
  //   // Handle updating opinion
  //   const handleOpinionChange = (userID, gameID, opinion) => {
  //     // Make a POST request to update the opinion
  //     Axios.post('http://localhost:3001/updateOpinion', {
  //         userID: userID,
  //         gameID: gameID,
  //         opinion: opinion
  //     }).then((response) => {
  //         console.log('Opinion updated successfully:', response);
  //         // Optional: Update the state to reflect the updated opinion
  //     }).catch((error) => {
  //         console.error('Error updating opinion:', error);
  //     });
  // };

  // // Handle removing preference
  // const handleRemovePreference = (userID, gameID) => {
  //     // Make a DELETE request to remove the preference
  //     Axios.delete(`http://localhost:3001/gaming_preferences/${userID}/${gameID}`).then((response) => {
  //         console.log('Preference removed successfully:', response);
  //         // Optional: Update the state to remove the preference from the list
  //     }).catch((error) => {
  //         console.error('Error removing preference:', error);
  //     });
  // };

  const handleOpinionChange = (userID, gameID, newOpinion) => {
    Axios.post('http://localhost:3001/updateOpinion', { userID, gameID, opinion: newOpinion })
        .then(response => {
            // Update preferenceData state after successful update
            const updatedPreferences = preferenceData.map(preference => {
                if (preference.userID === userID && preference.gameID === gameID) {
                    return { ...preference, opinion: newOpinion };
                }
                return preference;
            });
            setPreferenceData(updatedPreferences);
            updatePrefData(updatedPreferences);
        }).catch(error => {
            console.error('Error updating opinion:', error);
        });
};

  const handleRemovePreference = (userID, gameID) => {
      Axios.delete(`http://localhost:3001/gaming_preferences/${userID}/${gameID}`)
          .then(response => {
              // Remove the preference from preferenceData state after successful deletion
              const updatedPreferences = preferenceData.filter(preference => !(preference.userID === userID && preference.gameID === gameID));
              setPreferenceData(updatedPreferences);
              updatePrefData(updatedPreferences);
          }).catch(error => {
              console.error('Error removing preference:', error);
          });
  };


    if (!preferenceData) {
        return <div>Loading...</div>;
    }

  return (
    <div>
        <table>
      <thead>
        <tr>
          <th>Game Title</th>
          <th>Opinion</th>
          <th>Change to</th>
        </tr>
      </thead>
      <tbody>
        {preferenceData.map((elt, ind) => (
          <tr key={ind}>
            <td><Link to={`/GamePage/${gamesList.find(obj => obj.gameID === elt.gameID).title}`}>{gamesList.find(obj => obj.gameID === elt.gameID).title}</Link></td>
            <td>{elt.opinion}</td>    
            <td>
                <div className='buttons'>
                    <p onClick={() => handleOpinionChange(elt.userID, elt.gameID, 'like')}>like</p>
                    <p onClick={() => handleOpinionChange(elt.userID, elt.gameID, 'dislike')}>dislike</p>
                    <p onClick={() => handleOpinionChange(elt.userID, elt.gameID, 'maybe')}>maybe</p>
                    <p onClick={() => handleRemovePreference(elt.userID, elt.gameID)}>remove</p>
                </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}
