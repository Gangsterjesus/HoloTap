/**
 * ============================================================
 *  HoloTap — Image Gallery Component
 *  Engineers: Raymond Newton (E5357171), Copilot Engineering Assistant
 *  Author: Raymond Newton
 *  Date: 20 June 2026
 *  © 2026 HoloTap Technologies Ltd. All rights reserved.
 * ============================================================
 *
 *  Purpose:
 *  Dynamically loads and displays all PNG images located in the
 *  ../images directory. Each image is rendered with a caption
 *  derived from its filename. Used for visual previews, asset
 *  browsing, and contributor galleries.
 *
 *  Architecture Notes:
 *  - Uses Vite's import.meta.glob to eagerly import all images.
 *  - Pure presentational component with no business logic.
 *  - Future expansion:
 *        • Lightbox viewer
 *        • Sorting and filtering
 *        • Backend-driven image metadata
 *
 *  Engineering Notes:
 *  - Fully Vite-compliant and production-ready.
 *  - No legacy TM352 dependencies remain.
 *  - Clean, accessible, mobile-friendly layout.
 *
 * ============================================================
 */

const images = import.meta.glob("../images/*.png", { eager: true });

export default function Gallery() {
  return (
    <div className="gallery">
      {Object.entries(images).map(([path, module]) => {
        const filename = path.split("/").pop().replace(/\.[^/.]+$/, "");

        return (
          <figure key={path} className="gallery-item">
            <img
              src={module.default}
              alt={filename}
              loading="lazy"
            />
            <figcaption>{filename}</figcaption>
          </figure>
        );
      })}
    </div>
  );
}
