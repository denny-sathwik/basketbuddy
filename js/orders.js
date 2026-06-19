// Orders Page JavaScript for Basket Buddy (Frontend-Only)

let allOrders = [];
let currentFilter = 'all';

// ===== Initialize Orders Page =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('Orders Page Loaded');
    
    // Check if user is logged in
    if (!isLoggedIn()) {
        showLoginRequired();
        return;
    }
    
    // Load orders
    loadOrders();
    
    // Setup filter buttons
    setupFilterButtons();
});

// ===== Show Login Required State =====
function showLoginRequired() {
    document.getElementById('loginRequired').style.display = 'flex';
    document.getElementById('emptyOrders').style.display = 'none';
    document.getElementById('ordersContent').style.display = 'none';
}

// ===== Load Orders =====
function loadOrders() {
    allOrders = getOrders();
    
    if (allOrders.length === 0) {
        showEmptyOrders();
    } else {
        showOrdersContent();
        renderOrders(allOrders);
    }
}

// ===== Show Empty Orders State =====
function showEmptyOrders() {
    document.getElementById('loginRequired').style.display = 'none';
    document.getElementById('emptyOrders').style.display = 'flex';
    document.getElementById('ordersContent').style.display = 'none';
}

// ===== Show Orders Content =====
function showOrdersContent() {
    document.getElementById('loginRequired').style.display = 'none';
    document.getElementById('emptyOrders').style.display = 'none';
    document.getElementById('ordersContent').style.display = 'block';
}

// ===== Render Orders =====
function renderOrders(orders) {
    const ordersList = document.getElementById('ordersList');
    
    if (orders.length === 0) {
        ordersList.innerHTML = '<p class="text-center">No orders found</p>';
        return;
    }
    
    ordersList.innerHTML = orders.map(order => {
        const statusClass = getStatusClass(order.status);
        const statusIcon = getStatusIcon(order.status);
        
        return `
            <div class="order-card" onclick="viewOrderDetails('${order.order_number}')">
                <div class="order-header">
                    <div class="order-info">
                        <h3>Order #${order.order_number}</h3>
                        <p class="order-date">
                            <i class="fas fa-calendar"></i>
                            ${formatDateTime(order.created_at)}
                        </p>
                    </div>
                    <div class="order-status ${statusClass}">
                        <i class="fas ${statusIcon}"></i>
                        ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </div>
                </div>
                
                <div class="order-items">
                    <p><strong>${order.items.length}</strong> item(s)</p>
                    <div class="order-items-preview">
                        ${order.items.slice(0, 3).map(item => `
                            <span class="item-preview">${item.name}</span>
                        `).join('')}
                        ${order.items.length > 3 ? `<span class="more-items">+${order.items.length - 3} more</span>` : ''}
                    </div>
                </div>
                
                <div class="order-footer">
                    <div class="order-total">
                        <span>Total Amount:</span>
                        <strong>${formatPrice(order.total_amount)}</strong>
                    </div>
                    <button class="btn-secondary" onclick="event.stopPropagation(); viewOrderDetails('${order.order_number}')">
                        View Details
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// ===== Get Status Class =====
function getStatusClass(status) {
    const classes = {
        'pending': 'status-pending',
        'processing': 'status-processing',
        'shipped': 'status-shipped',
        'delivered': 'status-delivered',
        'cancelled': 'status-cancelled'
    };
    return classes[status] || 'status-pending';
}

// ===== Get Status Icon =====
function getStatusIcon(status) {
    const icons = {
        'pending': 'fa-clock',
        'processing': 'fa-spinner',
        'shipped': 'fa-truck',
        'delivered': 'fa-check-circle',
        'cancelled': 'fa-times-circle'
    };
    return icons[status] || 'fa-clock';
}

// ===== Setup Filter Buttons =====
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.orders-filter .filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter orders
            const status = btn.dataset.status;
            currentFilter = status;
            filterOrders(status);
        });
    });
}

// ===== Filter Orders =====
function filterOrders(status) {
    let filteredOrders = allOrders;
    
    if (status !== 'all') {
        filteredOrders = allOrders.filter(order => order.status === status);
    }
    
    renderOrders(filteredOrders);
}

// ===== View Order Details =====
function viewOrderDetails(orderNumber) {
    const order = allOrders.find(o => o.order_number === orderNumber);
    
    if (!order) {
        showToast('Order not found', 'error');
        return;
    }
    
    const modalBody = document.getElementById('orderModalBody');
    const statusClass = getStatusClass(order.status);
    const statusIcon = getStatusIcon(order.status);
    
    modalBody.innerHTML = `
        <div class="order-details">
            <div class="detail-section">
                <h3>Order Information</h3>
                <div class="detail-row">
                    <span>Order Number:</span>
                    <strong>${order.order_number}</strong>
                </div>
                <div class="detail-row">
                    <span>Order Date:</span>
                    <strong>${formatDateTime(order.created_at)}</strong>
                </div>
                <div class="detail-row">
                    <span>Status:</span>
                    <span class="order-status ${statusClass}">
                        <i class="fas ${statusIcon}"></i>
                        ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                </div>
                <div class="detail-row">
                    <span>Payment Method:</span>
                    <strong>${order.payment_method || 'Cash on Delivery'}</strong>
                </div>
            </div>
            
            <div class="detail-section">
                <h3>Delivery Address</h3>
                <p>${order.delivery_address || 'Not specified'}</p>
            </div>
            
            <div class="detail-section">
                <h3>Order Items</h3>
                <div class="order-items-list">
                    ${order.items.map(item => `
                        <div class="order-item-row">
                            <div class="item-info">
                                <strong>${item.name}</strong>
                                <p>${item.brand || 'Generic'} - ${item.unit || 'piece'}</p>
                            </div>
                            <div class="item-quantity">
                                Qty: ${item.quantity}
                            </div>
                            <div class="item-price">
                                ${formatPrice(item.price * item.quantity)}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="detail-section">
                <h3>Order Summary</h3>
                <div class="detail-row">
                    <span>Subtotal:</span>
                    <strong>${formatPrice(order.total_amount)}</strong>
                </div>
                <div class="detail-row">
                    <span>Delivery Fee:</span>
                    <strong>₹40.00</strong>
                </div>
                <div class="detail-row total">
                    <span>Total Amount:</span>
                    <strong>${formatPrice(order.total_amount + 40)}</strong>
                </div>
            </div>
            
            ${order.status === 'pending' ? `
                <div class="order-actions">
                    <button class="btn-secondary" onclick="cancelOrder('${order.order_number}')">
                        <i class="fas fa-times"></i>
                        Cancel Order
                    </button>
                </div>
            ` : ''}
        </div>
    `;
    
    document.getElementById('orderModal').style.display = 'flex';
}

// ===== Close Order Modal =====
function closeOrderModal() {
    document.getElementById('orderModal').style.display = 'none';
}

// ===== Cancel Order =====
function cancelOrder(orderNumber) {
    if (confirm('Are you sure you want to cancel this order?')) {
        // In a real app, this would make an API call
        showToast('Order cancellation feature - Demo only', 'info');
        closeOrderModal();
    }
}

// ===== Close modal on outside click =====
window.onclick = function(event) {
    const modal = document.getElementById('orderModal');
    if (event.target === modal) {
        closeOrderModal();
    }
}

// Made with Bob