import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import images from '../Components/images.js';
import Nav from "../Components/navbar";
import "./GamePage.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { UserContext } from "../Context/usercontext";

// Define UserList as a function component
// copied auric da goat/ angie da slay here thanks bbg
function GameList() {
    // Fetch user list and return it as a promise
    return Axios.get('http://localhost:3001/games').then(response => response.data);
}

// Define UserList as a function component
function UserList() {
    // Fetch user list and return it as a promise
    return Axios.get('http://localhost:3001/users').then(response => response.data);
}

function GamePage ({ game }) {
    const { title } = useParams();
    const { email } = useParams();
    const [gameDetails, setGameDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [commentInput, setCommentInput] = useState('');
    const [comments, setComments] = useState([]);
    const [commentEmail, setCommentEmail] = useState([]);
    const [favorites, setFavorites] = useState([]); // State to store favorite games
    const[error, setError] = useState(false);
    const { user } = useContext(UserContext);
    const userEmail = user?.email;

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
  

  useEffect(() => {
    const encodedTitle = encodeURIComponent(title); 
    //console.log(encodedTitle);
    Axios.get(`http://localhost:3001/comments/${encodedTitle}`)
        .then(response => {
            setCommentEmail(response.data);
        })
        .catch(error => {
            console.error('Couldnt fetch comments:', error);
        });
  }, [title]);


  const handleCommentInputChange = (event) => {
    setCommentInput(event.target.value);
  };
  
  const submitComment = () => {
    // Check if comment input is empty
    if (commentInput.trim() === '') {
        console.error('Comments cannot be blank.');
        setError(true);
        return; // Prevent further execution
    }
    // use post to insert it
    const encodedTitle = encodeURIComponent(title); 
    Axios.post('http://localhost:3001/comments', {game: encodedTitle, comment: commentInput, email: userEmail}).then(() => {
        setComments([...comments, commentInput]);
        setCommentInput('');
    });

  };

  const deleteComment = (email, comment) => {
    console.log(email);
    console.log(comment);
    const encodedTitle = encodeURIComponent(title);
    console.log(encodedTitle);
    Axios.delete(`http://localhost:3001/comments/${email}/${comment}/${encodedTitle}`)
      .then(() => {
        setComments(comments.filter(comment => comment.id !== email));
      })
      .catch(error => {
        console.error('Could not delete comment:', error);
      });
  };

  if (isLoading || !gameDetails) {
    //console.log(title);
    return <div>Loading... Please Wait</div>;
  }

    const handleAddToFavorites = () => {
        if (!favorites.includes(gameDetails)) {
            setFavorites([...favorites, gameDetails]);
        }
        // Add clicked class
        document.querySelector('.favorite-icon').classList.add('clicked');
    };

    const handleRemoveFromFavorites = () => {
        const updatedFavorites = favorites.filter(game => game.title !== gameDetails.title);
        setFavorites(updatedFavorites);
        // Remove clicked class
        document.querySelector('.favorite-icon').classList.remove('clicked');
    };

  
    const isGameInFavorites = () => {
        return favorites.some(game => game.title === gameDetails.title);
    };


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
                    <div className="favorite-container">
                        {isGameInFavorites() ? (
                            <FavoriteIcon className="favorite-icon" onClick={handleRemoveFromFavorites} />
                        ) : (
                            <FavoriteIcon className="favorite-icon" onClick={handleAddToFavorites} />
                        )}
                        <span className="add-fave">Add to Favourites</span>
                    </div>
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
            <div className="commentSection">
                <h2>Comment Section</h2>
                <textarea
                    placeholder="Write your comment here..."
                    value={commentInput}
                    onChange={handleCommentInputChange}
                ></textarea>
                <button onClick={submitComment}>Submit</button>
                {/* Error message */}
                {error && (
                    <div className="error-message">
                    Comments cannot be blank.
                    </div>
                )}
                {/* Render comments */}
                <div className="comments">
                    {commentEmail.map((comment, index) => (
                    <div key={index}>
                    <span>{comment.comment}</span>
                    {comment.email === userEmail && (
                        <button onClick={() => deleteComment(comment.email, comment.comment)}>Delete</button>
                    )}
                    </div>
                    ))}
                </div>
            </div>
        </div>

    </div>
  );
};

export default GamePage;
