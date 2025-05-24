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

