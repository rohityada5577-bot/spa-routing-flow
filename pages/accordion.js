function renderAccordionPage(userId) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users[userId];

  if (!user) {
    app.innerHTML = "<h2>User not found!</h2>";
    return;
  }

  app.innerHTML = `
    <h2>${user.name}</h2>
    <img src="https://via.placeholder.com/280x150?text=User" />
    <p>Email: ${user.email}</p>
    <p>Phone: ${user.phone}</p>
    <p>Website: ${user.website}</p>

    <button class="accordion-header">More Details</button>
    <div class="accordion-content" style="display:none;">
      <p>Address: ${user.address.street}, ${user.address.city}</p>
    </div>
  `;

  const accordionHeader = document.querySelector(".accordion-header");
  const accordionContent = document.querySelector(".accordion-content");

  accordionHeader.onclick = function() {
    accordionContent.style.display = accordionContent.style.display === "block" ? "none" : "block";
  };
}

function getUserIdFromHash() {
  const hash = location.hash.split('/');
  return hash[hash.length - 1];
}

window.addEventListener("load", () => {
  const userId = getUserIdFromHash();
  renderAccordionPage(userId);
});
