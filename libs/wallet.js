// wallet.js

async function connectWallet() {
  if (typeof window.ethereum === 'undefined') {
    toast("Metamask not found ❌");
    return;
  }

  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const address = accounts[0];
    toast("Wallet connected ✅");

    // อัปเดต DID และ GIG
    document.getElementById("walletAddress").textContent = address;
    document.getElementById("did").textContent = "did:ngate:" + address;
    document.getElementById("gig").textContent = "gig:connected";

    // เก็บไว้ใน localStorage
    localStorage.setItem("wallet", address);
  } catch (err) {
    console.error(err);
    toast("Connection failed ❌");
  }
}

function showQR() {
  const did = document.getElementById("did").textContent;
  const qr = new QRious({
    element: document.getElementById('qrCanvas'),
    value: did,
    size: 220
  });

  document.getElementById("qrText").textContent = did;
  document.getElementById("qrModal").style.display = "flex";
}

function hideQR() {
  document.getElementById("qrModal").style.display = "none";
}

function downloadQR() {
  const canvas = document.getElementById("qrCanvas");
  const link = document.createElement("a");
  link.download = "ngate-did-qr.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
  toast("📥 QR ถูกดาวน์โหลดแล้ว");
} 

