import express from 'express';
import db from '../database.js';

const router = express.Router();

// Get all custom emojis
router.get('/', (req, res) => {
  const emojis = db.prepare('SELECT * FROM custom_emojis ORDER BY createdAt DESC').all();
  res.json(emojis);
});

// Create custom emoji
router.post('/', (req, res) => {
  const { emoji, category } = req.body;
  const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
  const createdAt = new Date().toISOString();
  
  try {
    const stmt = db.prepare(
      'INSERT INTO custom_emojis (id, emoji, category, createdAt) VALUES (?, ?, ?, ?)'
    );
    stmt.run(id, emoji, category, createdAt);
    res.status(201).json({ id, emoji, category, createdAt });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete custom emoji
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  try {
    const stmt = db.prepare('DELETE FROM custom_emojis WHERE id = ?');
    const result = stmt.run(id);
    
    if (result.changes > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Emoji not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;