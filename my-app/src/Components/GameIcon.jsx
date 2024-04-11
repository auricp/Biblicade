import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import images from "./images.js";

function GameIcon({ game }) {
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

    // Filter games based on the user's wishlist
    const filteredGames = games.filter((g) => game.includes(g.title));

    return (
        <ul className="featured">
            {!isLoading &&
                filteredGames.map((game) => (
                    <li className="game-icon" key={game.gameID}>
                        <img src={images[game.title]} alt={game.title} className="game-image" />
                        <Link to={`/GamePage/${game.title}`} className="game-title">{game.title}</Link>
                    </li>
                ))}
        </ul>
    );
}

export default GameIcon;
