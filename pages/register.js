function renderRegisterPage() {
   app.innerHTML = `
    <div class="register-container">
      <h2 class="register-title">Register</h2>

      <div class="form-group">
        <input id="name" class="form-input" placeholder="Name">
        <small id="nameErr" class="error"></small>
      </div>

      <div class="form-group">
        <input id="email" class="form-input" placeholder="Email">
        <small id="emailErr" class="error"></small>
      </div>

      <div class="form-group">
        <input id="password" type="password" class="form-input" placeholder="Password">
        <small id="passErr" class="error"></small>
      </div>

      <button id="registerBtn" class="register-btn">Register</button>
    </div>
  `;

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  name.oninput = () =>
    document.getElementById("nameErr").textContent =
      name.value.length < 3 ? "Min 3 characters" : "";

  email.oninput = () =>
    document.getElementById("emailErr").textContent =
      email.value.includes("@") ? "" : "Invalid email";

  password.oninput = () =>
    document.getElementById("passErr").textContent =
      password.value.length < 6 ? "Min 6 characters" : "";

  document.getElementById("registerBtn").onclick = () => {
    if (
      name.value.length >= 3 &&
      email.value.includes("@") &&
      password.value.length >= 6
    ) {
      localStorage.setItem("registered", "true");
      location.hash = "#/users";
    }
  };
}
