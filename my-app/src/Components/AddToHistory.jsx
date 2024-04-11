import React from 'react';
import './AddToHistory.css';

export default function AddToHistory({ handleAddToHistory }) {
  return (
    <div className='historyAddButton' onClick={handleAddToHistory}>
        <p>Add To History</p>
    </div>
  )
}
