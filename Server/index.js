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
    password: '',    
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

// Endpoint for adding a new game to the database
app.post('/add-game', (req, res) => {
    // Extract data from the request body
    const { title, description, releaseYear, releaseMonth, releaseDay, ratingScore, ageRestriction, developerID, publisherID, genre, imageLocation } = req.body;
  
    // Create a SQL query to insert the game into the database
    const sql = 'INSERT INTO game (title, description, releaseYear, releaseMonth, releaseDay, ratingScore, ageRestriction, developerID, publisherID, genre, imageLocation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [title, description, releaseYear, releaseMonth, releaseDay, ratingScore, ageRestriction, developerID, publisherID, genre, imageLocation];
  
    // Execute the query
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error adding game to the database:', err);
        res.status(500).json({ error: 'An error occurred while adding the game to the database' });
      } else {
        console.log('Game added successfully');
        res.status(200).json({ message: 'Game added successfully' });
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

app.get('/publisher/:id', (req, res) => {
    const id = encodeURIComponent(req.params.id); // Extract publisher ID from URL parameter
    
    db.query("SELECT * FROM publisher WHERE publisherID = ?", [id], (err, result) => {
        if (err) {
            console.error("Error fetching publisher details:", err);
            res.status(500).send("Internal Server Error");
        } else {
            if (result.length > 0) {
                res.status(200).json(result[0]); // Send publisher details as JSON response
            } else {
                res.status(404).send("Publisher not found");
            }
        }
    });
});

app.get('/developer/:id', (req, res) => {
    const id = encodeURIComponent(req.params.id); // Extract developer ID from URL parameter
    
    db.query("SELECT * FROM developer WHERE developerID = ?", [id], (err, result) => {
        if (err) {
            console.error("Error fetching developer details:", err);
            res.status(500).send("Internal Server Error");
        } else {
            if (result.length > 0) {
                res.status(200).json(result[0]); // Send developer details as JSON response
            } else {
                res.status(404).send("developer not found");
            }
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

app.get('/history/:userID', (req, res) => {
    // const userID = req.body.userID;
    const userID = encodeURIComponent(req.params.userID);

    // SELECT title FROM game WHERE gameID IN (SELECT gameID FROM gaming_history WHERE userID = ?)
    db.query("SELECT * FROM game WHERE gameID IN (SELECT gameID FROM gaming_history WHERE userID = ?)", [userID], (err, result) => {
        if (err) {
            console.error("Error querying database:", err);
            return res.status(500).json({ error: 'Error querying database' });
        } else {
            // Send all the results in the response
            // add more paramaters later
            const titles = result.map(row => ({gameID: row.gameID, title: row.title, score: row.ratingScore, ageRest: row.ageRestriction, genre: row.genre}));
            res.json(titles);
        }
    });

});

app.delete('/gaming_history/:userID/:gameID', (req, res) => {
    const { userID, gameID } = req.params;
    db.query('DELETE FROM gaming_history WHERE userID = ? AND gameID = ?', [userID, gameID], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error deleting game from gaming history' });
        } else {
            console.log('Game marked as unplayed successfully');
            res.status(200).send('Game marked as unplayed successfully');
        }
    });
});


app.get('/gamePreferences/:userID', (req, res) => {
    // const userID = req.body.userID;
    const userID = encodeURIComponent(req.params.userID);

    db.query("SELECT * FROM (game JOIN gaming_preferences ON (game.gameID = gaming_preferences.gameID)) WHERE userID = ?", [userID], (err, result) => {
        if (err) {
            console.error("Error querying database:", err);
            return res.status(500).json({ error: 'Error querying database' });
        } else {
            // Send all the results in the response
            // const titles = result.map(row => ({opinion: row.userRating, gameID: row.gameID, title: row.title, score: row.ratingScore, ageRest: row.ageRestriction, genre: row.genre}));
            const titles = result.map(row => ({userID: row.userID, gameID: row.gameID, opinion: row.userRating}));
            res.json(titles);
        }
    });
});

app.post('/gamePreferences/:userID', (req, res) => {
    const game = req.body.gameFK;
    const user = req.body.userFK;
    const opin = req.body.opinionFK;
    
    db.query('INSERT INTO gaming_preferences (userID,gameID,userRating) VALUES (?,?,?)', [user, game, opin],
    (err, result) => {
        if (err) {
            console.log(err)
        }else {
            res.send("Values Inserted successfully")
        }
    });

});

// POST endpoint to update the opinion in gaming_preferences table
app.post('/updateOpinion', (req, res) => {
    const { userID, gameID, opinion } = req.body;

    db.query('UPDATE gaming_preferences SET userRating = ? WHERE userID = ? AND gameID = ?', [opinion, userID, gameID], (err, result) => {
        if (err) {
            console.error('Error updating opinion:', err);
            res.status(500).json({ error: 'Error updating opinion in database' });
        } else {
            console.log('Opinion updated successfully');
            res.status(200).json({ message: 'Opinion updated successfully' });
        }
    });
});

// DELETE endpoint to remove preference from gaming_preferences table
app.delete('/gaming_preferences/:userID/:gameID', (req, res) => {
    const { userID, gameID } = req.params;

    db.query('DELETE FROM gaming_preferences WHERE userID = ? AND gameID = ?', [userID, gameID], (err, result) => {
        if (err) {
            console.error('Error removing preference:', err);
            res.status(500).json({ error: 'Error removing preference from database' });
        } else {
            console.log('Preference removed successfully');
            res.status(200).json({ message: 'Preference removed successfully' });
        }
    });
});


app.get('/userPreferences/:userID', (req, res) => {
    // const userID = req.body.userID;
    const userID = encodeURIComponent(req.params.userID);

    db.query("SELECT * FROM user_preferences WHERE userID = ?", [userID], (err, result) => {
        if (err) {
            console.error("Error querying database:", err);
            return res.status(500).json({ error: 'Error querying database' });
        } else {
            // Send all the results in the response
            const userPrefs = result.map(row => ({userID: row.userID, prefScore: row.preferredRatingScore}));
            res.json(userPrefs);
        }
    });
});

app.post('/userPreferences/:userID', (req, res) => {
    const userID = encodeURIComponent(req.params.userID);
    const newPreferredRatingScore = req.body.preferredRatingScore;

    if (!newPreferredRatingScore) {
        return res.status(400).json({ error: 'Preferred rating score is missing in the request body' });
    }

    db.query("INSERT INTO user_preferences (userID, preferredRatingScore) VALUES (?,?)", [userID, newPreferredRatingScore], (err, result) => {
        if (err) {
            console.error("Error updating database:", err);
            return res.status(500).json({ error: 'Error updating database' });
        } else {
            res.json({ success: true });
        }
    });
});




app.post('/userPreferences/:userID', (req, res) => {
    const { userID } = req.params;
    const { prefScore } = req.body;

    db.query("UPDATE user_preferences SET preferredRatingScore = ? WHERE userID = ?", [prefScore, userID], (err, result) => {
        if (err) {
            console.error("Error updating user preference score:", err);
            return res.status(500).json({ error: 'Error updating user preference score' });
        } else {
            console.log('User preference score updated successfully');
            res.status(200).json({ message: 'User preference score updated successfully' });
        }
    });
});


app.post('/wishlist', (req, res) => {
    const game = req.body.game;
    const gameID = req.body.gameID;
    const email = req.body.email;
    
    // Check if gameID or game is null, and set them to empty string if so
    const safeGameID = gameID || '';
    const safeGame = game || '';

    db.query('INSERT INTO wishlists (email, gameID, game) VALUES (?, ?, ?)', [email, safeGameID, safeGame],
    (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error inserting values into database");
        } else {
            res.send("Values Inserted successfully");
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
    const title = encodeURIComponent(gameTitle);
    console.log(comment);
    console.log(email);
    console.log(title);
    db.query('DELETE FROM comments WHERE game = ? AND comment = ?', [title, comment], (err, result) => {
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

// GET endpoint to retrieve a user's wishlist based on their email
app.get('/wishlist/:email', (req, res) => {
    const email = req.params.email;

    // Query the wishlist data for the specified user from the database
    db.query('SELECT * FROM wishlists WHERE email = ?', [email], (err, result) => {
        if (err) {
            console.error('Error fetching wishlist:', err);
            res.status(500).send("Error fetching wishlist from database");
        } else {
            // Send the wishlist data for the specified user as a response
            res.send(result);
        }
    });
});

// Deletion route for wishlist items
app.delete('/wishlist/:email/:gameTitle', (req, res) => {
    const { email, gameTitle } = req.params;
    const title = encodeURIComponent(gameTitle);

    // Perform deletion from the wishlist
    db.query('DELETE FROM wishlists WHERE email = ? AND game = ?', [email, title], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error deleting item from wishlist in database' });
        } else {
            console.log('Item deleted from wishlist successfully');
            res.status(200).send('Item deleted from wishlist successfully');
        }
    });
});

app.listen(3001, ()=> {
    console.log("Server is working on port 3001");
});

