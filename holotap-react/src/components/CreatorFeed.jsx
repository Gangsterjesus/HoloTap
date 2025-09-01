import React from 'react';

const CreatorFeed = () => (
  <section className="creator-feed">
    <h2 className="creator-feed__title">Featured Contributors</h2>
    <div className="creator-card">
      <div className="creator-card__name">Raymond Newton</div>
      <div className="creator-card__platform">Founder, PayDog</div>
      <button className="creator-card__button">Send Shoutout</button>
    </div>
  </section>
);

export default CreatorFeed;