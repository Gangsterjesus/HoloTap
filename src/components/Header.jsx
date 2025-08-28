import React from 'react';

const Header = () => (
  <header className="header">
    <h1 className="header__title">🐶 PayDog</h1>
    <p className="header__tagline">Creator-first fintech with bite</p>
    <img
      src="/assets/paydog.jpeg"
      alt="PayDog Mascot"
      className="mascot"
      id="paydog-mascot"
    />
  </header>
);

export default Header;