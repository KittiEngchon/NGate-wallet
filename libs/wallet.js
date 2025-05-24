let isConnecting = false;

/**
 * เชื่อมต่อกับ MetaMask
 * @returns {Promise<string|null>} address ของ wallet หรือ null ถ้าเชื่อมต่อไม่สำเร็จ
 */
export async function connectWallet() {
  if (typeof window.ethereum === "undefined") {
    alert("กรุณาติดตั้ง MetaMask ก่อน");
    return null;
  }

  if (isConnecting) {
    console.log("กำลังเชื่อมต่อ MetaMask อยู่...");
    return null;
  }

  isConnecting = true;

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    isConnecting = false;
    return accounts[0]; // คืนค่า address
  } catch (err) {
    isConnecting = false;

    if (err.code === -32002) {
      alert("กรุณาเปิด MetaMask และอนุมัติคำขอที่ค้างอยู่");
    } else {
      console.error("เกิดข้อผิดพลาดในการเชื่อมต่อ MetaMask:", err);
    }

    return null;
  }
}

/**
 * ตรวจสอบว่า wallet เชื่อมอยู่หรือไม่
 * @returns {Promise<string|null>} address ถ้าเชื่อมอยู่ หรือ null ถ้ายังไม่ได้เชื่อม
 */
export async function checkWalletConnected() {
  if (typeof window.ethereum === "undefined") return null;

  try {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    return accounts.length > 0 ? accounts[0] : null;
  } catch (err) {
    console.error("ไม่สามารถตรวจสอบ wallet ได้:", err);
    return null;
  }
}

/**
 * ติดตาม event การเปลี่ยนบัญชี
 * @param {(address: string|null) => void} callback
 */
export function onWalletChanged(callback) {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      callback(accounts.length > 0 ? accounts[0] : null);
    });
  }
}

/**
 * ติดตาม event การเปลี่ยน network
 * @param {(chainId: string) => void} callback
 */
export function onChainChanged(callback) {
  if (window.ethereum) {
    window.ethereum.on("chainChanged", (chainId) => {
      callback(chainId);
    });
  }
}


