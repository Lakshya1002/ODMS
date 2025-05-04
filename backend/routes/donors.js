const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Get all donors
router.get('/', (req, res) => {
  db.query('SELECT * FROM Donors', (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch donors' });
    res.json(results);
  });
});

module.exports = router;
