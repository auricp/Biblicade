import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const Games = ({ openPopup }) => {
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

  return (
    <ul className="featured">
      {!isLoading &&
        games.map((game) => (
          <li className="game-icon" key={game.gameID}>
            <Link to={`/gamePage/${game.title}`}>
              <div className="icon-container">
                <img src={game.imageLocation} alt="game" />
              </div>
              <div className="icon-info">
                <div className="icon-title" title={game.title}>
                  {truncateText(game.title, 25)}
                </div>
                <div className="icon-price">${game.price}</div>
              </div>
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default Games;
