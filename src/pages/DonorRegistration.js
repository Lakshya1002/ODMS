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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addDonor(formData); 
    alert('Thank you for registering as a donor!');
    setFormData({ name: '', email: '', phone: '', organType: '' }); 
  };

  return (
    <motion.div className="donor-registration-container">
      <div className="donor-registration">
        <motion.h2>Donor Registration</motion.h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Organ Type:</label>
            <select name="organType" value={formData.organType} onChange={handleChange} required>
              <option value="">Select an organ</option>
              <option value="Heart">Heart</option>
              <option value="Lungs">Lungs</option>
              <option value="Kidneys">Kidneys</option>
              <option value="Liver">Liver</option>
              <option value="Pancreas">Pancreas</option>
              <option value="Cornea">Cornea</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </motion.div>
  );
};

export default DonorRegistration;
