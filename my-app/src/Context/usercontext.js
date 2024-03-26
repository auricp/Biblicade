import React, { createContext,useEffect, useState } from "react";
export const UserContext = createContext({});
export function UserProvider({ children }) {
  const [user, setUser] = useState(()=>{
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser): null;
  });

  useEffect(()=>{
    const storedUser = localStorage.getItem('user');
    if(storedUser){
      setUser(JSON.parse(storedUser))
    }
  },[]);
  useEffect(()=>{
    localStorage.setItem('user',JSON.stringify(user));
  },[user])
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
