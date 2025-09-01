// 💠 Simulated QR scanner logic (HoloTap placeholder)
window.addEventListener('DOMContentLoaded', () => {
  const scanButton = document.getElementById('scan-qr');

  scanButton?.addEventListener('click', () => {
    alert('💠 HoloTap scan complete! Payment confirmed.');

    // Optional: trigger badge animation
    const badge = document.getElementById('contributor-badge');
    if (badge) {
      badge.classList.add('badge-reveal');
      setTimeout(() => badge.classList.remove('badge-reveal'), 3000);
    }

    // Optional: trigger callback or redirect
    // handlePaymentSuccess(); // Uncomment if defined
  });
});