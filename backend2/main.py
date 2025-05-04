from datetime import datetime
from typing import Optional
import pymysql
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# Database Connection
# -----------------------------
def get_db():
    try:
        return pymysql.connect(
            host="localhost",
            user="root",
            password="vinayak@786",
            database="ODM",
            cursorclass=pymysql.cursors.DictCursor
        )
    except pymysql.MySQLError as e:
        raise HTTPException(status_code=500, detail=f"Database connection failed: {str(e)}")


# -----------------------------
# Models
# -----------------------------
class Donor(BaseModel):
    name: str
    age: int
    blood_type: str
    organ_donated: str
    availability_status: Optional[bool] = True
    hospital_id: Optional[int] = None
    registered_at: Optional[datetime] = None


class Patient(BaseModel):
    name: str
    blood_type: str
    organ_needed: str
    urgency_level: int
    registered_at: Optional[datetime] = None


class Transplant(BaseModel):
    donor_id: int
    patient_id: int
    hospital_id: int
    organ_donated: str


# -----------------------------
# Donors Routes
# -----------------------------
@app.get("/donors")
def get_donors():
    conn = None
    try:
        conn = get_db()
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM Donors")
            return cursor.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if conn:
            conn.close()


@app.post("/donors")
def create_donor(donor: Donor):
    conn = None
    try:
        conn = get_db()
        with conn.cursor() as cursor:
            sql = """
                INSERT INTO Donors 
                (name, age, blood_type, organ_donated, availability_status, hospital_id, registered_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            """
            cursor.execute(sql, (
                donor.name,
                donor.age,
                donor.blood_type,
                donor.organ_donated,
                donor.availability_status,
                donor.hospital_id,
                donor.registered_at or datetime.now()
            ))
            conn.commit()
            return {"message": "Donor added", "id": cursor.lastrowid}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database query failed: {str(e)}")
    finally:
        if conn:
            conn.close()


# -----------------------------
# Patients Routes
# -----------------------------
@app.get("/patients")
def get_patients():
    conn = None
    try:
        conn = get_db()
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM Patients")
            return cursor.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if conn:
            conn.close()


@app.post("/patients")
def create_patient(patient: Patient):
    conn = None
    try:
        conn = get_db()
        with conn.cursor() as cursor:
            sql = """
                INSERT INTO Patients 
                (name, blood_type, organ_needed, urgency_level, registered_at)
                VALUES (%s, %s, %s, %s, %s)
            """
            cursor.execute(sql, (
                patient.name,
                patient.blood_type,
                patient.organ_needed,
                patient.urgency_level,
                patient.registered_at or datetime.now()
            ))
            conn.commit()
            return {"message": "Patient added", "id": cursor.lastrowid}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database query failed: {str(e)}")
    finally:
        if conn:
            conn.close()


# -----------------------------
# Transplants Routes
# -----------------------------
@app.get("/transplants")
def get_transplants():
    conn = None
    try:
        conn = get_db()
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM Transplants")
            return cursor.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if conn:
            conn.close()


@app.post("/transplants")
def create_transplant(transplant: Transplant):
    conn = None
    try:
        conn = get_db()
        with conn.cursor() as cursor:
            print("Inserting transplant record")  # Debugging line to check if this part runs
            sql = """
                INSERT INTO Transplants 
                (donor_id, patient_id, hospital_id, organ, status, transplant_date)
                VALUES (%s, %s, %s, %s, 'Pending', CURDATE())
            """
            cursor.execute(sql, (
                transplant.donor_id,
                transplant.patient_id,
                transplant.hospital_id,
                transplant.organ_donated
            ))
            conn.commit()
            print(f"Transplant added with ID {cursor.lastrowid}")  # Debugging line for success
            return {"message": "Transplant added", "id": cursor.lastrowid}
    except pymysql.MySQLError as e:
        raise HTTPException(status_code=500, detail=f"Database query failed: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {e}")
    finally:
        if conn:
            conn.close()
