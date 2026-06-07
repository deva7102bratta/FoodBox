let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    if (!cart.length) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <h2>🛒 Your Cart is Empty</h2>
                <p>Add some products to continue shopping.</p>
            </div>
        `;

        cartTotal.textContent = "₹0";
        return;
    }

    let total = 0;

    cartItems.innerHTML = cart.map((item, index) => {
        total += item.priceNum * item.qty;

        return `
        <div class="cart-item">
            <div class="item-info">
                <div class="item-image">${item.emoji}</div>

                <div>
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">${item.price}</div>

                    <div class="qty-controls">
                        <button class="qty-btn"
                                onclick="changeQty(${index}, -1)">
                            −
                        </button>

                        <span>${item.qty}</span>

                        <button class="qty-btn"
                                onclick="changeQty(${index}, 1)">
                            +
                        </button>
                    </div>
                </div>
            </div>

            <button class="remove-btn"
                    onclick="removeItem(${index})">
                Remove
            </button>
        </div>
        `;
    }).join("");

    cartTotal.textContent =
        "₹" + total.toLocaleString("en-IN");
}

function changeQty(index, delta) {
    cart[index].qty += delta;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

document.addEventListener("DOMContentLoaded", renderCart);