// wallet.js

document.addEventListener("DOMContentLoaded", () => {
  // Mock data
  document.getElementById("walletAddress").textContent = "0xfa28...229E";
  document.getElementById("did").textContent = "did:ngate:0xfa28229e";
  document.getElementById("gig").textContent = "gig:facebook:john.doe";
});

function deposit() {
  alert("Deposit clicked");
}

function withdraw() {
  alert("Withdraw clicked");
}

function showQR() {
  alert("Show QR clicked");
}

function transfer() {
  alert("Transfer clicked");
}

