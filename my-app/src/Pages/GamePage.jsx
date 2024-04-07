import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

// Define UserList as a function component
// copied auric da goat/ angie da slay here thanks bbg
function GameList() {
    // Fetch user list and return it as a promise
    return Axios.get('http://localhost:3001/games').then(response => response.data);
}

const GamePage = () => {
  const { title } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    GameList().then(gameList => {
        const foundGame = gameList.find(u => u.title === title);
        setGameDetails(foundGame);
        setIsLoading(false);
        }).catch(error => {
            console.error("Error fetching game list:", error);
            setIsLoading(false);
        });
  }, [title]);

  if (isLoading) {
    console.log(title);
    return <div>Loading... Please Wait</div>;
  }

  return (
    <div>
      <h1>{gameDetails.title}</h1>
      <p>Hello World!</p>
    </div>
  );
};

export default GamePage;
