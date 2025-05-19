import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'

function LoginPage() {
  const navigate = useNavigate();
  const [customerID, setCustomerID] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!customerID || !password) {
      setError('กรุณากรอก Customer ID และ Password ให้ครบ');
      return;
    }

    if (customerID === 'user123' && password === 'pass123') {
      navigate('/dashboard');
    } else {
      setError('Customer ID หรือ Password ไม่ถูกต้อง');
    }
  };

  return (
    <div className="Wrapper">
      <div className="Login">
        <header>เข้าสู่ระบบ</header>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              className="input-field"
              type="text"
              placeholder="Customer ID"
              value={customerID}
              onChange={(e) => setCustomerID(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <input
              className="input-field"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-submit">
            <button type="submit" className="submit-btn">Sign In</button>
          </div>
        </form>
        {error && <p style={{ color: 'red', marginTop: 15 }}>{error}</p>}
      </div>
    </div>
  );
}

export default LoginPage;
