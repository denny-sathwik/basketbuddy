// Cart Page JavaScript for Basket Buddy (Frontend-Only)

let cartItems = [];

// ===== Initialize Cart Page =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('Cart Page Loaded');
    
    // Check if user is logged in
    if (!isLoggedIn()) {
        showToast('Please login to view your cart', 'info');
        setTimeout(() => {
            window.location.href = 'login.html?redirect=cart.html';
        }, 1500);
        return;
    }
    
    // Load cart items
    loadCartItems();
});

// ===== Load Cart Items =====
function loadCartItems() {
    cartItems = getCart();
    
    if (cartItems.length === 0) {
        showEmptyCart();
    } else {
        showCartContent();
        renderCartItems();
        updateCartSummary();
    }
}

// ===== Show Empty Cart State =====
function showEmptyCart() {
    document.getElementById('emptyCart').style.display = 'flex';
    document.getElementById('cartContent').style.display = 'none';
}

// ===== Show Cart Content =====
function showCartContent() {
    document.getElementById('emptyCart').style.display = 'none';
    document.getElementById('cartContent').style.display = 'block';
}

// ===== Render Cart Items =====
function renderCartItems() {
    const cartItemsList = document.getElementById('cartItemsList');
    const itemCount = document.getElementById('itemCount');
    
    itemCount.textContent = cartItems.length;
    
    cartItemsList.innerHTML = cartItems.map(item => {
        const product = getProductById(item.product_id);
        const icon = product ? getProductIcon(product.category_name) : '📦';
        const itemTotal = item.price * item.quantity;
        
        return `
            <div class="cart-item" data-product-id="${item.product_id}">
                <div class="cart-item-image">
                    ${item.image_url ? `<img src="${item.image_url}" alt="${item.name}">` : icon}
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="cart-item-brand">${item.brand || 'Generic'}</p>
                    <p class="cart-item-unit">${item.unit || 'piece'}</p>
                    <p class="cart-item-price">${formatPrice(item.price)} each</p>
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="updateQuantity(${item.product_id}, ${item.quantity - 1})">
                            <i class="fas fa-minus"></i>
                        </button>
                        <input type="number" value="${item.quantity}" min="1" max="${item.stock || 99}" 
                               onchange="updateQuantity(${item.product_id}, this.value)" class="qty-input">
                        <button class="qty-btn" onclick="updateQuantity(${item.product_id}, ${item.quantity + 1})">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <div class="cart-item-total">
                        <strong>${formatPrice(itemTotal)}</strong>
                    </div>
                    <button class="btn-remove" onclick="removeItem(${item.product_id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// ===== Update Quantity =====
function updateQuantity(productId, newQuantity) {
    newQuantity = parseInt(newQuantity);
    
    if (isNaN(newQuantity) || newQuantity < 1) {
        showToast('Invalid quantity', 'error');
        return;
    }
    
    const product = getProductById(productId);
    if (product && newQuantity > product.stock_quantity) {
        showToast(`Only ${product.stock_quantity} items available`, 'error');
        return;
    }
    
    const success = updateCartItem(productId, newQuantity);
    if (success) {
        loadCartItems();
        showToast('Quantity updated', 'success');
    }
}

// ===== Remove Item =====
function removeItem(productId) {
    if (confirm('Remove this item from cart?')) {
        const success = removeFromCart(productId);
        if (success) {
            loadCartItems();
            showToast('Item removed from cart', 'success');
        }
    }
}

// ===== Clear Cart =====
function clearCartConfirm() {
    if (confirm('Are you sure you want to clear your cart?')) {
        clearCart();
        loadCartItems();
        showToast('Cart cleared', 'success');
    }
}

// ===== Update Cart Summary =====
function updateCartSummary() {
    const subtotal = getCartTotal();
    const deliveryFee = subtotal >= 500 ? 0 : 40;
    const discount = 0; // Can be calculated based on promo code
    const total = subtotal + deliveryFee - discount;
    
    document.getElementById('subtotal').textContent = formatPrice(subtotal);
    document.getElementById('deliveryFee').textContent = deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee);
    document.getElementById('discount').textContent = formatPrice(discount);
    document.getElementById('total').textContent = formatPrice(total);
}

// ===== Apply Promo Code =====
function applyPromoCode() {
    const promoCode = document.getElementById('promoCode').value.trim().toUpperCase();
    
    if (!promoCode) {
        showToast('Please enter a promo code', 'error');
        return;
    }
    
    // Demo promo codes
    const promoCodes = {
        'SAVE10': 10,
        'FIRST50': 50,
        'WELCOME': 25
    };
    
    if (promoCodes[promoCode]) {
        showToast(`Promo code applied! ₹${promoCodes[promoCode]} discount`, 'success');
        // In a real app, this would update the discount in the summary
    } else {
        showToast('Invalid promo code', 'error');
    }
}

// ===== Proceed to Checkout =====
function proceedToCheckout() {
    if (cartItems.length === 0) {
        showToast('Your cart is empty', 'error');
        return;
    }
    
    showToast('Checkout feature - Demo only', 'info');
    // In a real app, this would redirect to checkout page
    // window.location.href = 'checkout.html';
}

// Made with Bob