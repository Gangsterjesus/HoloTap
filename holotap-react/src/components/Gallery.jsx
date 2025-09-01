// src/components/Gallery.jsx
const images = import.meta.glob('../images/*.png', { eager: true });

export default function Gallery() {
  return (
    <div className="gallery">
      {Object.entries(images).map(([path, module]) => {
        const filename = path.split('/').pop().replace(/\.[^/.]+$/, '');
        return (
          <figure key={path} className="gallery-item">
            <img src={module.default} alt={filename} loading="lazy" />
            <figcaption>{filename}</figcaption>
          </figure>
        );
      })}
    </div>
  );
}