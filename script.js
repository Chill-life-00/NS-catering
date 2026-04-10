let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save cart
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add item
function addToCart(name) {
  cart.push({ name });
  saveCart();
  updateCartCount();
  alert(name + " added");
}

// Update cart count
function updateCartCount() {
  let count = document.getElementById("cartCount");
  if (count) count.innerText = cart.length;
}

// Go to cart
function goToCart() {
  window.location.href = "cart.html";
}

// Render cart
function renderCart() {
  let list = document.getElementById("cartItems");
  if (!list) return;

  list.innerHTML = "";

  cart.forEach((item, i) => {
    let li = document.createElement("li");
    li.innerHTML = `
      ${item.name}
      <button onclick="removeItem(${i})">❌</button>
    `;
    list.appendChild(li);
  });
}

// Remove item
function removeItem(i) {
  cart.splice(i, 1);
  saveCart();
  renderCart();
  updateCartCount();
}

// Clear cart
function clearCart() {
  cart = [];
  saveCart();
  renderCart();
  updateCartCount();
}

// 📲 SEND FULL INQUIRY
function sendOrder() {
  let date = document.getElementById("eventDate").value;
  let guests = document.getElementById("guests").value;
  let location = document.getElementById("location").value;
  let notes = document.getElementById("notes").value;

  if (!date || !guests || !location) {
    alert("Please fill all required details!");
    return;
  }

  if (cart.length === 0) {
    alert("Please select menu items!");
    return;
  }

  let phone = "919999999999";

  let msg = "🍽️ Catering Inquiry\n\n";

  msg += `📅 Date: ${date}\n`;
  msg += `👥 Guests: ${guests}\n`;
  msg += `📍 Location: ${location}\n\n`;

  msg += "🛒 Selected Menu:\n";

  cart.forEach(item => {
    msg += `• ${item.name}\n`;
  });

  if (notes) {
    msg += `\n📝 Notes: ${notes}`;
  }

  msg += "\n\nPlease share quotation.";

  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`);
}

// Load
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCart();
});