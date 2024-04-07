import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import './Games.css'
import images from './images.js'

const Games = ({ openPopup }) => {
  const withus = ".."
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch games when the component mounts
    Axios.get("http://localhost:3001/games")
      .then((response) => {
        setGames(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching games:", error);
        setIsLoading(false);
      });
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };
  const gameImages = {
    "With Us": require('../Images/Games/beatblitz.jpg')
  }
  return (
    <ul className="featured">
    {!isLoading &&
      games.map((game) => (
        <li className="game-icon" key={game.gameID}>
          <img src={images[game.title]} alt={game.title} className='game-image'/>
          <a className='game-title' href={`/gamePage/${game.title}`}>{game.title}</a>
        </li>
      ))}
  </ul>
  );
};

export default Games;
