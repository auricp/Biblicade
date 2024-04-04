import React, { useState, useEffect} from "react";
import GameIcon from "./GameIcon";
import { Link } from "react-router-dom";
import Axios from 'axios';

const Games = ({ openPopup }) => {
    const [games, setGames] = useState([]);

    // function to get all games
    // response contains whatever we get from our backend
    const getGames = () => {
        Axios.get('http://localhost:3001/games').then((response) => {
            setGames(response.data);
            console.log("working");
        });
        
    }

    // Call getGames when the component mounts
    useEffect(() => {
        getGames();
    }, []);

    return (
    <div className="mainProp">
      {games.map((game) => (
        <GameIcon openPopup={openPopup} game={game} key={game.id} />
      ))}
    </div>
    );
};
export default Games;