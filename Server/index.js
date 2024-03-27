const express = require('express')
const app = express()
const mysql = require('mysql')

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    // password is either '', 'password'. or '471sqlbackend'
    passwowrd: '',
    database: 'gamessystem',
});

// This is where we will request or get things from the database on the frontend
app.post('/create', (req, res) => {

})

app.listen(3001, ()=> {
    console.log("Server is working on port 3001");
});

