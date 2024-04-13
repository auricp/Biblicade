import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Axios from "axios";
import './DeveloperPage.css';
import Nav from '../Components/navbar';

export default function DeveloperPage() {
    const { id } = useParams();
    const [developer, setDeveloper] = useState(null);

    useEffect(() => {
        Axios.get(`http://localhost:3001/developer/${id}`)
            .then(response => {
                setDeveloper(response.data);
            })
            .catch(error => {
                console.error("Error fetching developer details:", error);
            });
    }, [id]);

    return (
      <div>
        <Nav />
          {developer ? (
              <div>
                  <div className='upperPane'>
                      <h3 className='developerType'>{developer.type}</h3>
                      <h1 className='developerTitle'>{developer.name}</h1>
                  </div>
                  <div className='lowerPane'>
                      <h2 className='developerLocation'>Location: {developer.location}</h2>
                      <h2 className='developerLocation'>Type: Developer</h2>
                  </div>
              </div>
          ) : (
              <p>Loading...</p>
          )}
      </div>
  );
}


