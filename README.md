did-wallet-dashboard/
├── index.html                ← หน้า Dashboard หลัก
├── style.css                 ← ไฟล์ตกแต่ง UI
├── /assets/                  ← รวมไฟล์ภาพ ไอคอน โลโก้
│   ├── logo.png              ← โลโก้ NFT วงกลม
│   └── icons/                ← ไอคอนปุ่ม Deposit, Withdraw ฯลฯ
├── /libs/                    ← สคริปต์ JS แยกตามหน้าที่
│   ├── wallet.js             ← ฟังก์ชันเชื่อม Wallet, โหลด DID
│   ├── ui.js                 ← Toast, Modal, Badge แจ้งเตือน
│   ├── balance.js            ← โหลดยอดเงิน PNL, อัปเดต assets
│   └── kyc.js                ← ดึงข้อมูล DID จาก KYC / GIG จาก Social API
├── /data/                    ← ข้อมูลจำลอง (ถ้ามี)
│   ├── assets.json           ← ข้อมูลเหรียญและยอดคงเหลือ
│   └── user.json             ← DID / GIG (mock)
└── README.md                 ← คำอธิบายโปรเจกต์
