import React, { useState } from 'react';

const MyForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    phone: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', phone: '' };

    // Email validation
    if (!formData.email) {
      isValid = false;
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      isValid = false;
      newErrors.email = 'Invalid email address';
    }

    // Phone validation
    if (!formData.phone) {
      isValid = false;
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      isValid = false;
      newErrors.phone = 'Invalid phone number';
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Form submission logic here
      console.log('Form submitted:', formData);
    } else {
      console.log('Form validation failed');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <div className="error">{errors.email}</div>
      </div>

      <div>
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <div className="error">{errors.phone}</div>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
