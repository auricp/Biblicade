import React from 'react'

export default function UserPreferences(props) {
    const userData = props.userInfo;

    if (!userData) {
        return <div>Loading...</div>;
    }

  return (
    <div>      
        <p>{userData.prefScore}</p>
        <p>Edit</p>
    </div>
  )
}
