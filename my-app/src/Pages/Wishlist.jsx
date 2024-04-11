import React, { useState, useEffect } from "react";
import GameIcon from "../Components/GameIcon";

export const Wishlists = ({ favorites }) => {
    return (
        <div className="wishlist-container">
            <div className="">
              <h2>Wishlist</h2>
              <div className="game-icons">
                {favorites && favorites.map((game, index) => (
                    <GameIcon key={index} game={game} />
                ))}
              </div>
            </div>
        </div>
    );
};

export default Wishlists;
