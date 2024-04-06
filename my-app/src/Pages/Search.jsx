import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import GameIcon from '../Components/GameIcon';
import Games from "../Components/Games";

const Search = () => {
  const location = useLocation();
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("searchvalue");

  useEffect(() => {
    // Fetch games based on the search query
    Axios.get(`http://localhost:3001/games?search=${query}`)
      .then((response) => {
        setGames(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching games:", error);
        setIsLoading(false);
      });
  }, [query]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {games.length > 0 ? (
            <ul>
              {games.map((game) => (
                <li key={game.id}>
                  <GameIcon game={game} />
                </li>
              ))}
            </ul>
          ) : (
            <p>No games found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
