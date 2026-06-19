// Enhanced Features JavaScript for Basket Buddy

// ===== Wishlist Management =====
const WISHLIST_KEY = 'basketbuddy_wishlist';

function getWishlist() {
    const wishlist = localStorage.getItem(WISHLIST_KEY);
    return wishlist ? JSON.parse(wishlist) : [];
}

function saveWishlist(wishlist) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    updateWishlistBadge();
}

function addToWishlist(productId) {
    const wishlist = getWishlist();
    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        saveWishlist(wishlist);
        showToast('Added to wishlist! ❤️', 'success');
        return true;
    }
    showToast('Already in wishlist', 'info');
    return false;
}

function removeFromWishlist(productId) {
    let wishlist = getWishlist();
    wishlist = wishlist.filter(id => id !== productId);
    saveWishlist(wishlist);
    showToast('Removed from wishlist', 'info');
}

function isInWishlist(productId) {
    return getWishlist().includes(productId);
}

function updateWishlistBadge() {
    const badge = document.getElementById('wishlistBadge');
    if (badge) {
        const count = getWishlist().length;
        badge.textContent = count;
        badge.style.display = count > 0 ? 'block' : 'none';
    }
}

// ===== Location Modal =====
function openLocationModal() {
    const modal = document.getElementById('locationModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeLocationModal() {
    const modal = document.getElementById('locationModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function selectLocation(location) {
    const locationDisplay = document.getElementById('selectedLocation');
    if (locationDisplay) {
        locationDisplay.textContent = location;
        localStorage.setItem('basketbuddy_location', location);
        showToast(`Location set to ${location}`, 'success');
    }
    closeLocationModal();
}

// ===== Banner Carousel =====
let currentSlide = 0;
let carouselInterval;

function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (!slides.length || !dotsContainer) return;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot';
        if (index === 0) dot.classList.add('active');
        dot.onclick = () => goToSlide(index);
        dotsContainer.appendChild(dot);
    });
    
    // Auto-play carousel
    startCarousel();
}

function moveCarousel(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    if (!slides.length) return;
    
    currentSlide += direction;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    if (currentSlide >= slides.length) currentSlide = 0;
    
    updateCarousel();
    resetCarouselTimer();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
    resetCarouselTimer();
}

function updateCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function startCarousel() {
    carouselInterval = setInterval(() => {
        moveCarousel(1);
    }, 5000);
}

function resetCarouselTimer() {
    clearInterval(carouselInterval);
    startCarousel();
}

