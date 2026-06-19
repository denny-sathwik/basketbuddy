// Utility Functions for Basket Buddy (Frontend-Only)

// ===== Local Storage Utilities =====
function getFromStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error('Error reading from storage:', error);
        return null;
    }
}

function setToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error('Error writing to storage:', error);
        return false;
    }
}

function removeFromStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Error removing from storage:', error);
        return false;
    }
}

// ===== User Management =====
function getCurrentUser() {
    return getFromStorage(STORAGE_KEYS.user);
}

function setCurrentUser(user) {
    return setToStorage(STORAGE_KEYS.user, user);
}

function removeCurrentUser() {
    return removeFromStorage(STORAGE_KEYS.user);
}

function isLoggedIn() {
    return !!getCurrentUser();
}

function logout() {
    removeCurrentUser();
    showToast('Logged out successfully', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// ===== Mock Data Access =====
function getCategories() {
    return MOCK_CATEGORIES;
}

function getProducts(filter = {}) {
    let products = [...MOCK_PRODUCTS];
    
    // Filter by category
    if (filter.category_id && filter.category_id !== 'all') {
        products = products.filter(p => p.category_id == filter.category_id);
    }
    
    // Filter by search query
    if (filter.search) {
        const query = filter.search.toLowerCase();
        products = products.filter(p => 
            p.name.toLowerCase().includes(query) ||
            p.brand.toLowerCase().includes(query) ||
            p.category_name.toLowerCase().includes(query)
        );
    }
    
    // Limit results
    if (filter.limit) {
        products = products.slice(0, filter.limit);
    }
    
    return products;
}

function getProductById(id) {
    return MOCK_PRODUCTS.find(p => p.id == id);
}

function getFeaturedProducts(limit = 12) {
    // Return products with high ratings
    return MOCK_PRODUCTS
        .filter(p => p.avg_rating >= 4.5)
        .slice(0, limit);
}

// ===== Cart Management =====
function getCart() {
    const cart = getFromStorage(STORAGE_KEYS.cart);
    return cart || [];
}

function saveCart(cart) {
    return setToStorage(STORAGE_KEYS.cart, cart);
}

function addToCart(productId, quantity = 1) {
    if (!isLoggedIn()) {
        showToast('Please login to add items to cart', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
        return false;
    }
    
    const product = getProductById(productId);
    if (!product) {
        showToast('Product not found', 'error');
        return false;
    }
    
    if (product.stock_quantity < quantity) {
        showToast('Insufficient stock', 'error');
        return false;
    }
    
    const cart = getCart();
    const existingItem = cart.find(item => item.product_id == productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            product_id: productId,
            name: product.name,
            price: product.price,
            quantity: quantity,
            image_url: null,
            unit: product.unit,
            brand: product.brand,
            stock: product.stock_quantity
        });
    }
    
    saveCart(cart);
    updateCartBadge();
    return true;
}

function updateCartItem(productId, quantity) {
    const cart = getCart();
    const item = cart.find(item => item.product_id == productId);
    
    if (item) {
        if (quantity <= 0) {
            return removeFromCart(productId);
        }
        item.quantity = quantity;
        saveCart(cart);
        updateCartBadge();
        return true;
    }
    return false;
}

function removeFromCart(productId) {
    const cart = getCart();
    const newCart = cart.filter(item => item.product_id != productId);
    saveCart(newCart);
    updateCartBadge();
    return true;
}

function clearCart() {
    saveCart([]);
    updateCartBadge();
    return true;
}

function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function getCartItemCount() {
    const cart = getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
}

// ===== Orders Management =====
function getOrders() {
    const orders = getFromStorage(STORAGE_KEYS.orders);
    return orders || [];
}

function saveOrder(order) {
    const orders = getOrders();
    orders.unshift(order); // Add to beginning
    return setToStorage(STORAGE_KEYS.orders, orders);
}

function createOrder(orderData) {
    const cart = getCart();
    if (cart.length === 0) {
        showToast('Cart is empty', 'error');
        return null;
    }
    
    const order = {
        id: Date.now(),
        order_number: `ORD${Date.now()}`,
        items: cart,
        total_amount: getCartTotal(),
        delivery_address: orderData.address,
        delivery_slot: orderData.slot,
        payment_method: orderData.payment_method,
        status: 'pending',
        created_at: new Date().toISOString()
    };
    
    saveOrder(order);
    clearCart();
    return order;
}

// ===== Toast Notification =====
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (!toast || !toastMessage) {
        console.log(`Toast: ${message}`);
        return;
    }
    
    toastMessage.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===== Cart Badge Update =====
function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (!badge) return;
    
    const count = getCartItemCount();
    badge.textContent = count;
    badge.style.display = count > 0 ? 'block' : 'none';
}

