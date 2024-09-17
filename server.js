const express = require('express');
const { Pool } = require('pg');
const fs = require('fs');
const app = express();

app.use(express.static('public/home'));

const pool = new Pool({
  connectionString: 'postgres://metanoia_user:vixgfYScDTPCg25cm3QKpdyC1rObyDHU@dpg-cnibco8l6cac7397fd0g-a.oregon-postgres.render.com/metanoia',
  ssl: {
    rejectUnauthorized: false
  }
});

// const pool = new Pool({
//   connectionString: 'postgres://metanoia_user:vixgfYScDTPCg25cm3QKpdyC1rObyDHU@dpg-cnibco8l6cac7397fd0g-a.oregon-postgres.render.com/metanoia',
// });

fs.readFile('./sql/create.sql', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    pool.query(data, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("tables initialized");
      }
    });
  }
});
fs.readFile('./sql/insert.sql', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    pool.query(data, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('insertion complete');
      }
    });
  }
});


app.get('/', (req, res) => {
  res.redirect('/home.html');
});


app.get('/login', (req, res) => {
  res.redirect('/loggedin.html');
});


// Create a new user
app.post('/users', (req, res) => {
  const { email } = req.body;
  pool.query('INSERT INTO users (email) VALUES ($1) RETURNING *', [email], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: err });
    } else {
      res.status(201).json(result.rows[0]);
    }
  });
});

//get all questions
app.get('/questions', (req, res) => {
  db.query('SELECT * FROM questions;', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching questions');
    } else {
      res.json(results);
    }
  });
});

// Get all users
app.get('/users', (req, res) => {
  pool.query('SELECT * FROM users;', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: err });
    } else {
      res.json(result.rows);
    }
  });
});

// Update a user
// app.put('/users/:id', (req, res) => {
//   const { id } = req.params;
//   const { email } = req.body;
//   pool.query('UPDATE users SET email = $1 WHERE id = $2 RETURNING *', [email, id], (err, result) => {
//     if (err) {
//       console.error(err);
//       res.status(500).json({ error: err });
//     } else {
//       res.json(result.rows[0]);
//     }
//   });
// });

// // Delete a user
// app.delete('/users/:id', (req, res) => {
//   const { id } = req.params;
//   pool.query('DELETE FROM users WHERE id = $1', [id], (err, result) => {
//     if (err) {
//       console.error(err);
//       res.status(500).json({ error: err });
//     } else {
//       res.status(204).end();
//     }
//   });
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});