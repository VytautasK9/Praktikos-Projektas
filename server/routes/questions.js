// server/routes/questions.js
const express = require('express');
const pool = require('../db');
const router = express.Router();

router.post('/ask', async (req, res) => {
  const { title, category_id, description, user_id } = req.body;

  try {
    const [result] = await pool.execute(
      'INSERT INTO questions (title, category_id, description, user_id) VALUES (?, ?, ?, ?)',
      [title, category_id, description, user_id]
    );

    res.status(201).json({ id: result.insertId, title, category_id, description, user_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting question' });
  }
});

router.get('/user-questions/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const [questions] = await pool.execute(
      'SELECT * FROM questions WHERE user_id = ?',
      [userId]
    );

    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving user questions' });
  }
});

module.exports = router;
