import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import images from '../Components/images.js';
import Nav from "../Components/navbar";
import "./GamePage.css";

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
        <Nav />
    

        <div className="gameDetailsPane">
            <div className="upperDetails">
                <img className="gameImage" src={images[gameDetails.title]} alt={gameDetails.title} width={'250px'}/>
                <div className="upperTexts">
                    <h1 className="gameTitle">{gameDetails.title}</h1>
                    <h2 className="gameGenre">{gameDetails.genre}</h2>
                    <p className="ageRest">For Ages {gameDetails.ageRestriction}+</p>
                </div>
                <div className="ratingContainer">
                    <p className="gameRatingTit">Biblicade Score</p>
                    <p className="gameRating">{gameDetails.ratingScore}</p>
                </div>
            </div>

            <div className="lowerDetails">
                <div className="leftPane">
                    <h3>{gameDetails.description}</h3>
                </div>

                <div className="rightPane">
                    <h2 className="rightPaneTit">Additional Information</h2>
                    <div className="releaseDate">                        
                        <p className="releaseDateBold">Release Date</p>
                        <p>: {gameDetails.releaseYear}/{gameDetails.releaseMonth}/{gameDetails.releaseDay}</p>        
                    </div>

                    <div className="developerID">
                        <p className="developerIDBold">Developer</p>
                        <p>: {gameDetails.developerID}</p>
                    </div>

                    <div className="publisherID">
                        <p className="publisherIDBold">Publisher</p>
                        <p>: {gameDetails.publisherID}</p>
                    </div>
                    
                    
                    
                </div>
            </div>
        </div>

    </div>
  );
};

export default GamePage;
