import express from 'express';
import db from '../database.js';

const router = express.Router();

// Get all deals
router.get('/', (req, res) => {
  const deals = db.prepare('SELECT * FROM deals ORDER BY createdAt DESC').all();
  res.json(deals);
});

// Get single deal
router.get('/:id', (req, res) => {
  const deal = db.prepare('SELECT * FROM deals WHERE id = ?').get(req.params.id);
  if (deal) {
    res.json(deal);
  } else {
    res.status(404).json({ error: 'Deal not found' });
  }
});

// Create deal
router.post('/', (req, res) => {
  const { title, value, stage, contactId } = req.body;
  const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
  const createdAt = new Date().toISOString();
  
  try {
    const stmt = db.prepare(
      'INSERT INTO deals (id, title, value, stage, contactId, createdAt) VALUES (?, ?, ?, ?, ?, ?)'
    );
    stmt.run(id, title, value, stage, contactId, createdAt);
    res.status(201).json({ id, title, value, stage, contactId, createdAt });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update deal
router.put('/:id', (req, res) => {
  const { title, value, stage, contactId } = req.body;
  const { id } = req.params;
  
  try {
    const stmt = db.prepare(
      'UPDATE deals SET title = ?, value = ?, stage = ?, contactId = ? WHERE id = ?'
    );
    const result = stmt.run(title, value, stage, contactId, id);
    
    if (result.changes > 0) {
      res.json({ id, title, value, stage, contactId });
    } else {
      res.status(404).json({ error: 'Deal not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete deal
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  try {
    const stmt = db.prepare('DELETE FROM deals WHERE id = ?');
    const result = stmt.run(id);
    
    if (result.changes > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Deal not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;