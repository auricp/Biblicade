import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Axios from "axios";
import './PublisherPage.css'
import Nav from '../Components/navbar';

export default function PublisherPage() {
    const { id } = useParams();
    const [publisher, setPublisher] = useState(null);

    useEffect(() => {
        Axios.get(`http://localhost:3001/publisher/${id}`)
            .then(response => {
                setPublisher(response.data);
            })
            .catch(error => {
                console.error("Error fetching publisher details:", error);
            });
    }, [id]);

    return (
      <div>
        <Nav />
          {publisher ? (
              <div>
                  <div className='upperPane'>
                      <h3 className='publisherType'>{publisher.type}</h3>
                      <h1 className='publisherTitle'>{publisher.name}</h1>
                  </div>
                  <div className='lowerPane'>
                      <h2 className='publisherLocation'>Location: {publisher.location}</h2>
                      <h2 className='publisherLocation'>Type: Publisher</h2>
                  </div>
              </div>
          ) : (
              <p>Loading...</p>
          )}
      </div>
  );
}


