import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../Components/RecommendAlgorithm.css"

export default function RecommendAlgorithm({ user, games }) {
  const [gamingPreferences, setGamingPreferences] = useState([]);
  const [gamingHistory, setGamingHistory] = useState([]);
  const userID = user.userID;

  const getHistory = () => {
    Axios.get(`http://localhost:3001/history/${userID}`).then((response) => {
      setGamingHistory(response.data);
      console.log("working");
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

    // first dial
    useEffect(() => {
      // fetch gaming history data
      getHistory();
      
      // fetch gaming preferences data
      getPreferences();
    }, []);
  
    // consequent dials
    // useEffect(() => {
      
    // }, [gamingPreferences, gamingHistory]);
    return (
    <div id="MainContainer_RecAlg">
        <h2>Recommend Algorithm (work in progress by Gavin)</h2>
        <p>This is where Games will be suggested based on preferences and history</p>
        <div>
          <p>Get Started</p>
        </div>
    </div>
  )
}
