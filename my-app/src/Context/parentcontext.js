import React, { useState } from 'react';
import GamePage from '../Pages/GamePage';
import Wishlist from '../Pages/Wishlist';

function ParentComponent() {
    const [favorites, setFavorites] = useState([]);

    return (
        <div>
            <GamePage setFavorites={setFavorites} />
            <Wishlist favorites={favorites} />
        </div>
    );
}

export default ParentComponent;
