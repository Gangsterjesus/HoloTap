
// 💠 Animate badge reveal for contributors
function revealBadge(badgeId, duration = 3000, onComplete) {
  const badge = document.getElementById(badgeId);
  if (badge) {
    badge.classList.add('badge-reveal');
    setTimeout(() => {
      badge.classList.remove('badge-reveal');
      if (typeof onComplete === 'function') {
        onComplete();
      }
    }, duration);
  }
}

// Example usage
window.addEventListener('DOMContentLoaded', () => {
  revealBadge('contributor-badge', 3000, () => {
    console.log('🎉 Badge animation complete');
  });
});