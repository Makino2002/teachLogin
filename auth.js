if (document.getElementById("registerBtn")) {
  document.getElementById("registerBtn").onclick = () => {
    const username = document.getElementById("reg-username").value.trim();
    const password = document.getElementById("reg-password").value.trim();

    if (!username || !password) {
      alert("Vui lòng nhập đủ!");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

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

    window.location.href = "index.html";
  };
}

if (document.getElementById("displayUser")) {
  const user = localStorage.getItem("loggedInUser");

  if (!user) {
    window.location.href = "login.html";
  }

  document.getElementById("displayUser").textContent = user;

  document.getElementById("logoutBtn").onclick = () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  };
}
