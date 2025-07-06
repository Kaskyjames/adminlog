// Modal View
const viewButtons = document.querySelectorAll('.view-btn');
const modal = document.getElementById('shipmentModal');
const closeModal = modal.querySelector('.close-modal');

viewButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const row = btn.closest('tr');
    document.getElementById('modalTracking').textContent = row.cells[0].textContent;
    document.getElementById('modalCustomer').textContent = row.cells[1].textContent;
    document.getElementById('modalStatus').textContent = row.cells[2].textContent.trim();
    document.getElementById('modalDate').textContent = row.cells[3].textContent;
    modal.classList.add('active');
  });
});

closeModal.addEventListener('click', () => {
  modal.classList.remove('active');
});

window.addEventListener('click', e => {
  if(e.target === modal){
    modal.classList.remove('active');
  }
});



// Toggle sidebar for mobile
const toggleBtn = document.querySelector('.toggle-sidebar');
const sidebar = document.querySelector('.sidebar');

if(toggleBtn){
  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });
}

// Logout button
const logoutBtn = document.getElementById('logoutBtn');
if(logoutBtn){
  logoutBtn.addEventListener('click', () => {
    window.location.href = 'login.html';
  });
}



document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMessage = document.getElementById('errorMessage');

  // Replace with real authentication later
  if(username === "admin" && password === "password") {
    window.location.href = "index.html"; // Redirect to dashboard home
  } else {
    errorMessage.textContent = "Invalid username or password.";
  }
});
