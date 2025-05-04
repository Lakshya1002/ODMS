WITH RankedMatches AS (
    SELECT 
        d.donor_id, d.name AS donor_name, d.blood_type AS donor_blood, d.organ_donated,
        p.patient_id, p.name AS patient_name, p.blood_type AS patient_blood, p.organ_needed, p.urgency_level,
        h.name AS hospital_name,
        ROW_NUMBER() OVER (PARTITION BY d.donor_id ORDER BY p.urgency_level DESC, p.registered_at ASC) AS match_rank
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
    JOIN Hospitals h ON d.hospital_id = h.hospital_id
    LEFT JOIN Transplants t ON d.donor_id = t.donor_id
    WHERE t.donor_id IS NULL  -- 🔴 Ensures donor is not already assigned!
)
SELECT * FROM RankedMatches WHERE match_rank = 1;  -- ✅ Ensures only the highest priority match is selected