// ===== Filter Sidebar =====
function toggleFilterSidebar() {
    const sidebar = document.getElementById('filterSidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

function clearAllFilters() {
    // Reset category filters
    document.querySelectorAll('#categoryFilters input[type="checkbox"]').forEach(cb => {
        cb.checked = cb.value === 'all';
    });
    
    // Reset price range
    const priceRange = document.getElementById('priceRange');
    if (priceRange) {
        priceRange.value = 500;
        updatePriceRange();
    }
    
    // Reset rating filter
    document.querySelectorAll('input[name="rating"]').forEach(radio => {
        radio.checked = radio.value === '0';
    });
    
    // Reload products
    loadFeaturedProducts();
    showToast('Filters cleared', 'info');
}

function filterByCategory() {
    const checkboxes = document.querySelectorAll('#categoryFilters input[type="checkbox"]:checked');
    const selectedCategories = Array.from(checkboxes).map(cb => cb.value);
    
    if (selectedCategories.includes('all') || selectedCategories.length === 0) {
        loadFeaturedProducts();
    } else {
        const filtered = MOCK_PRODUCTS.filter(p => 
            selectedCategories.includes(p.category_id.toString())
        );
        displayProducts(filtered);
    }
}

function updatePriceRange() {
    const maxPrice = parseInt(document.getElementById('priceRange').value);
    
    document.getElementById('priceValue').textContent = maxPrice;
    
    // Filter products by price (from 0 to selected max)
    const filtered = MOCK_PRODUCTS.filter(p =>
        p.price >= 0 && p.price <= maxPrice
    );
    displayProducts(filtered);
}

function filterByRating(minRating) {
    if (minRating === '0') {
        loadFeaturedProducts();
        return;
    }
    
    const filtered = MOCK_PRODUCTS.filter(p => 
        p.avg_rating >= parseFloat(minRating)
    );
    displayProducts(filtered);
}

// ===== Sort Products =====
function sortProducts(sortBy) {
    let products = [...allProducts];
    
    switch(sortBy) {
        case 'price-low':
            products.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            products.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            products.sort((a, b) => b.avg_rating - a.avg_rating);
            break;
        case 'newest':
            products.sort((a, b) => b.id - a.id);
            break;
        case 'popularity':
        default:
            products.sort((a, b) => b.review_count - a.review_count);
    }
    
    displayProducts(products);
    showToast(`Sorted by ${sortBy}`, 'info');
}

// ===== Product Quick View =====
function openQuickView(productId) {
    const product = MOCK_PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('quickViewModal');
    const content = document.getElementById('quickViewContent');
    
    if (!modal || !content) return;
    
    const icon = PRODUCT_ICONS[product.category_name] || PRODUCT_ICONS.default;
    const inWishlist = isInWishlist(productId);
    
    content.innerHTML = `
        <div class="quick-view-image">
            <div style="font-size: 10rem;">${icon}</div>
        </div>
        <div class="quick-view-details">
            <div class="quick-view-brand">${product.brand}</div>
            <h2>${product.name}</h2>
            <div class="quick-view-rating">
                ${createStarRating(product.avg_rating)}
                <span>(${product.review_count} reviews)</span>
            </div>
            <div class="quick-view-price">₹${product.price}</div>
            <div class="quick-view-unit">${product.unit}</div>
            <p class="quick-view-description">${product.description}</p>
            <div class="stock-status ${product.stock_quantity > 0 ? 'in-stock' : 'out-of-stock'}">
                ${product.stock_quantity > 0 ? '✓ In Stock' : '✗ Out of Stock'}
            </div>
            <div class="quick-view-actions">
                <button class="btn-primary" onclick="addToCartFromQuickView(${product.id})">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
                <button class="btn-secondary" onclick="toggleWishlistFromQuickView(${product.id})">
                    <i class="fas fa-heart ${inWishlist ? 'filled' : ''}"></i>
                    ${inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                </button>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    trackRecentlyViewed(productId);
}

function closeQuickView() {
    const modal = document.getElementById('quickViewModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function addToCartFromQuickView(productId) {
    addToCart(productId);
    closeQuickView();
}

function toggleWishlistFromQuickView(productId) {
    if (isInWishlist(productId)) {
        removeFromWishlist(productId);
    } else {
        addToWishlist(productId);
    }
    openQuickView(productId); // Refresh the modal
}

// ===== Wishlist Modal =====
function openWishlistModal() {
    const modal = document.getElementById('wishlistModal');
    const container = document.getElementById('wishlistItems');
    
    if (!modal || !container) return;
    
    const wishlist = getWishlist();
    const products = MOCK_PRODUCTS.filter(p => wishlist.includes(p.id));
    
    if (products.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 2rem;">Your wishlist is empty</p>';
    } else {
        container.innerHTML = products.map(product => {
            const icon = PRODUCT_ICONS[product.category_name] || PRODUCT_ICONS.default;
            return `
                <div class="wishlist-item">
                    <div class="wishlist-item-image">
                        <div style="font-size: 2rem;">${icon}</div>
                    </div>
                    <div class="wishlist-item-details">
                        <h4>${product.name}</h4>
                        <div class="wishlist-item-brand">${product.brand}</div>
                        <div class="wishlist-item-price">₹${product.price}</div>
                    </div>
                    <div class="wishlist-item-actions">
                        <button class="btn-primary" onclick="addToCart(${product.id})">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                        <button class="btn-secondary" onclick="removeFromWishlist(${product.id}); openWishlistModal();">
                            <i class="fas fa-trash"></i> Remove
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    modal.classList.add('active');
}

function closeWishlistModal() {
    const modal = document.getElementById('wishlistModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// ===== Recently Viewed Products =====
const RECENTLY_VIEWED_KEY = 'basketbuddy_recently_viewed';

function trackRecentlyViewed(productId) {
    let recentlyViewed = JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) || '[]');
    
    // Remove if already exists
    recentlyViewed = recentlyViewed.filter(id => id !== productId);
    
    // Add to beginning
    recentlyViewed.unshift(productId);
    
    // Keep only last 10
    recentlyViewed = recentlyViewed.slice(0, 10);
    
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(recentlyViewed));
    updateRecentlyViewed();
}

function updateRecentlyViewed() {
    const section = document.getElementById('recentlyViewedSection');
    const container = document.getElementById('recentlyViewedGrid');
    
    if (!section || !container) return;
    
    const recentlyViewed = JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) || '[]');
    const products = MOCK_PRODUCTS.filter(p => recentlyViewed.includes(p.id));
    
    if (products.length > 0) {
        section.style.display = 'block';
        container.innerHTML = products.slice(0, 6).map(product => 
            createProductCard(product)
        ).join('');
    } else {
        section.style.display = 'none';
    }
}

