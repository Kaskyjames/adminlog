// Add Shipment Modal
const addBtn = document.querySelector('.add-shipment-btn');
const addModal = document.getElementById('addShipmentModal');
const closeAddModal = addModal.querySelector('.close-add-modal');
const addForm = document.getElementById('addShipmentForm');
const shipmentsTable = document.querySelector('.shipments-table tbody');

// Open modal
addBtn.addEventListener('click', () => {
  addModal.classList.add('active');
});

// Close modal
closeAddModal.addEventListener('click', () => {
  addModal.classList.remove('active');
});

// Close on outside click
window.addEventListener('click', e => {
  if (e.target === addModal) {
    addModal.classList.remove('active');
  }
});

// Handle form submit
addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const tracking = document.getElementById('newTracking').value.trim();
  const customer = document.getElementById('newCustomer').value.trim();
  const status = document.getElementById('newStatus').value.trim();
  const date = document.getElementById('newDate').value;

  if (!tracking || !customer || !status || !date) {
    alert("Please fill all fields.");
    return;
  }

  // Create status badge
  let statusClass = "";
  if(status === "Pending") statusClass = "pending";
  if(status === "In Transit") statusClass = "in-transit";
  if(status === "Delivered") statusClass = "delivered";

  // Add row to table
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${tracking}</td>
    <td>${customer}</td>
    <td><span class="status ${statusClass}">${status}</span></td>
    <td>${date}</td>
    <td>
      <button class="view-btn">View</button>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </td>
  `;
  shipmentsTable.prepend(newRow);

  // Clear form and close
  addForm.reset();
  addModal.classList.remove('active');
});



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
