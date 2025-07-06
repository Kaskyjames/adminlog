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
