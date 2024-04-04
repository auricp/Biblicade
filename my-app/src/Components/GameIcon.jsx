import React, { useState, useEffect, useContext} from "react";
import "./GameIcon.css";
import { PageContext } from "../Context/pagecontext";
import { Axios } from "axios";
import {Link,useNavigate} from 'react-router-dom';

function GameIcon({ openPopup, game }) {
  const navigate = useNavigate();
  const { pageStates} = useContext(PageContext);
  const [isHovered,setHovered] = useState(false);
  const gameId = game.id;
  
  const [games, setGames] = useState([]);

  // function to get all games
  const getGames = () => {
    Axios.get('http://localhost:3001/games').then((response) => {
      setGames(response.data);
      console.log("working");
    });
  }

  useEffect(() => {
    // Fetch games when the component mounts
    getGames();
  }, []);

  return (
    <div className="game-card-P14" id="141:5987">
      {games.map((game) => (
        <div key={game.gameID} className="game-card">
          <Link to={`/gamePage/${game.title}`}>
            <img src={game.imageLocation} alt={game.title} />
          </Link>
          <div className="game-info">
            <Link to={`/gamePage/${game.gameID}`}>{game.title}</Link>
            <p>Release Year: {game.releaseYear}</p>
            <p>Genre: {game.genre}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
export default GameIcon;