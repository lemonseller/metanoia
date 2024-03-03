const express = require('express');
const { Pool } = require('pg');
const app = express();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.query(`
CREATE DATABASE IF NOT EXISTS users(
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE
)
`, (err) => {
  if (err) {
    console.error(err);
  }
});

app.get('/data', (req, res) => {
  pool.query('SELECT * FROM users', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: err });
    } else {
      res.json(result.rows);
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});