// ===== Enhanced Product Card with Quick View =====
function createEnhancedProductCard(product) {
    const icon = PRODUCT_ICONS[product.category_name] || PRODUCT_ICONS.default;
    const inWishlist = isInWishlist(product.id);
    
    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <div class="product-icon">${icon}</div>
                <button class="wishlist-btn ${inWishlist ? 'active' : ''}" 
                        onclick="toggleWishlist(${product.id}); event.stopPropagation();">
                    <i class="fas fa-heart"></i>
                </button>
                <button class="quick-view-btn" onclick="openQuickView(${product.id}); event.stopPropagation();">
                    <i class="fas fa-eye"></i> Quick View
                </button>
            </div>
            <div class="product-info">
                <div class="product-brand">${product.brand}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-unit">${product.unit}</div>
                <div class="product-rating">
                    ${createStarRating(product.avg_rating)}
                    <span class="rating-count">(${product.review_count})</span>
                </div>
                <div class="product-footer">
                    <div class="product-price">₹${product.price}</div>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id}); event.stopPropagation();">
                        <i class="fas fa-shopping-cart"></i>
                        Add
                    </button>
                </div>
            </div>
        </div>
    `;
}

function toggleWishlist(productId) {
    if (isInWishlist(productId)) {
        removeFromWishlist(productId);
    } else {
        addToWishlist(productId);
    }
    
    // Update the button appearance
    const card = document.querySelector(`[data-product-id="${productId}"]`);
    if (card) {
        const btn = card.querySelector('.wishlist-btn');
        if (btn) {
            btn.classList.toggle('active');
        }
    }
}

// ===== Initialize Enhanced Features =====
function initEnhancedFeatures() {
    // Initialize carousel
    initCarousel();
    
    // Update wishlist badge
    updateWishlistBadge();
    
    // Load saved location
    const savedLocation = localStorage.getItem('basketbuddy_location');
    if (savedLocation) {
        const locationDisplay = document.getElementById('selectedLocation');
        if (locationDisplay) {
            locationDisplay.textContent = savedLocation;
        }
    }
    
    // Setup location selector
    const locationSelector = document.getElementById('locationSelector');
    if (locationSelector) {
        locationSelector.addEventListener('click', openLocationModal);
    }
    
    // Setup wishlist link
    const wishlistLink = document.getElementById('wishlistLink');
    if (wishlistLink) {
        wishlistLink.addEventListener('click', (e) => {
            e.preventDefault();
            openWishlistModal();
        });
    }
    
    // Update recently viewed
    updateRecentlyViewed();
    
    // Close modals on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    // Populate brand filters
    populateBrandFilters();
}

function populateBrandFilters() {
    const container = document.getElementById('brandFilters');
    if (!container) return;
    
    const brands = [...new Set(MOCK_PRODUCTS.map(p => p.brand))].sort();
    
    container.innerHTML = brands.slice(0, 10).map(brand => `
        <label class="filter-option">
            <input type="checkbox" value="${brand}" onchange="filterByBrand()">
            <span>${brand}</span>
        </label>
    `).join('');
}

function filterByBrand() {
    const checkboxes = document.querySelectorAll('#brandFilters input[type="checkbox"]:checked');
    const selectedBrands = Array.from(checkboxes).map(cb => cb.value);
    
    if (selectedBrands.length === 0) {
        loadFeaturedProducts();
    } else {
        const filtered = MOCK_PRODUCTS.filter(p => 
            selectedBrands.includes(p.brand)
        );
        displayProducts(filtered);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEnhancedFeatures);
} else {
    initEnhancedFeatures();
}

// Made with Bob
// ===== Back to Top Button =====
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function handleBackToTopButton() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;
    
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
}

// Add scroll event listener for back to top button
window.addEventListener('scroll', handleBackToTopButton);
