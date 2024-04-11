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
    password: 'root',
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
    const email = req.body.email;
    
    db.query('INSERT INTO comments (game,comment,email) VALUES (?,?,?)', [game,comment,email],
    (err, result) => {
        if (err) {
            console.log(err)
        }else {
            res.send("Values Inserted successfully")
        }
    });

});

app.post('/history', (req, res) => {
    const game = req.body.gameID;
    const user = req.body.userID;
    
    db.query('INSERT INTO gaming_history (userID,gameID) VALUES (?,?)', [user, game],
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
    db.query("SELECT comment, email FROM comments WHERE game = ?", [title], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error querying database' });
        } else {
            //const commentString = result.map((row) => row.comment);
            const commentsWithEmail = result.map((row) => ({ comment: row.comment, email: row.email }));
            res.send(commentsWithEmail);
        }
    });
});

// deletion for comments
app.delete('/comments/:email/:comment/:gameTitle', (req, res) => {
    const { email, comment, gameTitle } = req.params;
    db.query('DELETE FROM comments WHERE game = ? AND comment = ? AND email = ?', [gameTitle, comment, email], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error deleting comment from database' });
        } else {
            console.log('Comment deleted successfully');
            res.status(200).send('Comment deleted successfully');
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

