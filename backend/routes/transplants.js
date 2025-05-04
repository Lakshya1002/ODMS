const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Get all transplants
router.get('/', (req, res) => {
  db.query('SELECT * FROM Transplants', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Create a new transplant match
router.post('/', (req, res) => {
  const { donor_id, patient_id, hospital_id, organ_donated } = req.body;
  const sql = `INSERT INTO Transplants 
    (donor_id, patient_id, hospital_id, organ_donated, status, transplant_date)
    VALUES (?, ?, ?, ?, 'Pending', CURDATE())`;
  db.query(sql, [donor_id, patient_id, hospital_id, organ_donated], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Transplant added', id: result.insertId });
  });
});

module.exports = router;
