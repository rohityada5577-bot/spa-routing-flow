// function renderUsersPage() {
//   const perPage = 4;
//   let users = [];
//   let currentPage = 1;

//   app.innerHTML = `
//     <h2>User Directory</h2>
//     <input id="search" placeholder="Search users" style="margin-bottom: 15px; padding: 8px; width: 300px;">

//     <div class="grid" id="grid"></div>

//     <div class="pagination" id="pagination">
//       <button id="prev">Previous</button>
//       <!-- page buttons inserted here dynamically -->
//       <button id="next">Next</button>
//     </div>
//   `;

//   const grid = document.getElementById("grid");
//   const searchInput = document.getElementById("search");
//   const pagination = document.getElementById("pagination");
//   const prevBtn = document.getElementById("prev");
//   const nextBtn = document.getElementById("next");

//   // Fetch users
//   fetch("https://jsonplaceholder.typicode.com/users")
//     .then(res => res.json())
//     .then(data => {
//       users = data;
//       render();
//       setupPagination();
//     });

//   // Filter and paginate users
//   function filteredUsers() {
//     const searchTerm = searchInput.value.toLowerCase();
//     return users.filter(u => u.name.toLowerCase().includes(searchTerm));
//   }

//   // Render cards on current page
//   function render() {
//     grid.innerHTML = "";

//     const filtered = filteredUsers();
//     const start = (currentPage - 1) * perPage;
//     const pageUsers = filtered.slice(start, start + perPage);

//     if (pageUsers.length === 0 && currentPage > 1) {
//       currentPage--;
//       render();
//       updatePaginationButtons();
//       return;
//     }

//     pageUsers.forEach(u => {
//       grid.innerHTML += `
//         <div class="card">
//           <img src="https://via.placeholder.com/280x150?text=User" alt="User photo" />
//           <h4>${u.name}</h4>
//           <p>${u.email}</p>
//         </div>
//       `;
//     });

//     updatePaginationButtons();
//   }

//   // Create page number buttons dynamically
//   function setupPagination() {
//     const filtered = filteredUsers();
//     const totalPages = Math.ceil(filtered.length / perPage);

//     // Remove existing page number buttons (except prev and next)
//     [...pagination.querySelectorAll(".page-num")].forEach(btn => btn.remove());

//     for (let i = 1; i <= totalPages; i++) {
//       const btn = document.createElement("button");
//       btn.textContent = i;
//       btn.classList.add("page-num");
//       if (i === currentPage) btn.classList.add("active");

//       btn.onclick = () => {
//         currentPage = i;
//         render();
//       };

//       pagination.insertBefore(btn, nextBtn);
//     }

//     updatePaginationButtons();
//   }

//   // Update disabled state & active classes
//   function updatePaginationButtons() {
//     const filtered = filteredUsers();
//     const totalPages = Math.ceil(filtered.length / perPage);

//     prevBtn.disabled = currentPage === 1;
//     nextBtn.disabled = currentPage === totalPages || totalPages === 0;

//     pagination.querySelectorAll(".page-num").forEach(btn => {
//       btn.classList.toggle("active", Number(btn.textContent) === currentPage);
//     });
//   }

//   // Pagination controls
//   prevBtn.onclick = () => {
//     if (currentPage > 1) {
//       currentPage--;
//       render();
//     }
//   };

//   nextBtn.onclick = () => {
//     const filtered = filteredUsers();
//     const totalPages = Math.ceil(filtered.length / perPage);
//     if (currentPage < totalPages) {
//       currentPage++;
//       render();
//     }
//   };

//   // Search input event
//   searchInput.oninput = () => {
//     currentPage = 1; // reset page on search
//     setupPagination();
//     render();
//   };
// }
function renderUsersPage() {
  const perPage = 4;
  let users = [];
  let currentPage = 1;

  app.innerHTML = `
    <div class="container-search">
   
    <input id="search" class="search-box" placeholder="Search users" />

    <div class="grid" id="grid"></div>

    <div class="pagination" id="pagination">
        <button id="prev" class="page-btn">Previous</button>
        <!-- page buttons inserted here dynamically -->
        <button id="next" class="page-btn">Next</button>
    </div>
</div>
  `;

  const grid = document.getElementById("grid");
  const searchInput = document.getElementById("search");
  const pagination = document.getElementById("pagination");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  // Fetch users
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(data => {
      users = data;
      render();
      setupPagination();
    });

  // Filter and paginate users
  function filteredUsers() {
    const searchTerm = searchInput.value.toLowerCase();
    return users.filter(u => u.name.toLowerCase().includes(searchTerm));
  }

  // Render cards on current page
  function render() {
    grid.innerHTML = "";

    const filtered = filteredUsers();
    const start = (currentPage - 1) * perPage;
    const pageUsers = filtered.slice(start, start + perPage);

    if (pageUsers.length === 0 && currentPage > 1) {
      currentPage--;
      render();
      updatePaginationButtons();
      return;
    }

    pageUsers.forEach((u, index) => {
      grid.innerHTML += `
        <div class="card" id="card-${index}" onclick="redirectToAccordion(${index})">
          <img src="pages/usericon.png" alt="User photo" />
          <h4>${u.name}</h4>
          <p>${u.email}</p>
        </div>
      `;
    });

    updatePaginationButtons();
  }

  // Redirect to accordion page
  function redirectToAccordion(userId) {
    // Storing user data in localStorage (or another storage method)
    localStorage.setItem("currentUserId", userId);

    // Redirect to accordion page
    location.hash = `#/accordion/${userId}`;
  }

  // Create page number buttons dynamically
  function setupPagination() {
    const filtered = filteredUsers();
    const totalPages = Math.ceil(filtered.length / perPage);

    // Remove existing page number buttons (except prev and next)
    [...pagination.querySelectorAll(".page-num")].forEach(btn => btn.remove());

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.className = "page-num";
      btn.textContent = i;
      if (i === currentPage) btn.classList.add("active");

      btn.onclick = () => {
        currentPage = i;
        render();
      };

      pagination.insertBefore(btn, nextBtn);
    }

    updatePaginationButtons();
  }

  // Update disabled state & active classes
  function updatePaginationButtons() {
    const filtered = filteredUsers();
    const totalPages = Math.ceil(filtered.length / perPage);

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;

    pagination.querySelectorAll(".page-num").forEach(btn => {
      btn.classList.toggle("active", Number(btn.textContent) === currentPage);
    });
  }

  // Pagination controls
  prevBtn.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      render();
    }
  };

  nextBtn.onclick = () => {
    const filtered = filteredUsers();
    const totalPages = Math.ceil(filtered.length / perPage);
    if (currentPage < totalPages) {
      currentPage++;
      render();
    }
  };

  // Search input event
  searchInput.oninput = () => {
    currentPage = 1; // reset page on search
    setupPagination();
    render();
  };
}







