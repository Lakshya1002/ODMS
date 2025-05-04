-- Inserting data into Hospitals
INSERT INTO Hospitals (name, location)

VALUES
    ('City General Hospital', '123 Main St, Springfield'),
    ('St. Mary\'s Medical Center', '456 Oak Rd, Shelbyville'),
    ('Riverdale Community Hospital', '789 River Rd, Riverdale');

-- Inserting data into Donors
INSERT INTO Donors (name, age, blood_type, organ_donated, availability_status, hospital_id)
VALUES
    ('John Doe', 30, 'A+', 'Kidney', TRUE, 1),
    ('Jane Smith', 45, 'O-', 'Liver', TRUE, 2),
    ('Alice Johnson', 40, 'B+', 'Heart', FALSE, 3),
    ('Bob Brown', 50, 'AB+', 'Kidney', TRUE, 1);

-- Inserting data into Patients
INSERT INTO Patients (name, age, blood_type, organ_needed, urgency_level, hospital_id)
VALUES
    ('Sarah Williams', 29, 'A+', 'Kidney', 3, 1),
    ('Michael Davis', 55, 'O-', 'Liver', 5, 2),
    ('Emily Clark', 65, 'B+', 'Heart', 2, 3),
    ('David Lewis', 40, 'AB+', 'Liver', 4, 1);

-- Inserting data into Transplants
INSERT INTO Transplants (donor_id, patient_id, hospital_id, organ, status, transplant_date)
VALUES
    (1, 1, 1, 'Kidney', 'Completed', '2025-04-20'),
    (2, 2, 2, 'Liver', 'Pending', NULL),
    (4, 4, 1, 'Kidney', 'Cancelled', NULL);
