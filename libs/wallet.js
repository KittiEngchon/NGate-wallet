// wallet.js

async function connectWallet() {
  if (typeof window.ethereum === 'undefined') {
    toast("Metamask not found ❌");
    throw new Error("No wallet found");
  }

  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const address = accounts[0];
    toast("Wallet connected ✅");

    // อัปเดตข้อมูลลงหน้าเว็บ
    document.getElementById("walletAddress").textContent = address;
    document.getElementById("did").textContent = "did:ngate:" + address;
    document.getElementById("gig").textContent = "gig:connected";

    // เก็บใน localStorage
    localStorage.setItem("wallet", address);
    return address;

  } catch (err) {
    console.error(err);
    toast("Connection failed ❌");
    throw err;
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


