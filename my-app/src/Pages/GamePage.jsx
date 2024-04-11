import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import images from '../Components/images.js';
import Nav from "../Components/navbar";
import "./GamePage.css";
import FilterNone from "@mui/icons-material/FilterNone";
import { UserContext } from "../Context/usercontext";
import AddToHistory from "../Components/AddToHistory.jsx";

// Define UserList as a function component
// copied auric da goat/ angie da slay here thanks bbg
function GameList() {
    // Fetch user list and return it as a promise
    return Axios.get('http://localhost:3001/games').then(response => response.data);
}

function GamePage () {
    const { title } = useParams();
    const { email } = useParams();
    const [gameDetails, setGameDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [commentInput, setCommentInput] = useState('');
    const [comments, setComments] = useState([]);
    const [commentEmail, setCommentEmail] = useState([]);
    const [wish, setWish] = useState([]); // State to store favorite games
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

  const deleteComment = (email, comment,title) => {
    const encodedTitle = encodeURIComponent(title);
    Axios.delete(`http://localhost:3001/comments/${email}/${comment}/${encodedTitle}`)
      .then(() => {
        setComments(comments.filter(comment => comment.id !== email));
        console.log("deleted!");
      })
      .catch(error => {
        console.error('Could not delete comment:', error);
      });
  };

  const handleAddToHistory = () => {
    // const encodedTitle = encodeURIComponent(title);
    Axios.post('http://localhost:3001/history', { gameID: gameDetails.gameID, userID: user.userID }).then(() => {
        console.log('Game added to history successfully');
    }).catch(error => {
        console.error('Error adding game to history:', error);
    });
};

  if (isLoading || !gameDetails) {
    //console.log(title);
    return <div>Loading... Please Wait</div>;
  }

    const handleAddToWishlist = () => {
        // Check if the game is already in the wishlist
        if (wish.some(game => game.title === gameDetails.title)) {
            console.log('Game already in wishlist.');
            return;
        }
        // Add the game to the wishlist
        setWish([...wish, gameDetails]);
        console.log('Game added to wishlist successfully'); 
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
                    <div>
                        <AddToHistory handleAddToHistory={handleAddToHistory} />
                        {/* add logic for when pressed and if clicked again will delete from history */}
                    </div>
                    {userEmail && (
                        <div className="wishlist-container">
                            <FilterNone onClick={handleAddToWishlist} />
                            <span className="add-wish">Add to Wishlist</span>
                        </div>
                    )}
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
                        <button onClick={() => deleteComment(comment.email, comment.comment, title)}>Delete</button>
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
