import React, { useState, useEffect} from "react";
import GameIcon from "./GameIcon";
import { Link } from "react-router-dom";
import Axios from 'axios';

const Games = ({ openPopup }) => {
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        // Fetch games when the component mounts
        getGames();
    }, []);

    const getGames = () => {
        Axios.get('http://localhost:3001/games')
            .then((response) => {
                setFiltered(response.data);
            })
            .catch((error) => {
                console.error('Error fetching games:', error);
            });
    }

    return (
        <div className="mainProp">
            {filtered.length === 0 ? (
                <div className="additionalChild">No Results</div>
            ) : (
                <div className="table">
                    {filtered.map((cell, index) => (
                        <div className="tableRow" key={index}>
                            <Link
                                to={`/GamePage/${encodeURIComponent(cell.id)}/${encodeURIComponent(JSON.stringify(cell))}`}
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default Games;