// ===== Format Utilities =====
function formatPrice(price) {
    return `₹${parseFloat(price).toFixed(2)}`;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// ===== Product Utilities =====
function getProductIcon(categoryName) {
    return PRODUCT_ICONS[categoryName] || PRODUCT_ICONS.default;
}

function getCategoryIcon(categoryId) {
    return CATEGORY_ICONS[categoryId] || 'fa-box';
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

function createStarRating(rating) {
    return generateStars(rating);
}

// ===== UI Utilities =====
function createProductCard(product) {
    const icon = getProductIcon(product.category_name);
    const rating = product.avg_rating || 0;
    const reviewCount = product.review_count || 0;
    
    return `
        <div class="product-card" onclick="viewProduct(${product.id})">
            ${product.stock_quantity < 10 ? '<div class="product-badge">Low Stock</div>' : ''}
            <div class="product-image">
                ${product.image_url ? `<img src="${product.image_url}" alt="${product.name}">` : icon}
            </div>
            <div class="product-info">
                <div class="product-brand">${product.brand || 'Generic'}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-unit">${product.unit || 'piece'}</div>
                ${rating > 0 ? `
                    <div class="product-rating">
                        <div class="stars">${generateStars(rating)}</div>
                        <span class="rating-count">(${reviewCount})</span>
                    </div>
                ` : ''}
                <div class="product-footer">
                    <div class="product-price">${formatPrice(product.price)}</div>
                    <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCartFromCard(${product.id})">
                        <i class="fas fa-cart-plus"></i>
                        Add
                    </button>
                </div>
            </div>
        </div>
    `;
}

function createCategoryCard(category) {
    const icon = getCategoryIcon(category.id);
    
    return `
        <div class="category-card" onclick="filterByCategory(${category.id})">
            <i class="fas ${icon}"></i>
            <h3>${category.name}</h3>
            <p>${category.description || ''}</p>
            <span class="product-count">${category.product_count || 0} products</span>
        </div>
    `;
}

// ===== Navigation Utilities =====
function viewProduct(productId) {
    // Use Quick View modal instead of navigating to non-existent page
    if (typeof openQuickView === 'function') {
        openQuickView(productId);
    } else {
        console.log('Quick View not available, product ID:', productId);
    }
}

function filterByCategory(categoryId) {
    window.location.href = `index.html#category-${categoryId}`;
    // Trigger filter on current page if already on index
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        if (typeof filterProducts === 'function') {
            filterProducts(categoryId);
        }
    }
}

function updateUserDisplay() {
    const user = getCurrentUser();
    const userNameDisplay = document.getElementById('userNameDisplay');
    const profileLink = document.getElementById('profileLink');
    
    if (userNameDisplay) {
        userNameDisplay.textContent = user ? (user.name?.split(' ')[0] || 'Profile') : 'Login';
    }
    
    if (profileLink) {
        if (isLoggedIn()) {
            profileLink.href = '#';
            profileLink.onclick = (e) => {
                e.preventDefault();
                showLogoutMenu(e);
            };
        } else {
            profileLink.href = 'login.html';
            profileLink.onclick = null;
        }
    }
}

// ===== Show Logout Menu =====
function showLogoutMenu(e) {
    // Remove existing menu if any
    const existingMenu = document.querySelector('.user-menu');
    if (existingMenu) {
        existingMenu.remove();
        return;
    }
    
    const user = getCurrentUser();
    const menu = document.createElement('div');
    menu.className = 'user-menu';
    menu.innerHTML = `
        <div class="user-menu-header">
            <i class="fas fa-user-circle"></i>
            <div>
                <strong>${user.name || 'User'}</strong>
                <p>${user.email || ''}</p>
            </div>
        </div>
        <div class="user-menu-divider"></div>
        <button class="user-menu-item" onclick="logout()">
            <i class="fas fa-sign-out-alt"></i>
            Logout
        </button>
    `;
    
    document.body.appendChild(menu);
    
    // Position menu
    const rect = e.target.closest('.nav-link').getBoundingClientRect();
    menu.style.top = (rect.bottom + 10) + 'px';
    menu.style.right = '20px';
    
    // Close menu when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function closeMenu(e) {
            if (!menu.contains(e.target) && !e.target.closest('#profileLink')) {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }
        });
    }, 100);
}

// ===== Validation Utilities =====
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function validatePhone(phone) {
    const re = /^[6-9]\d{9}$/;
    return re.test(phone);
}

// ===== Search Utilities =====
let searchTimeout;
function debounceSearch(callback, delay = 500) {
    return function(...args) {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => callback.apply(this, args), delay);
    };
}

// ===== Global Add to Cart Handler =====
function addToCartFromCard(productId) {
    const success = addToCart(productId, 1);
    if (success) {
        showToast('Item added to cart!', 'success');
    }
}

// ===== Initialize Common Features =====
document.addEventListener('DOMContentLoaded', () => {
    // Update cart badge
    updateCartBadge();
    
    // Update user display
    updateUserDisplay();
    
    // Setup search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounceSearch((e) => {
            const query = e.target.value.trim();
            if (query.length >= 2) {
                console.log('Searching for:', query);
                // Could implement live search suggestions here
            }
        }));
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = e.target.value.trim();
                if (query) {
                    window.location.href = `index.html?search=${encodeURIComponent(query)}`;
                }
            }
        });
    }
    
    // Setup search button
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `index.html?search=${encodeURIComponent(query)}`;
            }
        });
    }
});

// ===== Error Handling =====
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    showToast('An error occurred. Please try again.', 'error');
});

// Made with Bob
