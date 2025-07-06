// References
const addBtn = document.querySelector('.add-shipment-btn');
const addModal = document.getElementById('addShipmentModal');
const closeAddModal = addModal.querySelector('.close-add-modal');
const addForm = document.getElementById('addShipmentForm');
const shipmentsTable = document.querySelector('.shipments-table tbody');

const editModal = document.getElementById('editShipmentModal');
const closeEditModal = editModal.querySelector('.close-edit-modal');
const editForm = document.getElementById('editShipmentForm');

const modal = document.getElementById('shipmentModal');
const closeModal = modal.querySelector('.close-modal');

let currentEditRow = null;
let shipments = [];

// Load from localStorage
function loadShipments() {
  const stored = localStorage.getItem('shipments');
  if (stored) {
    shipments = JSON.parse(stored);
    shipments.forEach(s => renderRow(s));
  }
}

// Save to localStorage
function saveShipments() {
  localStorage.setItem('shipments', JSON.stringify(shipments));
}

// Render a row
function renderRow(shipment, prepend = false) {
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${shipment.tracking}</td>
    <td>${shipment.customer}</td>
    <td><span class="status ${shipment.statusClass}">${shipment.status}</span></td>
    <td>${shipment.date}</td>
    <td>
      <button class="view-btn">View</button>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </td>
  `;
  if (prepend) {
    shipmentsTable.prepend(newRow);
  } else {
    shipmentsTable.appendChild(newRow);
  }
}

// Get status badge class
function getStatusClass(status) {
  if (status === "Pending") return "pending";
  if (status === "In Transit") return "in-transit";
  if (status === "Delivered") return "delivered";
  return "";
}

// Open Add Modal
addBtn.addEventListener('click', () => {
  addModal.classList.add('active');
});

// Close Add Modal
closeAddModal.addEventListener('click', () => {
  addModal.classList.remove('active');
});

// Close Edit Modal
closeEditModal.addEventListener('click', () => {
  editModal.classList.remove('active');
});

// Close View Modal
closeModal.addEventListener('click', () => {
  modal.classList.remove('active');
});

// Close Modals on outside click
window.addEventListener('click', e => {
  if (e.target === addModal) addModal.classList.remove('active');
  if (e.target === editModal) editModal.classList.remove('active');
  if (e.target === modal) modal.classList.remove('active');
});

// Handle Add Form Submit
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

  const statusClass = getStatusClass(status);
  const shipment = { tracking, customer, status, statusClass, date };

  shipments.unshift(shipment);
  saveShipments();
  renderRow(shipment, true);

  addForm.reset();
  addModal.classList.remove('active');
});

// Handle Table Buttons
shipmentsTable.addEventListener('click', (e) => {
  const row = e.target.closest('tr');
  const cells = row.querySelectorAll('td');
  const tracking = cells[0].textContent.trim();

  if (e.target.classList.contains('edit-btn')) {
    currentEditRow = row;

    document.getElementById('editTracking').value = tracking;
    document.getElementById('editCustomer').value = cells[1].textContent.trim();
    document.getElementById('editStatus').value = cells[2].querySelector('.status').textContent.trim();
    document.getElementById('editDate').value = cells[3].textContent.trim();

    editModal.classList.add('active');
  }

  if (e.target.classList.contains('delete-btn')) {
    if (confirm(`Are you sure you want to delete shipment "${tracking}"?`)) {
      shipments = shipments.filter(s => s.tracking !== tracking);
      saveShipments();
      row.remove();
    }
  }

  if (e.target.classList.contains('view-btn')) {
    document.getElementById('modalTracking').textContent = tracking;
    document.getElementById('modalCustomer').textContent = cells[1].textContent.trim();
    document.getElementById('modalStatus').textContent = cells[2].querySelector('.status').textContent.trim();
    document.getElementById('modalDate').textContent = cells[3].textContent.trim();
    modal.classList.add('active');
  }
});

// Handle Edit Form Submit
editForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!currentEditRow) return;

  const tracking = document.getElementById('editTracking').value.trim();
  const customer = document.getElementById('editCustomer').value.trim();
  const status = document.getElementById('editStatus').value.trim();
  const date = document.getElementById('editDate').value;

  const statusClass = getStatusClass(status);

  // Update local array
  const index = shipments.findIndex(s => s.tracking === currentEditRow.querySelector('td').textContent.trim());
  if (index !== -1) {
    shipments[index] = { tracking, customer, status, statusClass, date };
    saveShipments();
  }

  // Update table
  const cells = currentEditRow.querySelectorAll('td');
  cells[0].textContent = tracking;
  cells[1].textContent = customer;
  cells[2].innerHTML = `<span class="status ${statusClass}">${status}</span>`;
  cells[3].textContent = date;

  editForm.reset();
  editModal.classList.remove('active');
});

// Toggle sidebar
const toggleBtn = document.querySelector('.toggle-sidebar');
const sidebar = document.querySelector('.sidebar');
if(toggleBtn){
  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });
}

// Logout
const logoutBtn = document.getElementById('logoutBtn');
if(logoutBtn){
  logoutBtn.addEventListener('click', () => {
    window.location.href = 'login.html';
  });
}

// Login Form
const loginForm = document.getElementById('loginForm');
if(loginForm){
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('errorMessage');

    if(username === "admin" && password === "password") {
      window.location.href = "index.html";
    } else {
      errorMessage.textContent = "Invalid username or password.";
    }
  });
}

// Initialize
loadShipments();
