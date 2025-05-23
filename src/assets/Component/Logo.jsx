import React from 'react';
import logoImg from '../image/Logo-coffee-cafe.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className='Logo'>
      <div className="logo-icon">
        <img src={logoImg} alt="Logo"
 />
      </div>
    </div>
  );
};

export default Logo;

