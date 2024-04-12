import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./Wishlist.css";
import images from "../Components/images.js";

// Define UserList as a function component
function UserList() {
    // Fetch user list and return it as a promise
    return Axios.get('http://localhost:3001/users').then(response => response.data);
}

const Wishlists = () => {
    const [wishlist, setWishlist] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { email } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user list and find the current user
        UserList().then(userList => {
            const foundUser = userList.find(u => u.email === email);
            setUser(foundUser);
        }).catch(error => {
            console.error("Error fetching user list:", error);
        });

        // Fetch wishlist data for the specified user from the database
        Axios.get(`http://localhost:3001/wishlist/${email}`)
            .then(response => {
                console.log("Wishlist data:", response.data); // Log the received data
                const wishlistWithDecodedTitles = response.data.map(item => {
                    const decodedTitle = decodeURIComponent(item.game);
                    return { ...item, decodedTitle };
                });
                console.log("Wishlist with decoded titles:", wishlistWithDecodedTitles); // Log wishlist with decoded titles
                setWishlist(wishlistWithDecodedTitles); // Set the wishlist data with decoded titles
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching wishlist:', error);
                setIsLoading(false);
            });
    }, [email]);

    return (
        <div className="wishlist-container">
            <h2 className='wishlist-title'>{user ? user.firstname : ''}'s Wishlist</h2> {/* Display user's first name */}
            <ul className="featured">
                {!isLoading &&
                    wishlist.map((game) => (
                        <li className="game-icon" key={game.gameID}>
                            <img src={images[game.decodedTitle]} alt={game.decodedTitle} className="game-image" />
                            <Link to={`/GamePage/${game.game}`} className="game-title">{game.decodedTitle}</Link>
                        </li>
                    ))}
            </ul>
        </div>
    );    
};

export default Wishlists;
