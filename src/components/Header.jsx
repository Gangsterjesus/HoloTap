
import React, { useState } from 'react';
import mascotFallback from '../assets/images/mascot-fallback.png';

const MascotImage = ({ src, alt = 'HoloTap Mascot', className = 'mascot' }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setImgSrc(mascotFallback);
    setHasError(true);
    console.warn('⚠️ Mascot image failed to load. Fallback applied.');
  };

  return (
    <>
      <img
        src={imgSrc}
        alt={alt}
        className={className}
        onError={handleError}
      />
      {hasError && (
        <p className="error-message">⚠️ Mascot image failed to load. Showing fallback.</p>
      )}
    </>
  );
};

export default MascotImage;