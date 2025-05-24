// ui.js

function toast(message, duration = 3000) {
  const t = document.createElement("div");
  t.className = "toast";
  t.innerText = message;
  document.body.appendChild(t);

  setTimeout(() => t.classList.add("show"), 10);
  setTimeout(() => {
    t.classList.remove("show");
    setTimeout(() => t.remove(), 300);
  }, duration);
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
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
}

function loadTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    document.body.classList.add("dark");
  }
}
function toggleTheme() {
  document.body.classList.toggle('dark');
  showToast(document.body.classList.contains('dark') ? '🌙 Dark Mode' : '☀️ Light Mode');
}

function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerText = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
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
  link.download = "did-qr.png";
  link.href = canvas.toDataURL();
  link.click();
}


document.addEventListener("DOMContentLoaded", loadTheme);
