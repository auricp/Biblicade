import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Axios from 'axios';
import './GamingHistory.css'

export default function GamingHistory(props) {
    const history = props.historyData;
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


    


    // handling logic
// Check if history is undefined before mapping over it
if (!history) {
    return <div>Loading...</div>;
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
    
            <td><p className='button'>Mark as Unwatched</p></td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}
