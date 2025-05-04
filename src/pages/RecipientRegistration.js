import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { OrganContext } from '../context/OrganContext';
import './RecipientRegistration.css';

const RecipientRegistration = () => {
  const { addRecipient } = useContext(OrganContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organNeeded: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addRecipient(formData);
    alert('Thank you for registering as a recipient!');
    setFormData({ name: '', email: '', phone: '', organNeeded: '' });
  };

  return (
    <motion.div className="recipient-registration-container">
      <div className="recipient-registration">
        <motion.h2>Recipient Registration</motion.h2>
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
            <label>Organ Needed:</label>
            <select name="organNeeded" value={formData.organNeeded} onChange={handleChange} required>
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

export default RecipientRegistration;
