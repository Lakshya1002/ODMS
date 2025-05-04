
INSERT INTO Transplants (donor_id, patient_id, hospital_id, organ, status, transplant_date)
SELECT 
    d.donor_id, 
    p.patient_id, 
    d.hospital_id, 
    d.organ_donated,  -- Store the organ being transplanted
    'Pending',        -- Transplant is pending initially
    CURDATE()         -- Today's date as transplant date (Can be updated later)
FROM Donors d
JOIN Patients p ON (
    d.organ_donated = p.organ_needed
    AND d.availability_status = TRUE
    AND (
        (d.blood_type = p.blood_type) 
        OR (d.blood_type = 'O-') 
        OR (d.blood_type = 'O+' AND p.blood_type IN ('O+', 'A+', 'B+', 'AB+'))
        OR (d.blood_type = 'A-' AND p.blood_type IN ('A-', 'A+', 'AB-', 'AB+'))
        OR (d.blood_type = 'A+' AND p.blood_type IN ('A+', 'AB+'))
        OR (d.blood_type = 'B-' AND p.blood_type IN ('B-', 'B+', 'AB-', 'AB+'))
        OR (d.blood_type = 'B+' AND p.blood_type IN ('B+', 'AB+'))
        OR (d.blood_type = 'AB-' AND p.blood_type IN ('AB-', 'AB+'))
        OR (d.blood_type = 'AB+' AND p.blood_type = 'AB+')
    )
)
WHERE NOT EXISTS (  -- Prevent inserting duplicate transplants for a patient
    SELECT 1 FROM Transplants t WHERE t.patient_id = p.patient_id
)
ORDER BY p.urgency_level DESC, p.registered_at ASC;
