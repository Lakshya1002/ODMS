const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Get all patients
router.get('/', (req, res) => {
  db.query('SELECT * FROM Patients', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Add a new patient
router.post('/', (req, res) => {
  const { name, blood_type, organ_needed, urgency_level, registered_at } = req.body;
  const sql = 'INSERT INTO Patients (name, blood_type, organ_needed, urgency_level, registered_at) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, blood_type, organ_needed, urgency_level, registered_at], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Patient added', id: result.insertId });
  });
});

module.exports = router;
