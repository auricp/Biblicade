const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    // password is either '', 'password'. or '471sqlbackend'
    passwowrd: '',
    database: 'gamessystem',
});

// This is where we will request or get things from the database on the frontend
// is also how we insert or get from the database
app.post('/create', (req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const password = req.body.password;
    const birthday = req.body.birthday;
    
    db.query('INSERT INTO registertest (firstname,lastname,email,password,birthday) VALUES (?,?,?,?,?)', [fname, lname, email, password, birthday], 
    (err, result) => {
        if (err) {
            console.log(err)
        }else {
            res.send("Values Inserted successfully")
        }
    });
    
});

app.post('/comments', (req, res) => {
    const game = req.body.game;
    const comment = req.body.comment;
    
    db.query('INSERT INTO comments (game,comment) VALUES (?,?)', [game,comment],
    (err, result) => {
        if (err) {
            console.log(err)
        }else {
            res.send("Values Inserted successfully")
        }
    });

});


app.post('/preferences', (req, res) => {
    const email = req.body.email;
    const genre = req.body.genre;

    db.query('INSERT INTO preferences (email,genre) VALUES (?,?)', [email,genre],
    (err, result) => {
        if (err) {
            console.log(err)
        }else {
            res.send("Values Inserted successfully")
        }
    });

});
app.get('/comments/:title', (req, res) => {
    const title = encodeURIComponent(req.params.title);
    console.log(title)
    db.query("SELECT comment FROM comments WHERE game = ?", [title], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error querying database' });
        } else {
            const commentString = result.map((row) => row.comment);
            console.log(commentString);
            res.send(commentString);
        }
    });
});


app.get('/users', (req, res) => {
    db.query("SELECT * FROM registertest", (err,result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
});

app.get('/games', (req, res) => {
    db.query("SELECT * FROM game", (err,result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
});

app.listen(3001, ()=> {
    console.log("Server is working on port 3001");
});

