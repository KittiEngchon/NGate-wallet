// kyc.js

async function fetchUserList() {
  try {
    const response = await fetch('user.json');
    if (!response.ok) throw new Error("โหลด user.json ไม่สำเร็จ");
    return await response.json();
  } catch (err) {
    console.error("❌ Error loading user.json:", err);
    toast("ไม่สามารถโหลดข้อมูลผู้ใช้ได้");
    return [];
  }
}

async function checkKYC(address) {
  const users = await fetchUserList();
  const user = users.find(u => u.wallet.toLowerCase() === address.toLowerCase());
  return user ? user.kyc === true : false;
}

async function getUserInfo(address) {
  const users = await fetchUserList();
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
      toast("🚫 ต้องผ่าน KYC ก่อนจึงใช้งานได้");
    }
  });
}

