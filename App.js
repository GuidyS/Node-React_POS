import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';

function Dashboard() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>
      <p>ยินดีต้อนรับเข้าสู่ระบบ</p>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
