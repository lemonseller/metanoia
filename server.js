const express = require('express');
const { Pool } = require('pg');
const app = express();

app.use(express.static('public/home'));

const pool = new Pool({
  connectionString: 'postgres://metanoiadb_user:kuAX1CFMOD3cYviClznlCmBaeSRKSTEj@dpg-cni61ci1hbls73ffusj0-a/metanoiadb',
});

pool.query(`
  CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE
  )
`, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Users table is ready");
  }
});

pool.query(`
  CREATE TABLE IF NOT EXISTS questions(
    question_id SERIAL PRIMARY KEY,
    question VARCHAR(500) NOT NULL
  ) 
`, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("questions table is ready");
  }
});

pool.query(`
  CREATE TABLE IF NOT EXISTS response(
    id INT NOT NULL,
    question_id INT NOT NULL,
    response VARCHAR(500) NOT NULL,
    date DATE NOT NULL,
    PRIMARY KEY (question_id, id, date),
    FOREIGN KEY (question_id) REFERENCES questions(question_id),
    FOREIGN KEY (id) REFERENCES users(id)
  )
`, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("response table is ready");
  }
});

app.get('/', (req, res) => {
  res.redirect('/home.html');
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

// Get all users
app.get('/users', (req, res) => {
  pool.query('SELECT * FROM users', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: err });
    } else {
      res.json(result.rows);
    }
  });
});

// Update a user
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { email } = req.body;
  pool.query('UPDATE users SET email = $1 WHERE id = $2 RETURNING *', [email, id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: err });
    } else {
      res.json(result.rows[0]);
    }
  });
});

// Delete a user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM users WHERE id = $1', [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: err });
    } else {
      res.status(204).end();
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});