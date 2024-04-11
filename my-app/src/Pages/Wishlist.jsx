import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GameIcon from "../Components/GameIcon";
import Axios from "axios";
import "./Wishlist.css";

export const Wishlists = () => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        // Fetch wishlist data from the database
        Axios.get('http://localhost:3001/wishlist')
            .then(response => {
                console.log("Wishlist data:", response.data); // Log the received data
                setWishlist(response.data.map(item => item.game)); // Extract game titles from the wishlist items
            })
            .catch(error => {
                console.error('Error fetching wishlist:', error);
            });
    }, []);

    return (
        <div className="wishlist-container">
            <div className="wishes">
                <h2 className="wishlist-title">Wishlist</h2>
                <div className="game-icons">
                    {wishlist.map((game, index) => (
                        <GameIcon key={index} game={game} /> 
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wishlists;
