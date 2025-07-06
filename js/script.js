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
