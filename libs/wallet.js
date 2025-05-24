// wallet.js

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("data/user.json");
    const user = await res.json();

    document.getElementById("walletAddress").textContent = user.address;
    document.getElementById("did").textContent = user.did;
    document.getElementById("gig").textContent = user.gig;
    document.getElementById("balanceDisplay").textContent = `$${user.balance.toFixed(2)}`;
    document.querySelector(".pnl").textContent = `PNL: ${user.pnl > 0 ? '+' : ''}${user.pnl}%`;
  } catch (err) {
    console.error("Load user failed:", err);
  }
});

function toast(msg) {
  const t = document.createElement("div");
  t.className = "toast";
  t.innerText = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}

function deposit() { toast("💰 Deposit clicked"); }
function withdraw() { toast("🏧 Withdraw clicked"); }
function showQR() { toast("🔳 QR Code shown"); }
function transfer() { toast("🔁 Transfer clicked"); }

async function connectWallet() {
  if (typeof window.ethereum === 'undefined') {
    toast("Metamask not found ❌");
    return;
  }

  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const address = accounts[0];
    toast("Wallet connected ✅");

    // อัปเดต DID/GIG แบบ Dynamic
    document.getElementById("walletAddress").textContent = address;
    document.getElementById("did").textContent = "did:ngate:" + address;
    document.getElementById("gig").textContent = "gig:connected";

    // เก็บไว้ใน localStorage ถ้าต้องการใช้ต่อ
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
