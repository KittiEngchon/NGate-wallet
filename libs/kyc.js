// kyc.js

async function checkKYC(address) {
  const response = await fetch('user.json');
  const users = await response.json();

  const user = users.find(u => u.wallet.toLowerCase() === address.toLowerCase());
  return user ? user.kyc === true : false;
}

async function getUserInfo(address) {
  const response = await fetch('user.json');
  const users = await response.json();

  return users.find(u => u.wallet.toLowerCase() === address.toLowerCase()) || null;
}

function requireKYC(callback) {
  const address = localStorage.getItem("wallet");
  if (!address) {
    toast("🛑 ยังไม่ได้เชื่อม Wallet");
    return;
  }

  checkKYC(address).then(verified => {
    if (verified) {
      callback();
    } else {
      toast("🚫 ต้องผ่าน KYC ก่อน");
    }
  });
}
