// PayDog.js

// 🐶 Initialize PayDog App
function startPayDog() {
  console.log("🐶 PayDog is live! - PayDog.js:5");

  // Display welcome message
  alert("Welcome to PayDog — the underdog of digital finance!");

  // Future: Load wallet, fetch creator feed, etc.
  // connectWallet();
  // renderCreatorFeed();
}

// 🔐 Simulated Wallet Loader
function loadWallet() {
  console.log("🔐 Loading wallet... - PayDog.js:17");

  const wallet = {
    balance: 0,
    currency: "GBP",
    connected: false
  };

  return wallet;
}

// 📡 Simulated Creator Feed
function fetchCreatorFeed() {
  console.log("📡 Fetching creator feed... - PayDog.js:30");

  const creators = [
    { name: "PixelPaws", platform: "TikTok", tipAddress: "paydog://pixelpaws" },
    { name: "CodeBard", platform: "Kick", tipAddress: "paydog://codebard" } // Corrected casing
  ];

  return creators;
}

// 💸 Tip Logic Stub
function tipCreator(address) {
  console.log(`💸 Tip sent to ${address} - PayDog.js:42`);
  alert(`Thanks for supporting your favorite creator!\nTip sent to: ${address}`);
}

// 🧪 Optional: Render Creator Feed to DOM
function renderCreatorFeed() {
  const creators = fetchCreatorFeed();
  const container = document.getElementById("creator-feed");

  creators.forEach(creator => {
    const card = document.createElement("div");
    card.className = "creator-card";
    card.innerHTML = `
      <h3>${creator.name}</h3>
      <p>Platform: ${creator.platform}</p>
      <button onclick="tipCreator('${creator.tipAddress}')">Tip</button>
    `;
    container.appendChild(card);
  });
}

// 🛠️ Future Features:
// - Wallet connection and authentication
// - Crypto integration and micropayments
// - NFT minting for creator badges
// - Real-time tip notifications