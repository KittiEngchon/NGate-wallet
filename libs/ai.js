// libs/ai.js

async function loadTrustScore(appId) {
  const el = document.getElementById('trust-score');
  if (!el) return;

  try {
    const res = await fetch(`data/scores/${appId}.json`);
    if (!res.ok) throw new Error('ไม่พบข้อมูล Trust Score');
    const data = await res.json();

    // ตัวอย่างข้อมูล: { "score": 85, "level": "สูง", "verified": true }
    el.innerHTML = `
      ระดับ: <strong>${data.level}</strong><br>
      คะแนนความน่าเชื่อถือ: <strong>${data.score}%</strong><br>
      ${data.verified ? "✅ ผ่านการยืนยันจาก AI" : "⚠️ ยังไม่ยืนยัน"}
    `;
  } catch (err) {
    el.innerText = "❌ ไม่สามารถโหลด Trust Score ได้";
    console.error(err);
  }
}

// อ่าน app id จาก URL และเรียกใช้
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const appId = params.get("id");
  if (appId) loadTrustScore(appId);
});
