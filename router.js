function router() {
  const route = location.hash || "#/register";

  if (route.startsWith("#/accordion/")) {
    const userId = route.split("/")[2];
    renderAccordionPage(userId);
  } else if (route === "#/users") {
    renderUsersPage();
  } else {
    renderRegisterPage();
  }

  setupNavbar(); // to apply the theme toggle
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);

function setupNavbar() {
  const themeToggle = document.getElementById("theme-toggle");

  // Check for stored theme preference
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.innerHTML = "<i class='fas fa-sun'></i>"; // Sun icon for light mode
  } else {
    document.body.classList.remove("dark");
    themeToggle.innerHTML = "<i class='fas fa-moon'></i>"; // Moon icon for dark mode
  }

  themeToggle.onclick = () => {
    if (document.body.classList.contains("dark")) {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
      themeToggle.innerHTML = "<i class='fas fa-moon'></i>"; // Moon icon for dark mode
    } else {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
      themeToggle.innerHTML = "<i class='fas fa-sun'></i>"; // Sun icon for light mode
    }
  };
}


