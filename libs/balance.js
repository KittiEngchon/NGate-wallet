async function getBalance(address, asset) {
  if (!window.ethereum) {
    toast("Metamask ไม่พร้อมใช้งาน ❌");
    return 0;
  }

  const web3 = new Web3(window.ethereum);

  try {
    if (asset.type === 'coin') {
      const balance = await web3.eth.getBalance(address);
      return web3.utils.fromWei(balance, 'ether');

    } else if (asset.type === 'token') {
      const abi = [
        {
          constant: true,
          inputs: [{ name: "_owner", type: "address" }],
          name: "balanceOf",
          outputs: [{ name: "balance", type: "uint256" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "decimals",
          outputs: [{ name: "", type: "uint8" }],
          type: "function",
        }
      ];

      const contract = new web3.eth.Contract(abi, asset.contract);
      const rawBalance = await contract.methods.balanceOf(address).call();
      const decimals = await contract.methods.decimals().call();
      return rawBalance / Math.pow(10, decimals);
    }
  } catch (err) {
    console.error("❌ ไม่สามารถดึงยอดได้:", err);
    toast("เกิดข้อผิดพลาดในการดึงยอด");
    return 0;
  }

  return 0;
}

