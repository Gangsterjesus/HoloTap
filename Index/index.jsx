import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.css'; // ✅ This is where your CSS gets loaded

const Root = () => (
  <div className="header">
    <h1 className="header__title">🐶 PayDog</h1>
    <p className="header__tagline">Creator-first fintech with bite</p>
    <img src="/assets/paydog.jpeg" alt="PayDog Mascot" className="mascot" />
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);