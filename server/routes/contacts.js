import express from 'express';
import db from '../database.js';

const router = express.Router();

// Get all contacts
router.get('/', (req, res) => {
  const contacts = db.prepare('SELECT * FROM contacts ORDER BY createdAt DESC').all();
  res.json(contacts);
});

// Get single contact
router.get('/:id', (req, res) => {
  const contact = db.prepare('SELECT * FROM contacts WHERE id = ?').get(req.params.id);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ error: 'Contact not found' });
  }
});

// Create contact
router.post('/', (req, res) => {
  const { name, email, phone } = req.body;
  const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
  const createdAt = new Date().toISOString();
  
  try {
    const stmt = db.prepare(
      'INSERT INTO contacts (id, name, email, phone, createdAt) VALUES (?, ?, ?, ?, ?)'
    );
    stmt.run(id, name, email, phone, createdAt);
    res.status(201).json({ id, name, email, phone, createdAt });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update contact
router.put('/:id', (req, res) => {
  const { name, email, phone } = req.body;
  const { id } = req.params;
  
  try {
    const stmt = db.prepare(
      'UPDATE contacts SET name = ?, email = ?, phone = ? WHERE id = ?'
    );
    const result = stmt.run(name, email, phone, id);
    
    if (result.changes > 0) {
      res.json({ id, name, email, phone });
    } else {
      res.status(404).json({ error: 'Contact not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete contact
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  try {
    const stmt = db.prepare('DELETE FROM contacts WHERE id = ?');
    const result = stmt.run(id);
    
    if (result.changes > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Contact not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;