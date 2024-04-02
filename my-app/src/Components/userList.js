import React,{useState,useContext} from 'react';
import Axios from 'axios'
function UserList(){
  const [userList, setUserList] = useState([]);
  Axios.get('http://localhost:3001/users').then((response) => {
    setUserList(response.data);
  })
  console.log(userList);
  return userList;
};
export default UserList;
