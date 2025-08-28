// Animate badge reveal for contributors
function revealBadge(badgeId) {
  const badge = document.getElementById(badgeId);
  if (badge) {
    badge.classList.add('badge-reveal');
    setTimeout(() => {
      badge.classList.remove('badge-reveal');
    }, 3000);
  }
}

// Example usage
window.addEventListener('DOMContentLoaded', () => {
  revealBadge('contributor-badge');
});
