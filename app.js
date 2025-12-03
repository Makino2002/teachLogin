// Khi load trang, kiểm tra nếu đã đăng nhập
document.addEventListener("DOMContentLoaded", () => {
  const savedUser = localStorage.getItem("loggedInUser");
  if (savedUser) {
    showHome(savedUser);
  }
});

// // Elements
const loginBox = document.getElementById("login-box");
const registerBox = document.getElementById("register-box");
const homeBox = document.getElementById("home-box");
const displayUser = document.getElementById("displayUser");

/* ========= ĐĂNG KÝ ========= */
if (document.getElementById("registerBtn")) {
  document.getElementById("registerBtn").onclick = () => {
    const username = document.getElementById("reg-username").value.trim();
    const password = document.getElementById("reg-password").value.trim();

    if (!username || !password) {
      alert("Vui lòng nhập đủ!");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // kiểm tra trùng user
    if (users.some((u) => u.username === username)) {
      alert("Tên đăng nhập đã tồn tại!");
      return;
    }

    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công!");
    window.location.href = "login.html";
  };
}

/* ========= ĐĂNG NHẬP ========= */
if (document.getElementById("loginBtn")) {
  document.getElementById("loginBtn").onclick = () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const found = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!found) {
      alert("Sai tên đăng nhập hoặc mật khẩu!");
      return;
    }

    localStorage.setItem("loggedInUser", username);

    window.location.href = "home.html"; // chuyển sang trang home riêng
  };
}

/* ========= TRANG HOME ========= */
if (document.getElementById("displayUser")) {
  const user = localStorage.getItem("loggedInUser");

  // Nếu chưa đăng nhập → quay về login
  if (!user) {
    window.location.href = "login.html";
  }

  document.getElementById("displayUser").textContent = user;

  document.getElementById("logoutBtn").onclick = () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  };
}
