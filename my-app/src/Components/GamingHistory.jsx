import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Axios from 'axios';
import './GamingHistory.css'

export default function GamingHistory({ historyData, setHistoryData, userIDInfo }) {
    const history = historyData;
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
    }, []);

    // handle delete logic
    // table is named gaming_history with attributes (userID, gameID) userID is from table userID 
    const markAsUnplayed = (userID, gameID) => {
      Axios.delete(`http://localhost:3001/gaming_history/${userID}/${gameID}`)
          .then((response) => {
              const updatedHistory = history.filter((game) => game.gameID !== gameID);
              setHistoryData(updatedHistory);
              console.log('Game marked as unplayed:', response);
          })
          .catch((error) => {
              console.error('Error marking game as Unplayed:', error);
          });
  };
  
    


    // handling logic
// Check if history is undefined before mapping over it
  if (!history) {
      return (<div>Loading...</div>);
  }

  return (
    <div>
        <table>
      <thead>
        <tr>
          <th>Game Title</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {history.map((elt, ind) => (
          <tr key={ind}>
            
            <td><Link to={`/GamePage/${gamesList.find(obj => obj.gameID === elt.gameID).title}`}>{gamesList.find(obj => obj.gameID === elt.gameID).title}</Link></td>
    
            {/* <td><p className='button'>Mark as Unplayed</p></td> */}
            <p className='button' onClick={() => markAsUnplayed(userIDInfo, elt.gameID)}>Mark as Unplayed</p>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
};
