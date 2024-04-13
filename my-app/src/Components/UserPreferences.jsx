import React from 'react'
import "./UserPreferences.css";

export default function UserPreferences(props) {
    const userData = props.userInfo;

    if (!userData) {
        return <div>Loading...</div>;
    }

  return (
    <div className='userPrefPane'>      
        <p className='userPrefScore'>{userData.prefScore}</p>
        <p className='userPrefButton'>Edit</p>
    </div>
  )
}
