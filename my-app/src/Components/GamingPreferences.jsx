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


    


    // handling logic
    // Check if history is undefined before mapping over it
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
        </tr>
      </thead>
      <tbody>
        {preferenceData.map((elt, ind) => (
          <tr key={ind}>
            <td><Link to={`/GamePage/${gamesList.find(obj => obj.gameID === elt.gameID).title}`}>{gamesList.find(obj => obj.gameID === elt.gameID).title}</Link></td>
            <td>{elt.opinion}</td>    
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}
