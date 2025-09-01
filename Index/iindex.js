
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.css'; // ✅ Loads your unified PayDog styles

// Optional: import mascot image if using bundler
// import mascot from './Assets/Images/paydog.jpeg';

const App = () => (
  <div className="header">
    <h1 className="header__title">🐶 PayDog</h1>
    <p className="header__tagline">Creator-first fintech with bite</p>
    <img
      src="/assets/paydog.jpeg"
      alt="PayDog Mascot"
      className="mascot"
      id="paydog-mascot"
    />

    <section className="features">
      <h2 className="features__title">Why PayDog?</h2>
      <ul className="features__list">
        <li className="features__item">QR & A2A payments</li>
        <li className="features__item">Contributor badges & shoutouts</li>
        <li className="features__item">Mascot-driven branding</li>
      </ul>
    </section>

    <div className="cta">
      <button className="cta__button">Join the Pack</button>
      <button className="cta__button">Send Payment</button>
    </div>

    <section className="creator-feed">
      <h2 className="creator-feed__title">Featured Contributors</h2>
      <div className="creator-card">
        <div className="creator-card__name">Raymond Newton</div>
        <div className="creator-card__platform">Founder, PayDog</div>
        <button className="creator-card__button">Send Shoutout</button>
      </div>
    </section>

    <footer className="footer">
      Built with 🐾 by the PayDog community. <a href="https://github.com/GangsterJesus/Paydog-">GitHub</a>
    </footer>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);