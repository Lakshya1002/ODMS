import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { OrganContext } from '../context/OrganContext';
import './DonorRegistration.css';

const DonorRegistration = () => {
  const { addDonor } = useContext(OrganContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organType: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const donorData = {
      name: formData.name,
      age: 30, // You can prompt for age in your form
      blood_type: "O+", // Prompt for blood type in the form or set it dynamically
      organ_donated: formData.organType,
      availability_status: true, // Set to true by default, or prompt the user
      hospital_id: null, // You can either prompt for this or set as null
      registered_at: new Date().toISOString(), // Setting the current time
    };

    // Send POST request to your backend API
    try {
      const response = await fetch('http://localhost:8000/donors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donorData), // Sending the complete donor data
      });

      if (!response.ok) {
        throw new Error('Failed to register donor');
      }

      const data = await response.json();
      addDonor(formData); // Assuming you want to add the donor to the context as well
      alert('Thank you for registering as a donor!');
      setFormData({ name: '', email: '', phone: '', organType: '' });
    } catch (err) {
      setError(err.message); // Handle any errors that occur during the request
      alert('An error occurred while registering. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <motion.div className="donor-registration-container">
      <div className="donor-registration">
        <motion.h2>Donor Registration</motion.h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="error">{error}</div>} {/* Display error message if any */}
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Organ Type:</label>
            <select
              name="organType"
              value={formData.organType}
              onChange={handleChange}
              required
            >
              <option value="">Select an organ</option>
              <option value="Heart">Heart</option>
              <option value="Lungs">Lungs</option>
              <option value="Kidneys">Kidneys</option>
              <option value="Liver">Liver</option>
              <option value="Pancreas">Pancreas</option>
              <option value="Cornea">Cornea</option>
            </select>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default DonorRegistration;
