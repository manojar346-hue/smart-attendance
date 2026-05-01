const API = "https://your-render-backend.onrender.com/api";

// ---------------- Login ----------------
async function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let res = await fetch(API + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  let data = await res.json();
  alert(data.message || data.error);

  if (data.token) {
    localStorage.setItem("token", data.token);
    window.location.href = "dashboard.html";
  }
}

// ---------------- Register ----------------
async function registerUser() {
  let user = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    role: document.getElementById("role").value
  };

  let res = await fetch(API + "/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  let data = await res.json();
  alert(data.message);
}

// ---------------- Add Student ----------------
async function addStudent() {
  let student = {
    name: document.getElementById("sname").value,
    studentId: document.getElementById("sid").value,
    className: document.getElementById("sclass").value,
    faceId: document.getElementById("sface").value,
    qrCode: document.getElementById("sqrcode").value
  };

  let res = await fetch(API + "/students/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student)
  });

  let data = await res.json();
  alert(data.message);
}

// ---------------- Scan QR ----------------
async function scanQR() {
  let qrCode = document.getElementById("qrvalue").value;

  let res = await fetch(API + "/attendance/qr", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ qrCode })
  });

  let data = await res.json();
  document.getElementById("qrResult").innerHTML = data.message || data.error;
}

// ---------------- Face Recognition ----------------
async function captureFace() {
  let video = document.getElementById("camera");

  // Take picture
  let canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0);

  let blob = await new Promise(resolve => canvas.toBlob(resolve, "image/jpeg"));

  let buffer = await blob.arrayBuffer();

  let res = await fetch(API + "/attendance/face", {
    method: "POST",
    headers: { "Content-Type": "application/octet-stream" },
    body: buffer
  });

  let data = await res.json();
  document.getElementById("faceResult").innerHTML = data.message || data.error;
}

// Start Camera
navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
  document.getElementById("camera").srcObject = stream;
});
