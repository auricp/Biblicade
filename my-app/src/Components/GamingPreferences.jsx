import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Axios from 'axios';
import "./GamingPreferences.css";



export default function GamingPreferences(props) {
    // const [preferenceData, setPreferenceData] = useState(preference);
    const preferenceData = props.preferences;
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
    // table is named gaming_preferences with attributes (userID, gameID, opinion) userID is from table userID 


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
                    <p>like</p>
                    <p>dislike</p>
                    <p>maybe</p>
                    <p>remove</p>
                </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}
