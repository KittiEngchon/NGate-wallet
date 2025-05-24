function showToast(message, duration = 3000) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerText = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

function showModal(title, content) {
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";

  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <h2>${title}</h2>
    <div class="modal-content">${content}</div>
    <button onclick="this.closest('.modal-overlay').remove()">ปิด</button>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

function toggleTheme() {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  showToast(isDark ? "🌙 Dark Mode" : "☀️ Light Mode");
}

function loadTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    document.body.classList.add("dark");
  }
}

function showQR(text) {
  const canvas = document.getElementById("qr-canvas");
  if (!canvas) return;
  const qr = new QRious({
    element: canvas,
    value: text,
    size: 200,
  });
}

function saveQR() {
  const canvas = document.getElementById("qr-canvas");
  if (!canvas) return;
  const link = document.createElement("a");
  link.download = "qr-code.png";
  link.href = canvas.toDataURL();
  link.click();
}

document.addEventListener("DOMContentLoaded", loadTheme);

