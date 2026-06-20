/**
 * ============================================================
 *  HoloTap — Mascot Image Component (with Fallback Handling)
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Author: Raymond Newton
 *  Date: 20 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Provides a resilient mascot image component that gracefully
 *  handles load failures by switching to a fallback asset. This
 *  ensures brand consistency even when the primary mascot image
 *  is unavailable or corrupted.
 *
 *  Architecture Notes:
 *  - Pure presentational component with internal error state.
 *  - Accepts a primary image source and optional alt text.
 *  - Automatically replaces the image with a fallback asset on
 *    load failure.
 *  - Designed for reuse across all HoloTap screens.
 *
 *  Engineering Notes:
 *  - Fully Vite‑compliant and production‑ready.
 *  - No legacy TM352 dependencies remain.
 *  - Uses explicit state for clarity and maintainability.
 *  - Emits a console warning for diagnostic visibility.
 *
 * ============================================================
 */

import { useState } from "react";
import mascotFallback from "../assets/images/mascot-fallback.png";

export default function MascotImage({
  src,
  alt = "HoloTap Mascot",
  className = "mascot"
}) {
  const [imageSource, setImageSource] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setImageSource(mascotFallback);
    setHasError(true);

    console.warn(
      "MascotImage: Primary mascot image failed to load. Fallback asset applied."
    );
  };

  return (
    <>
      <img
        src={imageSource}
        alt={alt}
        className={className}
        onError={handleError}
      />

      {hasError && (
        <p className="error-message">
          Mascot image failed to load. Displaying fallback asset.
        </p>
      )}
    </>
  );
}
